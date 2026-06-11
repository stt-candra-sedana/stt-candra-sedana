"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { VisiMisi } from "@/types";

const inputLabelStyle = { color: "var(--accent)" };
const cardStyle = { background: "#111", border: "1px solid #2a2a2a" };

export default function VisiMisiPage() {
  const [visi, setVisi] = useState<VisiMisi | null>(null);
  const [misi, setMisi] = useState<VisiMisi | null>(null);
  const [visiText, setVisiText] = useState("");
  const [misiText, setMisiText] = useState("");
  const [loadingVisi, setLoadingVisi] = useState(false);
  const [loadingMisi, setLoadingMisi] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("visi_misi").select("*");
      const visiData =
        data?.find((d) => d.jenis_visi_atau_misi === "visi") ?? null;
      const misiData =
        data?.find((d) => d.jenis_visi_atau_misi === "misi") ?? null;
      setVisi(visiData);
      setMisi(misiData);
      setVisiText(visiData?.deskripsi ?? "");
      setMisiText(misiData?.deskripsi ?? "");
      setFetching(false);
    };
    fetch();
  }, []);

  const handleSave = async (
    jenis: "visi" | "misi",
    existing: VisiMisi | null,
    text: string,
  ) => {
    if (jenis === "visi") setLoadingVisi(true);
    else setLoadingMisi(true);

    let error = null;

    if (existing) {
      // Update
      ({ error } = await supabase
        .from("visi_misi")
        .update({ deskripsi: text })
        .eq("id_visi_misi", existing.id_visi_misi));
    } else {
      // Insert pertama kali
      ({ error } = await supabase
        .from("visi_misi")
        .insert({ deskripsi: text, jenis_visi_atau_misi: jenis }));
    }

    if (jenis === "visi") setLoadingVisi(false);
    else setLoadingMisi(false);

    if (error) alert("Gagal simpan: " + error.message);
    else alert(`${jenis === "visi" ? "Visi" : "Misi"} berhasil disimpan!`);
  };

  if (fetching)
    return (
      <div className="p-6" style={{ color: "var(--accent)" }}>
        Memuat data...
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold" style={{ color: "var(--secondary)" }}>
        Kelola Visi & Misi
      </h1>

      {/* VISI */}
      <div className="rounded-xl p-6 space-y-4" style={cardStyle}>
        <div className="flex items-center justify-between">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--accent)" }}>
            Visi
          </h2>
          {visi && (
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{ background: "#1e1e1e", color: "#666" }}>
              Sudah ada konten
            </span>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={inputLabelStyle}>
            Isi Visi
          </label>
          <RichTextEditor value={visiText} onChange={setVisiText} />
        </div>
        <button
          onClick={() => handleSave("visi", visi, visiText)}
          disabled={loadingVisi}
          className="px-6 py-2 rounded font-medium text-sm disabled:opacity-50"
          style={{ background: "var(--accent)", color: "var(--primary)" }}>
          {loadingVisi ? "Menyimpan..." : visi ? "Update Visi" : "Simpan Visi"}
        </button>
      </div>

      {/* MISI */}
      <div className="rounded-xl p-6 space-y-4" style={cardStyle}>
        <div className="flex items-center justify-between">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--accent)" }}>
            Misi
          </h2>
          {misi && (
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{ background: "#1e1e1e", color: "#666" }}>
              Sudah ada konten
            </span>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={inputLabelStyle}>
            Isi Misi
          </label>
          <RichTextEditor value={misiText} onChange={setMisiText} />
        </div>
        <button
          onClick={() => handleSave("misi", misi, misiText)}
          disabled={loadingMisi}
          className="px-6 py-2 rounded font-medium text-sm disabled:opacity-50"
          style={{ background: "var(--accent)", color: "var(--primary)" }}>
          {loadingMisi ? "Menyimpan..." : misi ? "Update Misi" : "Simpan Misi"}
        </button>
      </div>
    </div>
  );
}
