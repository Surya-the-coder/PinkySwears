import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Vector from '../assets/images/Vector 4.svg'
import FooterVector from '../assets/images/Vector 1.svg'
import GoogleIcon32 from '../assets/images/Google-32.svg'
import PasswordEye from '../assets/images/password_eye.svg'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'


let signInUserPassword = async (userInputUserName, userInputPassword, router) => {
  let loginApiUrl = 'https://backend.pinkyswears.in/api/user/login/';
  
  let response = await( await fetch(loginApiUrl, {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body : JSON.stringify({"username" : userInputUserName, "password" : userInputPassword}),
    })).json()
    console.log(response.user)
    
    if (response.access!=null) {
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('UserDetails', JSON.stringify(response.user))
      router.push('/home')
    }
};

const signin = (pageProps) => {

  const router = useRouter()

  const [userInputUserName, setUserInputUserName] = useState<any>();
  const [userInputPassword, setuserInputPassword] = useState<any>();

  useEffect(() => {
    let accessTokenLS = localStorage.getItem('access_token')

    if (accessTokenLS!=null) {
      router.push('/home')
    }

  }, [])

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
      <div className='w-full flex items-center justify-center md:hidden z-0'>
        <Vector className="w-full"></Vector>
      </div>
      <div className="z-50 -mt-5 md:mt-5">
        <h2 className="text-center font-[segoepr] text-3xl font-bold">Welcome!</h2>
        <p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-[#939090]">Create a new account</p>
      </div>
      <div className="mt-5 flex flex-col items-center w-full">
        <form>
          <input className=" focus-welcome-field-shadowfocus h-14 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="text" name="Username" id="username" placeholder="Username" onChange={ (e) => setUserInputUserName(e.target.value) }/>
          <div className='flex items-center justify-end mt-4 '>
            <input className=" focus-welcome-field-shadowfocus h-14 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1] z-0" type="password" name="Password" id="password" placeholder="Password" onChange={ (e) => setuserInputPassword(e.target.value) }/>
            <button className='z-50 fixed mr-3'><PasswordEye/></button>
          </div>

          <div className=" px-2 mt-3 flex w-full max-w-md items-center justify-between">
            <div className="mx-10 flex items-center justify-center">
              <input className=" accent-pink-500 outline-hidden h-2 w-2 " type="radio" id="radiobutton" name="radiobutton"/>
              <label className="pl-2 font-[Sarabun-ExtraBold] text-[0.5rem] font-extrabold"> Remember Me </label>
            </div>

            <div className="mx-10">
              <Link href="/forgotpassword">
                <p className="font-[Sarabun-ExtraBold] text-[0.5rem] font-extrabold "> Forgot password? </p>
              </Link>
            </div>          
          </div>
          <button className=' mt-10 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-full w-64 h-16' onClick={() => signInUserPassword(userInputUserName, userInputPassword, router)}>Sign In</button>
          
        </form>
      </div>
        {/* <p className=' mt-3 font-[Sarabun-SemiBold] text-xs text-[#262626]'>Continue with</p> */}
        {/* <div className=" mt-3 px-32 flex w-full max-w-md items-center justify-around">
          <button onClick={() => signIn('facebook')} className="flex fa fa-facebook w-8 h-8 rounded-full bg-[#4267B2] items-center justify-center text-center text-sm text-white"/>
          <button onClick={() => signIn('twitter')} className="flex fa fa-twitter w-8 h-8 rounded-full bg-[#00ACEE] items-center justify-center text-center text-sm text-white"/>
          <button onClick={() => signIn('google')} className=""> <GoogleIcon32/> </button>
        </div> */}
      
      <div className='flex h-3 w-full text-center mt-1 mx-auto'>
          <FooterVector className="w-full -z-50 fixed md:hidden"/>
          <p className=' text-[#FFFFFF] text-xs font-[Sarabun-SemiBold] font-semibold flex text-center justify-center w-full z-50 pt-24 fixed md:text-gray-400'>Don't have an account? &nbsp;
            <Link href={'/'}>
              <p className=' text-xs font-[Sarabun-SemiBold] font-semibold text-[#FF848E] cursor-pointer'> Sign Up </p>
            </Link>
          </p>
      </div> 
    </div>
    );
}

export default signin;