import Link from 'next/link'
import Image from 'next/image'
import Like from '../assets/images/Like.svg'
import Love from '../assets/images/Love.svg'
import Reply from '../assets/images/Reply.svg'
import { profilePicLoader } from './CommonFunctions'
import {forwardRef, PropsWithChildren} from "react";


const CardSelf = forwardRef((props:PropsWithChildren<any>,ref:any) => {

    let likePost =async () => {
        console.log(props.accessToken)
        let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/like/${props.postid}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+props.accessToken,
            },
        });
        console.log(response)
        if(response.status==201)
            console.log("Post Liked")
        if(response.status==200)
            console.log("Post Unliked")
    }


    function cardClickedFn() {
        // console.log("Card Clicked")
        //
        // console.log(props.postid)
        // props.setClickedCard(props.postid)
        sessionStorage.setItem("userClickedCard", props.postid)
    }

    return (
        <>

            <Link href={`/post/${props.postid}`}>
                <div id={`card-${props.postid}`}
                     className='flex mx-5 my-5 mb-5 bg-white py-2 px-5 rounded-3xl shadow-card cursor-pointer' ref={ref}
                     onClick={cardClickedFn}>
                    <div className=' pt-0 pl-2'>
                            <div className='flex my-2 text-xs text-blue-500'>Created post on - <span className='text-xs text-purple-500 font-Sarabun'>&nbsp; {props.createdData}</span></div>

                        {/*<p className='text-xs text-purple-500 font-Sarabun'>{props.createdData}</p>*/}
                        <p className='text-sm text-gray-500 mt-2'>{props.content}</p>
                        <div className='mt-3 flex items-center'>
                            <Love/>
                            <p className='mx-2 text-xs text-gray-400'>{props.numberOfLikes == null ? 0 : props.numberOfLikes}</p>
                            <Reply/>
                            <p className='mx-2 text-xs text-gray-400'>{props.commentsCount > 0 ? props.commentsCount : 0}</p>

                        </div>
                    </div>
                </div>
            </Link></>
    )
})

export default CardSelf
