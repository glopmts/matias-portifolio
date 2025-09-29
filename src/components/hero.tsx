"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto max-w-4xl text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Seu Nome
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
            Desenvolvedor Web
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            <em className="text-primary">Criando interfaces.</em> Construindo
            software polido e experiências web. Experimentando com detalhes
            mágicos em interfaces de usuário. Especialista em React e
            TypeScript.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              asChild
            >
              <a
                href="https://github.com/glopmts"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              asChild
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              asChild
            >
              <a href="mailto:glopmtscomercial@gmail.com">
                <Mail size={20} />
              </a>
            </Button>
          </div>

          <Button
            onClick={scrollToProjects}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
          >
            Ver Meu Trabalho
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown size={24} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
