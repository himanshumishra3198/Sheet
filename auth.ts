import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prismaClient } from "./prisma/src";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  debug: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await prismaClient.user.findUnique({
          where: { email: user.email },
        });
        if (!dbUser) {
          const newUser = await prismaClient.user.create({
            data: {
              email: user.email,
              name: user.name,
              avatar: user.image ?? "",
            },
          });
          token.id = newUser.id;
        } else {
          token.id = dbUser.id;
        }
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
});
