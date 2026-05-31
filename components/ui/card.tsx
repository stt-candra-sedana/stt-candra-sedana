import type { ReactNode } from "react";

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
  className?: string;
}

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt = title,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`flex flex-col rounded-3xl border border-accent bg-secondary shadow-xl shadow-black/10 overflow-hidden ${className}`}
    >
      {imageSrc ? (
        <div className="relative h-56 w-full overflow-hidden bg-slate-800">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>
      ) : null}

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-accent mb-2">{title}</h2>
          {description ? (
            <p className="text-sm text-primary mb-4">{description}</p>
          ) : null}
        </div>

        {children}
      </div>
    </div>
  );
}
