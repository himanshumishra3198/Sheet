// import { prismaClient } from "@/prisma/src";
import { PrismaClient } from "../../../../lib/generated/prisma/client.js";
const prismaClient = new PrismaClient();
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const problemId = parseInt(searchParams.get("problemId") || "");
  const userId = parseInt(searchParams.get("userId") || "");
  const statusParam = searchParams.get("status");

  if (isNaN(problemId) || isNaN(userId) || statusParam === null) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const status = statusParam === "true";

  try {
    const result = await prismaClient.solvedProblem.upsert({
      where: {
        userId_problemId: { userId, problemId },
      },
      update: {
        solved: status,
      },
      create: {
        userId,
        problemId,
        solved: status,
      },
    });
    await prismaClient.$disconnect();
    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving problem status:", error);
    prismaClient.$disconnect();
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
