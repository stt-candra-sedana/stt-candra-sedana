import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
          <Image
            className="rounded-xl shadow-lg"
            src="/image/Raja_Hidimba.jpg"
            alt="Tentang Kami"
            width={700}
            height={450}
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-xl md:text-2xl text-accent font-bold text-center lg:text-left mb-6">
            "Wadah Kreativitas dan Bakat Generasi Muda Banjar dalam Menjaga
            Tradisi serta Mempererat Persaudaraan."
          </h2>
          <p className="text-base leading-8 text-justify">
            Sebagai generasi penerus, STT Candra Sedana berkomitmen untuk
            menjadi motor penggerak kegiatan sosial, budaya, dan inovasi di
            lingkungan masyarakat, berlandaskan nilai Tat Twam Asi dan semangat
            gotong royong.
          </p>
        </div>
      </div>
    </section>
  );
}
