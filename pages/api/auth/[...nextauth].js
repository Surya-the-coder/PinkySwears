import NextAuth from "next-auth"
import { apiBaseUrl } from "next-auth/client/_utils";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        accessTokenUrl : "https://oauth2.googleapis.com/token",
      }),
  ],
  // callbacks: {
  //   async jwt({ token }) {
  //     token.userRole = "admin"
  //     return token
  //   }
  // }
  // jwt:{
  //   encryption : true,
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  // callbacks:{
  //   async jwt(token, account){
  //     if (account?.accessToken) {
  //       token.accessToken = account.accessToken;
  //     }
  //     return token;
  //   },
  //   redirect: async (url, _baseUrl) => {
  //     if (url === '/home') {
  //         return Promise.resolve('/');
  //     }
  //     return Promise.resolve('/');
  //   }
  // }
})
