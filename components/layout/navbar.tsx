"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="overflow-hidden rounded-full border border-secondary-200/70 bg-secondary/95 shadow-[0_15px_60px_-30px_rgba(0,0,0,0.4)] py-4">
          <div className="flex items-center justify-between px-4 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
            {/* Hamburger Menu - Mobile Only */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-primary hover:text-accent transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden items-center gap-6 text-sm font-medium text-primary md:flex">
              <Link href="/" className="transition hover:text-accent">
                Home
              </Link>
              <Link href="/about" className="transition hover:text-accent">
                About Us
              </Link>
              <Link href="/event" className="transition hover:text-accent">
                Event
              </Link>
            </nav>

            {/* Logo - Center */}
            <Link
              href="/"
              className="justify-self-center text-base font-bold tracking-[0.2em] text-primary"
            >
              <span className="text-primary">CANDRA </span>
              <span className="text-accent">SEDANA</span>
            </Link>

            {/* Contact Button */}
            <Link
              href="#contact"
              className="justify-self-end rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-secondary shadow-sm shadow-accent-500/20 transition hover:bg-accent/80"
            >
              Kontak
            </Link>
          </div>
        </div>

        {/* Mobile Menu - Slide Down */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="border border-t-0 border-secondary-200/70 bg-secondary/95 backdrop-blur-sm">
            <nav className="flex flex-col gap-4 px-6 py-4 text-sm font-medium text-primary">
              <Link
                href="/"
                className="transition hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="transition hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/event"
                className="transition hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Event
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
