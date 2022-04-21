import type { NextPage } from 'next'
import Head from 'next/head'
import Vector from '../assets/images/Vector 4.svg'
import FooterVector from '../assets/images/Vector 1.svg'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center min-w-full md:bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
      <Head>
        <title>Pinky Swears</title>
      </Head>
      <div className='w-full flex items-center justify-center md:hidden'>
        <Vector className="w-full"></Vector>
      </div>
      <div className="mt-4">
        <h2 className="pt-6 text-center font-[segoepr] text-3xl font-bold">Welcome!</h2>
        <p className=" pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-[#939090]">Create a new account</p>
      </div>
      <div className="mt-11 flex flex-col items-center w-full">
        
        <input className=" focus-welcome-field-shadowfocus h-14 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="text" name="Username" id="username" placeholder="Username"/>
        <input className=" focus-welcome-field-shadowfocus mt-8 h-14 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="Password" id="password" placeholder="Password"/>
        
        <div className=" px-2 mt-4 flex w-full max-w-md items-center justify-between">
          <div className="mx-10 flex items-center justify-center">
            <input className=" accent-pink-500 outline-hidden h-4 w-4 " type="radio" id="radiobutton" name="radiobutton"/>
            <label className="pl-2 font-[Sarabun-ExtraBold] text-xs font-extrabold"> Remember Me </label>
          </div>
          
          <div className="mx-10">
            <p className="font-[Sarabun-ExtraBold] text-xs font-extrabold "> Forgot password? </p>
          </div>          
        </div>
        <button className=' mt-24 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-full w-64 h-16'>Sign In</button>
      
        <div className='w-full flex items-center justify-center md:hidden'>
          <FooterVector className="w-full">
            <p>Don’t have an account? Sign Up</p>
          </FooterVector>
        </div>
      </div>
    </div>
  )
}

export default Home
