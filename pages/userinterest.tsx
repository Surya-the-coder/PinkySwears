import TopBar from "../components/TopBar";
import { useState, useEffect, useRef } from 'react';
import NavBar from "../components/NavBar";
import Ellipse from '../assets/images/Ellipse.svg'
import Router, { useRouter } from 'next/router'
import LoadingCard from "../components/LoadingCard";
import InfoCard from '../components/InfoCard'

let redirectToHomePage = () => {
    const router = useRouter()
    return router.push('/')
  };

const userinterest = ({session}) => {
    console.log('=============================User Interest=============================')

    const ref = useRef();

    let [followings, setFollowings] = useState(true)
    let [followers, setFollowers] = useState(false)
    let [activity, setActivity] = useState(false)
    
    const [accessToken, setaccessToken] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()   
    const [user, setUser] = useState<any>()   
    const [isDataFetched, setIsDataFetched] = useState(false)
	const[followinginfo,setFollowingInfo]=useState([])
	const[followerInfo,setFollowerInfo]=useState([])

    
    const router = useRouter()

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
			console.log(userLS) 
			getFollowing(userLS)			
			getFollowers(userLS)
        }
    }, []);

	let getFollowing = async (userLS) => {
        let fetchFollowingApiUrl = `https://backend.pinkyswears.in/api/user/followings/${userLS.id}/`;
        let response = await fetch(fetchFollowingApiUrl);
        let followinginfo = await response.json()        
		setFollowingInfo(followinginfo);
		console.log(followinginfo)
    }
    let getFollowers = async (userLS) => {
        let fetchFollowerApiUrl = `https://backend.pinkyswears.in/api/user/followers/${userLS.id}/`;
        let response = await fetch(fetchFollowerApiUrl);
        let followerinfo = await response.json()  
		console.log(followerinfo)      
		setFollowerInfo(followerinfo);
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
                break;
            case "Followers":
                setAllFalse();
                setFollowers(true);
                break;
            case "Activity":
                setAllFalse();
                setActivity(true);
                break;                   
            default:
                break;
        }
    }
    if (accessToken!=null) {
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
                <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
                <div className="mb-6 overflow-y-auto overflow-hidden h-[95vh] z-50  w-full max-w-md">
                    <meta name='theme-color' content='#FFBCD1' />
                    <TopBar displayPic = {true} displayName = {true} backButton = {false} loggedInUserName = {user.first_name + ' ' + user.last_name} loggedInUserProfilePic = {user.profileImage}/>
                    <div className="flex justify-around mx-5 top-24">
                        <button className={followings?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Followings")}>Followings</button>
                        <button className={followers?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Followers")}>Followers</button>
                        <button className={activity?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Activity")}>Activity</button>                       
                    </div>

                    {isDataFetched?
                        <div className="w-full">
                            {followings? followinginfo.map((eachfollowinginfo)=> <InfoCard accessToken={accessToken} showbutton={true} buttoncontent={"Unfollow"} profileImage={eachfollowinginfo.profileImg} userid={eachfollowinginfo.id} first_name={eachfollowinginfo.first_name} last_name={eachfollowinginfo.last_name} username={eachfollowinginfo.username}/>) :null}
							{followers? followerInfo.map((eachfollowerinfo)=> <InfoCard showbutton={false} buttoncontent={"Remove"} profileImage={eachfollowerinfo.profileImg} userid={eachfollowerinfo.id} first_name={eachfollowerinfo.first_name} last_name={eachfollowerinfo.last_name} username={eachfollowerinfo.username}/>) :null}
							{activity? <div>Actvity</div> :null}
                        </div>
                    :
                    <div className="">
                        <LoadingCard></LoadingCard>
                        <LoadingCard></LoadingCard>
                        <LoadingCard></LoadingCard>
                        <LoadingCard></LoadingCard>
                    </div>
                    }
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