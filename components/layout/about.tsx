"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import type { VisiMisi } from "@/types";
import {
  FaMasksTheater,
  FaHandshake,
  FaHandsPraying,
  FaLeaf,
} from "react-icons/fa6";

const values = [
  { icon: FaMasksTheater, label: "Seni & Budaya" },
  { icon: FaHandshake, label: "Gotong Royong" },
  { icon: FaHandsPraying, label: "Tat Twam Asi" },
  { icon: FaLeaf, label: "Tradisi Lokal" },
];

export default function AboutSection() {
  const [misi, setMisi] = useState<VisiMisi | null>(null);

  useEffect(() => {
    supabase
      .from("visi_misi")
      .select("*")
      .eq("jenis_visi_atau_misi", "misi")
      .single()
      .then(({ data }) => setMisi(data));
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(184,149,84,0.07) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="bali-section-badge justify-center">Tentang Kami</div>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--secondary)" }}>
            Mengenal{" "}
            <span style={{ color: "var(--accent)" }}>Candra Sedana</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-3xl"
              style={{
                border: "1px solid rgba(184,149,84,0.15)",
                background:
                  "linear-gradient(135deg, rgba(184,149,84,0.05) 0%, transparent 60%)",
              }}
            />
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 lg:aspect-square shadow-2xl">
              <Image
                src="/image/Raja_Hidimba.jpg"
                alt="STT Candra Sedana"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,13,10,0.6) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Floating stat card */}
            <div
              className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-4 shadow-2xl"
              style={{
                background: "rgba(15,13,10,0.9)",
                border: "1px solid rgba(184,149,84,0.25)",
                backdropFilter: "blur(12px)",
              }}>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-1"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-poppins)",
                }}>
                Berdiri sejak
              </p>
              <p
                className="text-2xl font-bold"
                style={{
                  color: "var(--secondary)",
                  fontFamily: "var(--font-poppins)",
                }}>
                1977
              </p>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-6">
            {/* Misi dari Supabase, sebagai quote */}
            <blockquote className="relative pl-6">
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--accent), transparent)",
                }}
              />
              {misi ? (
                <div
                  className="text-xl sm:text-2xl font-medium leading-relaxed prose prose-invert"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-eb-garamond), serif",
                    fontStyle: "italic",
                  }}
                  dangerouslySetInnerHTML={{ __html: misi.deskripsi }}
                />
              ) : (
                <p
                  className="text-xl sm:text-2xl font-medium leading-relaxed"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-eb-garamond), serif",
                    fontStyle: "italic",
                  }}>
                  Memuat misi...
                </p>
              )}
            </blockquote>

            <p
              className="text-base sm:text-lg leading-8"
              style={{ color: "var(--secondary-muted)" }}>
              Sebagai generasi penerus, STT Candra Sedana berkomitmen untuk
              menjadi motor penggerak kegiatan sosial, budaya, dan inovasi di
              lingkungan masyarakat, berlandaskan nilai{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                Tat Twam Asi
              </span>{" "}
              dan semangat gotong royong.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.label}
                    className="rounded-xl p-4 flex items-center gap-3"
                    style={{
                      background: "rgba(184,149,84,0.06)",
                      border: "1px solid rgba(184,149,84,0.12)",
                    }}>
                    <Icon size={20} style={{ color: "var(--accent)" }} />
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: "var(--secondary)",
                        fontFamily: "var(--font-poppins)",
                      }}>
                      {val.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
