import Image from 'next/image'
import BellIcon from '../assets/images/Bell.svg';
import Search from '../assets/images/Search.svg';
import Profile from '../assets/images/Profile.svg';
import BackButton from '../assets/images/Shape.svg';
import Link from 'next/link';
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"
import { redirect } from 'next/dist/server/api-utils';
import { profilePicLoader } from './CommonFunctions'

const TopBar = (props) => {
  
  return (
    <div className="flex py-5 justify-between items-center z-[100] px-5">
      <div className="flex justify-center items-center">
          {props.backButton?<Link href='/home'><BackButton className="mx-3"></BackButton></Link>:null}
          {props.displayPic?
            <Link href={`/userinfo/${props.userid}`}>
              <Image loader={profilePicLoader} src={`${props.loggedInUserProfilePic}`} width={64} height={64} className = "rounded-full w-16 h-16"/>
            </Link>
          :null}
          {props.displayName?
            <Link href={`/userinfo/${props.userid}`}>
              <h4 className='mx-2 text-[#A268AC] font-Sarabun-SemiBold cursor-pointer'>{props.loggedInUserName}</h4>
            </Link>
          :null}
      </div>
      <div className="flex">
          <BellIcon className="mx-2"/>
          <Search className="mx-2"/>
      </div>
    </div>
  )
}

export default TopBar
