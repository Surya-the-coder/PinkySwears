import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import AccountCard  from "../../components/AccountCard";
import Card  from "../../components/Card";
import dateFormat from 'dateformat';
import LoadingSpinner from "../../components/LoadingSpinner";
import {getFollowing,getFollowers,isEmptyObject} from '../../components/CommonFunctions'

const userdet = () => {

	const [postsOfUser, setPostsOfUser] = useState<any>();
    const [PostsData, setPostsData] = useState<any>([]);
	const [PostUserInfo, setPostUserInfo] = useState<any>();
	const [FollowerCount, setFollowerCount] = useState<any>()
	const [FollowingCount, setFollowingCount] = useState<any>()
    const router = useRouter();
	const [accessToken, setaccessToken] = useState<any>()
	const [refreshToken, setRefreshToken] = useState<any>()
	const [isDataFetched, setIsDataFetched] = useState(false)
	const [isFollowing,setFollow]=useState<any>()
	const [selfView, setSelfView] = useState(false)
	const [clickedCard,setClickedCard] = useState<any>()
	const [userNotFound, setUserNotFound] = useState(false)
	
    useEffect(() => {
		let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
		let userID = JSON.parse(localStorage.getItem('UserDetails')).id

        if (accessTokenLS == null) {
            router.push('/')
        }
        else{
            setaccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
			if (router.isReady) {
				getUserInfo().then(() => {
					console.log(userNotFound + " userNotFound")
					if (userNotFound == false) {
						console.log(userNotFound)
						getAllPostsOfUser();
						callCommonFunctions()
						if (userID == router.query.userdet) {
							setSelfView(true)
						}
					}

				})

			}
        }
    }, [router.isReady]);

	// useEffect(() => {
	// 	let userID = JSON.parse(localStorage.getItem('UserDetails')).id
	// 	if (userNotFound == false) {
	// 		console.log(userNotFound)
	// 		getAllPostsOfUser();
	// 		callCommonFunctions()
	// 		if (userID == router.query.userdet) {
	// 			setSelfView(true)
	// 		}
	// 		setIsDataFetched(true)
	// 	}
	//
	// }, [userNotFound]);

    let getAllPostsOfUser = async () => {
        let fetchAllPostApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/user/${router.query.userdet}/`;
			let response = await fetch(fetchAllPostApiUrl);
			if (response.ok) {
				let postData = await response.json()
				if (postData.length > 0) {
					setPostsData(postData)
					setPostsOfUser(Object.keys(postData).length);
				} else {
					setPostsOfUser(0);
				}
			}
    }

	let getUserInfo = async () => {
		let fetchUserInfoApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/info/${router.query.userdet}/`;
		let response = await fetch(fetchUserInfoApiUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer ' + accessToken,
			}
		});
		if (response.ok) {
			let userData = await response.json()
			setPostUserInfo(userData)
			setIsDataFetched(true)
		}
		else
		{

			setUserNotFound(true)
			setIsDataFetched(true)
		}
	}

	let callCommonFunctions =async () => {
		let followerinfojson = getFollowers(router.query.userdet)		
		let userId = JSON.parse(localStorage.getItem('UserDetails')).id
		followerinfojson.then(async function (result) {
			if (result!==null) {
				setFollowerCount(Object.keys(result).length);
				var newA = result.filter(function (item) {
					return item.id == userId;
				});
				const countOfArray = (Object.keys(newA).length)
				if (countOfArray == 0)
					setFollow(false)
				else
					setFollow(true)
			}
			else
			{
				setFollowerCount(0)
				setFollow(false)
			}
		})
		
		let followinginfojson = getFollowing(router.query.userdet)
		followinginfojson.then(async function(result){
			if (result!==null) {
				// console.log(result)
				// console.log(Object.keys(result).length)
				setFollowingCount(await Object.keys(result).length);
			}
			else
			{
				setFollowingCount(0)
			}
		})
		
	}
	let followUnFollowUser =async () => {
		// console.log("Followedd.................")
		// console.log("Follow Function")
		let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/follow/${router.query.userdet}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': 'Bearer '+accessToken,
				},
			});
			// console.log(response)
			let procesinfo = await response.json()  
			// console.log(procesinfo.processdone)
		if(response.status==202)
		{
			if(procesinfo.processdone=="unfollowed")
				console.log("User Unfollowed Successfully")
				if(procesinfo.processdone=="followed")
				console.log("User Followed Successfully")
		}
		// console.log("State Change")
		// console.log(isFollowing)
		setFollow(!isFollowing)
	}
	 
	
	if(accessToken!=null)
	{
		return (
			<div className="flex flex-col bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">           
    	        <Head>
				   <meta name='theme-color' content='#FFBCD1' />
				</Head>
				<TopBar backButton = {true}/>
				{isDataFetched ?
					userNotFound?<div>No such user found</div>:
							<div>
								<div className="flex items-center justify-center">
									<div className=" h-[84px] w-[84px]">
										<img
											src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/` + `${PostUserInfo.profileImg !== null ? PostUserInfo.profileImg : '/media/userDefault.jpg'}`}
											className='w-full h-full rounded-full'/>
									</div>
									<div className=" ml-[40px] flex flex-col">
										<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Posts</p>
										<p className=" text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000] ">{postsOfUser}</p>
									</div>
									<div className="ml-[16px] flex flex-col">
										<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Following</p>
										<p className=" text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000]">{FollowingCount ? FollowingCount : 0}</p>
									</div>
									<div className=" ml-[16px] flex flex-col">
										<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Followers</p>
										<p className="text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000]">{FollowerCount}</p>
									</div>
								</div>

								<div className="  ml-[40px] mt-[13px] flex flex-col  justify-center">
									<p className=" font-[Sarabun-Medium] font-semibold text-[#939090] text-sm">@{PostUserInfo.username}</p>
									<h5 className="font-[Sarabun-Medium] font-semibold text-black text-sm  mt-[3px]">{PostUserInfo.first_name} {PostUserInfo.last_name}</h5>
									{/* <h6 className=" font-[Sarabun-Medium] font-semibold text-black text-xs mt-[7px]">Programmer, developer, designer...</h6> */}
								</div>

								{selfView ?
									null
									:
									<div className="mx-[40px] mt-[19px] flex items-center justify-center ">
										<button
											className=" rounded-3xl w-[201px] h-[45px] font-[Sarabun-Medium] font-semibold text-sm text-[#ffffff] bg-[#F67A95]"
											onClick={followUnFollowUser}> {isFollowing ? "Unfollow" : "Follow"} </button>
									</div>
								}

								<div className="">
									{PostsData.map((post) =>
										<Card key={post.id} accessToken={accessToken} postid={post.id}
											  userid={post.user.id} setClickedCard={setClickedCard}
											  username={post.user.first_name + ' ' + post.user.last_name}
											  profileImage={post.user.profileImg} content={post.content}
											  createdData={dateFormat(post.created_at, "dS mmmm yyyy")}
											  numberOfLikes={post.likes} commentsCount={post.comments_count}/>
									)}
								</div>

							</div>
					:
					<LoadingSpinner/>

				}


			</div>
		);
	}
	else{
		return null;
	}
}
	
export default userdet;


