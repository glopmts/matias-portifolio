"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { categories, projects } from "../utils/projects.db";

export function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animação automática de imagens em destaque
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredProjects.length]);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projetos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Uma seleção dos meus trabalhos mais recentes, demonstrando
              diferentes tecnologias e abordagens de desenvolvimento.
            </p>
          </div>

          {/* Seção de destaque com imagem rotativa */}
          <div className="mb-16">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-card border border-border">
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent z-10" />
              <Image
                src={
                  filteredProjects[currentImageIndex]?.image ||
                  "/placeholder.svg?height=400&width=800&query=project showcase" ||
                  "/placeholder.svg"
                }
                alt={
                  filteredProjects[currentImageIndex]?.title ||
                  "Projeto em destaque"
                }
                fill
                className="object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-lg">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                      {filteredProjects[currentImageIndex]?.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {filteredProjects[currentImageIndex]?.description}
                    </p>
                    <div className="flex gap-2 mb-4">
                      {filteredProjects[currentImageIndex]?.technologies
                        .slice(0, 3)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Filtros de categoria */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 p-1 bg-card rounded-lg border border-border">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de projetos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group hover:shadow-lg transition-all duration-500 hover:-translate-y-2 bg-card border-border ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Botões de ação */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-background/80 hover:bg-background"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-background/80 hover:bg-background"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} />
                      </a>
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Interessado em ver mais do meu trabalho?
            </p>
            <Button
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              asChild
            >
              <a
                href="https://github.com/glopmts"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} className="mr-2" />
                Ver no GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
