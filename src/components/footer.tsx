"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Instagram, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/glopmts",
    icon: Github,
    description: "Veja meus projetos",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/antonio-matias-52695a28a",
    icon: Linkedin,
    description: "Conecte-se comigo",
  },
  // {
  //   name: "Twitter",
  //   url: "https://twitter.com/seuusuario",
  //   icon: Twitter,
  //   description: "Siga-me no Twitter",
  // },
  {
    name: "Instagram",
    url: "https://instagram.com/matiasif_",
    icon: Instagram,
    description: "Veja meu dia a dia",
  },
  {
    name: "Email",
    url: "mailto:glopmtscomercial@gmail.com",
    icon: Mail,
    description: "Entre em contato",
  },
];

const quickLinks = [
  { name: "Sobre", href: "#about" },
  { name: "Projetos", href: "#projects" },
  { name: "Contato", href: "#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informações principais */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Matias</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Desenvolvedor web apaixonado por criar experiências digitais
              excepcionais. Especializado em React, TypeScript e Next.js.
            </p>

            {/* Redes sociais */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group bg-transparent"
                    asChild
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.description}
                    >
                      <Icon
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Informações de contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a
                  href="mailto:glopmtscomercial@gmail.com"
                  className="text-sm hover:text-primary transition-colors"
                >
                  glopmtscomercial@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Localização</p>
                <p className="text-sm">São Paulo, Brasil</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Disponibilidade</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-green-500">
                    Disponível para projetos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <p>
                &copy; {currentYear} Matias Ts. Todos os direitos reservados.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-muted-foreground hover:text-primary"
              >
                <ExternalLink size={14} className="mr-1 rotate-45" />
                Voltar ao topo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de status */}
      <div className="bg-primary/5 border-t border-primary/20 py-3">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-medium">
              Construído com Next.js, TypeScript e Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
