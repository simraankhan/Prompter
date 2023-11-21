import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { conntectToDB } from "../../../../utils/database";
import { User } from "../../../../models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.REACT_APP_GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.REACT_APP_GOOGLE_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async signIn(params) {
      try {
        await conntectToDB();
        const isUserExists = await User.findOne({
          email: params.profile?.email,
        });
        if (!isUserExists) {
          await User.create({
            email: params.profile?.email,
            username: params.profile?.name?.replace(" ", "").toLowerCase(),
            image: (params.profile as any)?.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session(params) {
      const { session } = params;
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: sessionUser._id.toString(),
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
