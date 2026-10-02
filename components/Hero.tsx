import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export type Stat = { label: string; value: number; tone?: "easy" | "medium" | "hard" };

const TONE = { easy: "text-easy", medium: "text-medium", hard: "text-hard" };

// Left column of a sheet's hero; the progress panel sits beside it.
export function Hero({
  title,
  highlight,
  intro,
  stats,
  crossLink,
}: {
  title: string;
  highlight: string;
  intro: ReactNode;
  stats: Stat[];
  crossLink: { href: string; lead: string; label: string };
}) {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {title},{" "}
        <span className="bg-gradient-to-r from-accent to-[#c084fc] bg-clip-text text-transparent">
          {highlight}
        </span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{intro}</p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        {stats.map((s) => (
          <li key={s.label}>
            <span
              className={`mr-1.5 text-xl font-semibold tabular-nums ${s.tone ? TONE[s.tone] : "text-fg"}`}
            >
              {s.value}
            </span>
            {s.label}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        {crossLink.lead}{" "}
        <Link
          href={crossLink.href}
          className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
        >
          {crossLink.label}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </p>
    </div>
  );
}
