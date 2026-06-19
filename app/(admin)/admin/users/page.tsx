"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type UserProfile = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

const AVAILABLE_ROLES = ["admin", "editor", "viewer"];

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      // Fetch from profiles table (assumes a public.profiles table mirroring auth.users)
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, role, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data ?? []);
    } catch (err) {
      console.error("Gagal memuat users:", err);
      setMessage({ type: "error", text: "Gagal memuat data pengguna. Pastikan tabel 'profiles' sudah dibuat di Supabase." });
    } finally {
      setLoading(false);
    }
  }

  async function updateRole(userId: string, newRole: string) {
    setSaving(userId);
    setMessage(null);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      setMessage({ type: "success", text: "Role berhasil diperbarui." });
    } catch (err) {
      console.error("Gagal update role:", err);
      setMessage({ type: "error", text: "Gagal memperbarui role. Coba lagi." });
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  const roleBadgeStyle = (role: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      admin: { bg: "rgba(184,149,84,0.15)", color: "#b89554" },
      editor: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
      viewer: { bg: "rgba(100,116,139,0.15)", color: "#94a3b8" },
    };
    return map[role] ?? { bg: "#1e1e1e", color: "#d9d9d9" };
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p
            className="text-sm uppercase tracking-[0.3em] mb-1"
            style={{ color: "var(--accent)" }}
          >
            Manajemen
          </p>
          <h2 className="text-2xl font-semibold" style={{ color: "var(--secondary)" }}>
            Pengguna & Role
          </h2>
          <p className="text-sm mt-1" style={{ color: "#666" }}>
            Kelola akses dan peran pengguna admin
          </p>
        </div>
        <button
          id="refresh-users-btn"
          onClick={fetchUsers}
          className="rounded-xl px-4 py-2 text-sm font-medium transition hover:opacity-80 self-start sm:self-auto"
          style={{ background: "#1e1e1e", color: "var(--secondary)", border: "1px solid #2a2a2a" }}
        >
          ↺ Refresh
        </button>
      </div>

      {/* Toast message */}
      {message && (
        <div
          className="rounded-xl px-4 py-3 text-sm font-medium"
          style={{
            background: message.type === "success" ? "rgba(52,211,153,0.1)" : "rgba(239,68,68,0.1)",
            border: `1px solid ${message.type === "success" ? "rgba(52,211,153,0.3)" : "rgba(239,68,68,0.3)"}`,
            color: message.type === "success" ? "#34d399" : "#f87171",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Info box */}
      <div
        className="rounded-xl p-4 text-sm"
        style={{ background: "#111", border: "1px solid #2a2a2a", color: "#888" }}
      >
        ℹ️ &nbsp;Halaman ini menampilkan data dari tabel <code style={{ color: "var(--accent)" }}>profiles</code> di Supabase.
        Buat tabel tersebut terlebih dahulu jika belum ada (lihat dokumentasi setup).
      </div>

      {/* Table */}
      <div
        className="rounded-3xl overflow-hidden shadow-xl"
        style={{ background: "#111", border: "1px solid #2a2a2a" }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div style={{ color: "#666" }} className="text-sm">Memuat pengguna...</div>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-4xl">👤</span>
            <p className="text-sm" style={{ color: "#666" }}>
              Belum ada pengguna terdaftar di tabel profiles.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
                  {["Email", "Role Saat Ini", "Bergabung", "Ubah Role"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-xs uppercase tracking-[0.2em] font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  const badge = roleBadgeStyle(user.role);
                  return (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: i < users.length - 1 ? "1px solid #1a1a1a" : "none",
                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                      }}
                    >
                      <td className="px-6 py-4" style={{ color: "var(--secondary)" }}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{ background: "#2a2a2a", color: "var(--accent)" }}
                          >
                            {user.email?.[0]?.toUpperCase() ?? "?"}
                          </div>
                          <span className="truncate max-w-[200px]">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                          style={{ background: badge.bg, color: badge.color }}
                        >
                          {user.role || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4" style={{ color: "#666" }}>
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            id={`role-select-${user.id}`}
                            defaultValue={user.role}
                            onChange={(e) => updateRole(user.id, e.target.value)}
                            disabled={saving === user.id}
                            className="rounded-lg px-3 py-2 text-sm outline-none transition"
                            style={{
                              background: "#1e1e1e",
                              border: "1px solid #2a2a2a",
                              color: "var(--secondary)",
                              cursor: saving === user.id ? "not-allowed" : "pointer",
                              opacity: saving === user.id ? 0.6 : 1,
                            }}
                          >
                            {AVAILABLE_ROLES.map((r) => (
                              <option key={r} value={r} style={{ background: "#1e1e1e" }}>
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                              </option>
                            ))}
                          </select>
                          {saving === user.id && (
                            <div
                              className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                              style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      {!loading && users.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {AVAILABLE_ROLES.map((role) => {
            const count = users.filter((u) => u.role === role).length;
            const badge = roleBadgeStyle(role);
            return (
              <div
                key={role}
                className="rounded-2xl px-5 py-3 flex items-center gap-3"
                style={{ background: "#111", border: "1px solid #2a2a2a" }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: badge.color }}
                />
                <span className="text-sm capitalize" style={{ color: "#888" }}>{role}</span>
                <span className="text-lg font-semibold" style={{ color: "var(--secondary)" }}>{count}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
