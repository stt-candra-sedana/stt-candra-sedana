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
}: PengurusCardProps) {
  return (
    <div
      className="flex flex-col items-center text-center rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--accent)" }}>
      {/* Bagian atas — gelap */}
      <div className="w-full h-24" style={{ background: "var(--primary)" }} />

      {/* Foto — di tengah antara dua bagian */}
      <div
        className="relative -mt-12 -mb-12 w-24 h-24 rounded-full overflow-hidden flex-shrink-0 z-10"
        style={{ border: "3px solid var(--accent)" }}>
        {fotoUrl ? (
          <Image src={fotoUrl} alt={nama} fill className="object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-2xl font-bold"
            style={{ background: "#1e1e1e", color: "var(--accent)" }}>
            {nama.charAt(0)}
          </div>
        )}
      </div>

      {/* Bagian bawah — putih */}
      <div className="w-full flex flex-col items-center gap-3 px-6 pt-16 pb-6 bg-white">
        <p className="font-semibold text-base" style={{ color: "#171717" }}>
          {nama}
        </p>
        <p className="text-sm" style={{ color: "var(--accent)" }}>
          {jabatan}
        </p>

        <div className="flex gap-3 justify-center mt-1">
          {instagram && (
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-70"
              style={{ color: "#E1306C" }}
              aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
          )}
          {whatsapp && (
            <a
              href={`https://wa.me/62${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-70"
              style={{ color: "#25D366" }}
              aria-label="WhatsApp">
              <FaWhatsapp size={20} />
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-70"
              style={{ color: "#1877F2" }}
              aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
          )}
          {tiktok && (
            <a
              href={`https://tiktok.com/@${tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-70"
              style={{ color: "#171717" }}
              aria-label="TikTok">
              <FaTiktok size={20} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-70"
              style={{ color: "#0A66C2" }}
              aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
