"use client";
import Navbar from "./Navbar";
import { TopicList } from "./Problems/TopicList";

import { ProblemType } from "../utils/ProblemType";
import { HeroSection } from "./HeroSection";
import ProgressBar from "./ProgressBar";
import { useLocalStorage } from "../hooks/useLocalStorage";
export function Dashboard({ problems }: { problems: ProblemType[] }) {
  // Progress is kept in this browser; there are no accounts.
  const [solvedProblemsIds, setSolvedProblemsIds] = useLocalStorage<number[]>(
    "sheet:solved",
    []
  );
  const [confetti, setConfetti] = useLocalStorage("sheet:confetti", true);
  return (
    <div className="h-screen w-screen bg-[var(--gray-1000)] text-[var(--gray-100)] overflow-x-hidden">
      <Navbar confetti={confetti} setConfetti={setConfetti} />
      <HeroSection />
      <div className="w-screen flex items-center justify-center pt-12 px-8 ">
        <ProgressBar
          problems={problems}
          solvedProblemsIds={solvedProblemsIds}
        />
      </div>
      <div className="w-screen flex items-center justify-center pt-12 px-8 ">
        <TopicList
          problems={problems}
          solvedProblemsIds={solvedProblemsIds}
          confetti={confetti}
          addSolvedProblems={(val: number) => {
            setSolvedProblemsIds((prev) =>
              prev.includes(val) ? prev : [...prev, val]
            );
          }}
          removeSolvedProblems={(val: number) => {
            setSolvedProblemsIds((prev) =>
              prev.filter((eachVal) => eachVal !== val)
            );
          }}
        />
      </div>
    </div>
  );
}
