"use client";

import { useRef, useEffect, useState } from "react";
import EventCard from "@/components/ui/eventCard";
import Button from "../ui/button";
import { supabase } from "@/lib/supabase"; // Import client pusat dari folder lib

interface SupabaseEvent {
  event_id: number;
  nama_event: string;
  event_date: string;
  deskripsi_acara: string;
  image_url: string | null;
  url_registrasi: string | null;
  jenis_proker_id: number;
}

export function EventSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<SupabaseEvent[]>([]);
  const [loading, setLoading] = useState(true);

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

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-white">
        Memuat Event Terkini...
      </div>
    );
  }

  return (
    <section id="event" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div>
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="text-accent">Event </span>
            <span className="text-secondary">Kami</span>
          </h1>
        </div>

        <div className="relative">
          <div
            className="flex gap-4 overflow-x-auto px-2 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600/40 snap-x snap-mandatory"
            ref={sliderRef}
          >
            {events.map((event) => (
              <div key={event.event_id} className="min-w-[20rem] snap-start">
                <EventCard
                  title={event.nama_event}
                  imageSrc={event.image_url || "/image/Image_BG.jpg"} // Fallback jika kosong
                  date={event.event_date}
                  type="Kegiatan"
                  href={`/event/${event.event_id}`} // Link langsung ke detail halaman berbasis ID
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Navigasi slider kiri & kanan */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center md:flex">
            <div className="pointer-events-auto rounded-full bg-accent/90 p-2 shadow-lg text-secondary transition hover:bg-secondary">
              <button
                type="button"
                className="text-xl font-bold px-2"
                onClick={() => scrollSlider("left")}
              >
                ‹
              </button>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center md:flex">
            <div className="pointer-events-auto rounded-full bg-accent/90 p-2 shadow-lg text-secondary transition hover:bg-secondary">
              <button
                type="button"
                className="text-xl font-bold px-2"
                onClick={() => scrollSlider("right")}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
