"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    // Run once on mount to set initial state
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/event", label: "Event" },
  ];

  return (
    <>
      {/*
       * Ketika scrolled: header menjadi fixed top + animate slide-down
       * Ketika di atas (tidak scrolled): header tetap di flow normal (absolute/relative)
       */}
      <header
        className="z-50 w-full transition-all duration-500"
        style={{
          position: scrolled ? "fixed" : "absolute",
          top: 0,
          left: 0,
          right: 0,
          transform: scrolled ? "translateY(0)" : "translateY(0)",
          padding: scrolled ? "0.5rem 0" : "1rem 0",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main pill */}
          <div
            className="rounded-2xl transition-all duration-500"
            style={{
              background: scrolled
                ? "rgba(10,8,6,0.95)"
                : "rgba(15,13,10,0.45)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: scrolled
                ? "1px solid rgba(184,149,84,0.3)"
                : "1px solid rgba(184,149,84,0.1)",
              boxShadow: scrolled
                ? "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,149,84,0.06)"
                : "none",
              padding: "0.875rem 1.25rem",
            }}
          >
            <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
              {/* Mobile hamburger */}
              <button
                id="navbar-hamburger-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden transition"
                style={{ color: "var(--accent)" }}
                aria-label="Toggle navigation menu"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {isMenuOpen ? (
                    <>
                      <line x1="4" y1="4" x2="18" y2="18" />
                      <line x1="18" y1="4" x2="4" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="7" x2="19" y2="7" />
                      <line x1="3" y1="11" x2="19" y2="11" />
                      <line x1="3" y1="15" x2="19" y2="15" />
                    </>
                  )}
                </svg>
              </button>

              {/* Desktop nav — left */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: "var(--secondary-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--secondary-muted)")
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Logo — center */}
              <Link
                href="/"
                className="justify-self-center flex flex-col items-center"
              >
                <span
                  className="font-bold tracking-[0.18em] text-base leading-none"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-poppins)" }}
                >
                  CANDRA
                </span>
                <span
                  className="font-semibold tracking-[0.12em] text-xs leading-none mt-0.5"
                  style={{ color: "rgba(232,224,208,0.7)", fontFamily: "var(--font-poppins)" }}
                >
                  SEDANA
                </span>
              </Link>

              {/* CTA — right */}
              <div className="justify-self-end">
                <Link
                  id="navbar-kontak-btn"
                  href="#kontak"
                  className="text-sm font-semibold transition-all duration-200 rounded-xl"
                  style={{
                    color: "var(--primary)",
                    background: "var(--accent)",
                    padding: "0.5rem 1.25rem",
                    letterSpacing: "0.08em",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--accent-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--accent)")
                  }
                >
                  Kontak
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
            style={{ maxHeight: isMenuOpen ? "200px" : "0px" }}
          >
            <div
              className="mt-2 rounded-2xl"
              style={{
                background: "rgba(10,8,6,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(184,149,84,0.15)",
              }}
            >
              <nav className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: "var(--secondary)" }}
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(184,149,84,0.08)";
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--secondary)";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#kontak"
                  className="mt-1 mx-1 rounded-xl px-4 py-3 text-sm font-semibold text-center transition"
                  style={{ background: "var(--accent)", color: "var(--primary)" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontak
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/*
       * Spacer hanya muncul saat navbar sudah fixed (scrolled),
       * supaya konten di bawah navbar tidak terpotong.
       * Tingginya disesuaikan dengan tinggi navbar saat scrolled (~64px).
       */}
      {scrolled && <div style={{ height: "64px" }} aria-hidden="true" />}
    </>
  );
}
