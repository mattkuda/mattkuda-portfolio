import Image from "next/image";
import { socialLinks } from "@/data/projects";
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
} from "lucide-react";

export function Hero() {
  return (
    <section className="pb-12">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Matt Kuda</h1>
          <p className="mt-1 text-sm text-[#a1a1aa]">
            Software Engineer & Content Creator
          </p>
        </div>
        <Image
          src="/matt-kuda-pic.png"
          alt="Matt Kuda"
          width={72}
          height={72}
          className="rounded-full"
        />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[#a1a1aa]">
        I build things that combine my love for tech and fitness, helping people
        create better habits and lead intentional lives. Through code, content,
        and community, I&apos;m on a mission to inspire healthier lives.
      </p>

      {/* Social icons */}
      <div className="mt-5 flex items-center gap-4">
        {[
          { href: socialLinks.github, icon: Github, label: "GitHub" },
          { href: socialLinks.twitter, icon: Twitter, label: "Twitter" },
          { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
          { href: socialLinks.youtube, icon: Youtube, label: "YouTube" },
          { href: socialLinks.instagram, icon: Instagram, label: "Instagram" },
          { href: `mailto:${socialLinks.email}`, icon: Mail, label: "Email" },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a1a1aa] transition-colors hover:text-white"
            aria-label={label}
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </section>
  );
}
