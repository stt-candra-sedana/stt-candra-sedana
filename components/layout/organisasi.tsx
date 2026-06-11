"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import PengurusCard from "@/components/ui/pengurusCard";
import Button from "@/components/ui/button";
import type { Struktur } from "@/types";

export default function OrganisasiSection() {
  const [pengurus, setPengurus] = useState<Struktur[]>([]);

  useEffect(() => {
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
  }, []);

  const ketua = pengurus[0] ?? null;
  const wakil = pengurus.slice(1, 3);
  const lainnya = pengurus.slice(3);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      <div className="mx-auto max-w-7xl w-full">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-center">
            <span style={{ color: "var(--accent)" }}>Struktur </span>
            <span style={{ color: "var(--secondary)" }}>Organisasi</span>
          </h2>
        </div>

        {/* Baris 1 — Ketua */}
        {ketua && (
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-xs">
              <PengurusCard
                nama={ketua.nama_pengurus}
                jabatan={ketua.jabatan?.nama_jabatan ?? ""}
                fotoUrl={ketua.foto_url}
                instagram={ketua.instagram ?? ""}
                whatsapp={ketua.whatsapp ?? ""}
                facebook={ketua.facebook}
                tiktok={ketua.tiktok}
                linkedin={ketua.linkedin}
              />
            </div>
          </div>
        )}

        {/* Baris 2 — Wakil & Sekretaris */}
        {wakil.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              {wakil.map((p) => (
                <PengurusCard
                  key={p.id}
                  nama={p.nama_pengurus}
                  jabatan={p.jabatan?.nama_jabatan ?? ""}
                  fotoUrl={p.foto_url}
                  instagram={p.instagram ?? ""}
                  whatsapp={p.whatsapp ?? ""}
                  facebook={p.facebook}
                  tiktok={p.tiktok}
                  linkedin={p.linkedin}
                />
              ))}
            </div>
          </div>
        )}

        {/* Baris 3 — Pengurus lain */}
        {lainnya.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {lainnya.map((p) => (
                <PengurusCard
                  key={p.id}
                  nama={p.nama_pengurus}
                  jabatan={p.jabatan?.nama_jabatan ?? ""}
                  fotoUrl={p.foto_url}
                  instagram={p.instagram ?? ""}
                  whatsapp={p.whatsapp ?? ""}
                  facebook={p.facebook}
                  tiktok={p.tiktok}
                  linkedin={p.linkedin}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <Button variant="primary" href="/about">
            Selengkapnya...
          </Button>
        </div>
      </div>
    </section>
  );
}
