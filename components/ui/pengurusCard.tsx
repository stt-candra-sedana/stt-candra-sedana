import Image from "next/image";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa";

interface PengurusCardProps {
  nama: string;
  jabatan: string;
  fotoUrl?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  linkedin?: string | null;
  isKetua?: boolean;
  showTopSocket?: boolean;
  showBottomSocket?: boolean;
}

export default function PengurusCard({
  nama,
  jabatan,
  fotoUrl,
  instagram,
  whatsapp,
  facebook,
  tiktok,
  linkedin,
  isKetua = false,
  showTopSocket = false,
  showBottomSocket = false,
}: PengurusCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center text-center rounded-2xl overflow-hidden transition-all duration-500 group w-full ${isKetua
        ? "border-2 border-[var(--accent)] bg-gradient-to-b from-[#1c1810] to-[#0c0a07] shadow-[0_0_25px_var(--accent-glow)] scale-[1.03] z-20 md:scale-[1.05]"
        : "border border-[var(--accent)]/30 bg-gradient-to-b from-[#14120e] to-[#0a0806] hover:border-[var(--accent)]/70 hover:shadow-[0_10px_20px_rgba(184,149,84,0.1)] hover:-translate-y-1 z-10"
        }`}
    >
      {/* Pipe Sockets */}
      {showTopSocket && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--accent)] border border-[#0a0806] shadow-[0_0_6px_rgba(184,149,84,0.6)] z-30" />
      )}
      {showBottomSocket && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[var(--accent)] border border-[#0a0806] shadow-[0_0_6px_rgba(184,149,84,0.6)] z-30" />
      )}

      {/* Ketua Highlight Ornament/Badge */}
      {isKetua && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-gradient-to-r from-[var(--bali-red)] to-[var(--accent)] text-white text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase border border-amber-400/20 shadow-md">
          <span className="animate-pulse">⭐</span>
        </div>
      )}

      {/* Decorative background header with gradient */}
      <div
        className={`w-full h-24 relative overflow-hidden transition-all duration-500 ${isKetua
          ? "bg-gradient-to-r from-[#2c1d11] via-[#4e3b23] to-[#2c1d11]"
          : "bg-gradient-to-r from-[#181512] via-[#241e18] to-[#181512]"
          }`}
      >
        {/* Balinese motif-like subtle glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--accent-light)_0%,_transparent_75%)]" />
      </div>

      {/* Foto Profile Container */}
      <div
        className={`relative -mt-12 -mb-10 w-24 h-24 rounded-full overflow-hidden flex-shrink-0 z-20 transition-all duration-500 ${isKetua
          ? "border-[3px] border-[var(--accent)] shadow-[0_0_15px_var(--accent)] scale-105 group-hover:scale-110"
          : "border-2 border-[var(--accent)]/60 group-hover:border-[var(--accent)] group-hover:scale-105"
          }`}
      >
        {fotoUrl ? (
          <Image
            src={fotoUrl}
            alt={nama}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${isKetua
              ? "bg-[#2c2215] text-[var(--accent)]"
              : "bg-[#181410] text-[var(--accent)]/80 group-hover:text-[var(--accent)]"
              }`}
          >
            {nama.charAt(0)}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col items-center gap-3.5 px-6 pt-14 pb-6 bg-[#0f0d0a]/40 backdrop-blur-sm flex-grow">
        <div className="flex flex-col gap-1 w-full">
          <p
            className={`font-semibold transition-colors duration-300 ${isKetua
              ? "text-lg text-[var(--secondary)] font-medium group-hover:text-white"
              : "text-base text-[var(--secondary)]/90 group-hover:text-white"
              }`}
          >
            {nama}
          </p>
          <p
            className={`text-xs tracking-wider uppercase font-semibold transition-colors duration-300 ${isKetua ? "text-[var(--accent-light)]" : "text-[var(--accent)]/80 group-hover:text-[var(--accent)]"
              }`}
          >
            {jabatan}
          </p>
        </div>

        {/* Small Balinese ornament separator */}
        <div className="flex items-center gap-2.5 w-1/3 my-1">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]/40" />
          <span className="text-[var(--accent)]/60 text-[8px] group-hover:text-[var(--accent)] transition-colors">✦</span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]/40" />
        </div>

        {/* Social Media Links */}
        <div className="flex gap-2.5 justify-center mt-1">
          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#181410]/80 border border-[var(--accent)]/10 text-[#E1306C]/85 hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
          )}
          {whatsapp && (
            <a
              href={`https://wa.me/62${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#181410]/80 border border-[var(--accent)]/10 text-[#25D366]/85 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#181410]/80 border border-[var(--accent)]/10 text-[#1877F2]/85 hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={16} />
            </a>
          )}
          {tiktok && (
            <a
              href={`https://tiktok.com/@${tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#181410]/80 border border-[var(--accent)]/10 text-[#e8e0d0]/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              aria-label="TikTok"
            >
              <FaTiktok size={15} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#181410]/80 border border-[var(--accent)]/10 text-[#0A66C2]/85 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

