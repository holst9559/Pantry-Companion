import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      return { session, user, token };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
