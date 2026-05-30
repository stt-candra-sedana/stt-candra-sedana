import Card from "@/components/ui/card";
import Button from "../ui/button";

export default function OrganisasiSection() {
  return (
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
      <div className="w-full flex justify-center mt-8">
        <div className="max-w-3xl px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
      <div className="flex justify-center mt-8">
        <Button
          variant="primary"
          target="_blank"
          rel="noreferrer noopener"
          href="https://fonts.google.com/specimen/EB+Garamond"
        >
          Selengkapnya...
        </Button>
      </div>
    </section>
  );
}
