import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-secondary">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.6fr]">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              <span className="text-accent">CANDRA </span>
              <span className="text-secondary">SEDANA</span>
            </h1>
            <p className="max-w-sm text-sm leading-7 text-secondary">
              Br. Kutuh Kaja, Desa Petulu, Kecamatan Ubud
            </p>
          </div>

          <div>
            <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-secondary">
              Navigasi
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-secondary">
              <li>
                <Link href="/about" className="transition hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="transition hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/event" className="transition hover:text-accent">
                  Event
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm uppercase font-bold tracking-[0.3em] text-secondary">
              Kontak Kami
            </h2>
            <div className="mt-5 space-y-2 text-sm leading-7 text-secondary">
              <p>   
                Jl. Tirta Tawar 63, Petulu, Kecamatan Ubud, Kabupaten Gianyar
              </p>
              <p>stcandrasedana</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-800 pt-6 text-center text-xs text-secondary sm:text-sm">
          © 2026 Candra Sedana. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
