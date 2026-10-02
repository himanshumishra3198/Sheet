"use client";

import { createContext, useContext } from "react";
import { A2Z_LEVELS, type Levels } from "@/lib/levels";

// Difficulty labels of the sheet being shown (Easy/Medium/Hard or
// Basic/Core/Pro). Defaults to the A2Z labels.
const LevelsContext = createContext<Levels>(A2Z_LEVELS);

export const LevelsProvider = LevelsContext.Provider;

export function useLevels(): Levels {
  return useContext(LevelsContext);
}
