// import { prismaClient } from "@/prisma/src";
import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const prismaClient = new PrismaClient();
  try {
    const data = await prismaClient.problem.findMany();
    await prismaClient.$disconnect();

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch problems:", error);
    await prismaClient.$disconnect();
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
