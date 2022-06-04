import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Ellipse from '../assets/images/Ellipse.svg';
import LoadingSpinner from "../components/LoadingSpinner";
import AccountDetailsTopBar from '../components/AccountDetailsTopBar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Router, { useRouter } from 'next/router'
import { setTimeout } from 'timers';

const changepassword = () => {
	
	const [accessToken, setAccessToken] = useState<any>()
	const [refreshToken, setRefreshToken] = useState<any>()

	const [passwordMismatch, setPasswordMismatch] = useState(false)
	const [currentPasswordCheck,setCurrentPasswordCheck] = useState(false)
	
	const [oldPassword,setOldPassword] = useState<any>()
	const [newPassword,setNewPassword] = useState<any>()
	const [reenternewPassword,setReEnterNewPassword] = useState<any>()

	const [deffirstname, setDefFirstname] = useState<any>()
	const [deflastname, setDefLastname] = useState<any>()
	const [isDataFetched, setIsDataFetched] = useState(false)
	const[showUpdateMsg,setShowUpdateMsg]=useState(false)

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
            setAccessToken(accessTokenLS)
			setRefreshToken(refreshTokenLS)
			setIsDataFetched(true)
        }
    }, []);

	let redirectToAccPage = (router) => {
		return router.push('/preference')
	  };
	let getUserInfo = async (accessTokenLS) => {
		console.log("******getuserinfo*****")
		console.log(accessTokenLS)
		let getuserInfoUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/info/`
		let response = await fetch(getuserInfoUrl, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+accessTokenLS,
			},
			
		})
		let userinfo = await response.json()  
		console.log(userinfo.first_name)
		setDefFirstname(userinfo.first_name)
		setDefLastname(userinfo.last_name)
		setIsDataFetched(true)
	}
	let passwordUpdate = async () => {
		console.log("Updateeeeeeeeee")
		if (newPassword === reenternewPassword) {
	
		let passwordUpdateUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/change-password/`
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
		if(response.status==200)
		{setShowUpdateMsg(true)
			await timeout(2000);
			redirectToAccPage(Router)
		}
		else{
		setPasswordMismatch(true)	
		}
	}
	function timeout(delay: number) {
		return new Promise( res => setTimeout(res, delay) );
	}			
	}
	if (accessToken!=null) {
		const user = JSON.parse(localStorage.getItem('UserDetails'))
		return (
			<div className="flex flex-col justify-center min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] items-center">
				<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
				<Head>
					<meta name='theme-color' content='#FFBCD1' />
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
				</Head>
				<AccountDetailsTopBar username={user.username}/>
				{isDataFetched?
					<div className=" flex flex-col w-full max-w-md">
						<div className='flex justify-center'>
							<p className=' mt-[40px] items-center text-[#F67A95] font-[Sarabun-Bold] font-bold text-xl'> Change Password</p>
						</div>
						<div className='px-5 w-full'>
							<input className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-[40px]  rounded-2xl border w-full h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="password" id="password" autoComplete='on' placeholder="Current Password" onChange={(e) => {setOldPassword(e.target.value)}} />
							{currentPasswordCheck ? (
									<p className="pt-2 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-red-500"> Current Password field does not match </p>
								) : null}
						</div>
						<div className='px-5 w-full'>
							<input className={ passwordMismatch?" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 rounded-2xl border w-full h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-red-500 focus:outline-none placeholder:text-[#FF848E]":" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 rounded-2xl border w-full h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none placeholder:text-[#FF848E]"} type="password" name="password" id="password" placeholder="New Password"  autoComplete='on' onChange={(e) => {setNewPassword(e.target.value)}}/>
						</div>
						<div className='px-5 w-full'>
							<input className={ passwordMismatch?" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5  rounded-2xl border w-full h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-red-500 focus:outline-none placeholder:text-[#FF848E]" :" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 w-full rounded-2xl border h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none placeholder:text-[#FF848E]"} type="password" name="password" id="password" placeholder="Confirm New Password" autoComplete='on'  onChange={(e) => {setReEnterNewPassword(e.target.value)}}/>						
							{passwordMismatch ? ( <p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-red-500">Password fields does not match</p> ) : null}
						</div>
						<div className='flex mt-[90px] mb-8 px-5 justify-between'>	
							<Link href="/preference">
								<button className='h-[53px] w-full text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl cursor-pointer'>Back</button> 
							</Link>
							<button onClick={passwordUpdate} className=' ml-2  h-[53px] w-full text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl' type="submit" >Save</button>						
							<Popup open={showUpdateMsg}>
								<div className='flex w-full h-[50px] rounded-3xl text-[#FF848E] text-center font-[Sarabun-SemiBold]  font-semibold' >Password Updated Successfully!</div>
							</Popup>
						</div>						
					</div>
				:<LoadingSpinner/>}
			</div>
		);
	}
	else{
		return null;
	}
}

export default changepassword;