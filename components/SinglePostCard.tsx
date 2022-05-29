import Send from '../assets/images/Send.svg'
import Like from '../assets/images/Like.svg'
import Comment from '../assets/images/Reply.svg'
import Share from '../assets/images/Share.svg'
import ThreeDots from '../assets/images/ThreeDots.svg'
import { useEffect, useState } from 'react'

const SinglePostCard = (props) => {
    
    const [newCommentContent, setNewCommentContent] = useState<any>()

    useEffect(() => {
        // let fetchSinglePostApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/${router.query.postid}/`;
        // fetch(fetchSinglePostApiUrl)
        // .then(response => response.json())
        // .then((postData) => {console.log(postData); setSinglePostData(postData); setPostUserInfo(postData.user);setIsDataFetched(true)})
        // getSinglePostData()
    }, [])
    

    let postComment = async () => {
        if (newCommentContent.trim() !== "") {
            // console.log(newCommentContent)
            console.log(props.postid)
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment/all/post/${props.postid}/`, {
		    	method: "POST",
		    	headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${props.accessToken}` },
		    	body: JSON.stringify({'content' : newCommentContent}),
		    });
		    console.log(response)
        }
        window.location.reload();
    }
    
    let sendCommentToParent = () => {
        props.setNewComment(newCommentContent)
    }

    return (
        <div className="flex flex-col bg-white rounded-2xl mx-5 px-3 py-5">
            <div className="flex justify-between mx-1">
                <div className='flex w-full'>
                    <div className="mr-2 w-14">
                        <img src={props.postUserImage} className="rounded-full w-12 h-12" alt="PI" />
                    </div>
                    <div className="flex flex-col w-full">
                        <h1 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'>{props.postUserName}</h1>
                        <h3 className='text-xs text-purple-500 font-Sarabun'>{props.postCreatedDate}</h3>
                        <p className='text-sm text-gray-500 mt-2'>{props.postContent}</p>
                        <div className="flex mt-3 w-full justify-between pr-14"> 
                            <div className='flex items-center text-xs'>
                                <Like/>
                                <p className='mx-2 text-xs text-gray-400'> like </p>
                            </div>
                            <div className='flex items-center text-xs'>
                                <Comment/>
                                <p className='mx-2 text-xs text-gray-400'> comment </p>
                            </div>
                            <div className='flex items-center text-xs'>
                                <Share/>
                                <p className='mx-2 text-xs text-gray-400'> share </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="">
                        <ThreeDots/>
                    </div>
                </div>
            </div>
            <div className="flex mt-3 items-center">
                <img src={props.currentUserImage} className="rounded-full w-6 h-6" alt="UI"/>
                <div className="flex rounded-full bg-gray-100 mx-2 w-96">
                    <input type="text" name="Comment" id="comment" placeholder="Write a comment..." className="pl-4 outline-none font-thin text-xs px-2 bg-transparent w-full" onChange={(e)=>setNewCommentContent(e.target.value)}/>
                    <button onClick={postComment}> <Send className="w-10 h-10 mr-2"/> </button>
                </div>
            </div>         
        </div>
    );
}

export default SinglePostCard;