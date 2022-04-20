import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Pinky Swears</title>
        <meta name='theme-color' content='#FFBCD1' />
      </Head>
      <div>
        <h2 className="text-center font-[segoepr] font-extrabold text-3xl">Welcome</h2>
        <p className="text-gray-500">Create a new account</p>
      </div>
      <div className='flex-wrap'>
        <input className=' border-solid border-2 border-gray-400 h-12 rounded-2xl shadow-xl my-2 py-3 px-3 focus:border-2 focus:border-pink-400 focus:outline-none focus:placeholder:text-pink-400 focus:shadow-2xl focus:shadow-pink-200' type="text" name="username-textbox" id="username" placeholder='Username'></input>
        <br></br>
        <input className=' border-solid border-2 border-gray-400 h-12 rounded-2xl shadow-xl my-2 py-3 px-3 focus:border-2 focus:border-pink-400 focus:outline-none focus:placeholder:text-pink-400  focus:shadow-2xl focus:shadow-pink-200' type="text" name="email-textbox" id="email" placeholder='Email'></input>
      </div>
    </div>
  )
}

export default Home
