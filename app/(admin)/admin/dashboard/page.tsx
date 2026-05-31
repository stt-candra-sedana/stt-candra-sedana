export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Event", value: "12", note: "Event aktif saat ini" },
    { label: "Peserta Terdaftar", value: "320", note: "Peserta dalam sistem" },
    { label: "Sponsor", value: "8", note: "Mitra sponsor aktif" },
    { label: "Pengajuan Baru", value: "4", note: "Menunggu verifikasi" },
  ];

  const quickActions = [
    { label: "Buat Event Baru", button: "Tambah Event" },
    { label: "Kelola Sponsor", button: "Sponsor" },
    { label: "Kelola Pengguna", button: "Pengguna" },
  ];

  return (
    <section className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              {stat.label}
            </p>
            <p className="mt-4 text-4xl font-semibold text-white">
              {stat.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{stat.note}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Aktivitas Terbaru
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Ringkasan Operasional
              </h2>
            </div>
            <span className="rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-slate-950">
              Live
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Event terbaru</p>
              <p className="mt-2 text-lg font-semibold text-white">
                Festival Budaya
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Pengajuan baru</p>
              <p className="mt-2 text-lg font-semibold text-white">
                4 permintaan
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Akun baru</p>
              <p className="mt-2 text-lg font-semibold text-white">
                18 anggota
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Tindakan Cepat
            </p>
            <div className="mt-6 grid gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <span className="block text-base">{action.button}</span>
                  <span className="text-slate-400">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Status Sistem
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-3xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Database</p>
                <p className="mt-2 text-lg font-semibold text-emerald-400">
                  Online
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">API</p>
                <p className="mt-2 text-lg font-semibold text-emerald-400">
                  Stabil
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
