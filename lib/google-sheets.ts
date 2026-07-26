import { google } from "googleapis";

/**
 * Grava cada lead como uma linha em uma Planilha Google, via Service Account
 * (conta de serviço) — não depende de disco local, então funciona normalmente
 * em serverless (Vercel), ao contrário da versão anterior em CSV.
 *
 * Variáveis de ambiente necessárias (ver README.md para o passo a passo completo
 * de como gerá-las no Google Cloud):
 *   GOOGLE_SHEETS_CLIENT_EMAIL      → e-mail da service account
 *   GOOGLE_SHEETS_PRIVATE_KEY       → chave privada da service account (formato PEM)
 *   GOOGLE_SHEETS_SPREADSHEET_ID    → ID da planilha (está na URL dela)
 *   GOOGLE_SHEETS_TAB_NAME          → opcional, nome da aba (padrão: "Leads")
 */

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

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  // Em variáveis de ambiente, quebras de linha da chave privada costumam vir
  // escapadas como "\n" literal — convertemos de volta para quebra de linha real.
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google Sheets não configurado. Defina GOOGLE_SHEETS_CLIENT_EMAIL e GOOGLE_SHEETS_PRIVATE_KEY nas variáveis de ambiente."
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendLeadToSheet(lead: LeadRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID não configurado nas variáveis de ambiente.");
  }

  const tab = process.env.GOOGLE_SHEETS_TAB_NAME || "Leads";
  const sheets = getSheetsClient();
  const row = COLUMNS.map((col) => lead[col] ?? "");

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:J`,
    // "RAW" é importante por segurança: insere o valor exatamente como está,
    // sem o Google Sheets tentar interpretá-lo como fórmula. Isso neutraliza
    // por completo o vetor de ataque "CSV/Sheets injection" (ex: alguém
    // digitando "=CMD(...)" no campo "desafio") sem precisar de nenhum
    // escape manual adicional.
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}
