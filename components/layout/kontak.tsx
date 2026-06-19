"use client";

import Image from "next/image";

export default function KontakSection() {
  return (
    <section id="kontak" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(184,149,84,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="bali-section-badge justify-center">Terhubung</div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--secondary)" }}>
            <span style={{ color: "var(--accent)" }}>Kontak </span>& Ikuti Kami
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              className="absolute -inset-3 rounded-3xl"
              style={{
                border: "1px solid rgba(184,149,84,0.12)",
                background: "linear-gradient(135deg, rgba(184,149,84,0.04) 0%, transparent 60%)",
              }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                className="w-full h-auto"
                src="/image/Instagram.jpg"
                alt="Instagram STT Candra Sedana"
                width={600}
                height={380}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,13,10,0.7) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-5 left-5">
                <a
                  href="https://instagram.com/st.candrasedana"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                  style={{
                    background: "rgba(184,149,84,0.9)",
                    color: "#0a0a0a",
                    backdropFilter: "blur(8px)",
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  📸 @st.candrasedana
                </a>
              </div>
            </div>
          </div>

          {/* Text + Info */}
          <div className="order-1 lg:order-2 space-y-8">
            <p
              className="text-base sm:text-lg leading-8"
              style={{ color: "var(--secondary-muted)", fontFamily: "var(--font-eb-garamond), serif" }}
            >
              Tetap terhubung dengan seluruh rangkaian kegiatan dan kreativitas
              pemuda Seka Truna Truni Kutuh Kaja melalui akun Instagram resmi kami.
              Di sana kami membagikan dokumentasi Ngayah, perayaan budaya, hingga
              berbagai inisiatif komunitas.
            </p>

            {/* Contact cards */}
            <div className="space-y-3">
              {[
                {
                  icon: "📸",
                  label: "Instagram",
                  value: "@st.candrasedana",
                  href: "https://instagram.com/st.candrasedana",
                },
                {
                  icon: "📍",
                  label: "Alamat",
                  value: "Br. Kutuh Kaja, Desa Petulu, Ubud, Gianyar, Bali",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl p-4"
                  style={{
                    background: "rgba(184,149,84,0.05)",
                    border: "1px solid rgba(184,149,84,0.12)",
                  }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p
                      className="text-xs uppercase tracking-[0.2em] mb-1"
                      style={{ color: "var(--accent)", fontFamily: "var(--font-poppins)" }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm font-medium transition-colors"
                        style={{ color: "var(--secondary)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--accent)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--secondary)")
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: "var(--secondary)" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://instagram.com/st.candrasedana"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200"
              style={{
                background: "var(--accent)",
                color: "var(--primary)",
                fontFamily: "var(--font-poppins)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-light)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Ikuti di Instagram →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
