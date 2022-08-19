import Image from 'next/image'
import BellIcon from '../assets/images/Bell.svg';
import Search from '../assets/images/Search.svg';
import Profile from '../assets/images/Profile.svg';
import BackButton from '../assets/images/Shape.svg';
import Link from 'next/link';
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"
import { redirect } from 'next/dist/server/api-utils';
import { profilePicLoader } from './CommonFunctions'
import {forwardRef, PropsWithChildren} from "react";

const TopBar = forwardRef((props:PropsWithChildren<any>,ref:any) => {
  // let backPage = sessionStorage.getItem('previosPage')
  return (
    <div className="flex pt-5 pb-4 justify-between items-center z-[100] px-5">
      <div className="flex justify-center items-center">
          {props.backButton?<Link ref={ref} href={`/home`}><BackButton className="mx-3"></BackButton></Link>:null}
          {props.displayPic?
            <Link href={`/userinfo/${props.userId}`}>
              <Image loader={profilePicLoader} src={`${props.loggedInUserProfilePic!==null?props.loggedInUserProfilePic:'/media/userDefault.jpg'}`} width={64} height={64} className = "rounded-full w-16 h-16"/>
            </Link>
          :null}
          {props.displayName?
            <Link href={`/userinfo/${props.userId}`}>
              <h4 className='mx-2 text-[#A268AC] font-Sarabun-SemiBold cursor-pointer'>{props.loggedInUserName}</h4>
            </Link>
          :null}
      </div>
      <div className="flex">
          <BellIcon className="mx-2"/>
          {/* <Search className="mx-2"/> */}
      </div>
    </div>
  )
})

export default TopBar
