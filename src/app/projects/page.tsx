import { projects } from "@/data/projects";
import { ExternalLink, Github, Play } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Projects - Matt Kuda",
  description: "A collection of applications I've built.",
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
      <p className="mt-2 text-sm text-[#a1a1aa]">
        A collection of applications I&apos;ve built that showcase my expertise in
        web and mobile development.
      </p>

      <div className="mt-10 space-y-10">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group rounded-lg border border-[#1e1e1e] bg-[#111] overflow-hidden transition-colors hover:border-[#333]"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0a]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <h2 className="text-base font-semibold">{project.title}</h2>
                <span className="text-xs text-[#555]">{project.year}</span>
              </div>
              <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-[#a1a1aa]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#a1a1aa] transition-colors hover:text-white"
                  >
                    <ExternalLink size={12} /> Live Demo
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#a1a1aa] transition-colors hover:text-white"
                  >
                    <Github size={12} /> Code
                  </a>
                )}
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#a1a1aa] transition-colors hover:text-white"
                  >
                    <Play size={12} /> Video
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
