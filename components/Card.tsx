import Link from 'next/link'
import Reply from '../assets/images/Reply.svg'
import '../assets/images/photo.png'

const Card = (props) => {
  return (
    <Link href={'#'}>
      <div className='flex mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card'>
        <div>
          <Link href={'#'}>
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
            <Reply></Reply>
            <Link href={'#'}>
              <p className='text-xs mx-1'>{props.numberOfLikes}</p>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
