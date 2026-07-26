import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// next/font faz self-hosting das fontes no build (sem requisição externa em runtime,
// sem layout shift, com font-display: swap) — melhor prática atual para Core Web Vitals.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://tiagovaz.online";
const GTM_ID = "GTM-MM6JQFVK";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tiago Vaz — Inteligência Empresarial e Crescimento Previsível",
    template: "%s | Tiago Vaz",
  },
  description:
    "Consultoria em inteligência empresarial: dados, IA e processos comerciais a serviço de decisões melhores e crescimento previsível.",
  keywords: [
    "consultoria empresarial",
    "inteligência empresarial",
    "Google Ads",
    "Meta Ads",
    "CRM",
    "automação comercial",
    "IA para empresas",
    "marketing digital",
    "análise de dados",
    "estratégia comercial",
    "growth",
    "business intelligence",
    "tomada de decisão",
  ],
  authors: [{ name: "Tiago Emídio Pieretti Vaz" }],
  creator: "Tiago Vaz",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Tiago Vaz",
    title: "Tiago Vaz — Inteligência Empresarial e Crescimento Previsível",
    description: "Transformando dados em decisões. Transformando decisões em crescimento previsível.",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Tiago Vaz — Transformando dados em decisões, decisões em crescimento previsível",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiago Vaz — Inteligência Empresarial e Crescimento Previsível",
    description: "Transformando dados em decisões. Transformando decisões em crescimento previsível.",
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E1215" },
    { media: "(prefers-color-scheme: light)", color: "#F5F1EE" },
  ],
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tiago Vaz",
  description: "Consultoria em inteligência empresarial, dados e IA aplicada a processos comerciais.",
  url: SITE_URL,
  image: `${SITE_URL}/images/tiago-vaz-lg.jpg`,
  areaServed: "BR",
  founder: { "@type": "Person", name: "Tiago Emídio Pieretti Vaz" },
  sameAs: ["https://www.instagram.com/tiago_vaz_br/"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Isso é consultoria de marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Marketing é uma das ferramentas. O trabalho é sobre arquitetura de dados, decisão e processo — o marketing é consequência disso, não o ponto de partida.",
      },
    },
    {
      "@type": "Question",
      name: "Vocês implementam CRM e automações também?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, mas como parte de um sistema maior — nunca como venda isolada de ferramenta.",
      },
    },
    {
      "@type": "Question",
      name: "Preciso já ter uma equipe comercial estruturada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ajuda, mas não é obrigatório. O diagnóstico inicial mostra exatamente o que existe hoje e o que precisa ser construído.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo leva para ver resultado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende da maturidade dos dados e processos existentes. O diagnóstico estratégico é o momento em que isso fica claro, caso a caso.",
      },
    },
    {
      "@type": "Question",
      name: "Isso funciona para qualquer segmento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Os princípios são os mesmos — dados, decisão, aprendizado. A aplicação muda conforme o nicho, o processo e o comportamento do cliente de cada empresa.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('tv-theme')==='light'){document.documentElement.classList.add('light');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <GoogleTagManager gtmId={GTM_ID} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
