import useSWRInfinite from 'swr/infinite'
// All Common functions used by multiple pages are written here.

// To check if current AccessToken is Valid and if not refresh it.
export const isAccessTokenValid = async (accessTokenLS, refreshTokenLS) => {
	let verifyTokenAPI = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/verify/`
	let response = await fetch(verifyTokenAPI, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			token: accessTokenLS,
		}),
	})
	
	if (response.status === 200) {
		// console.log('========================ACCESS TOKEN VALID===========================')
		return true
	}
	else{
		// console.log('========================REFRESHING ACCESS TOKEN===========================')
		let refreshTokenAPI = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/refresh/`
		let response = await fetch(refreshTokenAPI, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"refresh": refreshTokenLS,
			}),
		})
		let tokens = await response.json()
		if (response.status === 200) {
			// setAccessToken(tokens.access)
			localStorage.setItem('access_token', tokens.access)
			// console.log('========================ACCESS TOKEN REFRESHED===========================')
			return true
		}
		else {
			// console.log('========================UNABLE TO REFRESH SIGNING OUT===========================')
			localStorage.clear()
			return false
		}
	}
}

// Pagination
export const paginate = (url,query=null) =>{
	// let reachedEnd = false
	// console.log("==============================INSIDE PAGINATE==============================");
	
	const LIMIT = 10
	let offset = 0
	const getKey = (pageIndex, previousPageData) => {
		// console.log("==============================INSIDE GETKEY==============================");
		// console.log({pageIndex, offset});
        if (pageIndex>0) {
			// console.log("==============================INSIDE SET OFFSET==============================");
            offset = pageIndex * 10
        }
		// console.log({pageIndex, offset});
		
        if (previousPageData && previousPageData.length <= 0) {
			// console.log('INSIDE NULL CONDITION',pageIndex,offset);
			return null
		}
		else{
			// console.log("==============================INSIDE RETURN KEY==============================");
			// console.log(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${url}?limit=${LIMIT}&offset=${offset}`);
			if(query!=null)
			{
				return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${url}?q=${encodeURIComponent(query)}&limit=${LIMIT}&offset=${offset}`
			}
			return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${url}?limit=${LIMIT}&offset=${offset}`
		}
    }
    const fetcher = url => fetch(url).then(r => r.json())
    const { data: PaginatedData, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, fetcher)
	
	const isLoading = PaginatedData && typeof PaginatedData[size - 1] === "undefined"
	
	const reachedEnd = PaginatedData && PaginatedData[PaginatedData.length - 1]?.length < LIMIT
	// console.log({isLoading, reachedEnd, PaginatedData, size});
	
	return({
		isLoading,
		PaginatedData,
		error,
		isValidating,
		mutate,
		size,
		setSize,
		reachedEnd
	})
}

// Profile Pic Loader for Image Tag
export const profilePicLoader = ({ src, width, quality }) => {
    if (src == 'null') {
      src = "/media/userDefault.jpg"
    }
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${src}?w=${width}&q=${quality || 75}`
}

// To get current user's followings
export const getFollowing = async (userLS) => {
	// console.log(userLS)
	let fetchFollowingApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/followings/${userLS}/`;
	let response = await fetch(fetchFollowingApiUrl);
	let followinginfo = await response.json() 
	// console.log(followinginfo)
	return followinginfo
}

// To get current user's followers
export const getFollowers = async (userLS) => {
	let fetchFollowerApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/followers/${userLS}/`;
	let response = await fetch(fetchFollowerApiUrl);
	let followerinfo = await response.json()    
	// console.log(followerinfo)
	return followerinfo		
}