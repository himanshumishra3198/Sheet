"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import type { DifficultyFilter, ProblemFilter, StatusFilter } from "./useProblemFilter";

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex shrink-0 rounded-lg border border-line bg-surface p-0.5"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className="h-8 rounded-md px-2.5 text-sm text-muted transition-colors hover:text-fg aria-pressed:bg-surface-2 aria-pressed:font-medium aria-pressed:text-fg"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const DIFFICULTY_OPTIONS: { value: DifficultyFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "todo", label: "To do" },
  { value: "solved", label: "Solved" },
];

export function Toolbar({
  filter,
  total,
  children,
}: {
  filter: ProblemFilter;
  total: number;
  children?: ReactNode;
}) {
  const input = useRef<HTMLInputElement>(null);

  // "/" jumps to search, as on GitHub and LeetCode.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !target.closest("input, textarea, select, [contenteditable]")
      ) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-0 grow basis-full sm:basis-64">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          ref={input}
          type="search"
          value={filter.query}
          onChange={(e) => filter.setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && filter.setQuery("")}
          placeholder={`Search ${total} problems`}
          aria-label="Search problems"
          className="h-9 w-full rounded-lg border border-line bg-surface pr-9 pl-9 text-sm placeholder:text-muted focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {filter.query ? (
          <button
            type="button"
            onClick={() => {
              filter.setQuery("");
              input.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute top-1/2 right-1.5 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted hover:text-fg"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded border border-line px-1.5 font-sans text-xs text-muted sm:block">
            /
          </kbd>
        )}
      </div>
      <Segmented
        label="Difficulty"
        value={filter.difficulty}
        options={DIFFICULTY_OPTIONS}
        onChange={filter.setDifficulty}
      />
      <Segmented
        label="Status"
        value={filter.status}
        options={STATUS_OPTIONS}
        onChange={filter.setStatus}
      />
      {children}
    </div>
  );
}
