import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 flex">
      <div className="flex-col items-center justify-center max-w-3xl mx-auto px-4">
        <Image
          className="rounded-lg mb-8"
          src="/image/Raja_Hidimba.jpg"
          alt="Tentang Kami"
          width={600}
          height={400}
        />
      </div>
      <div className="flex-col items-center justify-center max-w-lg mx-auto px-4">
        <h2 className="text-lg text-accent font-bold text-center mb-8">
          "Wadah Kreativitas dan Bakat Generasi Muda Banjar dalam Menjaga
          Tradisi serta Mempererat Persaudaraan."
        </h2>
        <p className="text-md text-justify">
          Sebagai generasi penerus, STT Candra Sedana berkomitmen untuk menjadi
          motor penggerak kegiatan sosial, budaya, dan inovasi di lingkungan
          masyarakat, berlandaskan nilai Tat Twam Asi dan semangat gotong royong
        </p>
      </div>
    </section>
  );
}
