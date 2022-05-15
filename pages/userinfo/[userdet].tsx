import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import AccountCard  from "../../components/AccountCard";
import dateFormat from 'dateformat';

const userdet = () => {	
	const [postsOfUser, setPostsOfUser] = useState<any>();
    const [PostsData, setPostsData] = useState<any>([]);
	const [PostUserInfo, setPostUserInfo] = useState<any>([]);
	const [FollowerCount, setFollowerCount] = useState<any>()
	const [FollowingCount, setFollowingCount] = useState<any>()
    const router = useRouter();
	const [accessToken, setaccessToken] = useState<any>()
	const [refreshToken, setRefreshToken] = useState<any>()

    useEffect(() => {
		
		let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        
        if (accessTokenLS == null) {
			console.log('No Access Token')
            router.push('/')
        }
        else{			
            setaccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
			getAllPostsOfUser();
			getFollowers();
			getFollowing();
        }
		// console.log(postsOfUser+" "+FollowerCount+" "+FollowingCount)
    }, []);
	console.log(router.query.userdet)
    let getAllPostsOfUser = async () => {
        let fetchAllPostApiUrl = `https://dream-pg-backend.herokuapp.com/api/post/user/${router.query.userdet}/`;
        let response = await fetch(fetchAllPostApiUrl);
        let postData = await response.json()        
		setPostsData(postData)
		setPostUserInfo(postData[0].user)
		setPostsOfUser(Object.keys(postData).length);
    }
	let getFollowers = async () => {
        let fetchFollowerApiUrl = `https://dream-pg-backend.herokuapp.com/api/user/followers/${router.query.userdet}/`;
        let response = await fetch(fetchFollowerApiUrl);
        let followerinfo = await response.json()        
		setFollowerCount(Object.keys(followerinfo).length);
    }
	let getFollowing = async () => {
        let fetchFollowingApiUrl = `https://dream-pg-backend.herokuapp.com/api/user/followings/${router.query.userdet}/`;
        let response = await fetch(fetchFollowingApiUrl);
        let followinginfo = await response.json()        
		setFollowingCount(Object.keys(followinginfo).length);
    }
	let followUser =async () => {
		console.log("Follow Function")
		let response= await fetch(`https://backend.pinkyswears.in/api/user/follow/${router.query.userdet}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					'Authorization': 'Bearer '+accessToken,
				},
			});
			console.log(response)
			let procesinfo = await response.json()  
			console.log(procesinfo.processdone)
		if(response.status==202)
		{
			if(procesinfo.processdone=="unfollowed")
				console.log("User Unfollowed Successfully")
				if(procesinfo.processdone=="followed")
				console.log("User Followed Successfully")
		}
		
	}
	if(accessToken==null)
	{
		console.log("No Access Token")
	}
	return (
		<div className="flex flex-col bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">           
            <Head>
			   <meta name='theme-color' content='#FFBCD1' />
			</Head>
			<TopBar backButton = {true}/>
			
			<div className="flex items-center justify-center">
				<div className=" h-[84px] w-[84px]">
					<img src="https://picsum.photos/200" className='w-full h-full rounded-full'/>
				</div>            		
				<div className=" ml-[40px] flex flex-col">
					<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Posts</p>
					<p className=" text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000] ">{postsOfUser}</p>
				</div>
				<div className="ml-[16px] flex flex-col">
					<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Following</p>
					<p className=" text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000]">{FollowingCount}</p>
				</div>
				<div className=" ml-[16px] flex flex-col">
					<p className=" font-[Sarabun-Medium] font-semibold text-xs text-[#A268AC]">Followers</p>
					<p className="text-center mt-[8px] font-[Sarabun] font-bold text-xs text-[#000000]">{FollowerCount}</p>
				</div>
			</div>
			<div className="  ml-[40px] mt-[13px] flex flex-col  justify-center">
				<p className=" font-[Sarabun-Medium] font-semibold text-[#939090] text-sm">@{PostUserInfo.username}</p>
				<h5 className="font-[Sarabun-Medium] font-semibold text-black text-sm  mt-[3px]">{PostUserInfo.first_name} {PostUserInfo.last_name}</h5>
				<h6 className=" font-[Sarabun-Medium] font-semibold text-black text-xs mt-[7px]">Programmer, developer, designer...</h6>
			</div>
			<div className="mx-[40px] mt-[19px] flex items-center justify-center ">
				<button className=" rounded-3xl w-[201px] h-[45px] font-[Sarabun-Medium] font-semibold text-sm text-[#ffffff] bg-[#F67A95]" onClick={followUser}> Follow </button>
			</div>
			<div className="">
            	{PostsData.map( (post) => <AccountCard postid = {post.id} userid={post.user.id} username = {post.user.username} profileImage = {PostUserInfo.image} content={post.content} createdData = {dateFormat(post.created_at, "dS mmmm yyyy")} numberOfLikes = {post.numberOfLikes} accessToken={accessToken}/> )}
            </div>
		</div>
	);
}

export default userdet;


