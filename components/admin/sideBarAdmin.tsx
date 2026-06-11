"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Event", href: "/admin/events" },
  { label: "Visi & Misi", href: "/admin/visi-misi" },
  { label: "Struktur Organisasi", href: "/admin/pengurus" },
  { label: "Gallery & Sponsor", href: "/admin/galeri" },
  { label: "Jenis Proker", href: "/admin/jenis-proker" },
];

export default function SideBarAdmin() {
  const pathname = usePathname();

  return (
    <div
      className="w-64 h-screen p-6 flex flex-col gap-6"
      style={{ background: "#0d0d0d", borderRight: "1px solid #2a2a2a" }}>
      {/* Logo */}
      <div>
        <p
          className="text-xs uppercase tracking-[0.3em] mb-1"
          style={{ color: "var(--accent)" }}>
          Admin Panel
        </p>
        <h2 className="text-xl font-bold" style={{ color: "var(--secondary)" }}>
          Candra Sedana
        </h2>
      </div>

      <div style={{ height: "1px", background: "#2a2a2a" }} />

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {menus.map((menu) => {
          const isActive =
            menu.href === "/admin"
              ? pathname === "/admin"
              : pathname === menu.href || pathname.startsWith(menu.href + "/");
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--secondary)",
              }}>
              {menu.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto">
        <div
          style={{ height: "1px", background: "#2a2a2a", marginBottom: "16px" }}
        />
        <p className="text-xs" style={{ color: "#444" }}>
          Menu lain akan aktif setelah CRUD selesai dibuat.
        </p>
      </div>
    </div>
  );
}
