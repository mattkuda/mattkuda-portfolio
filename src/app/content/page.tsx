import { socialLinks } from "@/data/projects";
import { Youtube, Twitter, Instagram, BookOpen } from "lucide-react";

export const metadata = {
  title: "Content - Matt Kuda",
  description: "Tech, fitness, and life content from Matt Kuda.",
};

const contentLinks = [
  {
    title: "YouTube",
    description: "Tutorials, project walkthroughs, and tech + fitness content.",
    href: socialLinks.youtube,
    icon: Youtube,
  },
  {
    title: "Newsletter",
    description:
      "Weekly updates on tech news, fitness tips, and interesting finds.",
    href: socialLinks.substack,
    icon: BookOpen,
  },
  {
    title: "Twitter / X",
    description: "Quick thoughts, project updates, and daily musings.",
    href: socialLinks.twitter,
    icon: Twitter,
  },
  {
    title: "Instagram",
    description: "Behind the scenes, fitness journey, and lifestyle.",
    href: socialLinks.instagram,
    icon: Instagram,
  },
];

const tiktokIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.8.1v-3.5a6.37 6.37 0 0 0-.8-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.25 8.25 0 0 0 3.76.97V6.2a4.83 4.83 0 0 1-.01.49h.01Z" />
  </svg>
);

export default function ContentPage() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Content</h1>
      <p className="mt-2 text-sm text-[#a1a1aa]">
        What I&apos;ve shared with the world on tech, fitness, and life.
      </p>

      <div className="mt-10 space-y-4">
        {contentLinks.map(({ title, description, href, icon: Icon }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-lg border border-[#1e1e1e] bg-[#111] p-4 transition-colors hover:border-[#333] hover:bg-[#1a1a1a]"
          >
            <div className="mt-0.5 text-[#a1a1aa]">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="mt-1 text-xs text-[#a1a1aa]">{description}</p>
            </div>
          </a>
        ))}

        <a
          href={socialLinks.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 rounded-lg border border-[#1e1e1e] bg-[#111] p-4 transition-colors hover:border-[#333] hover:bg-[#1a1a1a]"
        >
          <div className="mt-0.5 text-[#a1a1aa]">{tiktokIcon}</div>
          <div>
            <h3 className="text-sm font-medium">TikTok</h3>
            <p className="mt-1 text-xs text-[#a1a1aa]">
              Short-form fitness and dev content.
            </p>
          </div>
        </a>
      </div>

      <div className="mt-10 section-divider pt-8">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-[#a1a1aa]">
          Stay Updated
        </h2>
        <p className="text-sm text-[#a1a1aa]">
          Sign up for my newsletter to receive tech news, fitness tips, and the
          content I find most interesting each week.
        </p>
        <a
          href={socialLinks.substack}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md bg-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/20"
        >
          Subscribe on Substack
        </a>
      </div>
    </>
  );
}
