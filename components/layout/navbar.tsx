import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-transparent py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-full border border-slate-200/70 bg-white/95 shadow-[0_15px_60px_-30px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3">
            <nav className="hidden items-center gap-6 text-sm font-medium text-primary md:flex">
              <Link href="#home" className="transition hover:text-accent">
                Home
              </Link>
              <Link href="#about" className="transition hover:text-accent">
                About Us
              </Link>
              <Link href="#event" className="transition hover:text-accent">
                Event
              </Link>
            </nav>

            <Link
              href="/"
              className="justify-self-center text-base font-bold tracking-[0.2em] text-primary"
            >
              <span className="text-primary">CANDRA </span>
              <span className="text-accent">SEDANA</span>
            </Link>

            <Link
              href="#contact"
              className="ml-auto rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-secondary shadow-sm shadow-amber-500/20 transition hover:bg-accent/80"
            >
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}