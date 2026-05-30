import Button from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";

export default function AboutSection() {
  return (
    <main>
      <Navbar />
      <section className="relative bg-[url('/image/Image_BG.jpg')] w-full min-h-screen bg-cover bg-center py-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/80 to-transparent" />
        <div className="flex flex-col items-center justify-center relative z-10 text-white">
          <div className="container mx-auto px-4 text-center z-10">
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-accent">CANDRA </span>
              <span className="text-secondary">SEDANA</span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto px-4 text-center z-10 mb-8">
            <p>
              "Wadah Kreativitas dan Bakat Generasi Muda Banjar dalam Menjaga
              Tradisi serta Mempererat Persaudaraan." Sebagai generasi penerus,
              STT Candra Sedana berkomitmen untuk menjadi motor penggerak
              kegiatan sosial, budaya, dan inovasi di lingkungan masyarakat,
              berlandaskan nilai Tat Twam Asi dan semangat gotong royong
            </p>
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
    </main>
  );
}
