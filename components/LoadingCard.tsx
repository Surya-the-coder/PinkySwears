import Link from 'next/link'
import Reply from '../assets/images/Reply.svg'
import '../assets/images/photo.png'

const LoadingCard = () => {
    return (
        <div className='flex mx-5 my-5 bg-white py-2 px-5 rounded-3xl shadow-card'>
            <div>
                <div className='w-12 h-12 mt-5 mr-3 bg-gray-300 rounded-full animate-pulse'>
                </div>
            </div>
            <div className=' pt-5 animate-pulse'>
              <div className='font-Sarabun-Medium text-base tracking-[0.2px] font-medium rounded-full bg-gray-300 text-gray-300'>Sample</div>
              <div className='text-xs text-purple-500 font-Sarabun'></div>
              <div className='text-sm my-2 text-gray-300 bg-gray-300 rounded-2xl px-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            </div>
        </div>
    );
}

export default LoadingCard;