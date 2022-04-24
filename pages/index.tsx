import type { NextPage } from 'next'
import Head from 'next/head'
import Vector from '../assets/images/Vector 4.svg'
import FooterVector from '../assets/images/Vector 1.svg'
import Link from 'next/link'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react'

import { useRouter } from 'next/router'

let redirectToHomePage = () => {
  console.log('========================INSIDE REDIRECT================================')
  const router = useRouter();
  return router.push('/home')
}


const Home = (pageProps) => {
  const { data: session, status } = useSession()
  
  const router = useRouter()

  if (session){
    redirectToHomePage();
  }
    return (
      <>
        <div className="flex min-h-screen flex-col items-center justify-center">
          Sign Up Page
          <p className="mt-10 flex">
            Already have account?&nbsp;
            <Link href="/signin">
              <p className="text-pink-400 cursor-pointer"> Sign In </p>
            </Link>
          </p>
          <button onClick={() => signIn('google') } className="mt-8 rounded-2xl border-2 border-pink-500 bg-white text-pink-400 hover:bg-pink-300 hover:text-white active:bg-pink-400 active:text-white">
            <p className="px-5 py-3">Continue with Google</p>
          </button>
          <button onClick={() => signIn('github') } className="mt-8 rounded-2xl border-2 border-pink-500 bg-white text-pink-400 hover:bg-pink-300 hover:text-white active:bg-pink-400 active:text-white">
            <p className="px-5 py-3">Continue with GitHub</p>
          </button>
        </div>
      </>
    )
}

export default Home
