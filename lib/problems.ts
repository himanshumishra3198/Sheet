import data from "@/problems/problems.json";
import { formatTitle } from "./format-title";
import { TOPIC_META } from "./topic-meta";

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export type Problem = {
  // Stable key for saved progress: derived from the source topic and title,
  // so it survives reordering and display-name changes.
  id: string;
  title: string;
  difficulty: Difficulty;
  leetcodeUrl: string | null;
  gfgUrl: string | null;
};

export type Counts = Record<Difficulty, number> & { total: number };

export type Topic = {
  slug: string;
  name: string;
  noun: string;
  summary: string;
  number: number;
  problems: Problem[];
  counts: Counts;
};

type RawProblem = {
  title: string;
  difficulty: string;
  leetcodeurl?: string;
  gfgurl?: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function countByDifficulty(problems: { difficulty: Difficulty }[]): Counts {
  const counts: Counts = { easy: 0, medium: 0, hard: 0, total: problems.length };
  for (const p of problems) counts[p.difficulty]++;
  return counts;
}

const seen = new Set<string>();

export const topics: Topic[] = Object.entries(
  data as Record<string, RawProblem[]>
).map(([key, raw], i) => {
  const meta = TOPIC_META[key];
  if (!meta) throw new Error(`No TOPIC_META entry for topic "${key}"`);
  const problems = raw.map((p): Problem => {
    if (!DIFFICULTIES.includes(p.difficulty as Difficulty)) {
      throw new Error(`Unknown difficulty "${p.difficulty}" for "${p.title}"`);
    }
    const id = `${slugify(key)}/${slugify(p.title)}`;
    if (seen.has(id)) throw new Error(`Duplicate problem id ${id}`);
    seen.add(id);
    return {
      id,
      title: formatTitle(p.title),
      difficulty: p.difficulty as Difficulty,
      leetcodeUrl: p.leetcodeurl?.trim() || null,
      gfgUrl: p.gfgurl?.trim() || null,
    };
  });
  return {
    slug: meta.slug,
    name: meta.name,
    noun: meta.noun,
    summary: meta.summary,
    number: i + 1,
    problems,
    counts: countByDifficulty(problems),
  };
});

export const allProblems: Problem[] = topics.flatMap((t) => t.problems);

export const totals: Counts = countByDifficulty(allProblems);

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
