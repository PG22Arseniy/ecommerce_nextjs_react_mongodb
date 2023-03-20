import db from "@/utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/User";
import bcrypt from "bcryptjs"

export default NextAuth({

    callbacks: {
      session: async ({ session, token }) => {
        if (session?.user) {
          session.user.id = token.uid;
        }
        return session;
      },
      jwt: async ({ user, token }) => {
        if (user) {
          token.uid = user.id;
        }
        return token;
      },
    },
    session: {
      strategy: 'jwt',
    },

    providers: [
      CredentialsProvider({
        async authorize (credentials) {
          await db.connect()
          const user = await User.findOne ({
            email: credentials.email
          })
          await db.disconnect()
          if (user && bcrypt.compareSync(credentials.password, user.password)){
            // user found passwords match with mongo db
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: 'f',
              isAdmin: user.isAdmin
            }
          }

          throw new Error ("Wrong password or Email")
        }
      })
    ]
    
  });