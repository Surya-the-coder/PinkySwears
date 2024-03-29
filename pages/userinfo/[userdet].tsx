import Head from "next/head";
import { useRouter } from "next/router";
import React, {useEffect, useRef, useState} from "react";
import TopBar from "../../components/TopBar";
import AccountCard  from "../../components/AccountCard";
import Card  from "../../components/Card";
import UserCard from "../../components/UserCard";
import dateFormat from 'dateformat';
import LoadingSpinner from "../../components/LoadingSpinner";
import {getFollowing, getFollowers, isEmptyObject, isAccessTokenValid} from '../../components/CommonFunctions'
import {gsap} from "gsap";
import NavBar from "../../components/NavBar";
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
		if (sessionStorage.getItem('clickedCard')!='') {
			// console.log('Scrolling to card')
			const scrollDiv = `#card-${sessionStorage.getItem('clickedCard')}`
			// console.log(scrollDiv)
			gsap.to(window, {scrollTo: scrollDiv}).then(() => {
				// gsap.from(scrollDiv, {duration: 1, backgroundColor: "yellow"})
				sessionStorage.setItem('clickedCard', '')
			})
		}
	if (sessionStorage.getItem('userClickedCard')!='') {
		// console.log('Scrolling to card')
		const scrollDiv = `#card-${sessionStorage.getItem('userClickedCard')}`
		// console.log(scrollDiv)
		gsap.to(window, {scrollTo: scrollDiv}).then(() => {
			// gsap.from(scrollDiv, {duration: 1, backgroundColor: "yellow"})
			sessionStorage.setItem('userClickedCard', '')
		})
	}
}

const userdet = () => {

    const router = useRouter();
	const cardRef = useRef([]);
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
	const [shownContent,setShownContent] = useState<string>()
	const [followersInfo,setFollowersInfo] = useState<any>()
	const [followingInfo,setFollowingInfo] = useState<any>()
	const [userClickedCard,setUserClickedCard] = useState<any>()


	useEffect(() => {
		console.log('useEffect - FollowersInfo')
		console.log(followersInfo)
	},[followersInfo])


    useEffect(() => {
		// console.log('useEffect - router is ready')
		let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
		let userID = JSON.parse(localStorage.getItem('UserDetails')).id

        if (accessTokenLS == null) {
            router.push('/')
        }
        else {
			if (isAccessTokenValid(accessTokenLS, refreshTokenLS)) {
				// console.log('Access Token Valid')
				setaccessToken(localStorage.getItem('access_token'))
				setRefreshToken(refreshTokenLS)
				if (router.isReady) {
					// console.log('Calling User info')
					getUserInfo().then(() => {
						let savedUserProfileTab = sessionStorage.getItem(`${router.query.userdet}clickedUserProfileTab`)
						// console.log(savedUserProfileTab + '-savedUserProfileTab')
						getAllPostsOfUser().then(() => {
							callCommonFunctions().then(() => {
								if (userID == router.query.userdet) {
									setSelfView(true)
								}
								switch (savedUserProfileTab) {
									case 'Posts':
										setShownContent('Posts')
										break;
									case 'Followers':
										setShownContent('Followers')
										break;
									case 'Following':
										setShownContent('Following')
										break;
									default:
										setShownContent('Posts')
										break;
								}
								// setIsDataFetched(true)
								// scrollToCard()
							})
						})
					})
				}
			}
			else {
				// console.log('No Access Token')
				router.push('/')
			}
		}
    }, [router.isReady]);

	useEffect(() => {
		// console.log('useEffect - access token')
		let userID = JSON.parse(localStorage.getItem('UserDetails')).id
		if (router.isReady) {
			// console.log(accessToken + '-accessToken')
			if (accessToken != null) {
				// console.log(accessToken + '-accessToken')
				switch (shownContent) {
					case 'Posts':
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
						break;
					case 'Followers':
						getUserInfo().then(() => {
								callCommonFunctions().then(() => {
									if (userID == router.query.userdet) {
										setSelfView(true)
									}
									setIsDataFetched(true)
								})
						})
						break;
					case 'Following':
						getUserInfo().then(() => {
								callCommonFunctions().then(() => {
									if (userID == router.query.userdet) {
										setSelfView(true)
									}
									setIsDataFetched(true)
								})
						})
						break;
					default:
						break;

				}

			}
		}
	},[accessToken])

	useEffect(() => {
		console.log('useEffect - shown content')
		console.log(shownContent)
		let userID = JSON.parse(localStorage.getItem('UserDetails')).id
		if (router.isReady) {
			// console.log(accessToken + '-accessToken')
			if (accessToken != null) {
				// console.log(accessToken + '-accessToken')
				switch (shownContent) {
					case 'Posts':
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
						break;
					case 'Followers':
						getUserInfo().then(() => {
							getAllPostsOfUser().then(() => {
								callCommonFunctions().then(() => {
									if (userID == router.query.userdet) {
										setSelfView(true)
									}
									setIsDataFetched(true)
								})
							})
						})
						break;
					case 'Following':
						getUserInfo().then(() => {
							getAllPostsOfUser().then(() => {
								callCommonFunctions().then(() => {
									if (userID == router.query.userdet) {
										setSelfView(true)
									}
									setIsDataFetched(true)
								})
							})
						})
						break;
					default:
						break;

				}

			}
		}
	},[shownContent])


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
			// console.log(accessToken + " access token")
			let response = await fetch(fetchUserInfoApiUrl, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					'Authorization': 'Bearer ' + accessToken,
				}
			});

			if (response.ok) {
				let this_userData = await response.json()
				// console.log(this_userData)
				setPostUserInfo(this_userData)
				// console.log(this_userData)
			} else {
				// console.log(response)
				// setUserNotFound(true)
				// setIsDataFetched(true)
			}

	}


	let callCommonFunctions =async () => {
		// console.log(router.query.userdet + '-router.query.userdet')
		let followerinfojson = getFollowers(router.query.userdet)
		let userId = JSON.parse(localStorage.getItem('UserDetails')).id
		followerinfojson.then(async function (result) {
			// console.log(result + '-followerinfojson')
			if (result!==null) {
				// setFollowerCount(Object.keys(result).length);
				setFollowerCount(Object.keys(result).length)
				setFollowersInfo(result)
				// console.log(result)
				// console.log(JSON.stringify(result)  + 'Followersinfo')
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
				setFollowingInfo(result)
				// console.log(result)
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
		callCommonFunctions()
	// setIsFollowing(!isFollowing)   // called in CallCommonFunctions
	}

	useEffect(() => {
		// console.log("useEffect - userClickedCard")
		setIsDataFetched(false)
		// setShownContent('Posts')
		sessionStorage.setItem('userClickedCard', userClickedCard)
	},[userClickedCard])

	if(accessToken!=null)
	{
		return (
			<div id='scrollParent' className="flex flex-col bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
    	        <Head>
				   <meta name='theme-color' content='#FFBCD1' />
				</Head>
				<TopBar backButton = {true}/>

				{isDataFetched ?
					postUserInfo !== undefined ?
					<div>
						<div className="flex items-center justify-center">
							<div className=" h-[84px] w-[84px]">
								<img
									src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}` + `${postUserInfo.profileImg !== null ? postUserInfo.profileImg : '/media/userDefault.jpg'}`}
									className='w-full h-full rounded-full'/>
							</div>
							<div className={ `ml-[40px] flex flex-col p-1 no-highlights border-2 rounded ${shownContent=='Posts'?'border-[#b3588d]':'border-[#ffbcd100]'}`}>
								<button onClick={()=>{setShownContent("Posts");sessionStorage.setItem(`${router.query.userdet}clickedUserProfileTab`, 'Posts')}}>
								<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Posts</p>
								<p className=" text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000] ">{postsOfUser}</p>
								</button>
							</div>
							<div className={`ml-[16px] flex flex-col p-1 no-highlights border-2 rounded ${shownContent=='Following'?'border-[#b3588d]':'border-[#ffbcd100]'}`}>
								<button onClick={()=>{setShownContent("Following");sessionStorage.setItem(`${router.query.userdet}clickedUserProfileTab`, 'Following')}}>
								<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Following</p>
								<p className=" text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000]">{followingCount}</p>
								</button>
							</div>
							<div className={` ml-[16px] flex flex-col p-1 no-highlights border-2 rounded ${shownContent=='Followers'?'border-[#b3588d]':'border-[#ffbcd100]'}`}>
								<button onClick={()=>{setShownContent("Followers");sessionStorage.setItem(`${router.query.userdet}clickedUserProfileTab`, 'Followers')}}>
								<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Followers</p>
								<p className="text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000]">{followerCount}</p>
								</button>
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
							{shownContent == "Posts" ?
							postsOfUser>0?
								postsData.map((post) =>
								<Card key={post.id} accessToken={accessToken} postid={post.id}
									  userid={post.user.id}
									  setClickedCard={setClickedCard}
									  username={post.user.first_name + ' ' + post.user.last_name}
									  profileImage={post.user.profileImg} content={post.content}
									  createdData={dateFormat(post.created_at, "dS mmmm yyyy")}
									  numberOfLikes={post.likes} commentsCount={post.comments_count}
								/>

							):null:null}
							{shownContent == "Followers" ?
								<div>{
									followersInfo.map((follower)=> {
									// console.log('follower id is '+ follower.id)
										return <UserCard
											key={follower.id}
											userId={follower.id}
											firstName={follower.first_name}
											lastName={follower.last_name}
											profileImg={follower.profileImg}
											gender={follower.gender}
											numberOfFollowers={follower.number_of_followers}
											numberOfFollowing={follower.number_of_followings}
											setUserClickedCard={setUserClickedCard}
										/>
									}
								)}
								</div>
								:
								null}
							{shownContent == "Following" ?
								<div>
								{followingInfo.map((follower)=>
									<UserCard
										key={follower.id}
										userId={follower.id}
										firstName={follower.first_name}
										lastName={follower.last_name}
										profileImg={follower.profileImg}
										gender={follower.gender}
										numberOfFollowers={follower.number_of_followers}
										numberOfFollowing={follower.number_of_followings}
										setUserClickedCard={setUserClickedCard}
									/>
								)}
							</div>
								:null
							}
						</div>
					</div>
						:<div className='flex flex-col justify-center border-pink-600 border-2 p-6 font-bold w-fit mx-auto rounded-2xl'>
							<div>There is no such user.</div>
							<div>Are you searching for someone.?</div>
						</div>
					:
					<LoadingSpinner/>

				}
				<NavBar />


			</div>
		);
	}
	else{
		return null;
	}
}

export default userdet;


