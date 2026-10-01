import { allProblems } from "./problems";

// Progress saved before 2026-10-02 holds database ids, which were assigned
// 1..N in the order problems appear in problems/problems.json.
export function idsFromLegacy(legacy: unknown[]): string[] {
  return legacy
    .map((n) => (typeof n === "number" ? allProblems[n - 1]?.id : undefined))
    .filter((id): id is string => Boolean(id));
}
