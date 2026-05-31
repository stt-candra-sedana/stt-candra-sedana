import Button from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-[url('/image/Image_BG.jpg')] w-full min-h-[calc(100vh-5rem)] bg-cover bg-center px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-accent">CANDRA </span>
            <span className="text-secondary">SEDANA</span>
          </h1>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button
            variant="primary"
            target="_blank"
            rel="noreferrer noopener"
            href="https://fonts.google.com/specimen/EB+Garamond"
          >
            Event
          </Button>
          <Button variant="border" href="/contact">
            Daftar
          </Button>
        </div>
      </div>
    </section>
  );
}
