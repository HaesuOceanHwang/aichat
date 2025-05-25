import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import NaverProvider from 'next-auth/providers/naver';
import AppleProvider from 'next-auth/providers/apple';
import { DefaultSession } from 'next-auth';

// Extend the built-in session type
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession['user']
  }
}

const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID || '',
    //   clientSecret: process.env.GOOGLE_SECRET || '',
    // }),
    // NaverProvider({
    //   clientId: process.env.NAVER_CLIENT_ID || '',
    //   clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    // }),
    AppleProvider({
      clientId: process.env.APPLE_ID || '',
      clientSecret: process.env.APPLE_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST }; 