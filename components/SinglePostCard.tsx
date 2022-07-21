import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'
import Send from '../assets/images/Send.svg'
import Like from '../assets/images/Love.svg'
import LikePink from '../assets/images/LovePink.svg'
import Share from '../assets/images/Share.svg'
import Comment from '../assets/images/Reply.svg'
import ThreeDots from '../assets/images/ThreeDots.svg'
import PinkTrash from '../assets/images/PinkTrash.svg'
import PinkBlockIcon from '../assets/images/PinkBlockIcon.svg'
import { profilePicLoader } from './CommonFunctions'
import {useRouter} from "next/router";
import Link from 'next/link'
import ConfirmDialog from "./ConfirmDialog";




const SinglePostCard = (props) => {
    // console.log(props.hashTags)
    const router = useRouter()
    const [newCommentContent, setNewCommentContent] = useState<any>()
    
    const [likes, setLikes] = useState(props.likes)
    const [isLiked, setisLiked] = useState(props.isLiked)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const inputRef = useRef<any>()



    useEffect(() => {
        // let fetchSinglePostApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/${router.query.postid}/`;
        // fetch(fetchSinglePostApiUrl)
        // .then(response => response.json())
        // .then((postData) => {console.log(postData); setSinglePostData(postData); setPostUserInfo(postData.user);setIsDataFetched(true)})
        // getSinglePostData()
        console.log(props);
        
    }, [])

    let likePost =async () => {
        let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/like/${props.postid}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+props.accessToken,
			},
		});
        // console.log(response)
        if (isLiked) {
            setisLiked(false)
            setLikes(likes-1)
        }
        else{
            setisLiked(true)
            setLikes(likes+1)
        }
    }


    let postComment = async () => {
        if (newCommentContent.trim() !== "") {
            // console.log(props.postid)
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment/new/post/${props.postid}/`, {
		    	method: "POST",
		    	headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${props.accessToken}` },
		    	body: JSON.stringify({'content' : newCommentContent}),
		    });
		    // console.log(response)
            inputRef.current.value = ""
            sendCommentToParent() //works without refresh

        }
        // window.location.reload();
    }
    
    let reportDeletePostHandler = () => {
        props.isSameUserPost ? deletePost() : reportPost()
    }

    // let deleteAPI = async() => {
    //     let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/${props.postid}/`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': 'Bearer '+props.accessToken,
    //         },
    //     });
    // }


    // let deleteAfterConfimation = async () => {
    //     console.log("deleting post")
    //     deleteAPI().then(() => {
    //       router.back()
    //     })
    //
    // }

    let deletePost =  () => {

        console.log(props.postid)
        props.setConfirmOpen(true)


    }

    let reportPost = async () => {
        let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/report/post/${props.postid}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+props.accessToken,
			},
		});
    }

    let sendCommentToParent = () => {
        props.setNewComment(newCommentContent)
    }

    let keyHandler = (e) => {
        if (e.key === 'Enter') {
            postComment()
        }
    }


    let hashClick = (e) => {
        let hashValue = e.target.value
        console.log("Hash value is " + hashValue)
        sessionStorage.setItem('searchClicked','true')
        sessionStorage.setItem('searchString',hashValue)
        sessionStorage.setItem('searchType','hashtag')
        router.push(`/home/`)
    }

    return (

        <div className="flex flex-col bg-white rounded-2xl mx-5 px-3 py-5 post-content relative">
            <div className="flex justify-between mx-1">
                <div className='flex w-full'>
                    <Link href={`/userinfo/${props.userid}`}>
                        <div className="mr-2 w-14">
                            <Image loading='lazy' loader={profilePicLoader} src={props.postUserImage} width={48} height={48} className="rounded-full w-12 h-12" alt="PI" />
                        </div>
                    </Link>
                    <div className="flex flex-col w-full">
                        <Link href={`/userinfo/${props.userid}`}>
                            <h1 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'>{props.postUserName}</h1>
                        </Link>
                        <h3 className='text-xs text-purple-500 font-Sarabun'>{props.postCreatedDate}</h3>
                        <p className='text-sm text-gray-500 mt-2'>{props.postContent}</p>
                        <hr className={"mt-3"}/>
                        <span className="text-sm text-blue-500 mt-2">{props.hashTags?.map((hashtag, index) =>
                            <button key={index} onClick={hashClick} value={hashtag}>{hashtag} &nbsp; </button>
                        )
                        }</span>
                        <div className="flex mt-3 w-full justify-between pr-14">
                            <button className='flex items-center text-xs text-pink-400' onClick={likePost}>
                                {isLiked ? <LikePink/> :<Like/>}
                                {isLiked ? <p className='mx-2 text-xs text-[#FF848E]'>{likes} </p> :<p className='mx-2 text-xs text-gray-400'> {likes} </p>}
                            </button>
                            <div className='flex items-center text-xs'>
                                <Comment/>
                                <p className='mx-2 text-xs text-gray-400'>{props.comments}&nbsp; </p>
                            </div>
                            <div className='flex items-center text-xs'>
                                <Share/>
                                {/* <p className='mx-2 text-xs text-gray-400'> share </p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={reportDeletePostHandler}>
                        {props.isSameUserPost ? <PinkTrash/> : <PinkBlockIcon/>}
                    </button>
                </div>
            </div>
            <div className="flex mt-3 items-center">
                <Image loading='lazy' loader={profilePicLoader} src={props.currentUserImage} width={24} height={24} className="rounded-full w-6 h-6" alt="UI"/>
                <div className="flex rounded-full bg-gray-100 mx-2 w-96">
                    <input type="text" name="Comment" ref={inputRef} id="comment" placeholder="Write a comment..." className="pl-4 outline-none font-thin text-xs px-2 bg-transparent w-full" onChange={(e)=> setNewCommentContent(e.target.value)} onKeyUp={keyHandler}/>
                    <button onClick={postComment}> <Send className="w-10 h-10 mr-2"/> </button>
                </div>
            </div>

        </div>
    );
}

export default SinglePostCard;