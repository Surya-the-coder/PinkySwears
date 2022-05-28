import Link from 'next/link'
import Head from 'next/head'
import Ellipse from '../assets/images/Ellipse.svg'
import { useState } from 'react'
import { useRouter } from 'next/router';

const forgotpassword = () => {

	const router = useRouter()
	const[email,setEmail]=useState<any>()
	const [emailValidation, setEmailValidation] = useState(false)
	const[otp,setOTP]=useState<any>()
	const[checkOTP,setCheckOTP]=useState(false)
	const [loadOTP,setLoadOTP]=useState(true)
	const[loadResetPasswordPage,setLoadResetPasswordPage]=useState(false)
	const [newPassword,setNewPassword] = useState<any>()
	const [reenternewPassword,setReEnterNewPassword] = useState<any>()
	const [passwordMismatch, setPasswordMismatch] = useState(true)

	let sendEmailApi=async ()=>
	{
		console.log("Testtttt")
		localStorage.setItem('email', email)	
		let requestOTPUrl = 'https://backend.pinkyswears.in/api/user/resetPassword/01/requestOTP/'
		let response = await fetch(requestOTPUrl, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email:email,				
			}),
		})
		console.log(response)
		if(response.status==200)
		{
			console.log(email)
			console.log(loadOTP)
			setLoadOTP(false)
			setLoadResetPasswordPage(true)
		}
		else
		{
			setEmailValidation(true)
			console.log("Email is incorrect")
		}		
	}
	let validateOTP=async ()=>
	{
		localStorage.setItem('otp', otp)
		let email = localStorage.getItem('email')	
		console.log(email)
		let verifyOTPUrl = 'https://backend.pinkyswears.in/api/user/resetPassword/02/verifyOTP/'
		let response = await fetch(verifyOTPUrl, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				otp:otp,
				email:email,				
			}),
		})
		console.log(response)
		if(response.status==200)
		{
			console.log(otp)
			setLoadResetPasswordPage(false)
			setLoadOTP(false)
		}
		else
		{
			setCheckOTP(true)
			console.log("OTP is incorrect")
		}				
	}
	let redirectToSignInPage = (router) => {
		return router.push('/signin')
	  };

	let passwordUpdate = async () => {
		console.log("INTTTTTTTTOOOOOOOOOOOOOO")
		console.log(newPassword)
		if (newPassword === reenternewPassword) {
			let email = localStorage.getItem('email')
			let otp = localStorage.getItem('otp')
			let passwordUpdateUrl = 'https://backend.pinkyswears.in/api/user/resetPassword/03/changePassword/'
			let response = await fetch(passwordUpdateUrl, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",				
				},
			body: JSON.stringify({
				password:newPassword,
				email:email,
				otp:otp
			}),
		})
		console.log(response)
		if(response.status==200)
		{
			console.log("Success")
			localStorage.clear()
			redirectToSignInPage(router)
		}
		else
			console.log("Password Incorect")
		}
	else{
		setPasswordMismatch(true)	
		}			
	}
	return (
		<div className="flex flex-col justify-center min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] items-center">
			<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
			<Head>
        		<title>Pinky Swears</title>
        		<meta name='theme-color' content='#FFBCD1' />
      		</Head>
			  {/* <form action = "" autoComplete='on' className='flex flex-col justify-center' method='POST'> */}
			  	{loadOTP?
					<div className=" flex flex-col w-full max-w-md">
			  			<h1 className=" py-10 text-center  text-black text-2xl font-bold font-[Sarabun-Bold]">Forgot Password?</h1>			
			  			<div className="bg-white mx-4 rounded-3xl  text-center h-auto shadow-forgot-div-password-shadow">
				  		<h3 className=" pt-16 pb-5 text-black text-xl font-bold font-[Sarabun-Bold]">Reset Password</h3>
				  		<p className=" font-medium mx-5 font-[Sarabun-Medium] text-sm text-gray-400 -tracking-tighter">Enter your registered Email below to receive password reset instruction</p>
				  		<div className='px-3 w-full'>
					  		<input className=" mt-6 pl-7 h-14 w-full rounded-3xl border font-[Sarabun-SemiBold] -tracking-tighter font-semibold shadow-email-field-shadow text-[#B9B9B9] text-sm" type="text" name="Email" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></input>
				  		</div>
				  		<p className=" mt-3 text-xs font-[Sarabun-ExtraBold] font-extrabold -tracking-tighter" >Remember password?<Link href="/"><a className=" text-[#F67A95] cursor-pointer">Login</a></Link></p>
				  		<div className=' px-3 w-full'>
					  		{emailValidation ? ( <p className="pt-[30px] text-center font-[Sarabun-SemiBold] text-xs font-semibold text-red-500">Email is incorrect. Please enter valid email</p> ) : null}
					  		<button className=" outline-none bg-[#F67A95] mt-24 mb-9 h-14 w-full rounded-3xl text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter" onClick={sendEmailApi}>Send</button>				
				  		</div>
			  			</div>
		  			</div>
				
				:
				
				loadResetPasswordPage?
					<div className=" flex flex-col w-full max-w-md">
						<h1 className=" py-10 text-center  text-black text-2xl font-bold font-[Sarabun-Bold]">Validate OTP</h1>			
						<div className="bg-white mx-4 rounded-3xl  text-center h-auto shadow-forgot-div-password-shadow">
							<h3 className=" pt-16 pb-5 text-black text-xl font-bold font-[Sarabun-Bold]">Verification</h3>
							<p className=" font-medium mx-5 font-[Sarabun-Medium] text-sm text-gray-400 -tracking-tighter">Please enter the OTP sent to your gmail</p>
							<div className='px-3 w-full'>
								<input className=" mt-6 pl-7 h-14 w-full rounded-3xl border font-[Sarabun-SemiBold] -tracking-tighter font-semibold shadow-email-field-shadow text-[#B9B9B9] text-sm" type="text" name="otp" id="otp" placeholder="OTP" maxLength={6} onChange={(e)=>setOTP(e.target.value)}></input>
							</div>					
							<div className=' px-3 w-full'>
								{checkOTP ? ( <p className="pt-[30px] text-center font-[Sarabun-SemiBold] text-xs font-semibold text-red-500">OTP is incorrect. Please enter correct OTP</p> ) : null}
								<button type='submit' className="outline-none bg-[#F67A95] mt-24 mb-9 h-14 w-full rounded-3xl text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter" onClick={validateOTP}>Validate</button>				
							</div>
						</div>
					</div>
					:
					<div className=" flex flex-col w-full max-w-md">
						<div className='flex justify-center'>
							<p className=' mt-[40px] items-center text-[#F67A95] font-[Sarabun-Bold] font-bold text-xl'> Reset Password</p>
						</div>	
						<div className=' mt-[40px] px-5 w-full'>
							<input className={ passwordMismatch?" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 rounded-2xl border w-full h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-red-500 focus:outline-none placeholder:text-[#FF848E]":" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 rounded-2xl border w-full h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none placeholder:text-[#FF848E]"} type="password" name="newpassword" id="newpassword" placeholder="New Password"  autoComplete='on' onChange={(e) => {setNewPassword(e.target.value)}}/>
						</div>
						<div className='px-5 w-full'>
							<input className={ passwordMismatch?" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5  rounded-2xl border w-full h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-red-500 focus:outline-none placeholder:text-[#FF848E]" :" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 w-full rounded-2xl border h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none placeholder:text-[#FF848E]"} type="password" name="password" id="password" placeholder="Confirm New Password" autoComplete='on'  onChange={(e) => {setReEnterNewPassword(e.target.value)}}/>						
							{passwordMismatch ? ( <p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-red-500">Password fields does not match</p> ) : null}
						</div>
						<div className='flex mt-[90px] mb-8 px-5 '>	
							<button className=' ml-2 h-[53px] w-full text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl' type="button" onClick={passwordUpdate}>Update</button>
						</div>	
					</div>
			  }
			  {/* </form> */}
		</div>	
	);
}

export default forgotpassword;