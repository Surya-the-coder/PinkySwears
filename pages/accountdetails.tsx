import Head from 'next/head';
import AccountDetailsTopBar from '../components/AccountDetailsTopBar'
import Ellipse from '../assets/images/Ellipse.svg'

const accountdetails = () => {
	return (
		<div className=" flex flex-col items-center min-h-screen w-full bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
			<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
			<Head>
				<meta name='theme-color' content='#FFBCD1' />
			</Head>
			<AccountDetailsTopBar/>
			<div className='flex flex-col items-center mx-6 h-[65vh] max-h-[70vh] w-[95vw] max-w-md rounded-3xl mt-7 bg-[#FFFFFF] '>
				<input className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-10  rounded-2xl border w-[330px] h-[56px] mx-3 font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]" type="email" name="email" id="email" placeholder="Email"/>
				<div className='mx-3  mt-4 flex justify-between'>
					<select className=' pl-6 ml-3 text-[#FF848E] rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] w-[160px] h-[56px]' name="gender" id="gender" >
              			<option value="female">Female</option>
              			<option value="male">Male</option>
              			<option value="" disabled selected hidden>Gender</option>
          			</select>
					<select className=' pl-6 ml-2 mr-3 text-[#FF848E] rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] w-[160px] h-[56px]'  name="culture" id="culture" placeholder='Culture'>
              			<option value="culture 1">Culture 1</option>
              			<option value="culture 2">Culture 2</option>
              			<option value="" disabled selected hidden>Culture</option>
              			<option value="culture 3">Culture 3</option>
              			<option value="culture 4">Culture 4</option>
          			</select>
				</div>
				<select className='pl-6 mx-3 mt-4 text-[#FF848E] rounded-2xl border font-[Sarabun-SemiBold] text-xs font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] w-[330px] h-[56px] '  name="rel" id="rel" placeholder='rel'>
					<option value="" disabled selected hidden>Year's in relationship</option>
              		<option value="1">1</option>
              		<option value="2">2</option>
              		<option value="3">3</option>
              		<option value="4">4</option>
          		</select>
				<div className='flex mt-[146px] mb-6 mx-3 justify-between'>
					<button className=' h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl'>Save</button>  
					<button className=' ml-2 h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl'>Back</button> 
				</div>			
			</div>
		</div>
	);
}

export default accountdetails;