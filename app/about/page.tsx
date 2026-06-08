import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import OrganisasiSection from "@/components/layout/organisasi";
import VisiMisiSection from "@/components/layout/visi_misi";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Image from "next/image";

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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2">
            <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:max-w-2xl">
              <Image
                className="h-full w-full object-cover"
                src="/image/logo_STT.jpg"
                alt="Tentang Kami"
                width={900}
                height={900}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-center lg:text-left text-accent mb-6">
              "Wadah Kreativitas dan Bakat Generasi Muda Banjar dalam Menjaga
              Tradisi serta Mempererat Persaudaraan."
            </h2>
            <p className="text-base sm:text-lg leading-8 text-justify text-secondary">
              Sebagai generasi penerus, STT Candra Sedana berkomitmen untuk
              menjadi motor penggerak kegiatan sosial, budaya, dan inovasi di
              lingkungan masyarakat, berlandaskan nilai Tat Twam Asi dan
              semangat gotong royong.
            </p>
          </div>
        </div>
      </section>
      <VisiMisiSection />
      <section className="py-16 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-accent">Struktur </span>
            <span className="text-secondary">Organisasi</span>
          </h2>
        </div>
        <div className="max-w-sm px-4 flex justify-center items-center">
          <Card
            imageSrc="\image\Raja_Hidimba.jpg"
            imageAlt="Struktur Organisasi"
            title="Ketua Umum"
            description="Menjabat sebagai pemimpin tertinggi organisasi dan bertanggung jawab atas pengambilan keputusan strategis."
          ></Card>
        </div>
        <div className="container mx-auto px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <div className="max-w-sm mx-auto">
            <Card
              className="h-full"
              title="Wakil Ketua Umum"
              imageSrc="/image/Raja_Hidimba.jpg"
              imageAlt="Struktur Organisasi"
              description="Menjabat sebagai pemimpin tertinggi organisasi dan bertanggung jawab atas pengambilan keputusan strategis."
            />
          </div>

          <div className="max-w-sm mx-auto">
            <Card
              className="h-full"
              title="Sekretaris Umum"
              imageSrc="/image/Raja_Hidimba.jpg"
              imageAlt="Struktur Organisasi"
              description="Menjabat sebagai Sekretaris Umum dan bertanggung jawab atas pelaksanaan keputusan strategis."
            />
          </div>

          <div className="max-w-sm mx-auto">
            <Card
              className="h-full"
              title="Wakil Ketua Umum"
              imageSrc="/image/Raja_Hidimba.jpg"
              imageAlt="Struktur Organisasi"
              description="Menjabat sebagai pemimpin tertinggi organisasi dan bertanggung jawab atas pengambilan keputusan strategis."
            />
          </div>

          <div className="max-w-sm mx-auto">
            <Card
              className="h-full"
              title="Sekretaris Umum"
              imageSrc="/image/Raja_Hidimba.jpg"
              imageAlt="Struktur Organisasi"
              description="Menjabat sebagai Sekretaris Umum dan bertanggung jawab atas pelaksanaan keputusan strategis."
            />
          </div>

          <div className="max-w-sm mx-auto">
            <Card
              className="h-full"
              title="Wakil Ketua Umum"
              imageSrc="/image/Raja_Hidimba.jpg"
              imageAlt="Struktur Organisasi"
              description="Menjabat sebagai pemimpin tertinggi organisasi dan bertanggung jawab atas pengambilan keputusan strategis."
            />
          </div>

          <div className="max-w-sm mx-auto">
            <Card
              className="h-full"
              title="Sekretaris Umum"
              imageSrc="/image/Raja_Hidimba.jpg"
              imageAlt="Struktur Organisasi"
              description="Menjabat sebagai Sekretaris Umum dan bertanggung jawab atas pelaksanaan keputusan strategis."
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
