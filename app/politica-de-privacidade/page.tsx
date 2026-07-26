import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como os dados enviados pelo formulário de contato de Tiago Vaz são coletados, usados e protegidos.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "25 de julho de 2026";

export default function PoliticaDePrivacidade() {
  return (
    <main className="py-32">
      <div className="container max-w-[760px]">
        <Link href="/" className="flex items-baseline gap-2 font-display text-2xl">
          <span>Tiago</span>
          <span className="relative top-[1px] text-[1.75rem] italic text-primary">Vaz</span>
        </Link>

        <div className="mt-10 rounded-md border border-primary/30 bg-primary/[0.06] p-5 text-sm text-foreground/70">
          <strong className="text-foreground">Aviso:</strong> este é um texto-modelo, redigido para
          orientar o que costuma constar em uma política de privacidade compatível com a LGPD (Lei
          Geral de Proteção de Dados). Ele não substitui aconselhamento jurídico — recomenda-se que
          um advogado especializado revise e ajuste este conteúdo antes da publicação definitiva,
          principalmente os prazos de retenção e as ferramentas de terceiros efetivamente utilizadas.
        </div>

        <span className="mt-10 block font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">
          Última atualização: {LAST_UPDATED}
        </span>
        <h1 className="mt-4 font-display text-3xl md:text-4xl">Política de Privacidade</h1>

        <div className="mt-12 space-y-10 text-[0.98rem] leading-relaxed text-foreground/70">
          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">1. Quem é o responsável pelos dados</h2>
            <p>
              Esta política se aplica ao site tiagovaz.com.br, de responsabilidade de Tiago Emídio
              Pieretti Vaz ("Tiago Vaz", "nós"). Dúvidas sobre esta política ou sobre o tratamento dos
              seus dados podem ser enviadas para{" "}
              <a href="mailto:tiago@tiagovaz.com.br" className="text-primary hover:underline">
                tiago@tiagovaz.com.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">2. Quais dados coletamos</h2>
            <p className="mb-3">Ao preencher o formulário de Diagnóstico Estratégico, coletamos:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Nome</li>
              <li>Empresa e segmento de atuação</li>
              <li>WhatsApp e e-mail</li>
              <li>Número aproximado de funcionários</li>
              <li>O desafio comercial e o objetivo que você descreve no formulário</li>
            </ul>
            <p className="mt-3">
              Também podemos coletar dados de navegação de forma automática (como páginas visitadas e
              origem do acesso) através de ferramentas de análise — ver seção 6 (Cookies).
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">3. Para que usamos esses dados</h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Entrar em contato para conduzir o Diagnóstico Estratégico solicitado</li>
              <li>Entender o contexto do seu negócio antes da conversa</li>
              <li>Medir, de forma agregada e sem identificação pessoal, a origem e o desempenho do site</li>
            </ul>
            <p className="mt-3">
              A base legal para esse tratamento é o seu consentimento, dado ao marcar a caixa de
              aceite no formulário, e o legítimo interesse em responder a uma solicitação de contato
              que você mesmo iniciou.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">4. Com quem compartilhamos</h2>
            <p>
              Os dados do formulário não são vendidos nem repassados a terceiros para fins de
              marketing de outras empresas. Ferramentas de terceiros utilizadas no site (como Google
              Tag Manager/Analytics) podem processar dados de navegação conforme suas próprias
              políticas de privacidade.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">5. Armazenamento e segurança</h2>
            <p>
              Os dados enviados pelo formulário são armazenados em ambiente controlado, com medidas
              técnicas razoáveis de proteção. Nenhum sistema é 100% livre de risco, mas adotamos
              práticas como validação, sanitização de dados e controle de acesso ao armazenamento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">6. Cookies</h2>
            <p>
              O site pode usar cookies e tecnologias semelhantes via Google Tag Manager para
              mensuração de tráfego e desempenho de campanhas. Você pode gerenciar ou bloquear cookies
              diretamente nas configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">7. Por quanto tempo guardamos os dados</h2>
            <p>
              Mantemos os dados pelo tempo necessário para a finalidade do contato comercial, ou até
              que você solicite a exclusão, o que ocorrer primeiro.{" "}
              <em>[Prazo específico a ser definido/confirmado.]</em>
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">8. Seus direitos</h2>
            <p className="mb-3">De acordo com a LGPD, você pode solicitar, a qualquer momento:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Confirmação de que tratamos seus dados, e acesso a eles</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Exclusão dos seus dados</li>
              <li>Revogação do consentimento dado</li>
              <li>Informação sobre com quem compartilhamos seus dados</li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer um desses direitos, escreva para{" "}
              <a href="mailto:tiago@tiagovaz.com.br" className="text-primary hover:underline">
                tiago@tiagovaz.com.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl text-foreground">9. Alterações nesta política</h2>
            <p>
              Esta política pode ser atualizada periodicamente. A data no topo desta página indica a
              versão mais recente.
            </p>
          </section>
        </div>

        <Link href="/" className="mt-16 inline-block font-mono text-[0.82rem] text-foreground/50 hover:text-primary">
          ← Voltar ao início
        </Link>
      </div>
    </main>
  );
}
