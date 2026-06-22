"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { FaInstagram, FaWhatsapp, FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [waKetua, setWaKetua] = useState<string | null>(null);
  const [loadingWa, setLoadingWa] = useState(true);

  useEffect(() => {
    supabase
      .from("struktur_organisasi")
      .select("whatsapp")
      .eq("jabatan_id", 6)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Gagal fetch WA ketua:", error.message);
        } else if (data?.whatsapp) {
          setWaKetua(data.whatsapp);
        }
        setLoadingWa(false);
      });
  }, []);

  const waLink = waKetua
    ? `https://wa.me/62${waKetua.replace(/^0/, "")}`
    : null;

  const mapsLink = "https://maps.app.goo.gl/CUE7NKyBUzcAbwMf7";

  return (
    <footer
      style={{ background: "var(--bali-dark)", color: "var(--secondary)" }}>
      {/* Top ornament line */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(184,149,84,0.5), rgba(184,149,84,0.8), rgba(184,149,84,0.5), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1.4fr]">
          {/* Brand column */}
          <div className="space-y-5">
            <div>
              <div className="bali-section-badge">Sekaa Truna Truni</div>
              <h2
                className="text-3xl font-bold tracking-tight leading-none"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                <span style={{ color: "var(--accent)" }}>CANDRA </span>
                <span style={{ color: "var(--secondary)" }}>SEDANA</span>
              </h2>
            </div>
            <p
              className="text-sm leading-7 max-w-xs"
              style={{
                color: "var(--secondary-muted)",
                fontFamily: "var(--font-eb-garamond), serif",
              }}>
              Komunitas pemuda Banjar Kutuh Kaja, Desa Petulu, Ubud — menjaga
              seni, budaya, dan tradisi Bali untuk generasi mendatang.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/st.candrasedana"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(184,149,84,0.08)",
                  border: "1px solid rgba(184,149,84,0.15)",
                  color: "var(--accent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(184,149,84,0.18)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(184,149,84,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <FaInstagram size={16} />
              </a>
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(184,149,84,0.08)",
                    border: "1px solid rgba(184,149,84,0.15)",
                    color: "var(--accent)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(184,149,84,0.18)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(184,149,84,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}>
                  <FaWhatsapp size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3
              className="text-xs uppercase font-bold tracking-[0.3em] mb-6"
              style={{ color: "var(--accent)" }}>
              Navigasi
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "Tentang Kami" },
                { href: "#event", label: "Event" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative inline-block group transition-colors duration-200"
                    style={{ color: "var(--secondary-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--secondary-muted)")
                    }>
                    {link.label}
                    <span
                      className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ background: "currentColor" }}
                    />
                  </Link>
                </li>
              ))}

              {/* Kontak — link ke WA ketua */}
              {waLink && (
                <li>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="relative inline-block group transition-colors duration-200"
                    style={{ color: "var(--secondary-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--secondary-muted)")
                    }>
                    Kontak
                    <span
                      className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ background: "currentColor" }}
                    />
                  </a>
                </li>
              )}
            </ul>
          </div>
          {/* Contact column */}
          <div>
            <h3
              className="text-xs uppercase font-bold tracking-[0.3em] mb-6"
              style={{ color: "var(--accent)" }}>
              Kontak Kami
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <FaLocationDot
                  size={16}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--accent)" }}
                />
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="relative inline-block group leading-6 transition-colors"
                  style={{ color: "var(--secondary-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--secondary-muted)")
                  }>
                  Br. Kutuh Kaja, Desa Petulu, Kec. Ubud, Kab. Gianyar, Bali
                  <span
                    className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: "currentColor" }}
                  />
                </a>
              </div>
              <div className="flex gap-3">
                <FaInstagram
                  size={16}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--accent)" }}
                />
                <a
                  href="https://instagram.com/st.candrasedana"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="relative inline-block group leading-6 transition-colors"
                  style={{ color: "var(--secondary-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--secondary-muted)")
                  }>
                  @st.candrasedana
                  <span
                    className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: "currentColor" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid rgba(184,149,84,0.1)",
            color: "rgba(232,224,208,0.3)",
          }}>
          <p>© {currentYear} STT Candra Sedana. Semua hak dilindungi.</p>
          <p
            style={{
              fontFamily: "var(--font-eb-garamond), serif",
              fontStyle: "italic",
            }}>
            Tat Twam Asi · Menyatukan, Melestarikan, Berkreasi
          </p>
        </div>
      </div>
    </footer>
  );
}
