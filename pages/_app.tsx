import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
// import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {

  return (

        <SessionProvider session={pageProps.session}>
          <>
            <Head>
              <link rel="stylesheet" href="../assets/fonts/segoepr.ttf" />
            </Head>
            <Component {...pageProps} />
          </>
        </SessionProvider>


  )
}

export default MyApp
