import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/footer";
import { supabase } from "@/lib/supabase";
import { FaCalendarAlt } from "react-icons/fa";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("event_id", slug)
    .single();

  if (error || !event) {
    notFound();
  }

  const tanggal = new Date(event.event_date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main
      className="min-h-screen flex flex-col justify-between"
      style={{ background: "var(--primary)", color: "var(--secondary)" }}>
      <div>
        <article className="container mx-auto px-4 py-16 max-w-3xl">
          {/* Breadcrumbs */}
          <nav
            className="flex items-center gap-2 text-sm mb-8"
            aria-label="Breadcrumb">
            <Link
              href="/"
              className="transition hover:opacity-70"
              style={{ color: "var(--accent)" }}>
              Beranda
            </Link>
            <span style={{ color: "#444" }}>/</span>
            <Link
              href="/event"
              className="transition hover:opacity-70"
              style={{ color: "var(--accent)" }}>
              Event
            </Link>
            <span style={{ color: "#444" }}>/</span>
            <span
              className="truncate max-w-[200px]"
              style={{ color: "var(--secondary)" }}>
              {event.nama_event}
            </span>
          </nav>

          {/* Badge */}
          <div className="mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                background: "rgba(184,149,84,0.15)",
                color: "var(--accent)",
                border: "1px solid rgba(184,149,84,0.3)",
              }}>
              STT CANDRA SEDANA
            </span>
          </div>

          {/* Judul */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            style={{ color: "var(--secondary)" }}>
            {event.nama_event}
          </h1>

          {/* Meta */}
          <div
            className="flex items-center gap-4 text-sm mb-8 pb-4"
            style={{ borderBottom: "1px solid #2a2a2a", color: "#666" }}>
            <p>
              Oleh:{" "}
              <span style={{ color: "var(--secondary)", fontWeight: 500 }}>
                Admin
              </span>
            </p>
            <span style={{ color: "#333" }}>•</span>
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt size={13} style={{ color: "var(--accent)" }} />
              <span>{tanggal}</span>
            </div>
          </div>

          {/* Gambar */}
          <div
            className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden mb-8 shadow-xl"
            style={{ border: "1px solid #2a2a2a" }}>
            <Image
              src={event.image_url || "/image/Image_BG.jpg"}
              alt={event.nama_event}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Konten rich text */}
          <div
            className="prose prose-invert max-w-none leading-relaxed text-lg tracking-wide space-y-4 text-justify"
            style={{ color: "var(--secondary)" }}
            dangerouslySetInnerHTML={{ __html: event.deskripsi_acara }}
          />
        </article>
      </div>

      <Footer />
    </main>
  );
}
