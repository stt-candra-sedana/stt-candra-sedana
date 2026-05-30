export default function VisiMisiSection() {
  return (
    <section
      id="visi-misi"
      className="relative overflow-hidden bg-primary py-24"
    >
      <div className="absolute inset-0 bg-[url('/image/Image_BG.JPG')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/90 to-primary/95" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="grid gap-10 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
            <div className="rounded-4xl border border-primary/10 bg-primary/10 p-10 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <h3 className="mb-5 text-2xl font-semibold uppercase tracking-[0.2em] text-secondary">
                Visi
              </h3>
              <p className="text-base leading-8 text-secondary">
                Menjadi komunitas seni dan budaya yang menjaga tradisi lokal
                sambil membangun kreativitas generasi muda untuk berkontribusi
                pada masyarakat dan pariwisata Ubud.
              </p>
            </div>

            <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-amber-400 bg-primary/95 text-4xl font-bold text-white shadow-xl shadow-amber-500/20">
              &amp;
            </div>

            <div className="rounded-4xl border border-primary/10 bg-primary/10 p-10 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <h3 className="mb-5 text-2xl font-semibold uppercase tracking-[0.2em] text-secondary">
                Misi
              </h3>
              <p className="text-base leading-8 text-secondary">
                Menyelenggarakan kegiatan budaya dan edukasi, memperkuat
                persaudaraan antar anggota, serta memperkenalkan warisan adat
                melalui dokumentasi dan partisipasi publik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
