"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import SponsorCard from "@/components/ui/sponsor";
import Footer from "@/components/layout/footer";
import { supabase } from "@/lib/supabase";
import type { GallerySponsor } from "@/types";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

interface SupabaseEvent {
  event_id: number;
  nama_event: string;
  event_date: string;
  deskripsi_acara: string;
  image_url: string | null;
  url_registrasi: string | null;
  jenis_proker_id: number;
}

function formatDate(d: string | Date) {
  const dateObj = typeof d === "string" ? new Date(d) : d;
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  } catch {
    return String(d);
  }
}

const getSnippet = (html: string, maxLen: number = 220) => {
  if (!html) return "";
  // Strip HTML tags using regex
  const text = html.replace(/<[^>]*>/g, " ");
  // Clean up extra whitespace
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.substring(0, maxLen).trim() + "...";
};

export default function EventPage() {
  const [events, setEvents] = useState<SupabaseEvent[]>([]);
  const [sponsors, setSponsors] = useState<GallerySponsor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Pagination / visible count for load more (starts at 3)
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  const handleLoadMore = () => {
    setVisibleCount((current) => Math.min(current + 3, events.length));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch events sorted by date descending (latest events first)
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: false });

        if (eventError) throw eventError;
        if (eventData) setEvents(eventData);

        // Fetch sponsors from database
        const { data: sponsorData, error: sponsorError } = await supabase
          .from("gallery_sponsor")
          .select("*")
          .order("id_gallery", { ascending: true });

        if (sponsorError) throw sponsorError;
        if (sponsorData) setSponsors(sponsorData);
      } catch (error) {
        console.error("Gagal mengambil data dari Supabase:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Helper to ensure enough elements for seamless infinite marquee scrolling
  const getRepeatedSponsors = () => {
    if (sponsors.length === 0) return [];
    let list = [...sponsors];
    while (list.length < 10) {
      list = [...list, ...sponsors];
    }
    return [...list, ...list];
  };

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
            <a
              href="#event"
              aria-label="Scroll ke bawah"
              className="flex items-center justify-center w-12 h-12 rounded-full border transition hover:opacity-70 animate-bounce mx-auto mt-4"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
              <FaChevronDown size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Section List Event with Premium Horizontal Layout */}
      <section
        id="event"
        className="py-24 relative overflow-hidden"
        style={{ background: "var(--primary)" }}>
        <div className="flex flex-col px-4">
          {/* Title & Badge */}
          <div className="max-w-3xl mx-auto flex flex-col items-center mb-16">
            <div className="bali-section-badge mb-3">Agenda Kegiatan</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-center">
              <span className="text-accent">Event </span>
              <span className="text-secondary">Kami</span>
            </h2>
            <div className="flex items-center gap-3 mt-4 w-32">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]/50" />
              <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>
                ✦
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]/50" />
            </div>
          </div>

          {/* Loading / Conditions Handler */}
          {loading ? (
            <div className="text-center py-20 text-white flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)]/30 border-t-[var(--accent)] animate-spin mb-4" />
              <div className="text-[var(--secondary)] tracking-widest text-xs uppercase animate-pulse">
                Mengambil data event terbaru dari database...
              </div>
            </div>
          ) : visibleEvents.length === 0 ? (
            <div className="text-center text-gray-400 py-12 text-lg">
              Belum ada event yang terdaftar saat ini.
            </div>
          ) : (
            /* Premium Row layout (Image on the right, details on the left) */
            <div className="max-w-4xl mx-auto flex flex-col gap-8 px-4 pb-4 w-full">
              {visibleEvents.map((event) => (
                <div
                  key={event.event_id}
                  className="relative flex flex-col-reverse md:flex-row gap-6 md:gap-8 rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-[#14120e] to-[#0a0806] p-6 shadow-xl hover:border-[var(--accent)]/50 hover:shadow-[0_10px_25px_rgba(184,149,84,0.15)] transition-all duration-500 group w-full">
                  {/* Left Side: Info, Snippet, and Detail Link */}
                  <div className="flex-grow flex flex-col justify-between gap-3 text-left">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5 text-xs text-[var(--accent)] font-semibold tracking-wider uppercase">
                        <span>
                          {event.jenis_proker_id === 1
                            ? "Program Utama"
                            : "Kegiatan"}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[var(--accent)]/40" />
                        <span className="text-[var(--secondary)]/60 normal-case font-normal">
                          {formatDate(event.event_date)}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--secondary)] group-hover:text-white transition-colors duration-300">
                        {event.nama_event}
                      </h3>
                      <p className="text-sm text-[var(--secondary)]/70 line-clamp-3 sm:line-clamp-4 leading-relaxed font-sans mt-1">
                        {getSnippet(event.deskripsi_acara)}
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href={`/event/${event.event_id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors group/link">
                        Selengkapnya
                        <FaChevronRight className="text-[10px] transform group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Right Side: Image */}
                  <div className="w-full md:w-80 h-48 md:h-auto min-h-[180px] relative rounded-xl overflow-hidden flex-shrink-0 bg-[#0f0d0a]/80 border border-[var(--accent)]/15">
                    <img
                      src={event.image_url || "/image/Image_BG.jpg"}
                      alt={event.nama_event}
                      className="object-cover w-full h-full transition-transform duration-750 group-hover:scale-104"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806]/40 via-transparent to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && hasMore ? (
            <div className="flex justify-center mt-10">
              <Button variant="primary" onClick={handleLoadMore}>
                Lainnya
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      {/* Section Carousel Sponsor (CSS Marquee-based) */}
      <section
        id="sponsor"
        className="py-20 relative overflow-hidden"
        style={{ background: "var(--primary)" }}>
        {/* CSS Keyframe definition for smooth infinite loop marquee */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-custom {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
          .animate-marquee-custom:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="flex flex-col items-center px-4">
          <div className="max-w-3xl mx-auto flex flex-col items-center mb-12">
            <div className="bali-section-badge mb-3">Kemitraan</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-center">
              <span className="text-accent">Sponsor </span>
              <span className="text-secondary">Kami</span>
            </h1>
            <div className="flex items-center gap-3 mt-4 w-32">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]/50" />
              <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>
                ✦
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]/50" />
            </div>
          </div>

          {sponsors.length === 0 ? (
            <div className="text-center text-[var(--secondary)]/60 text-sm tracking-wide py-4">
              Belum ada sponsor saat ini.
            </div>
          ) : (
            <div className="w-full relative overflow-hidden py-4">
              {/* Fade out edges overlay for premium slider look */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--primary)] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--primary)] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee-custom gap-8">
                {getRepeatedSponsors().map((sponsor, index) => (
                  <div
                    key={`${sponsor.id_gallery}-${index}`}
                    className="shrink-0 w-56">
                    <SponsorCard
                      name={sponsor.nama_sponsor}
                      logoSrc={sponsor.media_url}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
