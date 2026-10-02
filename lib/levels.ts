import type { Difficulty } from "./problems";

// How each sheet names its three difficulty tiers. Kept free of problem
// data so client components can import it cheaply.
export type Levels = Record<Difficulty, string>;

export const A2Z_LEVELS: Levels = { easy: "Easy", medium: "Medium", hard: "Hard" };

// The SDE sheet's source grades problems Basic / Core / Pro.
export const SDE_LEVELS: Levels = { easy: "Basic", medium: "Core", hard: "Pro" };
