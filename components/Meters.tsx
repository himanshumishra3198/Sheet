import type { Difficulty } from "@/lib/problems";

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const BAR_COLOR: Record<Difficulty | "solved", string> = {
  easy: "bg-easy",
  medium: "bg-medium",
  hard: "bg-hard",
  solved: "bg-solved",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`badge badge-${difficulty}`}>
      {DIFFICULTY_LABEL[difficulty]}
    </span>
  );
}

// Decorative: the numbers next to it carry the meaning.
export function Bar({
  value,
  max,
  tone = "solved",
  className = "",
}: {
  value: number;
  max: number;
  tone?: Difficulty | "solved";
  className?: string;
}) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div
      aria-hidden="true"
      className={`h-1.5 overflow-hidden rounded-full bg-surface-2 ${className}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${BAR_COLOR[tone]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Ring({ value, max }: { value: number; max: number }) {
  const r = 34;
  const circumference = 2 * Math.PI * r;
  const fraction = max ? value / max : 0;
  return (
    <svg viewBox="0 0 80 80" className="size-20 -rotate-90" aria-hidden="true">
      <circle cx="40" cy="40" r={r} fill="none" strokeWidth="8" className="stroke-surface-2" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - fraction)}
        className="stroke-solved transition-[stroke-dashoffset] duration-700"
        // A zero-length round cap still draws a dot; hide it at 0%.
        opacity={fraction === 0 ? 0 : 1}
      />
    </svg>
  );
}
