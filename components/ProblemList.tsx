"use client";

import { memo, useCallback } from "react";
import { celebrate } from "@/lib/confetti";
import type { Problem } from "@/lib/problems";
import { setSolved, useConfetti } from "@/lib/progress";
import { SpriteIcon } from "./icons";
import { DifficultyBadge } from "./Meters";

export type ToggleSolved = (
  problem: Problem,
  solved: boolean,
  from: HTMLElement
) => void;

export function useToggleSolved(): ToggleSolved {
  const confetti = useConfetti();
  return useCallback(
    (problem, solved, from) => {
      setSolved(problem.id, solved);
      if (solved && confetti) celebrate(from);
    },
    [confetti]
  );
}

export function ProblemList({
  problems,
  solved,
  onToggle,
}: {
  problems: Problem[];
  solved: ReadonlySet<string>;
  onToggle: ToggleSolved;
}) {
  return (
    <ol className="divide-y divide-line">
      {problems.map((p) => (
        <ProblemRow
          key={p.id}
          problem={p}
          solved={solved.has(p.id)}
          onToggle={onToggle}
        />
      ))}
    </ol>
  );
}

// Rows are memoized: ticking one problem re-renders only that row. The
// markup is kept small (styles in globals.css) because the home page
// renders all 428 rows.
const ProblemRow = memo(function ProblemRow({
  problem,
  solved,
  onToggle,
}: {
  problem: Problem;
  solved: boolean;
  onToggle: ToggleSolved;
}) {
  return (
    <li id={problem.id} className="problem-row" data-solved={solved || undefined}>
      <label>
        <input
          type="checkbox"
          className="check"
          checked={solved}
          onChange={(e) => onToggle(problem, e.target.checked, e.target)}
          aria-label={`Solved: ${problem.title}`}
        />
      </label>
      <span className="title">{problem.title}</span>
      <DifficultyBadge difficulty={problem.difficulty} />
      <span className="links">
        <PlatformLink href={problem.leetcodeUrl} platform="LeetCode" title={problem.title} />
        <PlatformLink href={problem.gfgUrl} platform="GFG" title={problem.title} />
      </span>
    </li>
  );
});

function PlatformLink({
  href,
  platform,
  title,
}: {
  href: string | null;
  platform: "LeetCode" | "GFG";
  title: string;
}) {
  const kind = platform === "LeetCode" ? "lc" : "gfg";
  // An empty slot keeps the link columns aligned across rows.
  if (!href) return <span className={`pl pl-${kind} pl-empty`} aria-hidden="true" />;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Solve ${title} on ${platform}`}
      className={`pl pl-${kind}`}
    >
      <SpriteIcon id={`i-${kind}`} />
      <span>{platform}</span>
    </a>
  );
}
