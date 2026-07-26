import { promises as fs } from "fs";
import path from "path";

/**
 * Grava cada lead do formulário como uma linha em um CSV local, dentro da pasta
 * `data/` na raiz do projeto (fora de `public/` de propósito — um arquivo dentro
 * de `public/` fica acessível publicamente por URL, o que exporia os dados de
 * todos os leads. `data/leads.csv` só é acessível pelo próprio servidor).
 *
 * IMPORTANTE — limitação a conhecer antes de escolher onde hospedar:
 * isso grava no sistema de arquivos local do processo Node. Funciona bem em
 * hospedagem tradicional (VPS, servidor próprio, Docker, Railway, Render etc.),
 * onde o disco é persistente. NÃO funciona de forma confiável em plataformas
 * serverless como a Vercel, cujo sistema de arquivos é efêmero/somente-leitura
 * fora de `/tmp` — cada requisição pode cair em uma instância diferente, sem o
 * arquivo escrito anteriormente. Se for hospedar na Vercel, troque isto por um
 * banco de dados (Postgres, Supabase, Google Sheets via API etc.).
 */

const DATA_DIR = path.join(process.cwd(), "data");
const CSV_PATH = path.join(DATA_DIR, "leads.csv");

const COLUMNS = [
  "data_hora",
  "nome",
  "empresa",
  "segmento",
  "whatsapp",
  "email",
  "funcionarios",
  "desafio",
  "objetivo",
  "consentimento_lgpd",
] as const;

export type LeadRow = Record<(typeof COLUMNS)[number], string>;

function csvEscape(value: string): string {
  // Proteção contra "CSV injection": se o valor começar com =, +, -, @ (ou tab/CR),
  // o Excel/Google Sheets pode interpretá-lo como fórmula ao abrir o arquivo — um
  // vetor de ataque conhecido (OWASP "CSV Injection"). Prefixamos com um apóstrofo
  // para forçar interpretação como texto puro, neutralizando a fórmula.
  const isFormulaLike = /^[=+\-@\t\r]/.test(value);
  const safeValue = isFormulaLike ? `'${value}` : value;

  const needsQuoting = /[",\n\r]/.test(safeValue);
  const escaped = safeValue.replace(/"/g, '""');
  return needsQuoting ? `"${escaped}"` : escaped;
}

function toRow(lead: LeadRow): string {
  return COLUMNS.map((col) => csvEscape(lead[col] ?? "")).join(",") + "\n";
}

// Fila simples em memória para serializar as escritas: evita que duas requisições
// simultâneas colidam ao checar/criar o arquivo e o cabeçalho ao mesmo tempo.
let writeQueue: Promise<unknown> = Promise.resolve();

export function appendLeadToCsv(lead: LeadRow): Promise<void> {
  const task = writeQueue.then(() => doAppend(lead));
  // A fila sempre segue adiante mesmo se essa escrita falhar; quem chamou
  // `appendLeadToCsv` ainda recebe o erro através da própria `task`.
  writeQueue = task.catch(() => undefined);
  return task;
}

async function doAppend(lead: LeadRow): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  let fileExists = true;
  try {
    await fs.access(CSV_PATH);
  } catch {
    fileExists = false;
  }

  const row = toRow(lead);

  if (!fileExists) {
    const header = COLUMNS.join(",") + "\n";
    await fs.writeFile(CSV_PATH, header + row, "utf-8");
  } else {
    await fs.appendFile(CSV_PATH, row, "utf-8");
  }
}
