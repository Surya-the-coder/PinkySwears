import dateFormat from 'dateformat';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import Ellipse from '../../assets/images/Ellipse.svg'
import LoadingCard from "../../components/LoadingCard";
import SearchGray from '../../assets/images/Search-Gray.svg'
import SinglePostCard from "../../components/SinglePostCard";
import CommentCard from '../../components/CommentCard';


const SinglePost = () => {
    
    const [singlePostData, setSinglePostData] = useState<any>([]);
    const [PostUserInfo, setPostUserInfo] = useState<any>([]);
    const [isDataFetched, setIsDataFetched] = useState(false)

    const [accessToken, setaccessToken] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()
    const [user, setUser] = useState<any>()
    
    const router = useRouter();

    useEffect(() => {
        let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        
        if (accessTokenLS == null) {
            console.log('No Access Token')
            router.push('/')
        }
        else{
            let userLS = JSON.parse(localStorage.getItem('UserDetails'))

            setaccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            setUser(userLS)

            getSinglePostData()
        }
    }, []);

    let getSinglePostData = async () => {
        let fetchSinglePostApiUrl = `https://dream-pg-backend.herokuapp.com/api/post/${router.query.postid}/`;
        let response = await fetch(fetchSinglePostApiUrl);
        let postData = await response.json()
        setSinglePostData(postData);
        setPostUserInfo(postData.user)
        setIsDataFetched(true);
    }

    return (
        <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
        <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
        <div className="overflow-y-auto overflow-hidden h-[89vh] z-50  w-full max-w-md">
            <meta name='theme-color' content='#FFBCD1' />
            {/* <TopBar backButton = {true} loggedInUserProfilePic = {user.profileImg} displayPic = {false} displayName = {false}/> */}
            <div className="mx-5 my-3 py-1 flex bg-white rounded-full items-center">
                <div className="pl-4 pr-2 py-1">
                    <SearchGray/>
                </div>
                <div>
                    <input type="text" name="SearchBox" id="searchBox" placeholder="Search Here" className="bg-transparent text-xs text-gray-400 border-none focus:border-none"/>
                </div>
            </div>
            <div className="flex justify-around mx-10 top-24">
            </div>
            {isDataFetched?
                <div className="h-[50%]">
                    {/* <SinglePostCard currentUserImage = {PostUserInfo.username} postUserName = {PostUserInfo.username} postCreatedDate = {dateFormat(singlePostData.created_at, "dS mmmm yyyy")} postContent = {singlePostData.content}/> */}
                    {singlePostData.comments.map( (comment) =><CommentCard commentUsername = {comment.user.username} commentContent = {comment.content}/>)}
                </div>
            :
            <div className="">
                <LoadingCard></LoadingCard>
            </div>
            }
        </div>
        <NavBar/>
    </div>
    );
}

export default SinglePost;