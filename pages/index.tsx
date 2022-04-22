import type { NextPage } from 'next'
import Head from 'next/head'
import Vector from '../assets/images/Vector 4.svg'
import FooterVector from '../assets/images/Vector 1.svg'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      Sign Up Page
      <p className="flex mt-10">
          Already have account?&nbsp;
          <Link href='/' > 
              <p className='text-pink-400'> Sign In </p> 
          </Link>
      </p>
      <button className='bg-white text-pink-400 rounded-2xl mt-8 border-2 border-pink-500 hover:bg-pink-300 hover:text-white active:bg-pink-400 active:text-white'>
          <p className='px-5 py-3'>Continue with Google</p>
      </button>
    </div>
  )
}

export default Home
