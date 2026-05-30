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
  const content = (
    <div
      className={`rounded-2xl border border-accent bg-secondary shadow-xl shadow-black/10 overflow-hidden p-6 flex items-center justify-center min-h-37.5 transition duration-300 hover:shadow-2xl hover:shadow-black/20 ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
        <img src={logoSrc} alt={logoAlt} className="h-24 w-24 object-contain" />
        <h3 className="text-center font-semibold text-accent text-sm">
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
