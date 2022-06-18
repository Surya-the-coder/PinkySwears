import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { profilePicLoader } from './CommonFunctions'
const InfoCard = (props) => {
	const [isUnfollowed, setIsUnfollowed] = useState(true)
	let followUnFollowUser =async () => {
		console.log("Followedd.................")
		console.log("Follow Function")
		let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/follow/${ process.env.NEXT_PUBLIC_FOLLOW_USER_API + props.userid}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': 'Bearer '+props.accessToken,
				},
			});
			console.log(response)
			let procesinfo = await response.json()
			console.log(procesinfo.processdone)
		if(response.status==202)
		{
			if(procesinfo.processdone=="unfollowed")
				console.log("User Unfollowed Successfully")
				if(procesinfo.processdone=="followed")
				console.log("User Followed Successfully")
		}			
	}
  	
	return (
		<Link href={`/userinfo/${props.userid}`}>
			<div className='mt-2 px-5 flex items-center w-full py-2'>
				<Image loader={profilePicLoader} src={`${props.profileImage}`} width={64} height={64} className = "rounded-full w-16 h-16"></Image>
				<div className='flex w-full justify-between'>
					<div className=' ml-2 flex flex-col items-start'>
						<h3 className='flex font-Sarabun-Medium text-base tracking-[0.2px] font-medium'>{props.first_name} {props.last_name}  </h3>
						<h3 className='flex font-Sarabun-Medium tracking-[0.2px] font-medium text-xs'> {props.username} </h3>
					</div>
					{props.showbutton?
						<Link href={"."}>
							<button className=' px-3 font-[Sarabun-Regular] font-normal -tracking-tighter bg-white rounded-3xl cursor-pointer' onClick={followUnFollowUser}>{props.buttoncontent}</button>
						</Link>
					:null}
				</div>
			</div>
		</Link>
  	)
}


export default InfoCard