import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Vector from '../assets/images/Vector 4.svg'
import FooterVector from '../assets/images/Vector 1.svg'
import GoogleIcon32 from '../assets/images/Google-32.svg'
import GoogleLogin from 'react-google-login'
import LoadingSpinner from '../components/LoadingSpinner'

let redirectToHomePage = (router) => {
	return router.push('/home')
}

let redirectToLoginPage = (router) => {
	return router.push('/signin')
}

let redirectToPreferencePage = (router) => {
	return router.push('/preference')
}

const Home = (pageProps) => {
	const router = useRouter()

	const [loading, setLoading] = useState(false)

	const [firstName, setFirstName] = useState<any>()
	const [lastName, setLastName] = useState<any>()
	const [username, setUsername] = useState<any>()
	const [email, setEmail] = useState<any>()
	const [password, setPassword] = useState<any>()
	const [reEnterPassword, setReEnterPassword] = useState<any>()
	const [gender, setGender] = useState<any>()
	const [culture, setCulture] = useState<any>()
	const [yearsInRelationship, setYearsInRelationship] = useState<any>()

	const [passwordMismatch, setPasswordMismatch] = useState(false)
	const [userCreated, setUserCreated] = useState(true)
	const [userAlreadyExist, setUserAlreadyExist] = useState(false)

	const [AccessToken, setAccessToken] = useState<any>()
	const [RefreshToken, setRefreshToken] = useState<any>()
	const [AccessTokenValid, setAccessTokenValid] = useState(false)
	const [RefreshNotInitiated, setRefreshNotInitiated] = useState(true)
	const [GoogleIDToken, setGoogleIDToken] = useState()

	useEffect(() => {
		let accessTokenLS = localStorage.getItem('access_token')
		let refreshTokenLS = localStorage.getItem('refresh_token')

		if (accessTokenLS != null) {
			setLoading(true)
			isAccessTokenValid(accessTokenLS)

			setAccessToken(accessTokenLS)
			setRefreshToken(refreshTokenLS)

			router.prefetch('/home')
		}
	}, [])

	let isAccessTokenValid = async (accessTokenLS) => {
		let verifyTokenAPI = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/verify/`
		let response = await fetch(verifyTokenAPI, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: accessTokenLS,
			}),
		})

		if (response.status === 201) {
			setAccessTokenValid(true)
		}
	}

	let getRefreshedAccessToken = async (refreshTokenLS) => {
		setRefreshNotInitiated(false)

		let refreshTokenAPI = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/refresh/`

		let response = await fetch(refreshTokenAPI, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				refresh: refreshTokenLS,
			}),
		})

		let tokens = await response.json()

		if (response.status === 200) {
			setAccessTokenValid(true)
			setAccessToken(tokens.access)
			localStorage.setItem('access_token', tokens.access)
		} else {
			localStorage.clear()
		}
	}

	let signUp = async () => {
		if (password === reEnterPassword) {
			setLoading(true)
			setPasswordMismatch(false)

			let fd = new FormData()
        	fd.append('first_name', firstName)
        	fd.append('last_name', lastName)
			fd.append('username', username)
			fd.append('email', email)
			fd.append('password', password)
        	fd.append('gender', gender)
        	fd.append('culture', culture)
        	fd.append('years_in_relationShip', yearsInRelationship)
        	// fd.append('profileImg', '')
        	
			let createUserApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/new/`
			let response = await fetch(createUserApiUrl, {
				method: 'POST',
				headers: {},
				body: fd,
			})

			console.log(response)
			console.log(await response.json())

			if (response.status === 201) {
				console.log('User Created')
				setUserCreated(true)
				redirectToLoginPage(router)
			}
			else if (response.status === 409) {
				console.log('User Already exist')
				setUserAlreadyExist(true)
				setLoading(false)
				// redirectToLoginPage(router)
			}
			else {
				console.log('User Creation Failed')
				setUserCreated(false)
				localStorage.clear()
				window.location.reload()
			}
		} 
		else {
			setPasswordMismatch(true)
		}
	}

	const handleLogin = (googleData) => {
		setLoading(true)
		let googleIdToken = googleData.tokenId;
		localStorage.setItem('google_ID_Token', googleIdToken)
		setGoogleIDToken(googleIdToken)
		SignUpWithGoogle()
	}
	
	let SignUpWithGoogle = async () => {
		setLoading(true)
		let googleIDTok = localStorage.getItem('google_ID_Token')
		let createUserApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/social-signup/google-oauth2/`
		
		let response = await fetch(createUserApiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'access_token' : googleIDTok
			}),
		})
		
		// console.log(response)
		// console.log(data)
		// console.log(data.success)
		
		let data = await response.json()
		if (response.status === 201) {
			localStorage.setItem('access_token', data.tokens.access)
			localStorage.setItem('refresh_token', data.tokens.refresh)
			localStorage.setItem('UserDetails', JSON.stringify(data.user))
			
			if (data.success == "user is created and logged in.") {
				setUserCreated(true)
				redirectToPreferencePage(router)
			}
			else if(data.success == "user already exists and is logged in."){
				setUserAlreadyExist(true)
				redirectToHomePage(router)
			}
		}
		else {
			setUserCreated(false)
			localStorage.clear()
			window.location.reload()
		}
	}

	if (AccessToken != null) {
		if (AccessTokenValid) {
			redirectToHomePage(router)
		} else if (RefreshNotInitiated) {
			getRefreshedAccessToken(RefreshToken)
		}
	}

	return (
		<>
			<div className="flex max-h-screen min-h-screen min-w-full flex-col items-center from-[#FDEBF7] to-[#FFBCD1] md:bg-gradient-to-t">
				<Head>
					<title>Pinky Swears</title>
					<meta name="theme-color" content="#FFBCD1" />
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
				</Head>
				{loading?<LoadingSpinner/>:
				<>
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
					<form action="" className="flex w-full flex-col items-center" autoComplete='on' method='POST'>
						{userCreated ? null : <p className='text-red-500 text-center font-[Sarabun-SemiBold] text-xs font-semibold mb-2'>User creation failed. Please retry</p>}
						{userAlreadyExist ? <p className='text-red-500 text-center font-[Sarabun-SemiBold] text-xs font-semibold mb-2'>UserName/Email Already Exists, Please Login</p> : null}
						<input
							className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]"
							type="text"
							name="FirstName"
							id="FirstName"
							placeholder="First Name"
							onChange={(e) => {
								setFirstName(e.target.value)
							}}
						/>
						<input
							className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]"
							type="text"
							name="LastName"
							id="LastName"
							placeholder="Last Name"
							onChange={(e) => {
								setLastName(e.target.value)
							}}
						/>
						<input
							className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]"
							type="text"
							name="Username"
							id="username"
							placeholder="Username"
							onChange={(e) => {
								setUsername(e.target.value)
							}}
						/>
						<input
							className=" focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]"
							type="text"
							name="email"
							id="email"
							placeholder="Email"
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
						{passwordMismatch ? (
							<p className="pt-1 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-red-500">
								{' '}
								Password fields does not match{' '}
							</p>
						) : null}
						<input
							className={
								passwordMismatch
									? ' focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border border-red-500 pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-red-500 focus:outline-none focus:placeholder:text-[#FFBCD1]'
									: ' focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]'
							}
							type="password"
							name="Password"
							id="password"
							placeholder="Password"
							autoComplete='on'
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>
						<input
							className={
								passwordMismatch
									? ' focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border border-red-500 pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-red-500 focus:outline-none focus:placeholder:text-[#FFBCD1]'
									: ' focus-welcome-field-shadowfocus mt-2 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]'
							}
							type="password"
							name="password"
							id="Repassword"
							placeholder="Re-enter Password"
							autoComplete='on'
							onChange={(e) => {
								setReEnterPassword(e.target.value)
							}}
						/>

						<div className=" mt-3 flex w-full max-w-[450px] items-center justify-around px-16">
							<label className=" font-[Sarabun-SemiBold] text-xs font-semibold text-[#020202] ">
								Gender
							</label>
							<input
								className="h-4 w-4 accent-pink-500 outline-hidden "
								type="radio"
								id="male"
								name="radiobutton"
								value="Male"
								onChange={(e) => {
									setGender(e.target.value)
								}}
							/>
							<label className="text-xs text-[#CDCCCD] md:text-gray-600">
								Male
							</label>
							<input
								className=" h-4 w-4 accent-pink-500 outline-hidden "
								type="radio"
								id="female"
								name="radiobutton"
								value="Female"
								onChange={(e) => {
									setGender(e.target.value)
								}}
							/>
							<label className="text-xs text-[#CDCCCD] md:text-gray-600">
								Female
							</label>
						</div>

						<select
							className="bg-white select-text:text-[#020202] focus-welcome-field-shadowfocus select-text:font-[Sarabun-SemiBold] mt-4 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold text-[#CDCCCD] shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none"
							onChange={(e) => {
								setCulture(e.target.value)
							}}
						>
							<option value="">
								Culture
							</option>
							<option value="South Indian">South Indian</option>
							<option value="North Indian">North Indian</option>
							<option value="East Indian">East Indian</option>
							<option value="Others">Others</option>
						</select>

						<select
							className="bg-white focus-welcome-field-shadowfocus select-text:font-[Sarabun-SemiBold] mt-4 h-12 w-80 rounded-2xl border pl-6 font-[Sarabun-SemiBold] text-xs font-semibold text-[#CDCCCD] shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none"
							onChange={(e) => {
								setYearsInRelationship(e.target.value)
							}}
						>
							<option
								className=" text-gray-500"
								value=""
							>
								Year's in relationship
							</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="more than 5">more than 5</option>
						</select>

						<div className="  mt-3 flex w-full justify-center accent-[#FFBCD1]">							
							<p className=" font-[Sarabun-SemiBold] text-xs font-semibold text-[#262626]">
								By clicking Sign Up, you agree to our </p>
								<Link href={'/termsandconditions'}>
									<p className=" cursor-pointer font-[Sarabun-SemiBold] text-xs font-semibold text-[#FF848E]">&nbsp;Terms and Conditions&nbsp;</p>
								</Link>
						</div>
						<button
							type='submit'
							className=" mt-5 h-10 w-64 rounded-full bg-[#F67A95] font-[Sarabun-Regular] font-normal -tracking-tighter text-white shadow-button-shadow"
							onClick={signUp}
						>
							{' '}
							Sign Up{' '}
						</button>
					</form>
				</div>
				<p className=" mt-3 font-[Sarabun-SemiBold] text-xs text-[#262626]">
					{' '}
					or{' '}
				</p>
				<div className=" mt-3 flex w-full max-w-md items-center justify-around px-3">
					<GoogleLogin
						clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
						render = { renderProps => (
						<button 
							className="h-10 w-64 flex items-center justify-center rounded-full bg-white font-[Sarabun-Regular] text-lg font-normal -tracking-tighter text-[#F67A95] shadow-button-shadow"
							onClick={renderProps.onClick} 
							disabled = {renderProps.disabled}>
								Continue with&nbsp;
								<GoogleIcon32/>
						</button>)}
					    onSuccess={handleLogin}
					    onFailure={handleLogin}
					    cookiePolicy={'single_host_origin'}
					/>
				</div>

				<div className="mx-auto mt-1 flex h-3 w-full text-center">
					<FooterVector className="-z-50 w-full md:hidden" />
				</div>
				<div>
					<span className="relative z-50 bottom-0 flex bg-transparent w-full justify-center pt-12 text-center font-[Sarabun-SemiBold] text-xs font-semibold text-gray-400">
						Already have an account? &nbsp;
						<Link href={'/signin'}>
							<p className=" cursor-pointer font-[Sarabun-SemiBold] text-xs font-semibold text-[#FF848E]">&nbsp;Sign In&nbsp;</p>
						</Link>
					</span>
				</div>
				</>
			}
			</div>
		</>
	)
}

export default Home

// Multiple Provider Login buttons
{/* <button onClick={() => signIn('facebook')} className="fa fa-facebook flex h-8 w-8 items-center justify-center rounded-full bg-[#4267B2] text-center text-sm text-white"/> */}
{/* <button onClick={() => signIn('twitter')} className="fa fa-twitter flex h-8 w-8 items-center justify-center rounded-full bg-[#00ACEE] text-center text-sm text-white"/> */}
{/* <button onClick={() => signIn('google')} className=""> <GoogleIcon32 /> </button> */}