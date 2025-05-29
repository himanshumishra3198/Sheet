import { prismaClient } from "@/prisma/src";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await prismaClient.problem.findMany();

    return new Response(JSON.stringify({ data }), {
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
