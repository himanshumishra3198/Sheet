import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prismaClient } from "./prisma/src";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true, // Only needed if not using Vercel/AWS
  basePath: "/api/auth", // Explicit base path
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET, // Must be set in production
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prismaClient.user.findUnique({
          where: { email: user.email },
        });
        token.id =
          dbUser?.id ||
          (
            await prismaClient.user.create({
              data: {
                email: user.email,
                name: user.name,
                avatar: user.image ?? "",
              },
            })
          ).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? ".hm0.org" : undefined,
      },
    },
  },
});
