import { prismaClient } from "@/prisma/src";
import { ProblemType } from "./utils/ProblemType";
import App from "./App";

export default async function Home() {
  const data: ProblemType[] = await prismaClient.problem.findMany();

  // await prismaClient.$disconnect().catch((e) => {
  //   console.error("Error disconnecting Prisma:", e);
  // });
  // console.log(data);
  return <App problems={data} />;
}
