"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { DIFFICULTIES, type Difficulty, type Problem, type Topic } from "@/lib/problems";
import { resetProgress } from "@/lib/progress";
import { Bar, DIFFICULTY_LABEL, Ring } from "./Meters";

export function ProgressPanel({
  topics,
  solved,
  hydrated,
  onContinue,
}: {
  topics: Topic[];
  solved: ReadonlySet<string>;
  hydrated: boolean;
  onContinue: (problemId: string) => void;
}) {
  const stats = useMemo(() => {
    const done: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 };
    const total: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 };
    let next: { problem: Problem; topic: Topic } | null = null;
    for (const topic of topics) {
      for (const problem of topic.problems) {
        total[problem.difficulty]++;
        if (solved.has(problem.id)) done[problem.difficulty]++;
        else next ??= { problem, topic };
      }
    }
    const solvedCount = done.easy + done.medium + done.hard;
    const totalCount = total.easy + total.medium + total.hard;
    return { done, total, solvedCount, totalCount, next };
  }, [topics, solved]);

  const pct = stats.totalCount
    ? Math.floor((stats.solvedCount / stats.totalCount) * 100)
    : 0;

  return (
    <section
      aria-labelledby="progress-heading"
      className="rounded-2xl border border-line bg-surface p-5"
    >
      <h2 id="progress-heading" className="sr-only">
        Your progress
      </h2>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Ring value={hydrated ? stats.solvedCount : 0} max={stats.totalCount} />
          <span className="absolute inset-0 grid place-items-center text-base font-semibold tabular-nums">
            {hydrated ? `${pct}%` : "–"}
          </span>
        </div>
        <div>
          <p className="text-sm text-muted">Solved</p>
          <p className="text-2xl font-semibold tabular-nums">
            {hydrated ? stats.solvedCount : "–"}
            <span className="text-base font-normal text-muted">
              {" "}
              / {stats.totalCount}
            </span>
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {DIFFICULTIES.map((d) => (
          <li key={d}>
            <div className="flex justify-between text-sm">
              <span className="text-muted">{DIFFICULTY_LABEL[d]}</span>
              <span className="tabular-nums">
                {hydrated ? stats.done[d] : "–"}
                <span className="text-muted"> / {stats.total[d]}</span>
              </span>
            </div>
            <Bar
              value={hydrated ? stats.done[d] : 0}
              max={stats.total[d]}
              tone={d}
              className="mt-1.5"
            />
          </li>
        ))}
      </ul>

      <div className={`mt-5 border-t border-line pt-4 ${hydrated ? "" : "invisible"}`}>
        {stats.next ? (
          <button
            type="button"
            onClick={() => onContinue(stats.next!.problem.id)}
            className="group flex w-full items-center gap-3 rounded-xl bg-accent px-4 py-3 text-left text-accent-fg transition-opacity hover:opacity-90"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-xs opacity-80">
                {stats.solvedCount ? "Continue" : "Start"} · {stats.next.topic.name}
              </span>
              <span className="block truncate font-medium">
                {stats.next.problem.title}
              </span>
            </span>
            <ArrowRight
              className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        ) : (
          <p className="text-sm font-medium text-solved">
            Every problem solved. Well done!
          </p>
        )}
        <ResetProgress disabled={stats.solvedCount === 0} />
      </div>
    </section>
  );
}

function ResetProgress({ disabled }: { disabled: boolean }) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <div className="mt-3 flex items-center gap-2 text-xs" role="group" aria-label="Confirm reset">
        <span className="text-muted">Clear all progress?</span>
        <button
          type="button"
          onClick={() => {
            resetProgress();
            setConfirming(false);
          }}
          className="rounded-md px-2 py-1 font-medium text-hard hover:bg-surface-2"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-md px-2 py-1 text-muted hover:bg-surface-2 hover:text-fg"
        >
          Cancel
        </button>
      </div>
    );
  }
  return (
    <p className="mt-3 flex items-center justify-between gap-2 text-xs text-muted">
      <span>Saved in this browser</span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-surface-2 hover:text-fg disabled:pointer-events-none disabled:opacity-50"
      >
        <RotateCcw className="size-3" aria-hidden="true" />
        Reset
      </button>
    </p>
  );
}
