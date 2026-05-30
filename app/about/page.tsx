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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent" />
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
      <section className="py-16 flex">
        <div className="flex-col items-center justify-center max-w-3xl mx-auto px-4">
          <Image
            className="rounded-lg mb-8"
            src="/image/logo_STT.jpg"
            alt="Tentang Kami"
            width={300}
            height={300}
          />
        </div>
        <div className="flex-col items-center justify-center max-w-lg mx-auto px-4">
          <h2 className="text-lg text-accent font-bold text-center mb-8">
            "Wadah Kreativitas dan Bakat Generasi Muda Banjar dalam Menjaga
            Tradisi serta Mempererat Persaudaraan."
          </h2>
          <p className="text-md text-justify">
            Sebagai generasi penerus, STT Candra Sedana berkomitmen untuk
            menjadi motor penggerak kegiatan sosial, budaya, dan inovasi di
            lingkungan masyarakat, berlandaskan nilai Tat Twam Asi dan semangat
            gotong royong
          </p>
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
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <Card
            title="Wakil Ketua Umum"
            imageSrc="\image\Raja_Hidimba.jpg"
            imageAlt="Struktur Organisasi"
            description="Menjabat sebagai pemimpin tertinggi organisasi dan bertanggung jawab atas pengambilan keputusan strategis."
          ></Card>
          <Card
            title="Sekretaris Umum"
            imageSrc="\image\Raja_Hidimba.jpg"
            imageAlt="Struktur Organisasi"
            description="Menjabat sebagai Sekretaris Umum dan bertanggung jawab atas pelaksanaan keputusan strategis."
          ></Card>
          <Card
            title="Wakil Ketua Umum"
            imageSrc="\image\Raja_Hidimba.jpg"
            imageAlt="Struktur Organisasi"
            description="Menjabat sebagai pemimpin tertinggi organisasi dan bertanggung jawab atas pengambilan keputusan strategis."
          ></Card>
          <Card
            title="Sekretaris Umum"
            imageSrc="\image\Raja_Hidimba.jpg"
            imageAlt="Struktur Organisasi"
            description="Menjabat sebagai Sekretaris Umum dan bertanggung jawab atas pelaksanaan keputusan strategis."
          ></Card>
          <Card
            title="Wakil Ketua Umum"
            imageSrc="\image\Raja_Hidimba.jpg"
            imageAlt="Struktur Organisasi"
            description="Menjabat sebagai pemimpin tertinggi organisasi dan bertanggung jawab atas pengambilan keputusan strategis."
          ></Card>
          <Card
            title="Sekretaris Umum"
            imageSrc="\image\Raja_Hidimba.jpg"
            imageAlt="Struktur Organisasi"
            description="Menjabat sebagai Sekretaris Umum dan bertanggung jawab atas pelaksanaan keputusan strategis."
          ></Card>
        </div>
      </section>
      <Footer />
    </main>
  );
}
