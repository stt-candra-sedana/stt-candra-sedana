"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalEvent: 0,
    totalSponsor: 0,
    totalPengurus: 0,
    totalJenisProker: 0,
  });
  const [eventTerbaru, setEventTerbaru] = useState<string>("-");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: totalEvent },
        { count: totalSponsor },
        { count: totalPengurus },
        { count: totalJenisProker },
        { data: eventData },
      ] = await Promise.all([
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase
          .from("gallery_sponsor")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("struktur_organisasi")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("jenis_proker")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("events")
          .select("nama_event")
          .order("event_date", { ascending: false })
          .limit(1),
      ]);

      setStats({
        totalEvent: totalEvent ?? 0,
        totalSponsor: totalSponsor ?? 0,
        totalPengurus: totalPengurus ?? 0,
        totalJenisProker: totalJenisProker ?? 0,
      });
      setEventTerbaru(eventData?.[0]?.nama_event ?? "Belum ada event");
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Event", value: stats.totalEvent, note: "Event terdaftar" },
    {
      label: "Jenis Proker",
      value: stats.totalJenisProker,
      note: "Program kerja",
    },
    {
      label: "Sponsor & Gallery",
      value: stats.totalSponsor,
      note: "Mitra & galeri aktif",
    },
    {
      label: "Pengurus",
      value: stats.totalPengurus,
      note: "Struktur organisasi",
    },
  ];

  const quickActions = [
    {
      label: "Buat Event Baru",
      button: "Tambah Event",
      href: "/admin/events/tambah",
    },
    {
      label: "Kelola Gallery",
      button: "Gallery & Sponsor",
      href: "/admin/gallery",
    },
    {
      label: "Kelola Visi Misi",
      button: "Visi Misi",
      href: "/admin/visi-misi",
    },
    {
      label: "Kelola Struktur",
      button: "Struktur Organisasi",
      href: "/admin/pengurus",
    },
  ];

  return (
    <section className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl p-6 shadow-xl"
            style={{ background: "#111", border: "1px solid #2a2a2a" }}>
            <p
              className="text-sm uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}>
              {stat.label}
            </p>
            <p
              className="mt-4 text-4xl font-semibold"
              style={{ color: "var(--secondary)" }}>
              {loading ? "..." : stat.value}
            </p>
            <p className="mt-3 text-sm leading-6" style={{ color: "#666" }}>
              {stat.note}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        {/* Aktivitas Terbaru */}
        <section
          className="rounded-3xl p-6 shadow-xl"
          style={{ background: "#111", border: "1px solid #2a2a2a" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="text-sm uppercase tracking-[0.3em]"
                style={{ color: "var(--accent)" }}>
                Aktivitas Terbaru
              </p>
              <h2
                className="mt-2 text-2xl font-semibold"
                style={{ color: "var(--secondary)" }}>
                Ringkasan Operasional
              </h2>
            </div>
            <span
              className="rounded-full px-3 py-1 text-sm font-semibold"
              style={{ background: "var(--accent)", color: "var(--primary)" }}>
              Live
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div
              className="rounded-2xl p-4"
              style={{ background: "var(--primary)" }}>
              <p className="text-sm" style={{ color: "#666" }}>
                Event terbaru
              </p>
              <p
                className="mt-2 text-lg font-semibold"
                style={{ color: "var(--secondary)" }}>
                {loading ? "Memuat..." : eventTerbaru}
              </p>
            </div>
            {/* // TODO: tambah aktivitas lain setelah CRUD lain selesai */}
            <div
              className="rounded-2xl p-4"
              style={{ background: "var(--primary)" }}>
              <p className="text-sm" style={{ color: "#666" }}>
                Total pengurus aktif
              </p>
              <p
                className="mt-2 text-lg font-semibold"
                style={{ color: "var(--secondary)" }}>
                {loading ? "..." : `${stats.totalPengurus} orang`}
              </p>
            </div>
            <div
              className="rounded-2xl p-4"
              style={{ background: "var(--primary)" }}>
              <p className="text-sm" style={{ color: "#666" }}>
                Gallery & sponsor
              </p>
              <p
                className="mt-2 text-lg font-semibold"
                style={{ color: "var(--secondary)" }}>
                {loading ? "..." : `${stats.totalSponsor} item`}
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          {/* Quick Actions */}
          <div
            className="rounded-3xl p-6 shadow-xl"
            style={{ background: "#111", border: "1px solid #2a2a2a" }}>
            <p
              className="text-sm uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}>
              Tindakan Cepat
            </p>
            <div className="mt-6 grid gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => router.push(action.href)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold transition hover:opacity-80"
                  style={{
                    background: "var(--primary)",
                    color: "var(--secondary)",
                  }}>
                  <span className="block text-base">{action.button}</span>
                  <span style={{ color: "#666" }}>{action.label}</span>
                </button>
              ))}
              {/* quickActions lain diaktifkan setelah halaman CRUD-nya selesai dibuat */}
            </div>
          </div>

          {/* Status Sistem */}
          <div
            className="rounded-3xl p-6 shadow-xl"
            style={{ background: "#111", border: "1px solid #2a2a2a" }}>
            <p
              className="text-sm uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}>
              Status Sistem
            </p>
            <div className="mt-4 space-y-3">
              <div
                className="rounded-2xl p-4"
                style={{ background: "var(--primary)" }}>
                <p className="text-sm" style={{ color: "#666" }}>
                  Database
                </p>
                <p
                  className="mt-2 text-lg font-semibold"
                  style={{ color: "#34d399" }}>
                  {loading ? "Mengecek..." : "Online"}
                </p>
              </div>
              <div
                className="rounded-2xl p-4"
                style={{ background: "var(--primary)" }}>
                <p className="text-sm" style={{ color: "#666" }}>
                  Supabase API
                </p>
                <p
                  className="mt-2 text-lg font-semibold"
                  style={{ color: "#34d399" }}>
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
