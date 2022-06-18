import Link from 'next/link'
import Image from 'next/image'
import Like from '../assets/images/Like.svg'
import Love from '../assets/images/Love.svg'
import Reply from '../assets/images/Reply.svg'
import { profilePicLoader } from './CommonFunctions'

const Card = (props) => {

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

  return (
    <Link href={`/post/${props.postid}`}>
      <div className='flex mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card cursor-pointer'>
        <div>
          <Link href={`/userinfo/${props.userid}`}>
            <div className='w-12 h-12 mt-5 mr-3'>
              <Image loader={profilePicLoader} src={`${props.profileImage}`} width={64} height={64} className = "rounded-full w-16 h-16"></Image>
              {/* <img src={props.profileImage} className='w-full h-full rounded-full'/> */}
            </div>
          </Link>
        </div>
        <div className=' pt-5'>
          <h3 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> {props.username} </h3>
          <p className='text-xs text-purple-500 font-Sarabun'>{props.createdData}</p>
          <p className='text-sm text-gray-500 mt-2'>{props.content}</p>
          <div className='mt-3 flex items-center'>
            {/* <Link href={'#'}> */}
              {/* <button className='flex items-center text-xs z-50' onClick={likePost}> */}
                <Love/>
                <p className='mx-2 text-xs text-gray-400'>{props.numberOfLikes==null?0:props.numberOfLikes}</p>
              {/* </button> */}
            {/* </Link> */}
            {/* <Link href={'#'}>
              <div className='flex items-center text-xs text-gray-400'>
                <Reply/>
                <p className='mx-1'>{props.numberOfLikes>0?props.numberOfLikes:0}</p>
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
