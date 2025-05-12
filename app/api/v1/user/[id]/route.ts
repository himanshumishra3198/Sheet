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
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    return new Response(JSON.stringify(user), {
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = parseInt(id);
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const confetti = (searchParams.get("confetti") || "") === "true";

  if (isNaN(userId)) {
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

    return new Response(JSON.stringify(user), {
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
