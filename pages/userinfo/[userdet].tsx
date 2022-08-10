import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import AccountCard  from "../../components/AccountCard";
import Card  from "../../components/Card";
import dateFormat from 'dateformat';
import LoadingSpinner from "../../components/LoadingSpinner";
import {getFollowing, getFollowers, isEmptyObject, isAccessTokenValid} from '../../components/CommonFunctions'
import {gsap} from "gsap";
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
const { ScrollToPlugin } = require("gsap/dist/ScrollToPlugin");


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// let postUserInfo
let postsData
// let followerCount
// let followingCount
// let refreshToken
// let isFollowing
// let selfView

const scrollToCard = () => {
		console.log('Scrolling to card')
		const scrollDiv = `#card-${sessionStorage.getItem('clickedCard')}`
		console.log(scrollDiv)
		gsap.to(window, {scrollTo: scrollDiv}).then(() => {
			// gsap.from(scrollDiv, {duration: 1, backgroundColor: "yellow"})
			sessionStorage.setItem('clickedCard', '')
		})


}

const userdet = () => {

    const router = useRouter();
	const [accessToken, setaccessToken] = useState<any>()
	const [refreshToken,setRefreshToken] = useState<any>()
	const [isDataFetched, setIsDataFetched] = useState(false)
	const [clickedCard,setClickedCard] = useState<any>()
	const [postsOfUser,setPostsOfUser] = useState<any>()
	const [followerCount,setFollowerCount] = useState<any>()
	const [followingCount,setFollowingCount] = useState<any>()
	const [isFollowing,setIsFollowing] = useState<any>()
	const [selfView,setSelfView] = useState<boolean>(false)
	const [postUserInfo,setPostUserInfo] = useState<any>()
	const [reRender,setReRender] = useState(false)


    useEffect(() => {
		let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
		let userID = JSON.parse(localStorage.getItem('UserDetails')).id

        if (accessTokenLS == null) {
            router.push('/')
        }
        else {
			if (isAccessTokenValid(accessTokenLS, refreshTokenLS)) {
				console.log(accessTokenLS)
				setaccessToken(accessTokenLS)
				setRefreshToken(refreshTokenLS)
				if (router.isReady) {
					getUserInfo().then(() => {
						getAllPostsOfUser().then(() => {
							callCommonFunctions().then(() => {
								if (userID == router.query.userdet) {
									setSelfView(true)
								}
								setIsDataFetched(true)
								scrollToCard()
							})
						})
					})
				}
			}
			else {
				console.log('No Access Token')
				router.push('/')
			}
		}
    }, [router.isReady]);

	useEffect(() => {
		let userID = JSON.parse(localStorage.getItem('UserDetails')).id
		if (router.isReady) {
			if (accessToken != null) {
				getUserInfo().then(() => {
					getAllPostsOfUser().then(() => {
						callCommonFunctions().then(() => {
							if (userID == router.query.userdet) {
								setSelfView(true)
							}
							setIsDataFetched(true)
							scrollToCard()
						})
					})
				})
			}
		}
	},[accessToken])


    let getAllPostsOfUser = async () => {
        let fetchAllPostApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/user/${router.query.userdet}/`;
		let response = await fetch(fetchAllPostApiUrl);
		if (response.ok) {
			let this_postData = await response.json()

			if (this_postData.length > 0) {
				postsData = this_postData
				// setPostsData(postData)
				// setPostsOfUser(Object.keys(postData).length);
				setPostsOfUser(Object.keys(this_postData).length)
			}
			else {
				setPostsOfUser(0)
			}
		}
    }

	let getUserInfo = async () => {
		let fetchUserInfoApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/info/${router.query.userdet}/`;
		console.log(accessToken + " access token")
		let response = await fetch(fetchUserInfoApiUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer ' + accessToken,
			}
		});
		if (response.ok) {
			let this_userData = await response.json()
			setPostUserInfo(this_userData)
			console.log(this_userData)
		}
		else
		{
			console.log(response)
			// setUserNotFound(true)
			// setIsDataFetched(true)
		}
	}

	let callCommonFunctions =async () => {
		let followerinfojson = getFollowers(router.query.userdet)
		let userId = JSON.parse(localStorage.getItem('UserDetails')).id
		followerinfojson.then(async function (result) {
			if (result!==null) {
				// setFollowerCount(Object.keys(result).length);
				setFollowerCount(Object.keys(result).length)
				// console.log(followerCount)
				var newA = result.filter(function (item) {
					return item.id == userId;
				});
				const countOfArray = (Object.keys(newA).length)
				if (countOfArray == 0)
					setIsFollowing(false)
				else
					setIsFollowing(true)
			}
			else
			{

				setFollowerCount(0)
				setIsFollowing(false)
			}
		})

		let followinginfojson = getFollowing(router.query.userdet)
		followinginfojson.then(async function(result){
			if (result!==null) {
				setFollowingCount(await Object.keys(result).length);
			}
			else
			{
				setFollowingCount(0)
			}
		})

	}
	let followUnFollowUser =async () => {
	let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/follow/${router.query.userdet}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+accessToken,
			},
		});
	let procesinfo = await response.json()
	if(response.status==202)
	{
		if(procesinfo.processdone=="unfollowed")
			console.log("User Unfollowed Successfully")
			if(procesinfo.processdone=="followed")
			console.log("User Followed Successfully")
	}
	// console.log("State Change")
	// console.log(isFollowing)
	setIsFollowing(!isFollowing)
	}


	if(accessToken!=null)
	{
		return (
			<div id='scrollParent' className="flex flex-col bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
    	        <Head>
				   <meta name='theme-color' content='#FFBCD1' />
				</Head>
				<TopBar backButton = {true}/>

				{isDataFetched ?

					<div>{console.log(followerCount)}
						<div className="flex items-center justify-center">
							<div className=" h-[84px] w-[84px]">
								<img
									src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/` + `${postUserInfo.profileImg !== null ? postUserInfo.profileImg : '/media/userDefault.jpg'}`}
									className='w-full h-full rounded-full'/>
							</div>
							<div className=" ml-[40px] flex flex-col">
								<button>
								<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Posts</p>
								<p className=" text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000] ">{postsOfUser}</p>
								</button>
							</div>
							<div className="ml-[16px] flex flex-col">
								<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Following</p>
								<p className=" text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000]">{followingCount}</p>
							</div>
							<div className=" ml-[16px] flex flex-col">
								<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Followers</p>
								<p className="text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000]">{followerCount}</p>
							</div>
						</div>
						<div className="  ml-[40px] mt-[13px] flex flex-col  justify-center">
							<h5 className="font-[Sarabun-Medium] font-semibold text-black text-sm  mt-[3px]">{postUserInfo.first_name} {postUserInfo.last_name}</h5>
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
							{postsOfUser>0?
								postsData.map((post) =>
								<Card key={post.id} accessToken={accessToken} postid={post.id}
									  userid={post.user.id}
									  setClickedCard={setClickedCard}
									  username={post.user.first_name + ' ' + post.user.last_name}
									  profileImage={post.user.profileImg} content={post.content}
									  createdData={dateFormat(post.created_at, "dS mmmm yyyy")}
									  numberOfLikes={post.likes} commentsCount={post.comments_count}
								/>

							):null}
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


