import type { ReactNode } from "react";

interface SponsorCardProps {
  name: string;
  logoSrc: string;
  logoAlt?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
}

export default function SponsorCard({
  name,
  logoSrc,
  logoAlt = name,
  href,
  children,
  className = "",
}: SponsorCardProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dvi8oy2ue";
  const displaySrc = logoSrc && (logoSrc.startsWith("http") || logoSrc.startsWith("/"))
    ? logoSrc
    : logoSrc
      ? `https://res.cloudinary.com/${cloudName}/image/upload/${logoSrc}`
      : "/logo/logo STT.jpg.jpeg";

  const content = (
    <div
      className={`rounded-2xl border border-[var(--accent)]/30 bg-[#14120e] shadow-xl overflow-hidden p-6 flex items-center justify-center min-h-[140px] transition-all duration-300 hover:border-[var(--accent)]/65 hover:shadow-[0_4px_20px_rgba(184,149,84,0.12)] hover:-translate-y-0.5 group ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-16 w-32 relative flex items-center justify-center">
          <img 
            src={displaySrc} 
            alt={logoAlt} 
            className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300" 
          />
        </div>
        <h3 className="text-center font-semibold text-[var(--accent)]/90 group-hover:text-[var(--accent)] text-xs tracking-wider uppercase transition-colors">
          {name}
        </h3>
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}

