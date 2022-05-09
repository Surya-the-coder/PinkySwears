import Head from 'next/head'
import Vector from '../assets/images/Vector 4.svg'
import { useState } from 'react'
import FooterVector from '../assets/images/Vector 1.svg'
import Link from 'next/link'


const SignUp = () => {
    const [gender, setGender] = useState("Male");
    return (
    <div className="flex min-h-screen max-h-screen flex-col items-center min-w-full md:bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
        <Head>
          <title>Pinky Swears</title>
          <meta name='theme-color' content='#FFBCD1' />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <link type="image/png" sizes="16x16" rel="icon" href=".../icons8-google-16.png"/>
          <link type="image/png" sizes="32x32" rel="icon" href=".../icons8-google-32.png"/>
          <link type="image/png" sizes="96x96" rel="icon" href=".../icons8-google-96.png"/>
          <link type="image/png" sizes="120x120" rel="icon" href=".../icons8-google-120.png"/>
          <link rel="apple-touch-icon" type="image/png" sizes="57x57" href=".../icons8-google-57.png"/>
          <link rel="apple-touch-icon" type="image/png" sizes="60x60" href=".../icons8-google-60.png"/>
          <link rel="apple-touch-icon" type="image/png" sizes="114x114" href=".../icons8-google-114.png"/>
          <link rel="apple-touch-icon" type="image/png" sizes="120x120" href=".../icons8-google-120.png"/>
          <link rel="apple-touch-icon" type="image/png" sizes="180x180" href=".../icons8-google-180.png"/>

        </Head>
        <div className='w-full h-16 flex items-center justify-center md:hidden z-0'>
          <Vector className="w-full"></Vector>
        </div>
        <div className="z-50 mt-3 flex flex-col items-center w-full">
          <h2 className="text-center font-[segoepr] text-3xl font-bold">Welcome!</h2>
          <p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-[#939090]">Create a new account</p>
                
          <input className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="text" name="Username" id="username" placeholder="Username"/>
          <input className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="email" name="email" id="email" placeholder="Email"/>
          <div className=' px-16 max-w-[450px] w-full mt-3 justify-around items-center flex'>
              <label className=' text-[#020202] font-[Sarabun-SemiBold] font-semibold text-xs '>Gender</label>
              <input className="accent-pink-500 outline-hidden h-4 w-4 " type="radio" id="radiobutton" name="radiobutton"/>
              <label className= "text-[#CDCCCD] text-xs md:text-gray-600">Male</label>
              <input className=" accent-pink-500 outline-hidden h-4 w-4 " type="radio" id="radiobutton" name="radiobutton"/>
              <label className='text-[#CDCCCD] text-xs md:text-gray-600'>Female</label>
          </div>
          <input className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="password" id="password" placeholder="New Password"/>
          <input className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="password" id="password" placeholder="Re-enter New Password"/>
          <select className=" text-[#CDCCCD] select-text:[text-#020202] mt-2 focus-welcome-field-shadowfocus h-12 w-80 pl-6 rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold]" name="culture" id="culture" placeholder='Culture'>
              <option value="" disabled selected hidden>Culture</option>
              <option value="culture 1">Culture 1</option>
              <option value="culture 2">Culture 2</option>
              <option value="culture 3">Culture 3</option>
              <option value="culture 4">Culture 4</option>
          </select>
          <select className="text-[#CDCCCD] mt-2 focus-welcome-field-shadowfocus h-12 w-80 pl-6 rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold]" name="rel" id="rel" placeholder='rel'>
              <option className=' text-gray-500' value="" disabled selected hidden>Year's in relationship</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
          </select>
            <div className=' accent-[#FFBCD1] px-16 w-full mt-3 justify-center items-center flex'>
                <input className=' border-4 rounded-lg' type="checkbox" checked id='checkbox'/>
                <label className=' pl-2 text-[#262626] font-[Sarabun-SemiBold] font-semibold text-xs'>Agree with Terms & Conditions</label>
            </div>
            <button className=' mt-3 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-full w-64 h-10'>Sign Up</button>  
        </div>             
            <div className='flex h-3 w-full text-center mt-1 mx-auto'>
            <FooterVector className="w-full -z-50 fixed md:hidden"/>
                <p className=' text-gray-400 text-xs font-[Sarabun-SemiBold] font-semibold flex text-center justify-center w-full z-50 pt-12 fixed'>Already have an account? &nbsp;
                <Link href={'/signin'}> 
                    <p className=' text-xs font-[Sarabun-SemiBold] font-semibold text-[#FF848E]'> Sign In </p>
                </Link>
                </p>
            </div>
    </div>
    );
}

export default SignUp;

// {gender==="Male"?"text-pink-500":"text-[#CDCCCD]"}