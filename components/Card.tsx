import Link from 'next/link'
import Like from '../assets/images/Like.svg'
import Love from '../assets/images/Love.svg'
import Reply from '../assets/images/Reply.svg'
import '../assets/images/photo.png'

const Card = (props) => {

  let likePost =async () => {
    console.log(props.accessToken)
    let response= await fetch(`https://backend.pinkyswears.in/api/post/like/${props.postid}/`, {
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
              <img src="https://picsum.photos/200" className='w-full h-full rounded-full'/>
            </div>
          </Link>
        </div>
        <div className=' pt-5'>
          <h3 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> {props.username} </h3>
          <p className='text-xs text-purple-500 font-Sarabun'>{props.createdData}</p>
          <p className='text-sm text-gray-500 mt-2'>{props.content}</p>
          <div className='mt-3 flex items-center'>
            <Link href={'#'}>
              <button className='flex items-center text-xs z-50' onClick={likePost}>
                <Like/>
                <p className='mx-2 text-xs text-gray-400'> like </p>
              </button>
            </Link>
            <Link href={'#'}>
              <div className='flex items-center text-xs text-gray-400'>
                <Reply/>
                <p className='mx-1'>{props.numberOfLikes>0?props.numberOfLikes:0}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
