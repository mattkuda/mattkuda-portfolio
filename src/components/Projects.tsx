import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function Projects({ limit }: { limit?: number }) {
  const displayed = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="py-12">
      <div className="section-divider mb-8 pt-0" />
      <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-[#a1a1aa]">
        Projects
      </h2>
      <div className="space-y-4">
        {displayed.map((project) => {
          const link =
            project.demoUrl || project.codeUrl || project.videoUrl || "#";
          return (
            <div key={project.title} className="group">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-sm hover:underline"
                  >
                    {project.title}
                    <ExternalLink
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                  <span className="text-sm text-[#a1a1aa]">
                    {" "}
                    &mdash; {project.description}
                  </span>
                </div>
                <span className="hidden text-xs text-[#555] sm:inline-block">
                  {project.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {limit && (
        <Link
          href="/projects"
          className="mt-6 inline-block text-sm text-[#a1a1aa] transition-colors hover:text-white"
        >
          View all projects &rarr;
        </Link>
      )}
    </section>
  );
}
