import { socialLinks } from "@/data/projects";
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
} from "lucide-react";

const links = [
  { href: socialLinks.twitter, icon: Twitter, label: "@mattkuda", name: "Twitter" },
  { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn", name: "LinkedIn" },
  { href: socialLinks.github, icon: Github, label: "GitHub", name: "GitHub" },
  { href: socialLinks.youtube, icon: Youtube, label: "YouTube", name: "YouTube" },
  { href: socialLinks.instagram, icon: Instagram, label: "Instagram", name: "Instagram" },
  { href: `mailto:${socialLinks.email}`, icon: Mail, label: "Email", name: "Email" },
];

export function Connect() {
  return (
    <section className="py-12">
      <div className="section-divider mb-8" />
      <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-[#a1a1aa]">
        Connect
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {links.map(({ href, icon: Icon, label, name }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#1e1e1e] bg-[#111] px-4 py-3 text-sm transition-colors hover:border-[#333] hover:bg-[#1a1a1a]"
          >
            <Icon size={16} className="text-[#a1a1aa]" />
            <span>{name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
