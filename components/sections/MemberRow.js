import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { initials } from "@/lib/initials";

const ROW = "group flex items-center gap-4 border-t border-atlas-100 py-4";

/** One committee member in a list. Pass `href` to make the whole row a link to the profile. */
export default function MemberRow({ member, href }) {
  const subtitle = [member.designation, member.department].filter(Boolean).join(" · ");
  // ATLAS faculty show designation · department; external members also need their affiliation.
  const affiliation = member.department ? null : member.affiliation;

  const content = (
    <>
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-atlas-50 font-mono text-xs font-semibold tracking-wider text-atlas-700 ring-1 ring-atlas-100 transition-colors duration-300 group-hover:bg-aqua-500 group-hover:text-atlas-950 group-hover:ring-aqua-500"
      >
        {initials(member.name)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold tracking-tight break-words text-atlas-950">{member.name}</span>
        {subtitle && <span className="block text-sm break-words text-atlas-950/60">{subtitle}</span>}
        {affiliation && <span className="block text-sm break-words text-atlas-950/60">{affiliation}</span>}
      </span>
      {href && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-atlas-300 transition-[color,transform] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-aqua-700"
        />
      )}
    </>
  );

  if (!href) return <li className={ROW}>{content}</li>;

  return (
    <li className="border-t border-atlas-100">
      <Link
        href={href}
        className="group flex items-center gap-4 rounded-lg py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-700"
      >
        {content}
      </Link>
    </li>
  );
}
