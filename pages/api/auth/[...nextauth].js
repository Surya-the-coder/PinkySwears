import NextAuth from "next-auth"
import { apiBaseUrl } from "next-auth/client/_utils";
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";


export default NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        accessTokenUrl : "https://oauth2.googleapis.com/token",
      }),
      FacebookProvider({
        clientId : process.env.FACEBOOK_ID,
        clientSecret : process.env.FACEBOOK_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version: "2.0"
      })
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
