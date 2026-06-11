import type { Metadata } from "next";
import SideBarAdmin from "@/components/admin/sideBarAdmin";

export const metadata: Metadata = {
  title: "Admin - Candra Sedana",
  description: "Halaman admin untuk manajemen data Candra Sedana.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--primary)", color: "var(--secondary)" }}>
      <div className="flex min-h-screen">
        <aside className="hidden lg:block sticky top-0 self-start h-screen">
          <SideBarAdmin />
        </aside>

        <div className="flex-1">
          <header
            className="border-b px-6 py-5"
            style={{
              borderColor: "#2a2a2a",
              background: "rgba(23,23,23,0.8)",
              backdropFilter: "blur(8px)",
            }}>
            <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p
                  className="text-sm uppercase tracking-[0.3em]"
                  style={{ color: "var(--accent)" }}>
                  Admin Panel
                </p>
                <h1 className="text-2xl" style={{ color: "var(--secondary)" }}>
                  Dashboard
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-4 py-2 text-sm"
                  style={{ background: "#2a2a2a", color: "var(--secondary)" }}>
                  Candra Sedana
                </span>
              </div>
            </div>
          </header>

          <main className="px-6 py-8 lg:px-10 lg:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
