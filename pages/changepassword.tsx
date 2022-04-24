import Head from 'next/head';
import AccountDetailsTopBar from '../components/AccountDetailsTopBar'
const changepassword = () => {
	return (
		// <div className='min-h-screen w-full flex flex-col justify-center items-center'>
		// 	<h1>Sample</h1>
		// </div>
		<div className=" flex flex-col items-center min-h-screen w-full bg-pink-300">
			<Head>
				<meta name='theme-color' content='#FFBCD1' />
			</Head>
			<AccountDetailsTopBar/>
			<div className='mx-6 h-[65vh] max-h-[70vh] w-[95vw] max-w-md rounded-3xl mt-7 bg-[#FFFFFF] flex justify-center'>
				<input className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-10  rounded-2xl border w-80 h-14 mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="email" name="email" id="email" placeholder="Email"/>
			</div>
		</div>
	);
}

export default changepassword;