import Like from '../assets/images/Like.svg'
import React from 'react'


const ActivityCard = (props) => {
  return (
      <div className='flex flex-col mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card cursor-pointer'>
			<div className='mx-3 flex justify-between items-center text-center'>
          		<h3 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> You created a post at</h3>
          		<p className='  text-xs text-purple-500 font-Sarabun'>{props.createdDate}</p>
			</div>
          	<div className='mt-2 mx-3 flex items-center'>
              	<button className='flex items-center text-xs z-50'>
                	<Like/>
                	<p className='mx-2 text-xs text-gray-400'>{props.numberOfLikes} like </p>
              	</button>             
        	</div>
		</div>

  )
}





export default ActivityCard;