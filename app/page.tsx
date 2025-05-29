"use client";
import { ProblemType } from "./utils/ProblemType";
import App from "./App";
import { useEffect, useState } from "react";

export default function Home() {
  // const data: ProblemType[] = await prismaClient.problem.findMany();
  const [problems, setProblems] = useState<ProblemType[]>([]);
  useEffect(() => {
    const fetchProblems = async () => {
      const res = await fetch("/api/v1/problems");
      if (res.ok) {
        const data = await res.json();

        setProblems(data.data);
      }
    };
    fetchProblems();
  }, []);

  // await prismaClient.$disconnect().catch((e) => {
  //   console.error("Error disconnecting Prisma:", e);
  // });
  // console.log(data);
  if (problems.length === 0) {
    return <div>Loading...</div>;
  }
  return <App problems={problems} />;
}
