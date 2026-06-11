"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { supabase } from "@/lib/supabase/client";

interface MediaItem {
  id_gallery: number;
  nama_sponsor: string | null;
  media_url: string;
}

const inputStyle = {
  background: "var(--primary, #000)",
  color: "var(--secondary, #fff)",
  border: "1px solid #2a2a2a",
  width: "100%",
  borderRadius: "1rem",
  padding: "12px 16px",
};

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [namaSponsor, setNamaSponsor] = useState("");

  // State baru untuk menampung public_id dari Cloudinary sementara waktu
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Ambil data dari Supabase
  const fetchMedia = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_sponsor")
      .select("*")
      .order("id_gallery", { ascending: false });

    if (error) {
      console.error(error.message);
    } else {
      setMediaList(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Hanya bertugas menangkap hasil upload dari Cloudinary
  const handleUploadSuccess = (result: any) => {
    const imageUrl = result.info.public_id;
    setUploadedImageUrl(imageUrl);
    alert(
      "Gambar berhasil diunggah ke server media. Silakan klik 'Simpan Data' untuk memfinalisasi.",
    );
  };

  // Fungsi utama untuk menyimpan seluruh data form ke Supabase
  const handleSubmitSponsor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!namaSponsor.trim()) {
      alert("Nama sponsor wajib diisi!");
      return;
    }

    if (!uploadedImageUrl) {
      alert("Anda belum mengunggah berkas media/gambar sponsor!");
      return;
    }

    setUploading(true);

    const { error } = await supabase.from("gallery_sponsor").insert([
      {
        nama_sponsor: namaSponsor.trim(),
        media_url: uploadedImageUrl,
      },
    ]);

    setUploading(false);

    if (error) {
      alert("Gagal menyimpan data ke database: " + error.message);
      return;
    }

    // Reset seluruh state form jika berhasil
    setNamaSponsor("");
    setUploadedImageUrl("");
    fetchMedia();
    alert("Data sponsor dan media berhasil disimpan secara permanen.");
  };

  // Hapus media
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus media ini?")) return;

    const { error } = await supabase
      .from("gallery_sponsor")
      .delete()
      .eq("id_gallery", id);

    if (error) {
      alert("Gagal menghapus media.");
      return;
    }

    fetchMedia();
  };

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header Form */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className="text-sm uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            Sistem Operasional
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-white">
            Gallery & Sponsor
          </h1>
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Kontainer Utama Form Input Media - SEKARANG MENGGUNAKAN TAG <form> */}
      <form
        onSubmit={handleSubmitSponsor}
        className="flex flex-col gap-6 rounded-3xl p-6 md:p-8 shadow-xl"
        style={{ background: "#111", border: "1px solid #2a2a2a" }}
      >
        <div>
          <label
            className="block text-xs uppercase tracking-[0.2em] font-medium mb-2"
            style={{ color: "var(--accent)" }}
          >
            Nama Sponsor *
          </label>

          <input
            value={namaSponsor}
            onChange={(e) => setNamaSponsor(e.target.value)}
            placeholder="Masukkan nama pihak sponsor resmi"
            style={inputStyle}
            required
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Bagian Tombol Upload Cloudinary */}
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_GALLERY}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <button
                type="button" // WAJIB 'button' agar tidak memicu submit form secara tidak sengaja
                onClick={() => open()}
                className="px-6 py-3.5 rounded-2xl font-semibold text-xs uppercase tracking-wider transition w-full sm:w-fit"
                style={{
                  background: "#222",
                  color: "#fff",
                  border: "1px solid #444",
                }}
              >
                {uploadedImageUrl ? "✓ Media Terunggah" : "+ Unggah Media/Foto"}
              </button>
            )}
          </CldUploadWidget>

          {/* Tombol Submit Utama ke Supabase */}
          <button
            type="submit"
            disabled={uploading || !uploadedImageUrl || !namaSponsor.trim()}
            className="px-6 py-3.5 rounded-2xl font-semibold text-xs uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-fit"
            style={{
              background: "var(--accent)",
              color: "var(--primary)",
            }}
          >
            {uploading ? "Menyimpan..." : "Simpan Data Sponsor"}
          </button>
        </div>

        {/* Indikator Preview Mini Jika Gambar Sudah Terupload ke Cloudinary */}
        {uploadedImageUrl && (
          <p className="text-xs text-green-400">
            Gambar siap disimpan dengan ID:{" "}
            <span className="font-mono text-neutral-400">
              {uploadedImageUrl}
            </span>
          </p>
        )}
      </form>

      {/* Kontainer Daftar Gambar / Galeri yang Sudah Terdaftar */}
      <div
        className="rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
        style={{ background: "#111", border: "1px solid #2a2a2a" }}
      >
        <div>
          <label
            className="block text-xs uppercase tracking-[0.2em] font-medium mb-1"
            style={{ color: "var(--accent)" }}
          >
            Daftar Aset Terdaftar
          </label>
          <p className="text-xs text-neutral-500">
            Seluruh berkas media aktif yang ditampilkan pada sistem website
            publik.
          </p>
        </div>

        {loading ? (
          <p
            className="text-xs uppercase tracking-wider text-neutral-600"
            style={{ color: "var(--accent)" }}
          >
            Memuat berkas media...
          </p>
        ) : mediaList.length === 0 ? (
          <p className="text-xs text-neutral-600">
            Belum ada aset media yang diunggah ke server.
          </p>
        ) : (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {mediaList.map((item) => (
              <div
                key={item.id_gallery}
                className="group relative rounded-2xl overflow-hidden bg-black flex flex-col justify-between"
                style={{ border: "1px solid #2a2a2a" }}
              >
                {/* Pembungkus Pratinjau Gambar */}
                <div className="aspect-square w-full relative bg-neutral-950 flex items-center justify-center overflow-hidden">
                  <CldImage
                    src={item.media_url}
                    width="400"
                    height="400"
                    crop="fill"
                    alt="Media"
                    className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Informasi & Tombol Aksi */}
                <div className="p-4 bg-[#111] border-t border-neutral-900 space-y-3">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-wider font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      Pihak Sponsor
                    </p>
                    <p
                      className="text-sm font-medium line-clamp-1"
                      style={{ color: "var(--secondary)" }}
                    >
                      {item.nama_sponsor || "-"}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id_gallery)}
                    className="w-full py-2 text-[11px] uppercase tracking-wider font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition border border-transparent hover:border-red-500/20"
                  >
                    Hapus Media
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
