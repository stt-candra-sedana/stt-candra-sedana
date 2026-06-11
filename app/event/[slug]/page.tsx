import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
// 1. Import komponen tombol kembali yang baru
import BackButton from "@/components/ui/buttonBack";
import { supabase } from "@/lib/supabase";

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

  return (
    <main className="bg-primary min-h-screen text-white flex flex-col justify-between">
      <div>
        <Navbar />

        <article className="container mx-auto px-4 py-24 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            {/* 2. Gunakan komponen BackButton di sini */}
            <BackButton />

            <span className="bg-accent/20 text-accent border border-accent/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              STT CANDRA SEDANA
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-secondary">
            {event.nama_event}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 border-b border-white/10 pb-4">
            <p>
              Oleh: <span className="text-white font-medium">Admin</span>
            </p>
            <span>•</span>
            <p>📅 {event.event_date}</p>
          </div>

          <div className="relative w-full h-62.5 sm:h-100 rounded-xl overflow-hidden mb-8 shadow-xl border border-white/10">
            <Image
              src={event.image_url || "/image/Image_BG.jpg"}
              alt={event.nama_event}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg tracking-wide space-y-4 text-justify"
            dangerouslySetInnerHTML={{ __html: event.deskripsi_acara }}
          />
        </article>
      </div>

      <Footer />
    </main>
  );
}
