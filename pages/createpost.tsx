import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'
const createpost = () => {
	return (
		<div className=" min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
		<div className=" mr-5">
			<meta name='theme-color' content='#FFBCD1' />
			<TopBar/>	
			<div className='flex mx-6'>
				<p className='font-[Sarabun-SemiBold] text-semibold text-[#2F2F2F] text-xl'>Create Post</p>			
			</div>
			<div className='mx-6 mt-5 justify-center'>
				<textarea className='  shadow-welcome-field-shadowfocus pl-5 pt-8 rounded-xl h-[50vh] min-w-full ' id="caption" placeholder='write a caption...'/>	
			</div>
			<div className='flex mx-7 items-center justify-center'>
				<button className=' h-16 w-40 mt-5 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl'>Back</button>  
				<button className=' ml-8 h-16 w-40 mt-5 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl'>Post</button> 
			</div>
		</div>
		<NavBar/>
		</div>
	);
}

export default createpost;