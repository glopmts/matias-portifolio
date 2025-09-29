import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matias - Desenvolvedor Web Full-Stack",
  description:
    "Portfólio profissional de desenvolvimento web com React, TypeScript, Next.js e Node.js. Criando experiências digitais excepcionais.",
  keywords:
    "desenvolvedor web, react, typescript, nextjs, nodejs, portfolio, full-stack developer",
  authors: [{ name: "Matias" }],
  creator: "Matias",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://matiasportifolio.com",
    title: "Matias - Desenvolvedor Web Full-Stack",
    description:
      "Portfólio profissional de desenvolvimento web com React, TypeScript, Next.js e Node.js.",
    siteName: "Matias Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matias - Desenvolvedor Web Full-Stack",
    description:
      "Portfólio profissional de desenvolvimento web com React, TypeScript, Next.js e Node.js.",
    creator: "@seuusuario",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <Analytics />
        <main className="w-full min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={null}>{children}</Suspense>
            <Toaster />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
