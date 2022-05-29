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
    const [PostUserInfo, setPostUserInfo] = useState<any>();
    const [isDataFetched, setIsDataFetched] = useState(false)

    const [accessToken, setaccessToken] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()
    
    const [userData, setUserData] = useState<any>()
    const [newComment, setNewComment] = useState<any>(null)

    // let user = JSON.parse(localStorage.getItem('UserDetails'))
    
    const router = useRouter();

    useEffect(() => {
        let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        
        if (accessTokenLS == null) {
            console.log('No Access Token')
            router.push('/')
        }
        else{
            if (router.isReady) {
                // let fetchSinglePostApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/${router.query.postid}/`;
                // fetch(fetchSinglePostApiUrl)
                // .then(response => response.json())
                // .then((postData) => {console.log(postData); setSinglePostData(postData); setPostUserInfo(postData.user);setIsDataFetched(true)})
                getSinglePostData()
            }

            let userLS = JSON.parse(localStorage.getItem('UserDetails'))

            setaccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            console.log('Setting UserData')
            setUserData(userLS)
            console.log(newComment)
            console.log("=========IN==========")
            console.log(newComment)
            // singlePostData.comments = [...singlePostData.comments, newComment]
        }
    }, [router.isReady]);

    let getSinglePostData = async () => {
        console.log('========================= IN GET SINGLE POST DATA =========================')
        while(router.query.postid)
            break
        let fetchSinglePostApiUrl = await `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/${router.query.postid}/`;
        console.log(fetchSinglePostApiUrl)
        let response = await fetch(fetchSinglePostApiUrl);
        console.log(response)
        let postData = await response.json()
        console.log(postData)
        setSinglePostData(postData);
        setPostUserInfo(postData.user);
        console.log('Setting is Data Fetched to true in getSinglePostData')
        setIsDataFetched(true);
    }
    if (accessToken!=null) {
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
            <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
            <div className="pb-8 overflow-y-auto overflow-hidden h-[92vh] z-50  w-full max-w-md">
                <meta name='theme-color' content='#FFBCD1' />
                <TopBar displayPic = {true} displayName = {true} backButton = {true} loggedInUserName = {userData.first_name + ' ' + userData.last_name} loggedInUserProfilePic = {userData.profileImg}/>
                {/* <div className="mx-5 my-3 py-1 flex bg-white rounded-full items-center">
                    <div className="pl-4 pr-2 py-1">
                        <SearchGray/>
                    </div>
                    <div className='w-full'>
                        <input type="text" name="SearchBox" id="searchBox" placeholder="Search Here" className="bg-transparent text-xs text-gray-400 border-none focus:outline-none w-full"/>
                    </div>
                </div> */}
                <div className="flex justify-around mx-10 top-24">
                </div>
                {isDataFetched?
                    <div className="">
                        <SinglePostCard postid = {router.query.postid} accessToken = {accessToken} postUserImage = {PostUserInfo.profileImg} currentUserImage = {userData.profileImg} postUserName = {PostUserInfo.first_name + ' ' + PostUserInfo.last_name} postCreatedDate = {dateFormat(singlePostData.created_at, "dS mmmm yyyy")} postContent = {singlePostData.content} setNewComment = {setNewComment}/>
                        {singlePostData.comments.map( (comment) =><CommentCard commentUserProfilePic = {comment.user.profileImg} commentUsername = {comment.user.first_name + " " + comment.user.last_name} commentContent = {comment.content}/>)}
                    </div>
                : //else
                    <div className="">
                        <LoadingCard></LoadingCard>
                    </div>
                }
            </div>
            <NavBar page = "Home" />
        </div>
        );
    }
    else{
        return null;
    }
}

export default SinglePost;