import Link from 'next/link'
import Image from 'next/image'
import { profilePicLoader } from './CommonFunctions'
import React, {forwardRef, PropsWithChildren, useEffect,useState} from "react";
// import {router} from "next/client";
import { useRouter } from 'next/router'


const UserCard = forwardRef((props:PropsWithChildren<any>,ref:any) => {



    const router = useRouter();
    // const [reload, setReload] = useState(false);

    // useEffect(() => {} ,[reload])
    function cardClickedFn() {
        // console.log("Card Clicked")
        //
        // console.log(props.postid)
        // props.setClickedUserCard(props.postid)
        sessionStorage.setItem("clickedUserCard", props.userId)
        props.setUserClickedCard(props.userId)
        // router.push(`/userinfo/${props.userId}`)
        // setReload(!reload)
    }

    return (
        <Link href={`/userinfo/${props.userId}`}>
            <div id={`card-${props.userId}`} ref={ref} className='flex mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card cursor-pointer' onClick={cardClickedFn}>
                <div>
                    <Link href={`/userinfo/${props.userId}`}>
                        <div className='w-12 h-12 mt-5 mr-3'>
                            {/*<Image loader={profilePicLoader} src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}` +`${props.profileImage!==undefined?props.profileImage:'/media/userDefault.jpg'}`} width={64} height={64} className = "rounded-full w-16 h-16"></Image>*/}
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}` + `${props.profileImg !== null ? props.profileImg : '/media/userDefault.jpg'}`}
                                className='w-full h-full rounded-full'/>
                        </div>
                    </Link>
                </div>
                <div className='pt-1'>
                    <h3 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> {props.firstName} </h3>
                    <div className='flex flex-row  pt-2 block'>
                        <div className='mr-10'>Followers : <span className='font-bold'>{props.numberOfFollowers}</span></div>
                        <div className=''>Following : <span className='font-bold'>{props.numberOfFollowing}</span></div>
                    </div>
                </div>

            </div>
        </Link>
    )
})

export default UserCard
