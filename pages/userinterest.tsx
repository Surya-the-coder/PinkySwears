import TopBar from "../components/TopBar";
import { useState, useEffect, useRef } from 'react';
import NavBar from "../components/NavBar";
import Ellipse from '../assets/images/Ellipse.svg'
import Router, { useRouter } from 'next/router'
import LoadingCard from "../components/LoadingCard";
import InfoCard from '../components/InfoCard'
import AccountCard from "../components/AccountCard";
import dateFormat from 'dateformat';
import ActivityCard from "../components/ActivityCard";
import {getFollowing, getFollowers, paginate} from '../components/CommonFunctions'
import { isAccessTokenValid } from '../components/CommonFunctions'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../components/LoadingSpinner";
import CardSelf from "../components/CardSelf";
import { gsap } from "gsap";
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
const { ScrollToPlugin } = require("gsap/dist/ScrollToPlugin");

gsap.registerPlugin(ScrollToPlugin);

let redirectToHomePage = () => {
    const router = useRouter()
    return router.push('/')
  };

const scrollToCard = () => {
    console.log('Scrolling to card')
    let cardId = sessionStorage.getItem("userClickedCard")
    let clickedTab = sessionStorage.getItem("userClickedTab")
    if(cardId!=null && clickedTab == "Activity"){
        gsap.to(window, {scrollTo: "#card-"+cardId})
            sessionStorage.setItem('userClickedCard', '')
    }
}

const userinterest = ({session}) => {
    console.log('=============================User Interest=============================')

    const ref = useRef();
    const cardRef = useRef([]);

    let accessToken
    let [followings, setFollowings] = useState(true)
    let [followers, setFollowers] = useState(false)
    let [activity, setActivity] = useState(false)

    const [url,setUrl] = useState<any>(`/api/post/user/`)
    const [AccessToken, setAccessToken] = useState<any>()
    const [clickedTab,setClickedTab] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()   
    const [user, setUser] = useState<any>()   
    const [isDataFetched, setIsDataFetched] = useState(false)
	const[followinginfo,setFollowingInfo]=useState([])
	const[followerInfo,setFollowerInfo]=useState([])
    const[postsInfo,setPostsInfo]=useState([])
    let postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/user/`;
    
    const router = useRouter()

    useEffect(() => {
        let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        let accessTokenValid = false
        
        if (accessTokenLS == null) {
            console.log('No Access Token')
            router.push('/')
        }
        else{
            let userLS = JSON.parse(localStorage.getItem('UserDetails'))
            pageSelected(sessionStorage.getItem('userClickedTab'))
            setAccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            setUser(userLS)  
			console.log(userLS) 
            getPostsCreatedByUser(userLS).then(res => {scrollToCard()})
            callCommonFunctions(userLS.id)
            setUrl(`/api/post/user/${userLS.id}/`)
            if(isAccessTokenValid(accessTokenLS, refreshTokenLS)){
                accessTokenValid = true
                setAccessToken(localStorage.getItem('access_token'))
            }
            if (!accessTokenValid) {
                router.push('/')
            }
        }


    }, []);
        let callCommonFunctions =async(userLS)=>
        {
            let followinginfojson = getFollowing(userLS)
            setFollowingInfo(await followinginfojson)
            let followerinfojson = getFollowers(userLS)
            setFollowerInfo(await followerinfojson)

        }
    let getPostsCreatedByUser = async(userLS) =>
    {
        // let getPostsCreatedByUserURL  = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/user/${userLS.id}/`;
        let response = await fetch(postUrl + `${userLS.id}/`);
        let postinfo = await response.json()  
		console.log(postinfo)      
		setPostsInfo(postinfo);
		setIsDataFetched(true)
    }
	
    let setAllFalse = () =>{
        setFollowings(false);
        setFollowers(false);
        setActivity(false);
    }
    
    let pageSelected = (pageName) => {
        switch (pageName) {
            case "Followings":
                setAllFalse();
                setFollowings(true);
                setClickedTab("Followings")
                sessionStorage.setItem('userClickedTab', "Followings")
                break;
            case "Followers":
                setAllFalse();
                setFollowers(true);
                setClickedTab("Followers")
                sessionStorage.setItem('userClickedTab', "Followers")
                break;
            case "Activity":
                setAllFalse();
                setActivity(true);
                setClickedTab("Activity")
                sessionStorage.setItem('userClickedTab', "Activity")
                break;                   
            default:
                break;
        }
    }

    let {isLoading, PaginatedData, error, isValidating, mutate, size, setSize, reachedEnd} = paginate(url,null,"all")
    let PaginatedPosts = PaginatedData?.flat()

    if (AccessToken!=null) {
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
                <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
                {/*<div className="mb-6 overflow-y-auto overflow-hidden h-[95vh] z-50  w-full max-w-md">*/}
                    <div className="mb-6 overflow-y-auto overflow-hidden z-50  w-full max-w-md">
                    <meta name='theme-color' content='#FFBCD1' />
                    <TopBar displayPic = {true} displayName = {true} backButton = {false} loggedInUserName = {user.first_name + ' ' + user.last_name} userid = {user.id} loggedInUserProfilePic = {user.profileImg}/>
                    <div className="flex justify-around mx-5 top-24">
                        <button className={followings?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Followings")}>Followings</button>
                        <button className={followers?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Followers")}>Followers</button>
                        <button className={activity?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Activity")}>Activity</button>                       
                    </div>


                        <div className="w-full">
                            {followings? followinginfo.map((eachfollowinginfo)=> <InfoCard key = {eachfollowinginfo.id} accessToken={AccessToken} showbutton={true} buttoncontent={"Unfollow"} profileImage={eachfollowinginfo.profileImg} userid={eachfollowinginfo.id} first_name={eachfollowinginfo.first_name} last_name={eachfollowinginfo.last_name} username={eachfollowinginfo.username}/>) :null}
							{followers? followerInfo.map((eachfollowerinfo)=> <InfoCard key = {eachfollowerinfo.id} showbutton={false} buttoncontent={"Remove"} profileImage={eachfollowerinfo.profileImg} userid={eachfollowerinfo.id} first_name={eachfollowerinfo.first_name} last_name={eachfollowerinfo.last_name} username={eachfollowerinfo.username}/>) :null}
							{/*{activity? postsInfo.map((eachpostsinfo)=><ActivityCard key = {eachpostsinfo.id} createdDate={dateFormat(eachpostsinfo.created_at, "dS mmmm yyyy")} numberOfLikes = {eachpostsinfo.likes}/>) :null}*/}
                            {/*{activity? postsInfo.map((eachpostsinfo)=><ActivityCard key = {eachpostsinfo.id} post={eachpostsinfo}/>) :null}*/}
                            {activity?
                                (isDataFetched?

                                    <InfiniteScroll dataLength={PaginatedPosts?.length ?? 0} next={()=>setSize(size+1)} hasMore={!reachedEnd} loader={<LoadingSpinner/>} endMessage={<div className="flex justify-center items-center mb-10 text-gray-400"><p>No more posts to show</p></div>}>
                                        {/*{console.log(reachedEnd)}*/}
                                        {PaginatedPosts?.map( (post,i) => <CardSelf ref={el => cardRef.current[i] = el} key={post.id /*+ sessionStorage.getItem('clickedTab')*/} accessToken = {AccessToken} postid = {post.id} userid={post.user.id} /*setClickedCard = {setClickedCard}*/ username = {post.user.first_name + ' ' + post.user.last_name} profileImage = {post.user.profileImg} content={post.content} createdData = {dateFormat(post.created_at, "dS mmmm yyyy")} numberOfLikes = {post.likes} commentsCount={post.comments_count} /> )}
                                    </InfiniteScroll>
                                :null):null
                                }

                        </div>

                </div>
                <NavBar  page = "Activity"/>
            </div>
        );
    }
    else{
        return null
    }
}

export default userinterest;


