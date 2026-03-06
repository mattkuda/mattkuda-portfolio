import Image from "next/image";
import { socialLinks } from "@/data/projects";

export const metadata = {
  title: "About - Matt Kuda",
  description: "Software Engineer, Fitness Enthusiast, Content Creator.",
};

export default function AboutPage() {
  return (
    <>
      <div className="flex items-start gap-5">
        <Image
          src="/matt-kuda-pic.png"
          alt="Matt Kuda"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">About Me</h1>
          <p className="mt-1 text-sm text-[#a1a1aa]">
            Software Engineer & Content Creator
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#a1a1aa]">
        <p>
          Hi, I&apos;m Matt. I discovered both coding and fitness in high school and
          they&apos;ve been my two passions ever since. From my earliest days writing
          code and hitting the gym, I&apos;ve always been drawn to building things:
          stronger software, a healthier body, and a more fulfilling life.
        </p>

        <p>
          As a developer, I&apos;ve spent years honing my skills in building
          applications, solving problems, and creating tools that make life
          easier and more impactful. Some of my projects include EVEX, an AI
          personal trainer app, TabaFit, a Tabata workout app, and various web
          development experiments that merge functionality with creative design.
        </p>

        <p>
          My approach to coding isn&apos;t just about writing great software. It&apos;s
          about using technology to make a difference. I see a real opportunity
          to inspire developers to embrace healthier lifestyles. Staying active
          and fit enables you to perform at your best, building confidence, and
          leading a stronger, more balanced life.
        </p>

        <p>
          I believe that when developers prioritize their health, they become
          sharper problem-solvers, more creative thinkers, and ultimately, better
          at what they do both in their careers and beyond.
        </p>

        <p>
          Looking ahead, my goal is to continue creating tools and content that
          bridge the worlds of tech and fitness. I&apos;m building a community of
          like-minded developers and enthusiasts who want to live healthier,
          purpose-driven lives.
        </p>
      </div>

      <div className="mt-10 section-divider pt-8">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-[#a1a1aa]">
          What I Do
        </h2>
        <ul className="space-y-2 text-sm text-[#a1a1aa]">
          <li>Software Engineer building web & mobile apps</li>
          <li>
            Content Creator on{" "}
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              YouTube
            </a>{" "}
            &{" "}
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              TikTok
            </a>
          </li>
          <li>Fitness enthusiast & runner</li>
          <li>
            Newsletter at{" "}
            <a
              href={socialLinks.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Substack
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-10 section-divider pt-8">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-[#a1a1aa]">
          Get in Touch
        </h2>
        <p className="text-sm text-[#a1a1aa]">
          I&apos;m always open to discussing new projects and opportunities.
        </p>
        <a
          href={`mailto:${socialLinks.email}`}
          className="mt-3 inline-block text-sm text-white hover:underline"
        >
          {socialLinks.email}
        </a>
      </div>
    </>
  );
}
