import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <link rel="stylesheet" href="../assets/fonts/segoepr.ttf" />
    </Head>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
