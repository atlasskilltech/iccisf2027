import { ArrowRight } from "lucide-react";

const variants = {
  primary:
    "bg-aqua-500 text-atlas-950 hover:bg-aqua-300 focus-visible:outline-aqua-300 shadow-[0_8px_30px_-12px] shadow-aqua-500/60",
  ghostDark:
    "text-white ring-1 ring-inset ring-white/25 hover:bg-white/10 hover:ring-white/50 focus-visible:outline-white",
  dark: "bg-atlas-700 text-white hover:bg-atlas-800 focus-visible:outline-atlas-700",
  ghost: "text-atlas-800 ring-1 ring-inset ring-atlas-200 hover:bg-atlas-50 hover:ring-atlas-300 focus-visible:outline-atlas-700",
};

/** Anchor styled as a button. Pass `external` for links leaving the site. */
export default function ButtonLink({ href, variant = "primary", external = false, arrow = true, className = "", children }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold tracking-tight transition-[background-color,box-shadow,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
    >
      {children}
      {external && <span className="sr-only">(opens in a new tab)</span>}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        />
      )}
    </a>
  );
}
