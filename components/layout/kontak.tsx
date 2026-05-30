import Image from "next/image";

export default function KontakSection() {
  return (
    <section
      id="kontak"
      className="bg-primary py-12 flex-col items-center justify-center"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-accent">Kontak </span>
          <span className="text-secondary">Kami</span>
        </h1>
      </div>
      <div className="flex items-center justify-center max-w-3xl mx-auto px-4">
        <Image
          className="rounded-lg mb-8"
          src="/image/Instagram.jpg"
          alt="Kontak Kami"
          width={500}
          height={300}
        />

        <div className="flex-col items-center justify-center max-w-lg mx-auto px-4">
          <p className="text-md text-justify">
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
