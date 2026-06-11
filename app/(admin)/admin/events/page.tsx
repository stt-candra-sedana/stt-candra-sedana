"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Event } from "@/types";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("events")
      .select(
        "event_id, nama_event, event_date, image_url, jenis_proker(nama_jenis_proker)",
      )
      .order("event_date", { ascending: false });

    // Fix type — jenis_proker dari Supabase bisa array, ambil index 0
    const mapped = (data ?? []).map((e) => ({
      ...e,
      jenis_proker: Array.isArray(e.jenis_proker)
        ? (e.jenis_proker[0] ?? null)
        : e.jenis_proker,
    })) as Event[];

    setEvents(mapped);
    setLoading(false);
  }, []);

  const handleDelete = async (id: number, nama: string) => {
    if (!confirm(`Hapus event "${nama}"?`)) return;
    await supabase.from("events").delete().eq("event_id", id);
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Event</h1>
        <Link
          href="/admin/events/tambah"
          className="px-4 py-2 rounded text-sm font-medium"
          style={{ background: "var(--accent)", color: "var(--primary)" }}>
          + Tambah Event
        </Link>
      </div>

      {loading ? (
        <p style={{ color: "var(--accent)" }}>Memuat data...</p>
      ) : events.length === 0 ? (
        <p style={{ color: "var(--secondary)" }}>Belum ada event.</p>
      ) : (
        <div
          className="overflow-x-auto rounded-lg"
          style={{ border: "1px solid #2a2a2a" }}>
          <table className="w-full border-collapse text-sm">
            <thead style={{ background: "#1e1e1e", color: "var(--accent)" }}>
              <tr>
                <th className="p-3 text-left font-medium">Nama Event</th>
                <th className="p-3 text-left font-medium">Tanggal</th>
                <th className="p-3 text-left font-medium">Jenis Proker</th>
                <th className="p-3 text-left font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr
                  key={event.event_id}
                  style={{
                    borderTop: "1px solid #2a2a2a",
                    background: i % 2 === 0 ? "var(--primary)" : "#1a1a1a",
                  }}>
                  <td
                    className="p-3 font-medium"
                    style={{ color: "var(--secondary)" }}>
                    {event.nama_event}
                  </td>
                  <td className="p-3" style={{ color: "var(--secondary)" }}>
                    {new Date(event.event_date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3" style={{ color: "var(--secondary)" }}>
                    {event.jenis_proker?.nama_jenis_proker ?? "-"}
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/admin/events/edit/${event.event_id}`}
                      className="px-3 py-1 rounded text-xs font-medium"
                      style={{
                        background: "var(--accent)",
                        color: "var(--primary)",
                      }}>
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(event.event_id, event.nama_event)
                      }
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
