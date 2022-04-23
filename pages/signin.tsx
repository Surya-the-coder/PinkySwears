import Head from 'next/head'
import Vector from '../assets/images/Vector 4.svg'
import FooterVector from '../assets/images/Vector 1.svg'
import Link from 'next/link'

const signin = () => {
    return (
        <div className="flex min-h-screen max-h-screen flex-col items-center min-w-full md:bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
      <Head>
        <title>Pinky Swears</title>
        <meta name='theme-color' content='#FFBCD1' />
      </Head>
      <div className='w-full flex items-center justify-center md:hidden z-0'>
        <Vector className="w-full"></Vector>
      </div>
      <div className="z-50 -mt-5">
        <h2 className="text-center font-[segoepr] text-3xl font-bold">Welcome!</h2>
        <p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-[#939090]">Create a new account</p>
      </div>
      <div className="mt-5 flex flex-col items-center w-full">
        
        <input className=" focus-welcome-field-shadowfocus h-14 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="text" name="Username" id="username" placeholder="Username"/>
        <input className=" focus-welcome-field-shadowfocus mt-4 h-14 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="Password" id="password" placeholder="Password"/>
        
        <div className=" px-2 mt-3 flex w-full max-w-md items-center justify-between">
          <div className="mx-10 flex items-center justify-center">
            <input className=" accent-pink-500 outline-hidden h-2 w-2 " type="radio" id="radiobutton" name="radiobutton"/>
            <label className="pl-2 font-[Sarabun-ExtraBold] text-[0.5rem] font-extrabold"> Remember Me </label>
          </div>
          
          <div className="mx-10">
            <Link href="/forgotpassword">
              <a className="font-[Sarabun-ExtraBold] text-[0.5rem] font-extrabold "> Forgot password? </a>
            </Link>
          </div>          
        </div>
        <Link href={'/home'}>
          <button className=' mt-10 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-full w-64 h-16'>Sign In</button>  
        </Link>
      </div>
      <div className='flex w-full text-center mt-2 mx-auto h-max'>
          <FooterVector className="w-full -z-50 fixed md:hidden"/>
          <p className=' text-[#FFFFFF] text-xs font-[Sarabun-SemiBold] font-semibold flex text-center justify-center w-full z-50 pt-24 fixed'>Don't have an account? &nbsp;
            <Link href={'/signup'}> 
              <p className=' text-xs font-[Sarabun-SemiBold] font-semibold text-[#FF848E]'> Sign Up </p>
            </Link>
          </p>
      </div> {/* className='w-full flex items-center justify-center md:hidden bottom-0'> */}
    </div>
    );
}

export default signin;