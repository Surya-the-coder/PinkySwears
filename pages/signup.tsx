import Head from 'next/head'
import Vector from '../assets/images/Vector 4.svg'
import FooterVector from '../assets/images/Vector 1.svg'
import Link from 'next/link'

const SignUp = () => {
    return (
        <div className="flex min-h-screen max-h-screen flex-col items-center min-w-full md:bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
        <Head>
          <title>Pinky Swears</title>
          <meta name='theme-color' content='#FFBCD1' />
        </Head>
        <div className='w-full h-16 flex items-center justify-center md:hidden z-0'>
          <Vector className="w-full"></Vector>
        </div>
        <div className="z-50 mt-5 flex flex-col items-center w-full">
          <h2 className="text-center font-[segoepr] text-3xl font-bold">Welcome!</h2>
          <p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-[#939090]">Create a new account</p>
                
          <input className=" focus-welcome-field-shadowfocus mt-5 h-14 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="text" name="Username" id="username" placeholder="Username"/>
          <input className=" focus-welcome-field-shadowfocus mt-4 h-14 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="Password" id="password" placeholder="Password"/>
          <div className=' mt-3 justify-between items-center flex'>
              <label className=''>Gender</label>
              <input className="accent-pink-500 outline-hidden h-4 w-4 " type="radio" id="radiobutton" name="radiobutton"/>
              <label>Male</label>
              <input className=" accent-pink-500 outline-hidden h-4 w-4 " type="radio" id="radiobutton" name="radiobutton"/>
              <label>Female</label>
          </div>
          <select className=" text-[#CDCCCD] select-text:[text-#020202] mt-4 focus-welcome-field-shadowfocus h-14 w-80 pl-6 rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold]" name="culture" id="culture" placeholder='Culture'>
              <option value="" disabled selected hidden>Culture</option>
              <option value="culture 1">Culture 1</option>
              <option value="culture 2">Culture 2</option>
              <option value="culture 3">Culture 3</option>
              <option value="culture 4">Culture 4</option>
          </select>
          <select className="text-[#CDCCCD] mt-4 focus-welcome-field-shadowfocus h-14 w-80 pl-6 rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold]" name="culture" id="culture" placeholder='Culture'>
              <option className=' text-gray-500' value="" disabled selected hidden>Year's in relationship</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
          </select>
        </div> 

        </div>
    );
}

export default SignUp;