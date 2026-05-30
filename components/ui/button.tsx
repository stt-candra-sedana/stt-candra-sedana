import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "border";
  href?: string;
  blank?: boolean;
  children: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  blank = false,
  target,
  rel,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

  const variantStyles =
    variant === "secondary"
      ? "bg-secondary text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300"
      : variant === "border"
      ? "bg-transparent border-[3px] border-secondary text-secondary hover:bg-secondary hover:text-accent focus-visible:ring-amber-400"
      : "bg-accent text-white hover:bg-accent focus-visible:ring-amber-400";

  const classes = `${baseStyles} ${variantStyles} ${className}`.trim();
  const targetAttr = blank ? "_blank" : target;
  const relAttr = blank ? "noreferrer noopener" : rel;

  // Jika href ada, render sebagai tag <a>
  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target={targetAttr}
        rel={relAttr}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  // Jika tidak ada href, render sebagai tag <button>
  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
