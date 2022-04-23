import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <>
        <Head>
          <link rel="stylesheet" href="../assets/fonts/segoepr.ttf" />
          {/* <meta
            name="google-site-verification"
            content="UTLSE3SDaClJQk2W74i0-qX5LQBW66NY8EJlbydl0y0"
          /> */}
        </Head>
        <Component {...pageProps} />
      </>
    </SessionProvider>
  )
}

export default MyApp
