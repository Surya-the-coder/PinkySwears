import Head from 'next/head';
import AccountDetailsTopBar from '../components/AccountDetailsTopBar'
import Ellipse from '../assets/images/Ellipse.svg'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import LoadingSpinner from "../components/LoadingSpinner";

const accountdetails = () => {
	const [firstname, setFirstname] = useState<any>()
	const [lastname, setLastname] = useState<any>()
	const [gender, setGender] = useState<any>()
	const [culture, setCulture] = useState<any>()
	const [yearsInRelationship, setYearsInRelationship] = useState<any>()
	const [accessToken, setaccessToken] = useState<any>()
	const [refreshToken, setRefreshToken] = useState<any>()
	const [userinfo,setUserInfo] =useState<any>()
	const [deffirstname, setDefFirstname] = useState<any>()
	const [deflastname, setDefLastname] = useState<any>()
	const [defgender, setDefGender] = useState<any>()
	const [defculture, setDefCulture] = useState<any>()
	const [defyearsInRelationship, setDefYearsInRelationship] = useState<any>()
	const [isDataFetched, setIsDataFetched] = useState(false)

	useEffect(() => {
		console.log("UseEffect")
		let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        
        if (accessTokenLS == null) {
			console.log('No Access Token')

        }
        else{
			console.log(accessTokenLS)
            setaccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
			getUserInfo(accessTokenLS)
        }
    }, []);

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
		setUserInfo(userinfo)
		console.log(userinfo)
		console.log(userinfo.first_name)
		setDefFirstname(userinfo.first_name)
		setDefLastname(userinfo.last_name)
		setDefGender(userinfo.gender)
		setDefCulture(userinfo.culture)
		setDefYearsInRelationship(userinfo.years_in_relationShip)
		setIsDataFetched(true)
	}

	let editUserDetails = async () => {		
		let editUserDetailsUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/edit/`
		let response = await fetch(editUserDetailsUrl, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+accessToken,
			},
			body: JSON.stringify({
				first_name: firstname,
				last_name: lastname,
				gender: gender,
				culture: culture,
				years_in_relationShip: yearsInRelationship,
			}),
		})
		console.log(response)			
	}

	return (
		<div className=" flex flex-col items-center min-h-screen w-full bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
			<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
			<Head>
				<meta name='theme-color' content='#FFBCD1' />
			</Head>
			<AccountDetailsTopBar first_name={deffirstname} last_name={deflastname} />
			<div className='flex flex-col items-center mx-6 max-h-screen w-[95vw] max-w-md rounded-3xl mt-7 bg-[#FFFFFF] '>
			<form autoComplete='on' className='flex flex-col justify-center'>				
				<input className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-10  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="text" name="firstname" id="firstname" defaultValue={deffirstname} placeholder="First Name" autoComplete='on' onChange={(e) => {setFirstname(e.target.value)}}/>
				<input className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-3  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="text" name="lastname" id="lastname" defaultValue={deflastname} placeholder="Last Name" autoComplete='on' onChange={(e) => {setLastname(e.target.value)}}/>
				<div className='mx-3  mt-4 flex justify-between'>
					<select className=' pl-6 text-[#FF848E] rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] w-[160px] h-[56px]' name="gender" id="gender" onChange={(e) => {setGender(e.target.value)}} >
              			<option value="female">Female</option>
              			<option value="male">Male</option>
              			<option value="" disabled selected hidden>{defgender}</option>
          			</select>
					<select className=' pl-6 ml-2 mr-3 text-[#FF848E] rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] w-[160px] h-[56px]'  name="culture" id="culture" placeholder='Culture' onChange={(e) => {setCulture(e.target.value)}}>
              			<option value="culture 1">Culture 1</option>
              			<option value="culture 2">Culture 2</option>
              			<option value="" disabled selected hidden>{defculture}</option>
              			<option value="culture 3">Culture 3</option>
              			<option value="culture 4">Culture 4</option>
          			</select>
				</div>
				<select className='pl-6 mx-3 mt-4 text-[#FF848E] rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] w-[330px] h-[56px] '  name="rel" id="rel" placeholder='rel' onChange={(e) => {setYearsInRelationship(e.target.value)}}>
					<option value="" disabled selected hidden>{defyearsInRelationship}</option>
              		<option value="1">1</option>
              		<option value="2">2</option>
              		<option value="3">3</option>
              		<option value="4">4</option>
          		</select>
				<div className='mt-5 w-full flex justify-center'>
					<Link href="/changepassword">
						<button className=' mt-4 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-full w-[330px] h-[56px] cursor-pointer'>Click here to change password</button>  
					</Link>
				</div>
				<div className='flex mt-10 mb-6 mx-3 justify-between'>
					<Link href="/home">
						<button className=' h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl cursor-pointer'>Back</button> 
					</Link>				
					<button className='  ml-2 h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl' type="button" onClick={editUserDetails}>Save</button>  								
				</div>	
			</form>	
			</div>
		</div>
	);
}

export default accountdetails;