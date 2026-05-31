import Image from "next/image";

export default function KontakSection() {
  return (
    <section id="kontak" className="bg-primary py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
          <Image
            className="rounded-xl shadow-lg"
            src="/image/Instagram.jpg"
            alt="Kontak Kami"
            width={600}
            height={380}
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-center lg:text-left mb-6">
            <span className="text-accent">Kontak </span>
            <span className="text-secondary">Kami</span>
          </h1>
          <p className="text-base leading-8 text-justify">
            Tetap terhubung dengan seluruh rangkaian kegiatan dan kreativitas
            pemuda Seka Truna Truni Kutuh Kaja melalui akun Instagram resmi
            kami, @st.candrasedana. Di sana, kami membagikan dokumentasi momen
            Ngayah, perayaan Caka 1947, hingga berbagai inisiatif komunitas
            lainnya secara terkini. Mari menjadi bagian dari perjalanan kami
            dalam menjaga tradisi dan mempererat persaudaraan di lingkungan
            Petulu, Ubud.
          </p>
        </div>
      </div>
    </section>
  );
}
