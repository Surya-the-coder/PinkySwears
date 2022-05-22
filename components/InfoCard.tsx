import Link from 'next/link'
const InfoCard = (props) => {
  return (
	<Link href={`/userinfo/${props.userid}`}>
		<div className='mt-2 px-5 flex items-center w-full py-2'>
			<div className='w-14 h-12 mx-2'>
	  			<img src={props.profileImage} className='w-full h-full rounded-full'/>
			</div>
			<div className='flex w-full justify-between'>
				<div className='flex flex-col items-start'>
					<h3 className='flex font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> {props.username} </h3>
					<h3 className='flex font-Sarabun-Medium text-base tracking-[0.2px] font-medium'>{props.first_name} {props.last_name}  </h3>
				</div>
				<button className=' px-3 font-[Sarabun-Regular] font-normal -tracking-tighter bg-white rounded-3xl cursor-pointer'>{props.buttoncontent}</button>
			</div>
		</div>
	</Link>
  )
}


export default InfoCard