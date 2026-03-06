import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/content", label: "Content" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#a1a1aa] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <span className="text-xs text-[#555]">
            &copy; {new Date().getFullYear()} Matt Kuda
          </span>
        </div>
      </div>
    </footer>
  );
}
