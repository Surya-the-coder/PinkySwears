import BellIcon from '../assets/images/Bell.svg';
import Search from '../assets/images/Search.svg';
import Profile from '../assets/images/Profile.svg';
import { url } from 'inspector';
import { profilePicLoader } from './CommonFunctions'
import Image from 'next/image'

const AccountDetailsTopBar = (props) => {
	return (
		<div className='flex flex-col w-full max-w-md'>
			<div className='pt-2 flex flex-col justify-center items-center'>
				{/* <img src={} className='rounded-full h-16 w-16'></img> */}
				<Image loader={profilePicLoader} src={`${props.profileImg}`} width={64} height={64} className = "rounded-full w-16 h-16"/>
        		<h4 className='mx-2 mt-4 text-[#A268AC] font-[Sarabun-SemiBold] font-semibold text-'>{props.username}</h4>       
			</div>
      	</div>

     
	);
}

export default AccountDetailsTopBar;