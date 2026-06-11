import type { ReactNode } from "react";

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
      className={`flex flex-col rounded-2xl border border-accent bg-secondary shadow-lg overflow-hidden ${className}`}
    >
      {imageSrc ? (
        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
          {type ? (
            <span className="absolute left-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white">
              {type}
            </span>
          ) : null}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ) : null}

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-accent line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-primary">{formatDate(date)}</p>
        </div>

        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-95">
        {content}
      </a>
    );
  }

  return content;
}
