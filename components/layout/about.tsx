import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-video sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
            <Image
              src="/image/Raja_Hidimba.jpg"
              alt="Tentang Kami"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
              priority
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-lg sm:text-xl md:text-2xl text-accent font-bold text-center lg:text-left mb-4 sm:mb-6">
            "Wadah Kreativitas dan Bakat Generasi Muda Banjar dalam Menjaga
            Tradisi serta Mempererat Persaudaraan."
          </h2>
          <p className="text-sm sm:text-base leading-7 sm:leading-8 text-justify">
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
