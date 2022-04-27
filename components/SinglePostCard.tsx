import Send from '../assets/images/Send.svg'

const SinglePostCard = () => {
    return (
        <div className="flex flex-col bg-white rounded-2xl mx-5 px-5 py-5">
            <div className="flex w-full">
                <div className="mr-2">
                    <img src="../assets" alt="UI" />
                </div>
                <div className="flex flex-col">
                    <h1>UserName</h1>
                    <h3>date</h3>
                    <p>Content</p>
                    <div className="flex justify-around"> 
                        <div> like </div>
                        <div> comment </div>
                        <div> share </div>
                    </div>
                </div>
                <div className="ml-20">
                    <div>...</div>
                </div>
            </div>
            <div className="flex mt-3">
                <div>CI</div>
                <div className="flex rounded-full bg-gray-100 mx-2 w-96">
                    <input type="text" name="Comment" id="comment" placeholder="Write a comment..." className=" font-thin text-xs px-2 bg-transparent w-full"/>
                    <Send className="w-10 h-10"/>
                </div>
            </div>         
        </div>
    );
}

export default SinglePostCard;