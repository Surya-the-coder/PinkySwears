import Head from 'next/head';
import AccountDetailsTopBar from '../components/AccountDetailsTopBar'
import Ellipse from '../assets/images/Ellipse.svg'

const changepassword = () => {
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
				<input className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-[40px]  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="password" id="password" placeholder="Current Password"/>
				<input className=" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5 rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none placeholder:text-[#FF848E]" type="password" name="password" id="password" placeholder="New Password"/>
				<input className=" text-[#FF848E] focus-welcome-field-shadowfocus pl-6 mt-5  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none placeholder:text-[#FF848E]" type="password" name="password" id="password" placeholder="Confirm New Password"/>
				<div className='flex mt-[90px] mb-6 mx-3 justify-between'>
					<button className=' h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl'>Save</button>  
					<button className=' ml-2 h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl'>Back</button> 
				</div>			
			</div>
		</div>
	);
}

export default changepassword;