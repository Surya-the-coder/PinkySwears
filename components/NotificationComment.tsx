import Link from 'next/link'
import Image from 'next/image'
import Like from '../assets/images/Like.svg'
import Love from '../assets/images/Love.svg'
import Reply from '../assets/images/Reply.svg'
import { profilePicLoader } from './CommonFunctions'
import {forwardRef, PropsWithChildren} from "react";

const Card = forwardRef((props:PropsWithChildren<any>,ref:any) => {

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
        // props.setClickedFeed(props.postid)
        sessionStorage.setItem("clickedFeed", `${props.targetcomment}-${props.targetpost}`)
    }

    return (
        <Link href={`/post/${props.targetpost}`}>
            <div
                id={`card-${props.targetcomment}-${props.targetpost}`}
                className='flex-row mx-5 my-5 bg-white py-2 px-10 rounded-3xl shadow-card cursor-pointer'
                ref={ref}
                onClick={cardClickedFn}>
                <h4 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> {props.message} </h4>
                <div className='flex'>
                    <div className='pt-5'>
                        <p className='text-xs text-purple-500 font-Sarabun'>{props.createdData}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
})

export default Card
