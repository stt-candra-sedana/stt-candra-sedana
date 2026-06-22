"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { VisiMisi } from "@/types";

export default function VisiMisiSection() {
  const [visi, setVisi] = useState<VisiMisi | null>(null);
  const [misi, setMisi] = useState<VisiMisi | null>(null);

  useEffect(() => {
    supabase
      .from("visi_misi")
      .select("*")
      .then(({ data }) => {
        setVisi(data?.find((d) => d.jenis_visi_atau_misi === "visi") ?? null);
        setMisi(data?.find((d) => d.jenis_visi_atau_misi === "misi") ?? null);
      });
  }, []);

  return (
    <section
      id="visi-misi"
      className="relative overflow-hidden bg-primary py-24">
      <div className="absolute inset-0 bg-[url('/image/Image_BG.JPG')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/90 to-primary/95" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
            {/* VISI */}
            <div className="rounded-4xl border border-primary/10 bg-primary/10 p-8 sm:p-10 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <h3 className="mb-5 text-2xl sm:text-3xl font-semibold uppercase tracking-[0.2em] text-secondary">
                Visi
              </h3>
              {visi ? (
                <div
                  className="text-base sm:text-lg leading-7 sm:leading-8 text-secondary prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: visi.deskripsi }}
                />
              ) : (
                <p className="text-base sm:text-lg leading-7 sm:leading-8 text-secondary opacity-60">
                  Memuat visi...
                </p>
              )}
            </div>

            {/* Lambang tengah */}
            <div className="relative mx-auto flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-amber-400 bg-primary/95 text-3xl sm:text-4xl font-bold text-white shadow-xl shadow-amber-500/20">
              &amp;
            </div>

            {/* MISI */}
            <div className="rounded-4xl border border-primary/10 bg-primary/10 p-8 sm:p-10 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <h3 className="mb-5 text-2xl sm:text-3xl font-semibold uppercase tracking-[0.2em] text-secondary">
                Misi
              </h3>
              {misi ? (
                <div
                  className="text-base sm:text-lg leading-7 sm:leading-8 text-secondary prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: misi.deskripsi }}
                />
              ) : (
                <p className="text-base sm:text-lg leading-7 sm:leading-8 text-secondary opacity-60">
                  Memuat misi...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
