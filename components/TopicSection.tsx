"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import type { Problem, Topic } from "@/lib/problems";
import { Bar } from "./Meters";
import { ProblemList, type ToggleSolved } from "./ProblemList";

export function TopicSection({
  topic,
  problems,
  open,
  onOpenChange,
  solved,
  solvedCount,
  hydrated,
  filtering,
  onToggle,
}: {
  topic: Topic;
  problems: Problem[];
  open: boolean;
  onOpenChange: (slug: string, open: boolean) => void;
  solved: ReadonlySet<string>;
  solvedCount: number;
  hydrated: boolean;
  filtering: boolean;
  onToggle: ToggleSolved;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const panelId = `${topic.slug}-problems`;
  const statusId = `${topic.slug}-status`;

  // Collapsed problems stay in the HTML for search engines. On the client
  // they're marked hidden="until-found", so the browser's find-in-page and
  // #problem links still reach them and open the topic.
  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (!open) el.setAttribute("hidden", "until-found");
    const reveal = () => onOpenChange(topic.slug, true);
    el.addEventListener("beforematch", reveal);
    return () => el.removeEventListener("beforematch", reveal);
  }, [open, onOpenChange, topic.slug]);

  return (
    <section
      id={topic.slug}
      className="scroll-mt-20 overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="relative flex items-center gap-3 px-4 py-4 transition-colors hover:bg-surface-2/60 has-[button:focus-visible]:outline-2 has-[button:focus-visible]:-outline-offset-2 has-[button:focus-visible]:outline-accent sm:gap-4 sm:px-5">
        <span
          aria-hidden="true"
          className="w-6 shrink-0 text-sm font-medium text-muted tabular-nums"
        >
          {String(topic.number).padStart(2, "0")}
        </span>
        <h3 className="min-w-0 flex-1 font-semibold sm:text-lg">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-describedby={statusId}
            onClick={() => onOpenChange(topic.slug, !open)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {topic.name}
          </button>
        </h3>
        <span id={statusId} className="sr-only">
          {filtering
            ? `${problems.length} ${problems.length === 1 ? "match" : "matches"}`
            : hydrated
              ? `${solvedCount} of ${topic.counts.total} solved`
              : `${topic.counts.total} problems`}
        </span>
        <span aria-hidden="true" className="flex shrink-0 items-center gap-3 text-sm text-muted tabular-nums">
          {filtering ? (
            `${problems.length} ${problems.length === 1 ? "match" : "matches"}`
          ) : (
            <>
              {hydrated ? `${solvedCount}/${topic.counts.total}` : topic.counts.total}
              <Bar
                value={hydrated ? solvedCount : 0}
                max={topic.counts.total}
                className="hidden w-20 sm:block"
              />
            </>
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
      <div id={panelId} ref={panel} hidden={!open} className="border-t border-line">
        {(topic.summary || topic.href) && (
          <div className="flex flex-col gap-2 px-4 py-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-5">
            {topic.summary && <p className="max-w-2xl">{topic.summary}</p>}
            {topic.href && (
              <Link
                href={topic.href}
                className="inline-flex shrink-0 items-center gap-1 font-medium text-accent hover:underline"
              >
                {topic.name} page
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
        {topic.groups ? (
          <GroupedList topic={topic} problems={problems} solved={solved} onToggle={onToggle} />
        ) : (
          <ProblemList problems={problems} solved={solved} onToggle={onToggle} />
        )}
      </div>
    </section>
  );
}

// Problems under their pattern sub-headings; `problems` is the filtered
// subset to show.
function GroupedList({
  topic,
  problems,
  solved,
  onToggle,
}: {
  topic: Topic;
  problems: Problem[];
  solved: ReadonlySet<string>;
  onToggle: ToggleSolved;
}) {
  const visible = new Set(problems.map((p) => p.id));
  let start = 0;
  const groups = (topic.groups ?? []).map((g) => {
    const items = topic.problems.slice(start, (start += g.size)).filter((p) => visible.has(p.id));
    return { name: g.name, items };
  });
  return (
    <>
      {groups.map(
        (g) =>
          g.items.length > 0 && (
            <div key={g.name} className="border-t border-line first:border-t-0">
              <h4 className="flex items-baseline gap-2 bg-surface-2/50 px-4 py-2 text-xs font-semibold tracking-wide text-muted uppercase sm:px-5">
                {g.name}
                <span className="font-normal normal-case tabular-nums">· {g.items.length}</span>
              </h4>
              <ProblemList problems={g.items} solved={solved} onToggle={onToggle} />
            </div>
          )
      )}
    </>
  );
}
