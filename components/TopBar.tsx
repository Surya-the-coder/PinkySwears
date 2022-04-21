import Image from 'next/image'
import BellIcon from '../assets/images/Bell.svg';
import Search from '../assets/images/Search.svg';
import Profile from '../assets/images/Profile.svg';
import BackButton from '../assets/images/Shape.svg';

const TopBar = () => {
  return (
    <div className="flex py-10 justify-between items-center">
      <div className="flex mx-2 justify-center items-center">
        <BackButton className="mx-2"></BackButton>
        <Profile className="mx-2"/>
        <h4 className='mx-2 text-[#A268AC] font-Sarabun-SemiBold'>User_name</h4>
      </div>
      <div className="flex">
          <BellIcon className="mx-2"/>
          <Search className="mx-2"/>
      </div>
    </div>
  )
}

export default TopBar
