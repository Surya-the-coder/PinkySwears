import Image from 'next/image'
import { useEffect, useState } from 'react'
import Love from '../assets/images/Love.svg'
import LovePink from '../assets/images/LovePink.svg'
import { profilePicLoader } from './CommonFunctions'
import {forwardRef, PropsWithChildren} from "react";

const CommentCard = forwardRef((props:PropsWithChildren<any>,ref:any) => {

    const [commentIsLiked, setCommentIsLiked] = useState(props.isLiked)
    const [commentLikes, setCommentLikes] = useState(props.commentLikes)

    useEffect(() => {
        // console.log(props);

    },[])
    

    let likeComment = async () => {
        let likeCommentAPI = `process.env.NEXT_PUBLIC_BACKEND_BASE_URL /api/comment/like/${props.commentID}/`;
        let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment/like/${props.commentID}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+props.accessToken,
			},
		});
        // console.log(response)

        if(commentIsLiked){
            setCommentIsLiked(false);
            setCommentLikes(commentLikes-1);
        }
        else{
            setCommentIsLiked(true);
            setCommentLikes(commentLikes+1);
        }
    }
    
    return (
        <div id={props.id} className="flex items-center mx-10 my-2 w-80 comment-cards" ref={ref}>
            <div className=''>
                <Image loading='lazy' loader={profilePicLoader} src={props.commentUserProfilePic} alt="" width={48} height={48} className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex bg-white rounded-xl mx-2 px-5 py-2 items-center justify-between w-full">
                <div className="flex flex-col">
                    <h1 className='font-Sarabun-Medium text-xs tracking-[0.2px] font-medium'>{props.commentUsername}</h1>
                    <p className='text-xs text-gray-400 mt-1'>{props.commentContent}</p>
                </div>
                <div className='flex'>
                    <button className='flex items-center text-xs text-pink-400' onClick={likeComment}>
                        {commentIsLiked ? <LovePink/> :<Love/>}
                        {commentIsLiked ? <p className='mx-2 text-xs text-[#FF848E]'>{commentLikes} </p> :<p className='mx-2 text-xs text-gray-400'> {commentLikes} </p>}
                    </button>
                </div>
            </div>
        </div>
        // <div>check</div>
    );
})

export default CommentCard;