"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { Jabatan } from "@/types";

const inputStyle = {
  background: "#1e1e1e",
  color: "var(--secondary)",
  border: "1px solid #2a2a2a",
  width: "100%",
  borderRadius: "6px",
  padding: "8px 12px",
};

export default function EditStrukturPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nama_pengurus: "",
    jabatan_id: "",
    foto_url: "",
    instagram: "",
    whatsapp: "",
    facebook: "",
    tiktok: "",
    linkedin: "",
  });

  useEffect(() => {
    const load = async () => {
      const [{ data: struktur }, { data: jabatan }] = await Promise.all([
        supabase.from("struktur_organisasi").select("*").eq("id", id).single(),
        supabase.from("jabatan").select("*").order("jabatan_id"),
      ]);
      if (struktur) {
        setForm({
          nama_pengurus: struktur.nama_pengurus,
          jabatan_id: struktur.jabatan_id?.toString() ?? "",
          foto_url: struktur.foto_url ?? "",
          instagram: struktur.instagram ?? "",
          whatsapp: struktur.whatsapp ?? "",
          facebook: struktur.facebook ?? "",
          tiktok: struktur.tiktok ?? "",
          linkedin: struktur.linkedin ?? "",
        });
      }
      setJabatanList(jabatan ?? []);
      setFetching(false);
    };
    load();
  }, [id]);

  const handleChange = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
  };

  const handleUploadFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `pengurus/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("images")
        .upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from("images").getPublicUrl(fileName);
      handleChange("foto_url", data.publicUrl);
    } catch {
      alert("Gagal upload foto.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!form.nama_pengurus || !form.jabatan_id) {
      alert("Nama pengurus dan jabatan wajib diisi!");
      return;
    }
    if (!form.instagram || !form.whatsapp) {
      alert("Instagram dan WhatsApp wajib diisi!");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("struktur_organisasi")
      .update({
        nama_pengurus: form.nama_pengurus,
        jabatan_id: parseInt(form.jabatan_id),
        foto_url: form.foto_url || null,
        instagram: form.instagram,
        whatsapp: form.whatsapp,
        facebook: form.facebook || null,
        tiktok: form.tiktok || null,
        linkedin: form.linkedin || null,
      })
      .eq("id", id);
    setLoading(false);
    if (error) {
      alert("Gagal update: " + error.message);
      return;
    }
    router.push("/admin/pengurus");
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
          onClick={() => router.push("/admin/pengurus")}
          style={{ color: "var(--accent)" }}
          className="text-sm hover:opacity-70">
          ← Kembali
        </button>
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--secondary)" }}>
          Edit Pengurus
        </h1>
      </div>

      <div
        className="flex flex-col gap-5 rounded-xl p-6"
        style={{ background: "#111", border: "1px solid #2a2a2a" }}>
        {/* Nama */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
            Nama Pengurus *
          </label>
          <input
            style={inputStyle}
            value={form.nama_pengurus}
            onChange={(e) => handleChange("nama_pengurus", e.target.value)}
          />
        </div>

        {/* Jabatan */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
            Jabatan *
          </label>
          <select
            style={inputStyle}
            value={form.jabatan_id}
            onChange={(e) => handleChange("jabatan_id", e.target.value)}>
            <option value="">-- Pilih Jabatan --</option>
            {jabatanList.map((j) => (
              <option key={j.jabatan_id} value={j.jabatan_id}>
                {j.nama_jabatan}
              </option>
            ))}
          </select>
        </div>

        {/* Foto */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
            Foto Pengurus
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadFoto}
          />
          <div className="flex gap-3 items-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded text-sm disabled:opacity-50"
              style={{
                background: "#1e1e1e",
                border: "1px solid #2a2a2a",
                color: "var(--secondary)",
              }}>
              {uploading ? "⏳ Uploading..." : "📷 Ganti Foto"}
            </button>
            {form.foto_url && (
              <img
                src={form.foto_url}
                alt="preview"
                className="w-12 h-12 rounded-full object-cover"
                style={{ border: "2px solid var(--accent)" }}
              />
            )}
          </div>
        </div>

        <div style={{ height: "1px", background: "#2a2a2a" }} />
        <p
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--accent)" }}>
          Kontak & Media Sosial
        </p>

        {/* Instagram */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
            Instagram *{" "}
            <span className="text-xs font-normal" style={{ color: "#666" }}>
              (username saja, tanpa @)
            </span>
          </label>
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ border: "1px solid #2a2a2a" }}>
            <span
              className="px-3 py-2 text-sm"
              style={{ background: "#2a2a2a", color: "#666" }}>
              @
            </span>
            <input
              style={{ ...inputStyle, border: "none", borderRadius: 0 }}
              placeholder="username_ig"
              value={form.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--accent)" }}>
            WhatsApp *{" "}
            <span className="text-xs font-normal" style={{ color: "#666" }}>
              (nomor dengan kode negara)
            </span>
          </label>
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ border: "1px solid #2a2a2a" }}>
            <span
              className="px-3 py-2 text-sm"
              style={{ background: "#2a2a2a", color: "#666" }}>
              +62
            </span>
            <input
              style={{ ...inputStyle, border: "none", borderRadius: 0 }}
              placeholder="81234567890"
              value={form.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
            />
          </div>
        </div>

        {/* Facebook */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#666" }}>
            Facebook <span className="text-xs">(opsional)</span>
          </label>
          <input
            style={inputStyle}
            placeholder="https://facebook.com/..."
            value={form.facebook}
            onChange={(e) => handleChange("facebook", e.target.value)}
          />
        </div>

        {/* TikTok */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#666" }}>
            TikTok <span className="text-xs">(opsional)</span>
          </label>
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ border: "1px solid #2a2a2a" }}>
            <span
              className="px-3 py-2 text-sm"
              style={{ background: "#2a2a2a", color: "#666" }}>
              @
            </span>
            <input
              style={{ ...inputStyle, border: "none", borderRadius: 0 }}
              placeholder="username_tiktok"
              value={form.tiktok}
              onChange={(e) => handleChange("tiktok", e.target.value)}
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "#666" }}>
            LinkedIn <span className="text-xs">(opsional)</span>
          </label>
          <input
            style={inputStyle}
            placeholder="https://linkedin.com/in/..."
            value={form.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded font-medium text-sm disabled:opacity-50"
            style={{ background: "var(--accent)", color: "var(--primary)" }}>
            {loading ? "Menyimpan..." : "Update"}
          </button>
          <button
            onClick={() => router.push("/admin/pengurus")}
            className="px-6 py-2 rounded text-sm"
            style={{ border: "1px solid #2a2a2a", color: "var(--secondary)" }}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
