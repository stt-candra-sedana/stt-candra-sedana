import Button from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-between pt-28 pb-10">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image/Image_BG.JPG')" }}
      />

      {/* Multi-layer overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[var(--primary)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bali-dark)]/60 via-transparent to-[var(--bali-dark)]/60" />

      {/* Gold radial glow at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(184,149,84,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Decorative top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(184,149,84,0.6), transparent)",
        }}
      />

      {/* Main content — tumbuh mengisi ruang tengah */}
      <div
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center flex-1 w-full"
        style={{ animation: "fadeInUp 0.9s ease forwards" }}
      >
        {/* Badge */}
        <div className="bali-section-badge mb-4" style={{ color: "rgba(184,149,84,0.9)" }}>
          Sekaa Truna Truni · Kutuh Kaja · Ubud · Bali
        </div>

        {/* Main title */}
        <h1
          className="font-bold leading-none tracking-tight mb-6"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontFamily: "var(--font-poppins), sans-serif",
          }}
        >
          <span className="animate-shimmer-text">CANDRA</span>
          <br />
          <span style={{ color: "var(--secondary)" }}>SEDANA</span>
        </h1>

        {/* Decorative ornament line */}
        <div className="flex items-center gap-4 mb-8" style={{ width: "min(320px, 80vw)" }}>
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(to right, transparent, rgba(184,149,84,0.6))",
            }}
          />
          <span style={{ color: "var(--accent)", fontSize: "1.2rem" }}>✦</span>
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(to left, transparent, rgba(184,149,84,0.6))",
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="max-w-xl text-lg sm:text-xl leading-relaxed mb-10"
          style={{
            color: "rgba(232,224,208,0.7)",
            fontFamily: "var(--font-eb-garamond), serif",
            fontStyle: "italic",
            animation: "fadeInUp 1.1s ease 0.2s both",
          }}
        >
          Wadah kreativitas, seni, dan budaya generasi muda Banjar Kutuh Kaja
          dalam menjaga tradisi dan mempererat persaudaraan.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap justify-center gap-4"
          style={{ animation: "fadeInUp 1.1s ease 0.4s both" }}
        >
          <Button variant="primary" href="#event">
            Lihat Event
          </Button>
          <Button variant="border" href="#kontak">
            Hubungi Kami
          </Button>
        </div>
      </div>

      {/* Scroll indicator — selalu di bawah, tidak absolut */}
      <div
        className="relative z-10 flex flex-col items-center gap-2 mt-6"
        style={{ animation: "fadeIn 1.5s ease 1s both" }}
      >
        <span
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: "rgba(184,149,84,0.5)", fontFamily: "var(--font-poppins)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(184,149,84,0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}
