import BellIcon from '../assets/images/Bell.svg';
import Search from '../assets/images/Search.svg';
import Profile from '../assets/images/Profile.svg';
import { url } from 'inspector';

const AccountDetailsTopBar = (props) => {
	return (
		<div className='flex flex-col w-full max-w-md'>
			<div className="flex mt-3 justify-between items-center">     			 
				{/* <p className='mx-4 text-[#5F5D5D] font-[Sarabun-SemiBold[ font-semibold text-xl'>Account Details</p> 				 */}
			</div>
			<div className='pt-2 flex flex-col justify-center items-center'>
				<img src={props.profileImg} className=' rounded-full h-16 w-16'></img>
        		<h4 className='mx-2 mt-4 text-[#A268AC] font-[Sarabun-SemiBold] font-semibold text-'>{props.username}</h4>       
			</div>
      	</div>

     
	);
}

export default AccountDetailsTopBar;