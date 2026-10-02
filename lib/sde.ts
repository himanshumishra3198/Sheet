import data from "@/problems/sde-sheet.json";
import { formatTitle } from "./format-title";
import {
  countByDifficulty,
  problemById,
  slugify,
  type Difficulty,
  type Problem,
  type Topic,
} from "./problems";

// problems/sde-sheet.json: topics -> patterns -> problems. A problem that is
// also on the A2Z sheet names it in `a2z`; it then reuses that problem's id
// (so progress is shared between the sheets) and its links. Links given on
// the SDE entry fill in what the A2Z entry lacks.

type RawProblem = {
  title: string;
  difficulty: "basic" | "core" | "pro";
  a2z?: string;
  leetcodeurl?: string;
  gfgurl?: string;
};

type RawTopic = {
  name: string;
  patterns: { name: string; problems: RawProblem[] }[];
};

const TIER: Record<RawProblem["difficulty"], Difficulty> = {
  basic: "easy",
  core: "medium",
  pro: "hard",
};

const seen = new Set<string>();

function toProblem(raw: RawProblem): Problem {
  const shared = raw.a2z ? problemById.get(raw.a2z) : undefined;
  if (raw.a2z && !shared) {
    throw new Error(`SDE problem "${raw.title}" points at unknown A2Z problem "${raw.a2z}"`);
  }
  if (!TIER[raw.difficulty]) {
    throw new Error(`Unknown SDE difficulty "${raw.difficulty}" for "${raw.title}"`);
  }
  const id = shared?.id ?? `sde/${slugify(raw.title)}`;
  if (seen.has(id)) throw new Error(`Two SDE problems share the id ${id}`);
  seen.add(id);
  return {
    id,
    title: formatTitle(raw.title),
    difficulty: TIER[raw.difficulty],
    leetcodeUrl: shared?.leetcodeUrl ?? raw.leetcodeurl ?? null,
    gfgUrl: shared?.gfgUrl ?? raw.gfgurl ?? null,
  };
}

export const sdeTopics: Topic[] = (data.topics as RawTopic[]).map((t, i) => {
  const groups = t.patterns.map((p) => ({ name: p.name, problems: p.problems.map(toProblem) }));
  const problems = groups.flatMap((g) => g.problems);
  return {
    slug: slugify(t.name),
    name: t.name,
    noun: t.name,
    summary: "",
    number: i + 1,
    problems,
    counts: countByDifficulty(problems),
    groups: groups.map((g) => ({ name: g.name, size: g.problems.length })),
  };
});

export const sdeProblems: Problem[] = sdeTopics.flatMap((t) => t.problems);
export const sdeTotals = countByDifficulty(sdeProblems);
export const sdePatternCount = sdeTopics.reduce((n, t) => n + (t.groups?.length ?? 0), 0);
