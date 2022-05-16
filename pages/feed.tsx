import TopBar from '../components/TopBar'
import Head from 'next/head';
import NavBar from '../components/NavBar'
import dateFormat from 'dateformat';
import AccountCard  from "../components/AccountCard";
import { useEffect, useState } from 'react'
import Ellipse from '../assets/images/Ellipse.svg'

const feed = () => {

	const [accessToken, setaccessToken] = useState<any>()
	const [refreshToken, setRefreshToken] = useState<any>()
	const [firstname, setFirstname] = useState<any>()
	const [lastname, setLastname] = useState<any>()
	const [profimg, setProfImg] = useState<any>()
	const [user, setUser] = useState<any>()
	const [PostUserInfo, setPostUserInfo] = useState<any>([]);
	const [PostsData, setPostsData] = useState<any>([]);

	useEffect(() => {
		let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        
        if (accessTokenLS == null) {
			console.log('No Access Token')
        }
        else{
			let userLS = JSON.parse(localStorage.getItem('UserDetails'))			
            setaccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            setUser(userLS)
			setFirstname(userLS.first_name)
			setLastname(userLS.last_name)
			setProfImg(userLS.profileImage)
			getPersonalizedPosts(accessTokenLS)
        }
    }, []);

	let getPersonalizedPosts = async (accessTokenLS) => {
		console.log("******Get Personalized Posts*****")
		console.log(accessTokenLS)
		let getPersonalizedPostsUrl = 'https://backend.pinkyswears.in/api/user/followings/posts/filter/user/'
		let response = await fetch(getPersonalizedPostsUrl, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+accessTokenLS,
			},
			
		})
		console.log(response)
		let postData = await response.json()     
		setPostsData(postData)
		setPostUserInfo(postData[0].user)
	}
  return (
	<div className="flex flex-col justify-center min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
		<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
		<Head>
			<meta name='theme-color' content='#FFBCD1' />
		</Head>
		<div className="flex flex-col w-full max-w-md z-50">
			<TopBar displayPic = {true} displayName = {true} loggedInUserName = {firstname + ' ' + lastname} loggedInUserProfilePic={profimg}/>	
		</div>
		<div>
			<textarea className=' pl-4 mt-2 mx-5 my-5 rounded-xl w-[330px] h-[32px] pt-2 bg-[#FFFFFF] font-[Sarabun] font-bold text-[#2F2F2F]' placeholder='Feed'/>
		</div>
		<div className="">
            	{PostsData.map( (post) => <AccountCard numberOfLikes={false} postid = {post.id} userid={post.user.id} username = {post.user.username} profileImage = {PostUserInfo.image} content={post.content} createdData = {dateFormat(post.created_at, "dS mmmm yyyy")} accessToken={accessToken}/> )}
        </div>
		<NavBar/>
		</div>
  )
}

export default feed