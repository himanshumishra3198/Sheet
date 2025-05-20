"use client";
import { Card } from "@/components/ui/card";
import { ProblemType } from "../utils/ProblemType";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProgressBar({
  problems,
  solvedProblemsIds,
}: {
  problems: ProblemType[];
  solvedProblemsIds: number[];
}) {
  const [totalProblems, setTotalProblems] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);
  const [easyTotal, setEasyTotal] = useState(0);
  const [easySolved, setEasySolved] = useState(0);
  const [mediumTotal, setMediumTotal] = useState(0);
  const [mediumSolved, setMediumSolved] = useState(0);
  const [hardTotal, setHardTotal] = useState(0);
  const [hardSolved, setHardSolved] = useState(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    let easy = problems.filter((p) => p.difficulty === "easy").length;
    let medium = problems.filter((p) => p.difficulty === "medium").length;
    let hard = problems.filter((p) => p.difficulty === "hard").length;

    setTotalProblems(easy + medium + hard);
    setEasyTotal(easy);
    setMediumTotal(medium);
    setHardTotal(hard);

    if (status === "authenticated" && session && session.user) {
      easy = 0;
      medium = 0;
      hard = 0;

      solvedProblemsIds.forEach((solvedId) => {
        problems.forEach((problem) => {
          if (problem.id === solvedId) {
            if (problem.difficulty === "easy") easy++;
            else if (problem.difficulty === "medium") medium++;
            else if (problem.difficulty === "hard") hard++;
          }
        });
      });

      setEasySolved(easy);
      setMediumSolved(medium);
      setHardSolved(hard);
      setTotalSolved(easy + medium + hard);
    }
  }, [session, solvedProblemsIds]);

  const totalPercentage = totalProblems
    ? Math.round((totalSolved / totalProblems) * 100)
    : 0;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (totalPercentage / 100) * circumference;

  return (
    <Card className="text-[var(--gray-100)] p-4 sm:p-6 bg-[var(--gray-900)] rounded-2xl shadow-neutral-800 border-0">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        {/* Total Progress */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-sm font-medium mb-1">Total Progress</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{totalSolved}</span>
            <span className="text-2xl font-bold mx-1">/</span>
            <span className="text-2xl font-bold">{totalProblems}</span>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#333333"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#4f46e5"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{totalPercentage}%</span>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
          <DifficultySection
            label="Easy"
            solved={easySolved}
            total={easyTotal}
          />
          <div className="hidden md:block w-px h-16 bg-gray-700 mx-4" />
          <DifficultySection
            label="Medium"
            solved={mediumSolved}
            total={mediumTotal}
          />
          <div className="hidden md:block w-px h-16 bg-gray-700 mx-4" />
          <DifficultySection
            label="Hard"
            solved={hardSolved}
            total={hardTotal}
          />
        </div>
      </div>
    </Card>
  );
}

interface DifficultyProps {
  label: string;
  solved: number;
  total: number;
}

function DifficultySection({ label, solved, total }: DifficultyProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-sm font-medium mb-1">{label}</span>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{solved}</span>
        <span className="text-2xl font-bold mx-1">/</span>
        <span className="text-2xl font-bold">{total}</span>
        <span className="text-xs text-gray-400 ml-1">completed</span>
      </div>
    </div>
  );
}
