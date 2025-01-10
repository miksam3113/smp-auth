import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import axios from "axios";

const SERVER_URL = process.env.SERVER_URL;

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { login, password } = validatedFields.data;

          return await axios({
            method: "POST",
            url: SERVER_URL + "/auth/login",
            data: {
              login: login,
              password: password,
            },
          })
            .then((result) => {
              // return { success: "Login success!" };
              return {
                id: result.data.userData.id,
                first_name: result.data.userData.first_name,
                last_name: result.data.userData.last_name,
                username: result.data.userData.username,
                email: result.data.userData.email,
                backendTokens: result.data.backendTokens,
              };
              // return result.data
            })
            .catch((error) => {
              return null;
              // return { error: error.response.data.message };
            });
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      session.user = token as any;
      return session;
    },
  },
} satisfies NextAuthConfig;
