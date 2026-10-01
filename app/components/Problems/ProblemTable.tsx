"use client";
import { GFGSVG } from "@/app/utils/GFGSVG";
import { LeetcodeSVG } from "@/app/utils/LeetcodeSVG";
import { ProblemType } from "@/app/utils/ProblemType";
import confetti from "canvas-confetti";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef, useState } from "react";

export function ProblemTable({
  problems,
  type,
  topic,
  solvedProblemsIds,
  confetti: confettiEnabled,
  addSolvedProblems,
  removeSolvedProblems,
}: {
  problems: ProblemType[];
  type: string;
  topic: string;
  solvedProblemsIds: number[];
  confetti: boolean;
  addSolvedProblems: (val: number) => void;
  removeSolvedProblems: (val: number) => void;
}) {
  // const [solved, setSolved] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  const confettiColors = ["#bb0000", "#ffffff"];
  useEffect(() => {
    // Create confetti instance
    let confettiInstance: confetti.CreateTypes | null = null;

    if (confettiCanvasRef.current && visible) {
      confettiInstance = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      });

      // Fire initial burst
      confettiInstance({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: confettiColors,
        shapes: ["square", "circle"],
        scalar: 1.2,
      });

      // Create ribbon effect
      const ribbonInterval = setInterval(() => {
        confettiInstance?.({
          particleCount: 20,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: confettiColors,
        });

        confettiInstance?.({
          particleCount: 20,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: confettiColors,
        });
      }, 150);

      // Set timeout to hide component
      const timeout = setTimeout(() => {
        clearInterval(ribbonInterval);
        setVisible(false);
      }, 3000);

      return () => {
        clearInterval(ribbonInterval);
        clearTimeout(timeout);
        confettiInstance?.reset();
      };
    }
  }, [visible]);
  function handleMarked(value: boolean, problemId: number) {
    if (value) {
      addSolvedProblems(problemId);
      if (confettiEnabled) {
        setVisible(false);
        setVisible(true);
      }
    } else {
      removeSolvedProblems(problemId);
    }
  }

  const renderProblems = problems
    .filter(
      (problem: ProblemType) =>
        problem.difficulty === type && problem.topic === topic
    )
    .map((problem) => {
      const marked = solvedProblemsIds.includes(problem.id);
      return (
        <TableRow
          key={problem.id * 10000}
          className={marked ? "bg-green-900" : "hover:bg-muted/30"}
        >
          <TableCell className="w-1/6">
            <Checkbox
              checked={marked}
              onCheckedChange={(value) => {
                handleMarked(value.valueOf() == true, problem.id);
              }}
            />
          </TableCell>
          <TableCell className="w-1/2">
            {problem.title[0].toUpperCase() +
              problem.title.split("").splice(1).join("")}
          </TableCell>
          {
            <TableCell className="pl-8 w-1/6">
              {problem.leetcodeUrl && problem.leetcodeUrl?.length > 0 && (
                <a
                  className="cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={problem.leetcodeUrl}
                >
                  {<LeetcodeSVG />}
                </a>
              )}
            </TableCell>
          }
          {
            <TableCell className="pl-3 w-1/6">
              {problem.gfgUrl && problem.gfgUrl?.length > 0 && (
                <a
                  className="cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={problem.gfgUrl}
                >
                  {<GFGSVG />}
                </a>
              )}
            </TableCell>
          }
          <TableCell className="text-right">
            {problem.difficulty[0].toUpperCase() +
              problem.difficulty.split("").splice(1).join("")}
          </TableCell>
        </TableRow>
      );
    });
  return (
    <>
      <canvas
        ref={confettiCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-50"
      />
      <Table className="text-lg">
        <TableHeader>
          <TableRow className="hover:bg-muted/30">
            <TableHead className="w-1/6 text-[var(--gray-200)]">
              Status
            </TableHead>
            <TableHead className="w-1/2 text-[var(--gray-200)]">
              Problem
            </TableHead>
            <TableHead className="w-1/6 text-[var(--gray-200)]">
              Leetcode
            </TableHead>
            <TableHead className="w-1/6 text-[var(--gray-200)]">GFG</TableHead>
            <TableHead className="w-1/6 text-[var(--gray-200)] text-right">
              Difficulty
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderProblems}</TableBody>
      </Table>
    </>
  );
}
