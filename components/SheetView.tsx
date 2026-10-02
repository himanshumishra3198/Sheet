"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Levels } from "@/lib/levels";
import type { Topic } from "@/lib/problems";
import { useHydrated, useSolved } from "@/lib/progress";
import { LevelsProvider } from "./levels";
import { useToggleSolved } from "./ProblemList";
import { ProgressPanel } from "./ProgressPanel";
import { Toolbar } from "./Toolbar";
import { TopicSection } from "./TopicSection";
import { useProblemFilter } from "./useProblemFilter";

const EMPTY: ReadonlySet<string> = new Set();

// One sheet: hero (children) with the progress panel, then the toolbar and
// collapsible topics. Used by both the A2Z and the SDE sheet.
export function SheetView({
  topics,
  levels,
  children,
}: {
  topics: Topic[];
  levels: Levels;
  children: ReactNode;
}) {
  const solved = useSolved();
  const hydrated = useHydrated();
  const filter = useProblemFilter();
  const onToggle = useToggleSolved();
  const [open, setOpen] = useState<ReadonlySet<string>>(EMPTY);

  const total = useMemo(() => topics.reduce((n, t) => n + t.counts.total, 0), [topics]);
  const topicOfProblem = useMemo(() => {
    const map = new Map<string, string>();
    for (const t of topics) for (const p of t.problems) map.set(p.id, t.slug);
    return map;
  }, [topics]);

  const sections = useMemo(
    () =>
      topics.map((topic) => ({
        topic,
        problems: filter.active
          ? topic.problems.filter((p) => filter.matches(p, solved.has(p.id)))
          : topic.problems,
        solvedCount: topic.problems.reduce((n, p) => n + (solved.has(p.id) ? 1 : 0), 0),
      })),
    [topics, filter.active, filter.matches, solved]
  );
  const visible = filter.active ? sections.filter((s) => s.problems.length > 0) : sections;
  const matchCount = visible.reduce((n, s) => n + s.problems.length, 0);

  // While filtering, open exactly the topics with matches; restore the
  // previous layout when the filter is cleared.
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);
  const beforeFilter = useRef<ReadonlySet<string> | null>(null);
  const matchingKey = filter.active ? visible.map((s) => s.topic.slug).join() : "";
  useEffect(() => {
    if (filter.active) {
      beforeFilter.current ??= openRef.current;
      setOpen(new Set(matchingKey.split(",")));
    } else if (beforeFilter.current) {
      setOpen(beforeFilter.current);
      beforeFilter.current = null;
    }
  }, [filter.active, matchingKey]);

  const setTopicOpen = useCallback((slug: string, isOpen: boolean) => {
    setOpen((prev) => {
      if (prev.has(slug) === isOpen) return prev;
      const next = new Set(prev);
      if (isOpen) next.add(slug);
      else next.delete(slug);
      return next;
    });
  }, []);

  // Open the topic holding a problem (or the topic itself) and scroll to it.
  const reveal = useCallback(
    (id: string) => {
      const slug = topicOfProblem.get(id) ?? (topics.some((t) => t.slug === id) ? id : null);
      if (!slug) return;
      beforeFilter.current = null;
      filter.reset();
      setTopicOpen(slug, true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          el?.scrollIntoView({ block: topicOfProblem.has(id) ? "center" : "start" });
          el?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
        })
      );
    },
    [topics, topicOfProblem, filter.reset, setTopicOpen]
  );

  // Deep links: hm0.org/#arrays or hm0.org/#arrays/2sum-problem.
  useEffect(() => {
    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) reveal(id);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [reveal]);

  const allOpen = visible.every((s) => open.has(s.topic.slug));

  return (
    <LevelsProvider value={levels}>
      <div className="mx-auto grid max-w-5xl items-start gap-8 px-4 pt-10 pb-12 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {children}
        <ProgressPanel
          topics={topics}
          solved={solved}
          hydrated={hydrated}
          onContinue={(id) => {
            if (window.location.hash === `#${id}`) reveal(id);
            else window.location.hash = id;
          }}
        />
      </div>

      <section
        id="topics"
        aria-labelledby="topics-heading"
        className="mx-auto max-w-5xl scroll-mt-14 px-4"
      >
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <h2 id="topics-heading" className="text-xl font-semibold tracking-tight">
            All {topics.length} topics
          </h2>
          <p className="text-sm text-muted" aria-live="polite">
            {filter.active
              ? `${matchCount} of ${total} problems match`
              : `${total} problems`}
          </p>
        </div>
        <div className="z-30 -mx-4 mb-4 bg-bg/90 px-4 py-2 backdrop-blur-md sm:sticky sm:top-14">
          <Toolbar filter={filter} total={total}>
            <button
              type="button"
              onClick={() =>
                setOpen(allOpen ? EMPTY : new Set(visible.map((s) => s.topic.slug)))
              }
              className="h-9 shrink-0 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors hover:text-fg"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </Toolbar>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center">
            <p className="font-medium">No problems match these filters.</p>
            <button
              type="button"
              onClick={filter.reset}
              className="mt-3 text-sm font-medium text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((s) => (
              <TopicSection
                key={s.topic.slug}
                topic={s.topic}
                problems={s.problems}
                open={open.has(s.topic.slug)}
                onOpenChange={setTopicOpen}
                solved={solved}
                solvedCount={s.solvedCount}
                hydrated={hydrated}
                filtering={filter.active}
                onToggle={onToggle}
              />
            ))}
          </div>
        )}
      </section>
    </LevelsProvider>
  );
}
