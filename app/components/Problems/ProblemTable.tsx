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
import { useSession } from "next-auth/react";
import { AuthModal } from "../AuthModal";
import { useFetchUser } from "@/app/hooks/useFetchUser";

export function ProblemTable({
  problems,
  type,
  topic,
  solvedProblemsIds,
  addSolvedProblems,
  removeSolvedProblems,
}: {
  problems: ProblemType[];
  type: string;
  topic: string;
  solvedProblemsIds: number[];
  addSolvedProblems: (val: number) => void;
  removeSolvedProblems: (val: number) => void;
}) {
  // const [solved, setSolved] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const [visible, setVisible] = useState(false);
  const user = useFetchUser(session?.user?.id, session);
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
  async function handleMarked(value: boolean, problemId: number) {
    if (!session?.user) {
      setModalOpen(true);
      return;
    }

    if (value) {
      addSolvedProblems(problemId);
      if (user && user.confetti) setVisible(true);
    } else {
      removeSolvedProblems(problemId);
    }
    const res = await fetch(
      `/api/v1/problem-status?problemId=${problemId}&&userId=${session?.user?.id}&&status=${value}`,
      {
        method: "POST",
      }
    );
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
          className={marked ? "bg-green-700" : ""}
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
        <TableHeader className="">
          <TableRow>
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
      <AuthModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        authType="login"
      />
    </>
  );
}
