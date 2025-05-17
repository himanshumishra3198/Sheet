"use client";
import Navbar from "./Navbar";
import { TopicList } from "./Problems/TopicList";

import { ProblemType } from "../utils/ProblemType";
import { HeroSection } from "./HeroSection";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export function Dashboard({ problems }: { problems: ProblemType[] }) {
  const [solvedProblemsIds, setSolvedProblemsIds] = useState<number[]>([]);
  const { data: session } = useSession();

  async function fetchProblems() {
    if (session?.user?.id) {
      const res = await fetch(`/api/v1/problems/${session.user.id}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSolvedProblemsIds(data.problemIds as number[]);
      }
    }
  }
  // if (user) setVisible(user?.confetti);
  useEffect(() => {
    fetchProblems();
  }, [session]);
  return (
    <div className="h-screen w-screen bg-[var(--gray-1000)] text-[var(--gray-100)] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <div className="flex items-center justify-center pt-12">
        <ProgressBar
          problems={problems}
          solvedProblemsIds={solvedProblemsIds}
        />
      </div>
      <div className="w-full flex items-center justify-center pt-12">
        <TopicList
          problems={problems}
          solvedProblemsIds={solvedProblemsIds}
          addSolvedProblems={(val: number) => {
            setSolvedProblemsIds([...solvedProblemsIds, val]);
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
