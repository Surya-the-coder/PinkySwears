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
				<img src={'https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/'} className=' rounded-full h-16 w-16'></img> {/* <Profile className="mx-2"/> */}
        		<h4 className='mx-2 text-[#A268AC] font-[Sarabun-SemiBold] font-semibold text-'>{props.first_name}_{props.last_name}</h4>       
			</div>				
      	</div>

     
	);
}

export default AccountDetailsTopBar;