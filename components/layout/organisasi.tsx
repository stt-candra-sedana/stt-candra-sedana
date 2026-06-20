"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import PengurusCard from "@/components/ui/pengurusCard";
import type { Struktur } from "@/types";
import { ArcherContainer, ArcherElement } from "@gitii/react-archer";

export default function OrganisasiSection() {
  const [pengurus, setPengurus] = useState<Struktur[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Supabase query
    supabase
      .from("struktur_organisasi")
      .select(
        "id, nama_pengurus, foto_url, instagram, whatsapp, facebook, tiktok, linkedin, jabatan(jabatan_id, nama_jabatan)",
      )
      .order("id", { ascending: true })
      .limit(5)
      .then(({ data }) => {
        const mapped = (data ?? []).map((s) => ({
          ...s,
          jabatan: Array.isArray(s.jabatan)
            ? (s.jabatan[0] ?? null)
            : s.jabatan,
        })) as Struktur[];
        setPengurus(mapped);
      });

    // Mobile layout detection
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ketua = pengurus[0] ?? null;
  const wakil = pengurus.slice(1, 3);
  const lainnya = pengurus.slice(3);

  // Common styling for pipeline paths
  const relationStyle = {
    strokeColor: "#b89554", // var(--accent) gold color hex
    strokeWidth: 4.5,
    filter: "url(#gold-glow)",
  };

  // ─── Relations definition ───
  const getKetuaRelations = () => {
    if (!ketua) return [];
    if (isMobile) {
      if (wakil[0]) return [{ targetId: `pengurus-${wakil[0].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle }];
      if (lainnya[0]) return [{ targetId: `pengurus-${lainnya[0].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle }];
      return [];
    } else {
      const rels = [];
      if (wakil[0]) rels.push({ targetId: `pengurus-${wakil[0].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle });
      if (wakil[1]) rels.push({ targetId: `pengurus-${wakil[1].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle });
      return rels;
    }
  };

  const getWakilRelations = (index: number) => {
    if (isMobile) {
      if (index === 0) {
        if (wakil[1]) return [{ targetId: `pengurus-${wakil[1].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle }];
        if (lainnya[0]) return [{ targetId: `pengurus-${lainnya[0].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle }];
      } else if (index === 1) {
        if (lainnya[0]) return [{ targetId: `pengurus-${lainnya[0].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle }];
      }
      return [];
    } else {
      if (index === 0) {
        const rels = [];
        if (lainnya[0]) rels.push({ targetId: `pengurus-${lainnya[0].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle });
        if (lainnya.length === 3 && lainnya[1]) {
          rels.push({ targetId: `pengurus-${lainnya[1].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle });
        }
        return rels;
      } else if (index === 1) {
        const rels = [];
        if (lainnya.length === 3 && lainnya[2]) {
          rels.push({ targetId: `pengurus-${lainnya[2].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle });
        } else if (lainnya.length === 2 && lainnya[1]) {
          rels.push({ targetId: `pengurus-${lainnya[1].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle });
        }
        return rels;
      }
      return [];
    }
  };

  const getLainnyaRelations = (index: number) => {
    if (isMobile) {
      if (lainnya[index + 1]) {
        return [{ targetId: `pengurus-${lainnya[index + 1].id}`, targetAnchor: "top" as const, sourceAnchor: "bottom" as const, style: relationStyle }];
      }
    }
    return [];
  };

  // ─── Socket visibility helpers ───
  const getKetuaSockets = () => ({
    showTopSocket: false,
    showBottomSocket: wakil.length > 0 || lainnya.length > 0,
  });

  const getWakilSockets = (index: number) => {
    let showBottom = false;
    if (isMobile) {
      if (index === 0) showBottom = wakil.length > 1 || lainnya.length > 0;
      else if (index === 1) showBottom = lainnya.length > 0;
    } else {
      if (index === 0) showBottom = lainnya.length > 0;
      else if (index === 1) showBottom = lainnya.length >= 2;
    }
    return {
      showTopSocket: true,
      showBottomSocket: showBottom,
    };
  };

  const getLainnyaSockets = (index: number) => {
    return {
      showTopSocket: true,
      showBottomSocket: isMobile && index < lainnya.length - 1,
    };
  };

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 25%, rgba(184, 149, 84, 0.08) 0%, transparent 60%)"
      }}
    >
      {/* SVG Glow Filter Definition */}
      <svg style={{ height: 0, width: 0, position: 'absolute' }}>
        <defs>
          <filter id="gold-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl w-full relative">
        {/* Title & Badge */}
        <div className="max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="bali-section-badge mb-3">
            Susunan Kepengurusan
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            <span style={{ color: "var(--accent)" }}>Struktur </span>
            <span style={{ color: "var(--secondary)" }}>Organisasi</span>
          </h2>
          {/* Small ornament below title */}
          <div className="flex items-center gap-3 mt-4 w-32">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]/50" />
            <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>✦</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]/50" />
          </div>
        </div>

        {/* Archer Container for Connections */}
        <ArcherContainer
          strokeColor="#b89554"
          strokeWidth={4.5}
          endMarker={false}
          lineStyle={isMobile ? "straight" : "angle"}
        >
          {/* Tree Layout Container */}
          <div className="relative flex flex-col items-center w-full gap-12 md:gap-20">
            
            {/* BARIS 1: Ketua */}
            {ketua && (
              <div className="relative z-10 w-full max-w-xs flex justify-center">
                <ArcherElement
                  id={`pengurus-${ketua.id}`}
                  relations={getKetuaRelations()}
                >
                  <div className="w-full">
                    <PengurusCard
                      nama={ketua.nama_pengurus}
                      jabatan={ketua.jabatan?.nama_jabatan ?? ""}
                      fotoUrl={ketua.foto_url}
                      instagram={ketua.instagram ?? ""}
                      whatsapp={ketua.whatsapp ?? ""}
                      facebook={ketua.facebook}
                      tiktok={ketua.tiktok}
                      linkedin={ketua.linkedin}
                      isKetua={true}
                      {...getKetuaSockets()}
                    />
                  </div>
                </ArcherElement>
              </div>
            )}

            {/* BARIS 2: Wakil & Sekretaris */}
            {wakil.length > 0 && (
              <div className="relative z-10 w-full max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                  {wakil.map((p, idx) => (
                    <div key={p.id} className="relative w-full flex justify-center">
                      <ArcherElement
                        id={`pengurus-${p.id}`}
                        relations={getWakilRelations(idx)}
                      >
                        <div className="w-full">
                          <PengurusCard
                            nama={p.nama_pengurus}
                            jabatan={p.jabatan?.nama_jabatan ?? ""}
                            fotoUrl={p.foto_url}
                            instagram={p.instagram ?? ""}
                            whatsapp={p.whatsapp ?? ""}
                            facebook={p.facebook}
                            tiktok={p.tiktok}
                            linkedin={p.linkedin}
                            {...getWakilSockets(idx)}
                          />
                        </div>
                      </ArcherElement>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BARIS 3: Pengurus lain */}
            {lainnya.length > 0 && (
              <div className="relative z-10 w-full max-w-4xl">
                <div className={`grid grid-cols-1 md:grid-cols-${lainnya.length === 2 ? "2" : "3"} gap-12 md:gap-16`}>
                  {lainnya.map((p, idx) => (
                    <div key={p.id} className="relative w-full flex justify-center">
                      <ArcherElement
                        id={`pengurus-${p.id}`}
                        relations={getLainnyaRelations(idx)}
                      >
                        <div className="w-full">
                          <PengurusCard
                            nama={p.nama_pengurus}
                            jabatan={p.jabatan?.nama_jabatan ?? ""}
                            fotoUrl={p.foto_url}
                            instagram={p.instagram ?? ""}
                            whatsapp={p.whatsapp ?? ""}
                            facebook={p.facebook}
                            tiktok={p.tiktok}
                            linkedin={p.linkedin}
                            {...getLainnyaSockets(idx)}
                          />
                        </div>
                      </ArcherElement>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </ArcherContainer>
      </div>
    </section>
  );
}
