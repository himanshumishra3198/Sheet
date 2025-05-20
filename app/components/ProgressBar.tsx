"use client";
import { Card } from "@/components/ui/card";
import { ProblemType } from "../utils/ProblemType";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface ProgressBarProps {
  //   totalProblems: number;
  //   totalSolved: number;
  //   easyTotal: number;
  //   easySolved: number;
  //   mediumTotal: number;
  //   mediumSolved: number;
  //   hardTotal: number;
  //   hardSolved: number;
}
//   totalProblems = 455,
//   totalSolved = 0,
//   easyTotal = 131,
//   easySolved = 0,
//   mediumTotal = 187,
//   mediumSolved = 0,
//   hardTotal = 136,
//   hardSolved = 0,
export default function ProgressBar({
  problems,
  solvedProblemsIds,
}: {
  problems: ProblemType[];
  solvedProblemsIds: number[];
}) {
  // Calculate percentages
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
    let easy = problems.filter(
      (problem) => problem.difficulty === "easy"
    ).length;
    let medium = problems.filter(
      (problem) => problem.difficulty === "medium"
    ).length;
    let hard = problems.filter(
      (problem) => problem.difficulty === "hard"
    ).length;

    setTotalProblems(easy + medium + hard);
    setEasyTotal(easy);
    setMediumTotal(medium);
    setHardTotal(hard);

    // let interval = undefined;
    if (status === "authenticated" && session && session.user) {
      // interval = setInterval(async () => {
      easy = 0;
      medium = 0;
      hard = 0;
      // let res = await fetch(`/api/v1/problems/${session?.user?.id}`);

      // const data = await res.json();

      const solved = solvedProblemsIds;
      solved.map((solvedId) => {
        problems.map((problem) => {
          if (problem.id === solvedId) {
            if (problem.difficulty === "easy") easy++;
            else if (problem.difficulty === "medium") medium++;
            else hard++;
          }
        });
      });
      setEasySolved(easy);
      setMediumSolved(medium);
      setHardSolved(hard);
      setTotalSolved(easy + medium + hard);

      // }, 1500);
    }
  }, [session, solvedProblemsIds]);

  const totalPercentage = totalProblems
    ? totalProblems > 0
      ? Math.round((totalSolved / totalProblems) * 100)
      : 0
    : 0;

  // Calculate the circle's circumference and offset
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (totalPercentage / 100) * circumference;

  return (
    <Card className="text-[var(--gray-100)] block p-6 bg-[var(--gray-900)] rounded-2xl shadow-neutral-800 border-0">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium mb-1">Total Progress</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{totalSolved}</span>
            <span className="text-2xl font-bold mx-1">/</span>
            <span className="text-2xl font-bold">{totalProblems}</span>
          </div>
        </div>

        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#333333"
              strokeWidth="8"
            />
            {/* Progress circle */}
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

        <div className="w-px h-16 bg-gray-700 mx-2" />

        <DifficultySection label="Easy" solved={easySolved} total={easyTotal} />

        <div className="w-px h-16 bg-gray-700 mx-2" />

        <DifficultySection
          label="Medium"
          solved={mediumSolved}
          total={mediumTotal}
        />

        <div className="w-px h-16 bg-gray-700 mx-2" />

        <DifficultySection label="Hard" solved={hardSolved} total={hardTotal} />
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
    <div className="flex flex-col items-center">
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
