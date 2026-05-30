import Button from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-[url('/image/Image_BG.jpg')] w-full min-h-screen bg-cover bg-center py-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
      <div className="flex flex-col items-center justify-center relative z-10 text-white">
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-accent">CANDRA </span>
            <span className="text-secondary">SEDANA</span>
          </h1>
        </div>

        <div>
          <Button
            variant="primary"
            target="_blank"
            rel="noreferrer noopener"
            href="https://fonts.google.com/specimen/EB+Garamond"
          >
            Event
          </Button>
          <Button variant="border" className="ml-4" href="/contact">
            Daftar
          </Button>
        </div>
      </div>
    </section>
  );
}
