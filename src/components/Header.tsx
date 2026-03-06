"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/content", label: "Content" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#1e1e1e] bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Matt Kuda
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#a1a1aa] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:mattkuda@gmail.com"
            className="rounded-md bg-white/10 px-3 py-1.5 text-sm transition-colors hover:bg-white/20"
          >
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="flex flex-col gap-4 border-t border-[#1e1e1e] px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#a1a1aa] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:mattkuda@gmail.com"
            className="text-sm text-[#a1a1aa] transition-colors hover:text-white"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
