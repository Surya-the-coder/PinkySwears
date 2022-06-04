
export const getFollowing = async (userLS) => {
	console.log(userLS)
	let fetchFollowingApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/followings/${userLS}/`;
	let response = await fetch(fetchFollowingApiUrl);
	let followinginfo = await response.json() 
	console.log(followinginfo)      
	return followinginfo
}
export const getFollowers = async (userLS) => {
	let fetchFollowerApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/followers/${userLS}/`;
	let response = await fetch(fetchFollowerApiUrl);
	let followerinfo = await response.json()    
	console.log(followerinfo)  
	return followerinfo		
}