import { useCallback, useDeferredValue, useState } from "react";
import type { Difficulty, Problem } from "@/lib/problems";

export type DifficultyFilter = "all" | Difficulty;
export type StatusFilter = "all" | "todo" | "solved";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export function useProblemFilter() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  // Typing stays responsive while the list re-filters.
  const needle = normalize(useDeferredValue(query));

  const active = needle !== "" || difficulty !== "all" || status !== "all";

  const matches = useCallback(
    (problem: Problem, solved: boolean) =>
      (difficulty === "all" || problem.difficulty === difficulty) &&
      (status === "all" || (status === "solved") === solved) &&
      (needle === "" || normalize(problem.title).includes(needle)),
    [needle, difficulty, status]
  );

  const reset = useCallback(() => {
    setQuery("");
    setDifficulty("all");
    setStatus("all");
  }, []);

  return {
    query,
    setQuery,
    difficulty,
    setDifficulty,
    status,
    setStatus,
    active,
    matches,
    reset,
  };
}

export type ProblemFilter = ReturnType<typeof useProblemFilter>;
