import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prismaClient } from "./prisma/src";

const productionDomain = "https://chalk.hm0.org";
const isProduction = process.env.NODE_ENV === "production";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true, // Explicitly trust the host
  basePath: "/api/auth",
  theme: {
    logo: `${productionDomain}/logo.png`, // Absolute URL for logo
  },
  session: {
    strategy: "jwt",
  },
  debug: !isProduction,
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
      name: `${isProduction ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
        domain: isProduction ? ".hm0.org" : undefined, // Root domain for all subdomains
      },
    },
  },
});
