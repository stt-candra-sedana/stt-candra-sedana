"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // 1. Ambil URL halaman sebelumnya dari browser histori
    const halamanSebelumnya =
      typeof window !== "undefined" ? document.referrer : "";

    // 2. Cek apakah user sebelumnya datang dari halaman daftar event khusus (/event)
    if (
      halamanSebelumnya.includes("/event") &&
      !halamanSebelumnya.includes("#event")
    ) {
      // Jika benar dari halaman event, arahkan kembali ke halaman event
      router.push("/event");
    } else {
      // Jika dari beranda atau sumber lain, arahkan ke komponen event di dashboard utama
      router.push("/#event");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`bg-[#f4ebd0] text-[#a67c52] border border-[#a67c52]/30 px-4 py-2 rounded-lg font-medium transition hover:bg-[#a67c52] hover:text-white flex items-center gap-2 ${className}`}
    >
      ← Kembali
    </button>
  );
}
