"use client";

import { useEffect, useRef, useState } from "react";

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Sobre Mim
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Sou um desenvolvedor web apaixonado por criar experiências
                digitais acessíveis e pixel-perfect que combinam design
                pensativo com engenharia robusta. Meu trabalho favorito está na
                interseção entre design e desenvolvimento, criando experiências
                que não apenas ficam ótimas, mas são meticulosamente construídas
                para performance e usabilidade.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Atualmente, sou Desenvolvedor Full-Stack especializado em React,
                TypeScript e Next.js. Contribuo para a criação e manutenção de
                componentes de UI que alimentam aplicações modernas, garantindo
                que nossa plataforma atenda aos padrões de acessibilidade web e
                melhores práticas para entregar uma experiência de usuário
                inclusiva.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                No passado, tive a oportunidade de desenvolver software em uma
                variedade de ambientes — desde{" "}
                <strong className="text-green-500">
                  agências de publicidade
                </strong>{" "}
                e{" "}
                <strong className="text-green-500 mr-2">
                  grandes corporações
                </strong>
                até <strong className="text-green-500 ml-2">start-ups</strong> e{" "}
                <strong className="text-green-500">
                  pequenos estúdios de produtos digitais
                </strong>
                .
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Tecnologias</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Next.js",
                    "Node.js",
                    "Tailwind CSS",
                    "PostgreSQL",
                    "MongoDB",
                    "Git",
                  ].map((tech, index) => (
                    <div
                      key={tech}
                      className={`bg-card border border-border rounded-lg p-3 text-center transition-all duration-500 hover:bg-accent ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-5"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <span className="text-sm font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
