import Link from 'next/link'
import Reply from '../assets/images/Reply.svg'
import '../assets/images/photo.png'

const Card = (props) => {
  return (
    <Link href={'#'}>
      <div className='flex mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card'>
        <div>
          <Link href={'#'}>
            <div className='w-12 h-12 pt-5'>
                <img src='../assets/images/photo.png'></img>
            </div>
          </Link>
        </div>
        <div className=' pt-5'>
          <h3 className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium'> {props.username} </h3>
          <p className='text-xs text-purple-500 font-Sarabun'>{props.createdData}</p>
          <p className='text-sm text-gray-500 mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui aenean iaculis bibendum lacus tincidunt arcu nunc lectus.</p>
          <div className='mt-3 flex items-center'>
            <Reply></Reply>
            <Link href={'#'}>
              <p className='text-xs mx-1'>4 replies</p>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
