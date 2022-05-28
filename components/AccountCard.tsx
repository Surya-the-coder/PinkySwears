import Reply from '../assets/images/Reply.svg'
import '../assets/images/photo.png'
import Love from '../assets/images/Love.svg'

const AccountCard = (props) => {
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
    // forcereload()
    
  }
  return (
      <div className='flex mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card cursor-pointer'>
        <div>
          {/* <Link href={`/userinfo/${props.userid}`}> */}
            <div className='w-12 h-12 mt-5 mr-3'>
              <img src={props.profileImage} className='w-full h-full rounded-full'/>
            </div>
          {/* </Link> */}
        </div>
        <div className=' pt-5'>
          <h3 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> {props.username} </h3>
          <p className='text-xs text-purple-500 font-Sarabun'>{props.createdData}</p>
          <p className='text-sm text-gray-500 mt-2'>{props.content}</p>
          <div className='mt-3 flex items-center'>
          {props.numberOfLikesCheck? <div className='flex'>
          <button onClick={likePost}>             
              <Love></Love>
              </button>             
              <p className='text-xs mx-2'>{props.numberOfLikes}</p>             
          </div>
          :null}           
			      <Reply className=" ml-6"></Reply>
              <p className=' text-xs mx-2'>{props.numberOfLikes} replies</p>
          </div>
        </div>
      </div>
  )
}

export default AccountCard
