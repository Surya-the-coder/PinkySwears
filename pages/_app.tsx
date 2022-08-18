import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
// import Layout from "../components/layout";
// import useScrollRestoration from "../components/useScrollRestoration";

function MyApp({ Component, pageProps,router }: AppProps) {

  return (

        <SessionProvider session={pageProps.session}>
          <>
            <Head>
              <link rel="stylesheet" href="../assets/fonts/segoepr.ttf" />
            </Head>
              {/*{useScrollRestoration(router)}*/}
            <Component {...pageProps} />
          </>
        </SessionProvider>


  )
}

export default MyApp
