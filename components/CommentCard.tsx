const CommentCard = (props) => {
    let comment = props.postComments
    return (
        <div className="flex items-center mx-10 my-2">
            <div>
                <img src={props.commentUserProfilePic} alt="" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex flex-col bg-white rounded-xl mx-2 py-1 px-3 w-max">
                <h1 className='font-Sarabun-Medium text-xs tracking-[0.2px] font-medium'>{props.commentUsername}</h1>
                <p className='text-xs text-gray-400 mt-1'>{props.commentContent}</p>
            </div>
        </div>
    );
}

export default CommentCard;