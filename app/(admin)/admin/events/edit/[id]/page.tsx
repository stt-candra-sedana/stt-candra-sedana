"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { JenisProker } from "@/types";

const inputStyle = {
  background: "#1e1e1e",
  color: "var(--secondary)",
  border: "1px solid #2a2a2a",
  width: "100%",
  borderRadius: "6px",
  padding: "8px 12px",
};

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [jenisProkerList, setJenisProkerList] = useState<JenisProker[]>([]);
  const [form, setForm] = useState({
    nama_event: "",
    event_date: "",
    deskripsi_acara: "",
    image_url: "",
    url_registrasi: "",
    jenis_proker_id: "",
  });

  useEffect(() => {
    const load = async () => {
      const [{ data: event }, { data: jenis }] = await Promise.all([
        supabase.from("events").select("*").eq("event_id", id).single(),
        supabase.from("jenis_proker").select("*"),
      ]);
      if (event) {
        setForm({
          nama_event: event.nama_event,
          event_date: event.event_date,
          deskripsi_acara: event.deskripsi_acara,
          image_url: event.image_url ?? "",
          url_registrasi: event.url_registrasi ?? "",
          jenis_proker_id: event.jenis_proker_id?.toString() ?? "",
        });
      }
      setJenisProkerList(jenis ?? []);
      setFetching(false);
    };
    load();
  }, [id]);

  const handleChange = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
  };

  const handleSubmit = async () => {
    if (!form.nama_event || !form.event_date) {
      alert("Nama event dan tanggal wajib diisi!");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("events")
      .update({
        nama_event: form.nama_event,
        event_date: form.event_date,
        deskripsi_acara: form.deskripsi_acara,
        image_url: form.image_url,
        url_registrasi: form.url_registrasi,
        jenis_proker_id: form.jenis_proker_id
          ? parseInt(form.jenis_proker_id)
          : null,
      })
      .eq("event_id", id);
    setLoading(false);
    if (error) {
      alert("Gagal update: " + error.message);
      return;
    }
    router.push("/admin/events");
  };

  if (fetching)
    return (
      <div className="p-6" style={{ color: "var(--accent)" }}>
        Memuat data...
      </div>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/admin/events")}
          style={{ color: "var(--accent)" }}
          className="text-sm hover:opacity-70"
        >
          ← Kembali
        </button>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--secondary)" }}
        >
          Edit Event
        </h1>
      </div>

      <div
        className="flex flex-col gap-5 rounded-xl p-6"
        style={{ background: "#111", border: "1px solid #2a2a2a" }}
      >
        {/* Nama Event */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}
          >
            Nama Event *
          </label>
          <input
            style={inputStyle}
            value={form.nama_event}
            onChange={(e) => handleChange("nama_event", e.target.value)}
          />
        </div>

        {/* Tanggal */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}
          >
            Tanggal *
          </label>
          <input
            type="date"
            style={inputStyle}
            value={form.event_date}
            onChange={(e) => handleChange("event_date", e.target.value)}
          />
        </div>

        {/* Jenis Proker */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}
          >
            Jenis Program Kerja
          </label>
          <select
            style={inputStyle}
            value={form.jenis_proker_id}
            onChange={(e) => handleChange("jenis_proker_id", e.target.value)}
          >
            <option value="">-- Pilih Jenis Proker --</option>
            {jenisProkerList.map((j) => (
              <option key={j.jenis_proker_id} value={j.jenis_proker_id}>
                {j.nama_jenis_proker}
              </option>
            ))}
          </select>
        </div>

        {/* URL Registrasi */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}
          >
            URL Registrasi
          </label>
          <input
            style={inputStyle}
            placeholder="https://..."
            value={form.url_registrasi}
            onChange={(e) => handleChange("url_registrasi", e.target.value)}
          />
        </div>

        {/* Gambar Cover (Cloudinary Widget) */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--accent)" }}
          >
            Gambar Cover
          </label>

          <div className="flex flex-col gap-3">
            {/* Pratinjau Gambar lama/baru jika ada */}
            {form.image_url && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[#2a2a2a]">
                <CldImage
                  src={form.image_url}
                  alt="Cover Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleChange("image_url", "")}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  Hapus Gambar
                </button>
              </div>
            )}

            {/* Widget Unggah Cloudinary */}
            <CldUploadWidget
              uploadPreset="preset_gallery" // Ganti ke "preset_sponsor" jika ingin menggunakan yang satunya
              onSuccess={(result) => {
                if (result.info && typeof result.info !== "string") {
                  handleChange("image_url", result.info.secure_url);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full py-3 border border-dashed rounded-lg text-sm font-medium transition"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                    background: "rgba(var(--accent-rgb), 0.05)",
                  }}
                >
                  {form.image_url
                    ? "Ganti Gambar Cover"
                    : "➕ Unggah Gambar Cover"}
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}
          >
            Deskripsi Acara
          </label>
          <RichTextEditor
            value={form.deskripsi_acara}
            onChange={(val) => handleChange("deskripsi_acara", val)}
          />
        </div>

        {/* Tombol */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded font-medium text-sm disabled:opacity-50"
            style={{ background: "var(--accent)", color: "var(--primary)" }}
          >
            {loading ? "Menyimpan..." : "Update Event"}
          </button>
          <button
            onClick={() => router.push("/admin/events")}
            className="px-6 py-2 rounded text-sm"
            style={{ border: "1px solid #2a2a2a", color: "var(--secondary)" }}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
