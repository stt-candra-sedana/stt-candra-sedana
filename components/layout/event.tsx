"use client";

import { useRef, useEffect, useState } from "react";
import EventCard from "@/components/ui/eventCard";
import { supabase } from "@/lib/supabase"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [events, setEvents] = useState<SupabaseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: true });

        if (error) throw error;
        if (data) setEvents(data);
      } catch (error) {
        console.error("Gagal mengambil data dari Supabase:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (events.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [events.length, isHovered]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  // Swipe gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = touchStart - currentX;
    
    // Swipe left (next)
    if (diff > 60) {
      nextSlide();
      setTouchStart(null);
    }
    // Swipe right (prev)
    if (diff < -60) {
      prevSlide();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  if (loading) {
    return (
      <section id="event" className="py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden bg-[var(--primary)] flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)]/30 border-t-[var(--accent)] animate-spin mb-4" />
        <div className="text-[var(--secondary)] tracking-widest text-xs uppercase animate-pulse">
          Memuat Event Terkini...
        </div>
      </section>
    );
  }

  const count = events.length;

  return (
    <section 
      id="event" 
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 75%, rgba(184, 149, 84, 0.06) 0%, transparent 60%)"
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-14 items-center">
        {/* Title Block */}
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="bali-section-badge mb-3">
            Agenda Kegiatan
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            <span style={{ color: "var(--accent)" }}>Event </span>
            <span style={{ color: "var(--secondary)" }}>Kami</span>
          </h2>
          {/* Small ornament below title */}
          <div className="flex items-center gap-3 mt-4 w-32">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]/50" />
            <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>✦</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]/50" />
          </div>
        </div>

        {count === 0 ? (
          <div className="text-center py-8 text-[var(--secondary)]/60 text-sm font-medium tracking-wide">
            Tidak ada event terdaftar saat ini.
          </div>
        ) : count <= 2 ? (
          /* Static Layout Fallback when cards count is less than 3 */
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl pt-4">
            {events.map((event) => (
              <div key={event.event_id} className="w-full max-w-[21rem] md:max-w-[22rem]">
                <div className="rounded-2xl border border-[var(--accent)]/20 shadow-xl bg-gradient-to-b from-[#14120e] to-[#0a0806]">
                  <EventCard
                    title={event.nama_event}
                    imageSrc={event.image_url || "/image/Image_BG.jpg"}
                    date={event.event_date}
                    type="Kegiatan"
                    href={`/event/${event.event_id}`}
                    className="h-full transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/60"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Premium 3D Coverflow Slider for >= 3 events */
          <div className="w-full max-w-5xl flex flex-col items-center">
            <div 
              className="relative w-full h-[400px] sm:h-[430px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {events.map((event, idx) => {
                let diff = idx - activeIndex;
                
                // Circular layout logic
                if (diff < -count / 2) diff += count;
                if (diff > count / 2) diff -= count;
                
                const isCenter = diff === 0;
                const isLeft = diff === -1;
                const isRight = diff === 1;
                
                // Transition styling based on slide offset
                let translate = "translate-x-0";
                let scale = "scale-100";
                let opacity = "opacity-0 pointer-events-none";
                let zIndex = "z-0";
                let blur = "blur-none";
                
                if (isCenter) {
                  translate = "translate-x-0";
                  scale = "scale-100 sm:scale-105";
                  opacity = "opacity-100 pointer-events-auto";
                  zIndex = "z-30";
                } else if (isLeft) {
                  translate = "-translate-x-[50%] sm:-translate-x-[75%]";
                  scale = "scale-85 sm:scale-90";
                  opacity = "opacity-45 pointer-events-auto";
                  zIndex = "z-20";
                  blur = "blur-[2px] md:blur-[1px]";
                } else if (isRight) {
                  translate = "translate-x-[50%] sm:translate-x-[75%]";
                  scale = "scale-85 sm:scale-90";
                  opacity = "opacity-45 pointer-events-auto";
                  zIndex = "z-20";
                  blur = "blur-[2px] md:blur-[1px]";
                } else {
                  translate = diff > 0 ? "translate-x-[150%]" : "-translate-x-[150%]";
                  scale = "scale-75";
                  opacity = "opacity-0 pointer-events-none";
                  zIndex = "z-10";
                }

                return (
                  <div
                    key={event.event_id}
                    className={`absolute w-full max-w-[18rem] sm:max-w-[20rem] md:max-w-[22rem] transition-all duration-500 ease-in-out transform ${translate} ${scale} ${opacity} ${zIndex} ${blur}`}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Glowing highlight wrapper for Center Active slide */}
                    <div 
                      className={`rounded-2xl transition-all duration-500 bg-[#0f0d0a]/60 backdrop-blur-xs ${
                        isCenter 
                          ? "shadow-[0_0_30px_rgba(184,149,84,0.25)] border-2 border-[var(--accent)]" 
                          : "border border-[var(--accent)]/15 shadow-md"
                      }`}
                    >
                      <EventCard
                        title={event.nama_event}
                        imageSrc={event.image_url || "/image/Image_BG.jpg"}
                        date={event.event_date}
                        type="Kegiatan"
                        href={`/event/${event.event_id}`}
                        className="h-full"
                      />
                    </div>
                  </div>
                );
              })}

              {/* Navigation Controls (Arrows) */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-[#14120e]/95 border border-[var(--accent)]/30 text-[var(--accent)] hover:text-white hover:bg-[var(--accent)] hover:border-transparent hover:shadow-[0_0_12px_var(--accent-glow)] transition-all duration-300 z-40 cursor-pointer"
                aria-label="Previous event"
              >
                <FaChevronLeft className="text-xs sm:text-sm" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-[#14120e]/95 border border-[var(--accent)]/30 text-[var(--accent)] hover:text-white hover:bg-[var(--accent)] hover:border-transparent hover:shadow-[0_0_12px_var(--accent-glow)] transition-all duration-300 z-40 cursor-pointer"
                aria-label="Next event"
              >
                <FaChevronRight className="text-xs sm:text-sm" />
              </button>
            </div>

            {/* Pagination Indicators (Dots) */}
            <div className="flex justify-center gap-2.5 mt-4">
              {events.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "w-6 h-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-full shadow-[0_0_8px_var(--accent)]"
                      : "w-2 h-2 bg-[var(--accent)]/35 rounded-full hover:bg-[var(--accent)]/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
