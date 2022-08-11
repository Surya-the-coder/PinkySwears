import Link from 'next/link'
import Image from 'next/image'
import { profilePicLoader } from './CommonFunctions'
import {forwardRef, PropsWithChildren} from "react";

const UserCard = forwardRef((props:PropsWithChildren<any>,ref:any) => {

    function cardClickedFn() {
        // console.log("Card Clicked")
        //
        // console.log(props.postid)
        props.setClickedUserCard(props.postid)
        sessionStorage.setItem("clickedUserCard", props.postid)
    }
    console.log('Props is ' + props.user)
    return (
        <Link href={`/userinfo/${props.userId}`}>
            <div id={`card-${props.userId}`} className='flex mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card cursor-pointer' ref={ref} onClick={cardClickedFn}>
                <div>
                    <Link href={`/userinfo/${props.userId}`}>
                        <div className='w-12 h-12 mt-5 mr-3'>
                            <Image loader={profilePicLoader} src={`${props.profileImage!==null?props.profileImage:'/media/userDefault.jpg'}`} width={64} height={64} className = "rounded-full w-16 h-16"></Image>
                        </div>
                    </Link>
                </div>
                <div className='pt-1 block'>
                    <h3 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> {props.firstName} </h3>
                    <div className='flex-auto  pt-2 block'>
                        <span className='mr-10'>Followers : {props.numberOfFollowers}</span>
                        <span >Following : {props.numberOfFollowing}</span>
                    </div>
                </div>

            </div>
        </Link>
    )
})

export default UserCard
