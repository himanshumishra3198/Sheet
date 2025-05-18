// import { prismaClient } from "@/prisma/src";
import { PrismaClient } from "@/lib/generated/prisma";

import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prismaClient = new PrismaClient();
  const { id } = await params;
  const userId = parseInt(id);

  if (isNaN(userId)) {
    await prismaClient.$disconnect();
    return new Response(JSON.stringify({ error: "Invalid userId" }), {
      status: 400,
    });
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });
    await prismaClient.$disconnect();
    return new Response(JSON.stringify(user), {
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prismaClient = new PrismaClient();
  const { id } = await params;
  const userId = parseInt(id);
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const confetti = (searchParams.get("confetti") || "") === "true";

  if (isNaN(userId)) {
    prismaClient.$disconnect();
    return new Response(JSON.stringify({ error: "Invalid userId" }), {
      status: 400,
    });
  }

  try {
    const user = await prismaClient.user.update({
      where: { id: userId },
      data: {
        confetti,
      },
    });
    await prismaClient.$disconnect();
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    await prismaClient.$disconnect();
    console.error("Failed to fetch problems:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
