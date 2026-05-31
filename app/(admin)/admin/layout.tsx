import type { Metadata } from "next";
import SideBarAdmin from "@/components/admin/sideBarAdmin";

export const metadata: Metadata = {
  title: "Admin - Candra Sedana",
  description: "Halaman admin untuk manajemen aplikasi Candra Sedana.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden lg:block sticky top-0 self-start h-screen">
          <SideBarAdmin />
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-5 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Admin Panel
                </h1>
                <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
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
