import type { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";

interface EventCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  date: string | Date;
  type?: string;
  href?: string;
  className?: string;
  children?: ReactNode;
}

function formatDate(d: string | Date) {
  const dateObj = typeof d === "string" ? new Date(d) : d;
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(dateObj);
  } catch {
    return String(d);
  }
}

export default function EventCard({
  imageSrc,
  imageAlt,
  title,
  date,
  type,
  href,
  className = "",
  children,
}: EventCardProps) {
  const content = (
    <div
      className={`flex flex-col rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-b from-[#14120e] to-[#0a0806] shadow-[0_10px_20px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 ease-in-out group h-full hover:border-[var(--accent)]/65 hover:shadow-[0_15px_30px_rgba(184,149,84,0.12)] hover:-translate-y-1 ${className}`}
    >
      {imageSrc ? (
        <div className="relative h-48 w-full overflow-hidden bg-[#0f0d0a]/80">
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {type ? (
            <span className="absolute left-3 top-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[var(--accent-light)] border border-[var(--accent)]/30 z-10 shadow-md">
              {type}
            </span>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300" />
        </div>
      ) : null}

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--secondary)] group-hover:text-white transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          
          {/* Small Balinese divider */}
          <div className="flex items-center gap-2 w-1/4 my-2.5">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]/40" />
            <span className="text-[var(--accent)]/60 text-[7px]">✦</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]/40" />
          </div>
        </div>

        {children ? <div className="mt-2">{children}</div> : null}

        {/* Footer info: Date & Action Link */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--accent)]/10">
          <span className="text-[11px] text-[var(--secondary)]/50 font-normal">
            {formatDate(date)}
          </span>
          {href && (
            <span className="inline-flex items-center gap-1.5 text-[var(--accent)] group-hover:text-[var(--accent-light)] text-[11px] font-bold tracking-wide uppercase transition-colors">
              Detail Acara
              <FaChevronRight className="text-[8px] transform group-hover:translate-x-0.5 transition-transform" />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}

