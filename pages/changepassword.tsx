import Head from 'next/head';
import AccountDetailsTopBar from '../components/AccountDetailsTopBar'
import Ellipse from '../assets/images/Ellipse.svg'
import { useEffect, useState } from 'react';
import Link from 'next/link'

const changepassword = () => {
	
	const [passwordMismatch, setPasswordMismatch] = useState(false)
	const[currentPasswordCheck,setCurrentPasswordCheck] =useState(false)
	const [accessToken, setaccessToken] = useState<any>()
	const[oldPassword,setOldPassword]=useState<any>()
	const[newPassword,setNewPassword]=useState<any>()
	const[reenternewPassword,setReEnterNewPassword] =useState<any>()
	useEffect(() => {
		setPasswordMismatch(false)
		setCurrentPasswordCheck(false)
		console.log("UseEffect")
		let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        
        if (accessTokenLS == null) {
			console.log('No Access Token')

        }
        else{			
			console.log(accessTokenLS)
            setaccessToken(accessTokenLS)
        }
    }, []);
	let passwordUpdate = async () => {
		if (newPassword === reenternewPassword) {
	
		let passwordUpdateUrl = 'https://backend.pinkyswears.in/api/user/change-password/'
		let response = await fetch(passwordUpdateUrl, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+accessToken,
			},
			body: JSON.stringify({
				old_password:oldPassword,
				new_password:newPassword
			}),
		})
		console.log(response)
		if(response.status!=200)
		setCurrentPasswordCheck(true)
	}
	else{
		setPasswordMismatch(true)	
	}			
	}
	return (
		<div className=" flex flex-col items-center min-h-screen w-full bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
			<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
			<Head>
				<meta name='theme-color' content='#FFBCD1' />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
			</Head>
			<AccountDetailsTopBar/>
			<div className='flex flex-col items-center mx-6 h-[65vh] max-h-[70vh] w-[95vw] max-w-md rounded-3xl mt-7 bg-[#FFFFFF] '>
				<p className=' mt-[40px] items-center text-[#F67A95] font-[Sarabun-Bold] font-bold text-xl'> Change Password</p>
				<input className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-[40px]  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="password" id="password" placeholder="Current Password" onChange={(e) => {setOldPassword(e.target.value)}} />
				{currentPasswordCheck ? (
							<p className="pt-2 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-red-500">
								{' '}
								Current Password field does not match{' '}
							</p>
						) : null}
				<input className={
					passwordMismatch?" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-red-500 focus:outline-none placeholder:text-[#FF848E]"
					:" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none placeholder:text-[#FF848E]"					 
				}
				type="password" name="password" id="password" placeholder="New Password" onChange={(e) => {setNewPassword(e.target.value)}}/>
				<input className={
					passwordMismatch?" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-red-500 focus:outline-none placeholder:text-[#FF848E]"
					:" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none placeholder:text-[#FF848E]"
				}
				  type="password" name="password" id="password" placeholder="Confirm New Password"  onChange={(e) => {setReEnterNewPassword(e.target.value)}}/>
				{passwordMismatch ? (
							<p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-red-500">
								{' '}
								Password fields does not match{' '}
							</p>
						) : null}
				<div className='flex mt-[90px] mb-6 mx-3 justify-between'>
					
					<Link href="/accountdetails">
						<button className='h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl'>Back</button> 
					</Link>
					<button className=' ml-2  h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl' onClick={passwordUpdate}>Save</button>  
					
				</div>			
			</div>
		</div>
	);
}

export default changepassword;