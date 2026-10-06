/**
 * Editorial section header: indexed eyebrow + heading.
 * `tone="dark"` for use on indigo backgrounds.
 */
export default function SectionHeader({ index, eyebrow, title, id, tone = "light", className = "", children }) {
  const dark = tone === "dark";
  return (
    <header className={`max-w-3xl ${className}`}>
      <p
        data-reveal
        className={`flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] uppercase ${
          dark ? "text-aqua-300" : "text-aqua-700"
        }`}
      >
        {index && <span aria-hidden="true">{index}</span>}
        <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-aqua-300/60" : "bg-aqua-700/50"}`} />
        <span>{eyebrow}</span>
      </p>
      <h2
        id={id}
        data-reveal
        className={`mt-5 text-[clamp(1.875rem,1.35rem+2.2vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance ${
          dark ? "text-white" : "text-atlas-950"
        }`}
      >
        {title}
      </h2>
      {children}
    </header>
  );
}
