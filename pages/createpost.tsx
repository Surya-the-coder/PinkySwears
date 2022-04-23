import TopBar from '../components/TopBar'
const createpost = () => {
	return (
		<div className=" min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
		<div className=" mr-5 mb-6 overflow-y-auto overflow-hidden h-[95vh]">
			<meta name='theme-color' content='#FFBCD1' />
			<TopBar/>
		</div>
		<div>
			<div className='w-full mt-10 justify-around items-center flex'/>			
			<p className=' font-[Sarabun-SemiBold] text-semibold text-[#2F2F2F] text-xl'>Create Post</p>
			
		</div>
			
		</div>
	);
}

export default createpost;