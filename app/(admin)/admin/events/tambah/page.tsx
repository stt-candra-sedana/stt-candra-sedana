"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
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

export default function TambahEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    supabase
      .from("jenis_proker")
      .select("*")
      .then(({ data }) => {
        setJenisProkerList(data ?? []);
      });
  }, []);

  const handleChange = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
  };

  const handleSubmit = async () => {
    if (!form.nama_event || !form.event_date) {
      alert("Nama event dan tanggal wajib diisi!");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("events").insert({
      nama_event: form.nama_event,
      event_date: form.event_date,
      deskripsi_acara: form.deskripsi_acara,
      image_url: form.image_url,
      url_registrasi: form.url_registrasi,
      jenis_proker_id: form.jenis_proker_id
        ? parseInt(form.jenis_proker_id)
        : null,
    });
    setLoading(false);
    if (error) {
      alert("Gagal simpan: " + error.message);
      return;
    }
    router.push("/admin/events");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/admin/events")}
          style={{ color: "var(--accent)" }}
          className="text-sm hover:opacity-70">
          ← Kembali
        </button>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--secondary)" }}>
          Tambah Event
        </h1>
      </div>

      <div
        className="flex flex-col gap-5 rounded-xl p-6"
        style={{ background: "#111", border: "1px solid #2a2a2a" }}>
        {/* Nama Event */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
            Nama Event *
          </label>
          <input
            style={inputStyle}
            placeholder="Nama event"
            value={form.nama_event}
            onChange={(e) => handleChange("nama_event", e.target.value)}
          />
        </div>

        {/* Tanggal */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
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
            style={{ color: "var(--accent)" }}>
            Jenis Program Kerja
          </label>
          <select
            style={inputStyle}
            value={form.jenis_proker_id}
            onChange={(e) => handleChange("jenis_proker_id", e.target.value)}>
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
            style={{ color: "var(--accent)" }}>
            URL Registrasi
          </label>
          <input
            style={inputStyle}
            placeholder="https://..."
            value={form.url_registrasi}
            onChange={(e) => handleChange("url_registrasi", e.target.value)}
          />
        </div>

        {/* URL Gambar Cover */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
            URL Gambar Cover
          </label>
          <input
            style={inputStyle}
            placeholder="https://... (opsional)"
            value={form.image_url}
            onChange={(e) => handleChange("image_url", e.target.value)}
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
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
            style={{ background: "var(--accent)", color: "var(--primary)" }}>
            {loading ? "Menyimpan..." : "Simpan Event"}
          </button>
          <button
            onClick={() => router.push("/admin/events")}
            className="px-6 py-2 rounded text-sm"
            style={{ border: "1px solid #2a2a2a", color: "var(--secondary)" }}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
