import Link from 'next/link'
import Head from 'next/head'
import Ellipse from '../assets/images/Ellipse.svg'
const otppage = () => {
	return (
		<div className="flex flex-col justify-center min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] items-center">
			<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
			<Head>
        		<title>Pinky Swears</title>
        		<meta name='theme-color' content='#FFBCD1' />
      		</Head>
			<div className=" flex flex-col w-full max-w-md">
				<h1 className=" py-10 text-center  text-black text-2xl font-bold font-[Sarabun-Bold]">Forgot Password?</h1>			
				<div className="bg-white mx-4 rounded-3xl  text-center h-auto shadow-forgot-div-password-shadow">
					<h3 className=" pt-16 pb-5 text-black text-xl font-bold font-[Sarabun-Bold]">Reset Password</h3>
					<p className=" font-medium mx-5 font-[Sarabun-Medium] text-sm text-gray-400 -tracking-tighter">Enter your registered Email below to receive password reset instruction</p>
					<div className='px-3 w-full'>
						<input className=" mt-6 pl-7 h-14 w-full rounded-3xl border font-[Sarabun-SemiBold] -tracking-tighter font-semibold shadow-email-field-shadow text-[#B9B9B9] text-sm" type="text" name="Email" id="email" placeholder="Email"/>
					</div>
					<p className=" mt-3 text-xs font-[Sarabun-ExtraBold] font-extrabold -tracking-tighter" >Remember password?<Link href="/"><a className=" text-[#F67A95] cursor-pointer">Login</a></Link></p>
					<div className=' px-3 w-full'>
						<button className=" bg-[#F67A95] mt-24 mb-9 h-14 w-full rounded-3xl text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter">Send</button>				
					</div>
				</div>
			</div>
		</div>	
	);
}

export default otppage;