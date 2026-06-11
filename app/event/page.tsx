"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import EventCard from "@/components/ui/eventCard";
import SponsorCard from "@/components/ui/sponsor";
import Footer from "@/components/layout/footer";
// Pastikan file inisialisasi pusat ini sudah kamu buat di folder lib
import { supabase } from "@/lib/supabase";

// 1. Definisikan tipe data TypeScript sesuai dengan skema tabel di Supabase
interface SupabaseEvent {
  event_id: number;
  nama_event: string;
  event_date: string;
  deskripsi_acara: string;
  image_url: string | null;
  url_registrasi: string | null;
  jenis_proker_id: number;
}

// Data sponsor tetap kita pertahankan secara lokal sementara waktu
const sponsorList = [
  {
    name: "Sponsor 1",
    logoSrc: "/logo/logo STT.jpg.jpeg",
    href: "https://sponsor1.com",
  },
  {
    name: "Sponsor 2",
    logoSrc: "/logo/logo STT.jpg.jpeg",
    href: "https://sponsor2.com",
  },
  {
    name: "Sponsor 3",
    logoSrc: "/logo/logo STT.jpg.jpeg",
    href: "https://sponsor3.com",
  },
];

export default function AboutSection() {
  // State untuk menyimpan list data event dari database
  const [events, setEvents] = useState<SupabaseEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State untuk fitur pagination / load more
  const [visibleCount, setVisibleCount] = useState<number>(3);

  // Mengambil sebagian data sesuai batas count untuk ditampilkan
  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  const handleLoadMore = () => {
    setVisibleCount((current) => Math.min(current + 3, events.length));
  };

  // 2. Mengambil data dari Supabase menggunakan React useEffect Hook
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true); // Pastikan loading dimulai

        const { data, error } = await supabase
          .from("events") // ⚠️ Pastikan nama tabel di Supabase persis huruf kecil semua
          .select("*")
          .order("event_date", { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          setEvents(data);
        }
      } catch (error) {
        // Jika terjadi error koneksi atau RLS, error akan tercatat di Console browser
        console.error("Gagal mengambil data dari Supabase:", error);
      } finally {
        // Blok finally AKAN SELALU JALAN, baik sukses maupun error.
        // Ini menjamin tulisan "Memuat Event..." akan hilang dan tidak stuck!
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Konfigurasi animasi komidi putar (Sponsor Carousel)
  const sponsorRef = useRef<HTMLDivElement | null>(null);
  const [animationCss, setAnimationCss] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);

  useEffect(() => {
    const track = sponsorRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const ensureFill = () => {
      const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
      while (track.scrollWidth < wrapper.clientWidth * 2) {
        const children = Array.from(track.children) as HTMLElement[];
        for (const ch of children) {
          const clone = ch.cloneNode(true) as HTMLElement;
          track.appendChild(clone);
          if (track.scrollWidth >= wrapper.clientWidth * 2) break;
        }
        if (track.children.length > 200) break;
      }
    };

    ensureFill();

    const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
    const speed = 80;

    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      let pos = posRef.current - speed * dt;

      const first = track.children[0] as HTMLElement | undefined;
      if (first) {
        const firstWidth = first.getBoundingClientRect().width + gap;
        while (pos <= -firstWidth) {
          track.appendChild(first);
          pos += firstWidth;
          const newFirst = track.children[0] as HTMLElement | undefined;
          if (!newFirst) break;
        }
      }

      posRef.current = pos;
      track.style.transform = `translateX(${pos}px)`;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const onResize = () => ensureFill();
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main>
      <Navbar />

      {/* Section Hero */}
      <section className="relative bg-[url('/image/Image_BG.jpg')] w-full min-h-screen bg-cover bg-center py-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/80 to-transparent" />
        <div className="flex flex-col items-center justify-center relative z-10 text-white">
          <div className="container mx-auto px-4 text-center z-10">
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-accent">CANDRA </span>
              <span className="text-secondary">SEDANA</span>
            </h1>
          </div>

          <div className="max-w-3xl mx-auto px-4 text-center z-10 mb-8">
            <p>
              &quot;Wadah Kreativitas dan Bakat Generasi Muda Banjar dalam
              Menjaga Tradisi serta Mempererat Persaudaraan.&quot; Sebagai
              generasi penerus, STT Candra Sedana berkomitmen untuk menjadi
              motor penggerak kegiatan sosial, budaya, dan inovasi di lingkungan
              masyarakat, berlandaskan nilai Tat Twam Asi dan semangat gotong
              royong
            </p>
          </div>

          <div>
            <Button variant="primary" href="#event">
              Event
            </Button>
            <Button variant="border" className="ml-4" href="/contact">
              Daftar
            </Button>
          </div>
        </div>
      </section>

      {/* Section List Event */}
      <section id="event" className="py-16 bg-primary">
        <div className="flex flex-col px-4 ">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8">
              <span className="text-accent">Event </span>
              <span className="text-secondary">Kami</span>
            </h1>
          </div>

          {/* Handler Kondisi Loading Data */}
          {loading ? (
            <div className="text-center text-white py-12 text-lg">
              Mengambil data event terbaru dari database...
            </div>
          ) : visibleEvents.length === 0 ? (
            <div className="text-center text-gray-400 py-12 text-lg">
              Belum ada event yang terdaftar saat ini.
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid gap-6 px-4 pb-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {visibleEvents.map((event) => (
                <EventCard
                  key={event.event_id}
                  title={event.nama_event}
                  // Jika properti image_url bernilai null atau kosong, gunakan gambar default (fallback)
                  imageSrc={event.image_url || "/image/Image_BG.jpg"}
                  date={event.event_date}
                  // Menentukan label kategori/tipe berdasarkan id jenis proker
                  type={
                    event.jenis_proker_id === 1 ? "Program Utama" : "Kegiatan"
                  }
                  // Tautan diarahkan langsung menuju halaman blog dinamis berbasis ID unik
                  href={`/event/${event.event_id}`}
                  className="h-full"
                />
              ))}
            </div>
          )}

          {/* Tombol Load More */}
          {!loading && hasMore ? (
            <div className="flex justify-center mt-8">
              <Button variant="primary" onClick={handleLoadMore}>
                Lainnya
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      {/* Section Carousel Sponsor */}
      <section id="sponsor" className="py-16 bg-primary overflow-hidden">
        <style>{animationCss}</style>

        <div className="flex flex-col px-4">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-8">
              <span className="text-accent">Sponsor </span>
              <span className="text-secondary">Kami</span>
            </h1>
          </div>

          <div className="w-full overflow-hidden" ref={wrapperRef}>
            <div className="sponsor-carousel flex gap-6 px-4" ref={sponsorRef}>
              {sponsorList.map((sponsor, index) => (
                <div key={`${sponsor.name}-${index}`} className="shrink-0 w-56">
                  <SponsorCard
                    name={sponsor.name}
                    logoSrc={sponsor.logoSrc}
                    href={sponsor.href}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
