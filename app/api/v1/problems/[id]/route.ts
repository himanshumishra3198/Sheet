import { prismaClient } from "@/prisma/src";

import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    return new Response(JSON.stringify({ error: "Invalid userId" }), {
      status: 400,
    });
  }

  try {
    const problemIds = await prismaClient.solvedProblem.findMany({
      where: { userId, solved: true },
      select: { problemId: true },
    });
    const ids = problemIds.map((p) => p.problemId);

    return new Response(JSON.stringify({ problemIds: ids }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch problems:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
