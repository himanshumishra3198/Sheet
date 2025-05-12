import { Dashboard } from "./components/Dashboard";
import { SessionProvider } from "next-auth/react";
import { prismaClient } from "@/prisma/src";
import { ProblemType } from "./utils/ProblemType";

export default async function Home() {
  const data: ProblemType[] = await prismaClient.problem.findMany();
  await prismaClient.$disconnect().catch((e) => {
    console.error("Error disconnecting Prisma:", e);
  });
  // console.log(data);
  return (
    <SessionProvider>
      <div className="h-screen w-screen">
        <Dashboard problems={data} />
      </div>
    </SessionProvider>
  );
}
