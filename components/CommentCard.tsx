import Image from 'next/image'
import Love from '../assets/images/Love.svg'
import LovePink from '../assets/images/LovePink.svg'

const CommentCard = (props) => {
    let comment = props.postComments
    
    let profilePicLoader = ({ src, width, quality }) => {
        return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${src}?w=${width}&q=${quality || 75}`
    }
    
    return (
        <div className="flex items-center mx-10 my-2 w-80">
            <div className=''>
                <Image loading='lazy' loader={profilePicLoader} src={props.commentUserProfilePic} alt="" width={48} height={48} className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex bg-white rounded-xl mx-2 px-5 py-2 items-center justify-between w-full">
                <div className="flex flex-col">
                    <h1 className='font-Sarabun-Medium text-xs tracking-[0.2px] font-medium'>{props.commentUsername}</h1>
                    <p className='text-xs text-gray-400 mt-1'>{props.commentContent}</p>
                </div>
                <div className='flex'>
                    <Love/>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;