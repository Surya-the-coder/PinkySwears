import Head from 'next/head';
import AccountDetailsTopBar from '../components/AccountDetailsTopBar'
const changepassword = () => {
	return (
		<div className=" flex flex-col items-center min-h-screen w-full bg-pink-300">
			<Head>
				<meta name='theme-color' content='#FFBCD1' />
			</Head>
			<AccountDetailsTopBar/>
			<div className='flex flex-col items-center mx-6 h-[65vh] max-h-[70vh] w-[95vw] max-w-md rounded-3xl mt-7 bg-[#FFFFFF] '>
				<input className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-10  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="password" name="password" id="password" placeholder="Current Password"/>				
				<div className='flex mt-[146px] mb-2 mx-3 justify-between'>
					<button className=' h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl'>Save</button>  
					<button className=' ml-2 h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl'>Back</button> 
				</div>			
			</div>
		</div>
	);
}

export default changepassword;