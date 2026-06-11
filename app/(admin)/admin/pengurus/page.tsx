"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Struktur } from "@/types";

export default function AdminStrukturPage() {
  const [struktur, setStruktur] = useState<Struktur[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStruktur = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("struktur_organisasi")
      .select("id, nama_pengurus, jabatan(jabatan_id, nama_jabatan)")
      .order("id", { ascending: true });

    const mapped = (data ?? []).map((s) => ({
      ...s,
      jabatan: Array.isArray(s.jabatan) ? (s.jabatan[0] ?? null) : s.jabatan,
    })) as Struktur[];

    setStruktur(mapped);
    setLoading(false);
  }, []);

  const handleDelete = async (id: number, nama: string) => {
    if (!confirm(`Hapus "${nama}" dari struktur organisasi?`)) return;
    await supabase.from("struktur_organisasi").delete().eq("id", id);
    fetchStruktur();
  };

  useEffect(() => {
    fetchStruktur();
  }, [fetchStruktur]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--secondary)" }}>
          Struktur Organisasi
        </h1>
        <Link
          href="/admin/pengurus/tambah"
          className="px-4 py-2 rounded text-sm font-medium"
          style={{ background: "var(--accent)", color: "var(--primary)" }}>
          + Tambah Pengurus
        </Link>
      </div>

      {loading ? (
        <p style={{ color: "var(--accent)" }}>Memuat data...</p>
      ) : struktur.length === 0 ? (
        <p style={{ color: "var(--secondary)" }}>Belum ada data pengurus.</p>
      ) : (
        <div
          className="overflow-x-auto rounded-lg"
          style={{ border: "1px solid #2a2a2a" }}>
          <table className="w-full border-collapse text-sm">
            <thead style={{ background: "#1e1e1e", color: "var(--accent)" }}>
              <tr>
                <th className="p-3 text-left font-medium">Nama Pengurus</th>
                <th className="p-3 text-left font-medium">Jabatan</th>
                <th className="p-3 text-left font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {struktur.map((s, i) => (
                <tr
                  key={s.id}
                  style={{
                    borderTop: "1px solid #2a2a2a",
                    background: i % 2 === 0 ? "var(--primary)" : "#1a1a1a",
                  }}>
                  <td
                    className="p-3 font-medium"
                    style={{ color: "var(--secondary)" }}>
                    {s.nama_pengurus}
                  </td>
                  <td className="p-3" style={{ color: "var(--secondary)" }}>
                    {s.jabatan?.nama_jabatan ?? "-"}
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/admin/pengurus/edit/${s.id}`}
                      className="px-3 py-1 rounded text-xs font-medium"
                      style={{
                        background: "var(--accent)",
                        color: "var(--primary)",
                      }}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(s.id, s.nama_pengurus)}
                      className="px-3 py-1 rounded text-xs font-medium"
                      style={{ background: "#dc2626", color: "#fff" }}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
