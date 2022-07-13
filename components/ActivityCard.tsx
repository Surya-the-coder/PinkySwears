import Like from '../assets/images/Like.svg'
import React from 'react'
import dateFormat from 'dateformat';


const ActivityCard = (props) => {
	console.log(props.post)
  return (
      <div className='flex flex-col mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card cursor-pointer'>
			<div className='mx-3 flex justify-between items-center text-center'>
          		<h3 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> You created a post at</h3>
          		<p className='  text-xs text-purple-500 font-Sarabun'>{dateFormat(props.post.created_at, "dS mmmm yyyy")}</p>
			</div>
		  <div className='mx-3 flex justify-between items-center text-center'>
			  {props.post.content}
		  </div>
          	<div className='mt-2 mx-3 flex items-center'>
              	<button className='flex items-center text-xs z-50'>
                	<Like/>
                	<p className='mx-2 text-xs text-gray-400'>{props.post.likes} like </p>
              	</button>             
        	</div>
		</div>

  )
}





export default ActivityCard;