import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Vector from '../assets/images/Vector 4.svg'
import FooterVector from '../assets/images/Vector 1.svg'
import GoogleIcon32 from '../assets/images/Google-32.svg'
import GoogleIcon48 from '../assets/images/Google-48.svg'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'


let redirectToHomePage = () => {
  const router = useRouter()
  return router.push('/home')
};

const Home = (pageProps) => {
  
  const router = useRouter()

  const [AccessToken, setAccessToken] = useState<any>();
  const [RefreshToken, setRefreshToken] = useState<any>();

  useEffect(() => {
    let accessTokenLS = localStorage.getItem('access_token')
    let refreshTokenLS = localStorage.getItem('refresh_token')
    if (accessTokenLS!=null) {
      router.prefetch('/home')
      console.log('========================TOKEN FOUND==========================')
      setAccessToken(accessTokenLS)
      setRefreshToken(refreshTokenLS)
    }
  }, [])
  
  if(AccessToken!=null)
  {
    redirectToHomePage()
  }
  
  return (
    <>
      <div className="flex max-h-screen min-h-screen min-w-full flex-col items-center from-[#FDEBF7] to-[#FFBCD1] md:bg-gradient-to-t">
        <Head>
          <title>Pinky Swears</title>
          <meta name="theme-color" content="#FFBCD1" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>

        <div className="z-0 flex h-16 w-full items-center justify-center md:hidden">
          <Vector className="w-full"></Vector>
        </div>
        <div className="z-50 mt-5 flex w-full flex-col items-center">
          <h2 className="text-center font-[segoepr] text-3xl font-bold">
            Welcome!
          </h2>
          <p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-[#939090]">
            Create a new account
          </p>

          <input className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="text" name="Username" id="username" placeholder="Username"/>
          <input className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="Password" id="password" placeholder="Password"/>
          <div className=" mt-3 flex w-full max-w-[450px] items-center justify-around px-16">
            <label className=" font-[Sarabun-SemiBold] text-xs font-semibold text-[#020202] ">
              Gender
            </label>
            <input className="h-4 w-4 accent-pink-500 outline-hidden " type="radio" id="radiobutton" name="radiobutton"/>
            <label className="text-xs text-[#CDCCCD] md:text-gray-600">
              Male
            </label>
            <input className=" h-4 w-4 accent-pink-500 outline-hidden " type="radio" id="radiobutton" name="radiobutton"/>
            <label className="text-xs text-[#CDCCCD] md:text-gray-600">
              Female
            </label>
          </div>
          <select className=" select-text:[text-#020202] focus-welcome-field-shadowfocus select-text:font-[Sarabun-SemiBold] mt-4 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold text-[#CDCCCD] shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none" name="culture" id="culture" placeholder="Culture">
            <option value="" disabled selected hidden>
              Culture
            </option>
            <option value="culture 1">Culture 1</option>
            <option value="culture 2">Culture 2</option>
            <option value="culture 3">Culture 3</option>
            <option value="culture 4">Culture 4</option>
          </select>
          <select className="focus-welcome-field-shadowfocus select-text:font-[Sarabun-SemiBold] mt-4 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold text-[#CDCCCD] shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none" name="culture" id="culture" placeholder="Culture">
            <option className=" text-gray-500" value="" disabled selected hidden>
              Year's in relationship
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <div className=" mt-3 flex w-full items-center justify-center px-16 accent-[#FFBCD1]">
            <input className=" rounded-lg border-4" type="checkbox" checked id="checkbox"/>
            <label className=" pl-2 font-[Sarabun-SemiBold] text-xs font-semibold text-[#262626]">
              Agree with Terms & Conditions
            </label>
          </div>
          <button className=" mt-5 h-10 w-64 rounded-full bg-[#F67A95] font-[Sarabun-Regular] font-normal -tracking-tighter text-white shadow-button-shadow"> Sign Up </button>
        </div>
        <p className=" mt-3 font-[Sarabun-SemiBold] text-xs text-[#262626]"> Continue with </p>
        <div className=" mt-3 px-32 flex w-full max-w-md items-center justify-around">
          <button onClick={() => signIn('facebook')} className="flex fa fa-facebook w-8 h-8 rounded-full bg-[#4267B2] items-center justify-center text-center text-sm text-white"/>
          <button onClick={() => signIn('twitter')} className="flex fa fa-twitter w-8 h-8 rounded-full bg-[#00ACEE] items-center justify-center text-center text-sm text-white"/>
          <button onClick={() => signIn('google')} className=""> <GoogleIcon32/> </button>
        </div>
        <div className="mx-auto mt-1 flex h-3 w-full text-center">
          <FooterVector className="fixed -z-50 w-full md:hidden" />
          <p className=" fixed z-50 flex w-full justify-center pt-12 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-gray-400">
            Already have an account? &nbsp;
            <Link href={'/signin'}>
              <p className=" font-[Sarabun-SemiBold] text-xs font-semibold text-[#FF848E] cursor-pointer"> Sign In </p>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Home;

// export async function getServerSideProps (context) {
//   const session = await getSession(context);
//   if (!session) {
//       return{redirect :{destination: '/', permanent : false}}
//   }
//   return {props : {session}}
// }