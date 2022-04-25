import Image from 'next/image'
import BellIcon from '../assets/images/Bell.svg';
import Search from '../assets/images/Search.svg';
import Profile from '../assets/images/Profile.svg';
import BackButton from '../assets/images/Shape.svg';
import Link from 'next/link';
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"
import { redirect } from 'next/dist/server/api-utils';

const TopBar = (props) => {
  return (
    <div className="flex py-10 justify-between items-center z-[100] px-5">
      <div className="flex justify-center items-center">
          {props.backButton?<Link href='/home'><BackButton className="mx-3"></BackButton></Link>:null}
          <Link href={'/profile'}>
            <img src={props.loggedInUserProfilePic} className="w-12 h-12 rounded-full" alt="UserImage" />
          </Link>
          <Link href={'/profile'}>
            <h4 className='mx-2 text-[#A268AC] font-Sarabun-SemiBold'>{props.loggedInUserName}</h4>
          </Link>
      </div>
      <div className="flex">
          <BellIcon className="mx-2"/>
          <Search className="mx-2"/>
      </div>
    </div>
  )
}

export default TopBar
