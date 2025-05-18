import { handlers } from "@/auth"; // Referring to the auth.ts we just created

// ✅ Force Node.js runtime to support Prisma
export const runtime = "nodejs";

// ✅ Log to confirm what runtime is being used
console.log(
  "🔧 API Route Runtime:",
  process.env.NEXT_RUNTIME || "nodejs (default)"
);

export const { GET, POST } = handlers;
