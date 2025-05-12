import fs from "fs";
import { PrismaClient } from "../lib/generated/prisma/client.js";
const prisma = new PrismaClient();
async function importProblems() {
  const rawData = fs.readFileSync("problems.json", "utf-8");
  const topics = JSON.parse(rawData);

  const allProblems = [];

  for (const topic in topics) {
    const problems = topics[topic];
    allProblems.push(...problems);
  }

  // Upsert each problem
  for (const problem of allProblems) {
    await prisma.problem.upsert({
      where: {
        title_topic: {
          title: problem.title,
          topic: problem.topic,
        },
      },
      update: {
        difficulty: problem.difficulty,
        leetcodeUrl: problem.leetcodeurl,
        gfgUrl: problem.gfgurl,
      },
      create: {
        title: problem.title,
        difficulty: problem.difficulty,
        topic: problem.topic,
        leetcodeUrl: problem.leetcodeurl,
        gfgUrl: problem.gfgurl,
      },
    });
  }

  console.log(" Problems imported/updated successfully");
  await prisma.$disconnect();
}

importProblems().catch((e) => {
  console.error(" Error importing problems:", e);
  prisma.$disconnect();
});
