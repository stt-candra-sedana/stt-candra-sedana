import Card from "@/components/ui/card";
import Button from "../ui/button";

export default function OrganisasiSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      <div className="mx-auto max-w-7xl w-full">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-accent">Struktur </span>
            <span className="text-secondary">Organisasi</span>
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <Card
              className="h-full"
              imageSrc="/image/Raja_Hidimba.jpg"
              imageAlt="Struktur Organisasi"
              title="Ketua Umum"
              description="Menjabat sebagai pemimpin tertinggi organisasi dan bertanggung jawab atas pengambilan keputusan strategis."
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-4xl grid grid-cols-1 gap-8 md:grid-cols-2">
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
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="primary" href="/about">
            Selengkapnya...
          </Button>
        </div>
      </div>
    </section>
  );
}
