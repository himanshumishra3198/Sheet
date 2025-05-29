import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prismaClient } from "./prisma/src";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true, // Explicitly trust the host
  session: {
    strategy: "jwt",
  },
  debug: true,
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user?.email) {
          console.log("DATABASE URL: ", process.env.DATABASE_URL);
          console.log("JWT callback - user.email:", user.email);
          const dbUser = await prismaClient.user.findUnique({
            where: { email: user.email },
          });
          console.log("dbUser here: ", dbUser);
          if (dbUser) {
            token.id = dbUser.id;
          } else {
            const newUser = await prismaClient.user.create({
              data: {
                email: user.email,
                name: user.name,
                avatar: user.image ?? "",
              },
            });

            console.log("newUser here: ", newUser);
            token.id = newUser.id;
          }
        }
      } catch (error) {
        console.error("Error in JWT callback:", error);
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
