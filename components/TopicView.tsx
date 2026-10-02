"use client";

import { useMemo, type ReactNode } from "react";
import { DIFFICULTIES, type Topic } from "@/lib/problems";
import { useHydrated, useSolved } from "@/lib/progress";
import { Bar } from "./Meters";
import { useLevels } from "./levels";
import { ProblemList, useToggleSolved } from "./ProblemList";
import { Toolbar } from "./Toolbar";
import { useProblemFilter } from "./useProblemFilter";

const LABEL_COLOR = { easy: "text-easy", medium: "text-medium", hard: "text-hard" };

export function TopicView({ topic, children }: { topic: Topic; children: ReactNode }) {
  const solved = useSolved();
  const hydrated = useHydrated();
  const filter = useProblemFilter();
  const onToggle = useToggleSolved();
  const levels = useLevels();

  const done = useMemo(() => {
    const counts = { easy: 0, medium: 0, hard: 0, total: 0 };
    for (const p of topic.problems) {
      if (solved.has(p.id)) {
        counts[p.difficulty]++;
        counts.total++;
      }
    }
    return counts;
  }, [topic, solved]);

  const problems = filter.active
    ? topic.problems.filter((p) => filter.matches(p, solved.has(p.id)))
    : topic.problems;

  return (
    <>
      <div className="grid items-start gap-8 pt-6 pb-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        {children}
        <section
          aria-labelledby="topic-progress"
          className="rounded-2xl border border-line bg-surface p-5"
        >
          <h2 id="topic-progress" className="text-sm text-muted">
            Your progress
          </h2>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {hydrated ? done.total : "–"}
            <span className="text-base font-normal text-muted"> / {topic.counts.total} solved</span>
          </p>
          <Bar value={hydrated ? done.total : 0} max={topic.counts.total} className="mt-3" />
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            {DIFFICULTIES.map((d) => (
              <div key={d} className="rounded-lg bg-surface-2 px-2 py-2">
                <dt className={`text-xs ${LABEL_COLOR[d]}`}>{levels[d]}</dt>
                <dd className="mt-0.5 tabular-nums">
                  {hydrated ? done[d] : "–"}
                  <span className="text-muted">/{topic.counts[d]}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className="z-30 -mx-4 mb-4 bg-bg/90 px-4 py-2 backdrop-blur-md sm:sticky sm:top-14">
        <Toolbar filter={filter} total={topic.counts.total} />
      </div>
      <section
        aria-label={`${topic.name} problems`}
        className="overflow-hidden rounded-2xl border border-line bg-surface"
      >
        {problems.length ? (
          <ProblemList problems={problems} solved={solved} onToggle={onToggle} />
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="font-medium">No problems match these filters.</p>
            <button
              type="button"
              onClick={filter.reset}
              className="mt-3 text-sm font-medium text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
