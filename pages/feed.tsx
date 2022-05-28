import TopBar from "../components/TopBar";
import { useState, useEffect, useRef } from 'react';
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Ellipse from '../assets/images/Ellipse.svg'
import dateFormat from 'dateformat';
import Router, { useRouter } from 'next/router'
import LoadingCard from "../components/LoadingCard";
import FeedIcon from '../assets/images/FeedIcon.svg'

const feed = ({session}) => {
    console.log('=============================FEED=============================')   
    const [accessToken, setaccessToken] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()
    
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [posts, setPosts] = useState([])
    
    const router = useRouter()

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
            
            getAllPosts();
        }
    }, []);

    let getAllPosts = async () => {
        console.log('========================INSIDE GETALL POST===========================')
        let postUrl = 'https://backend.pinkyswears.in/api/post/';
        let response = await fetch(postUrl);
        let data = await response.json();
        setPosts(data);
        setIsDataFetched(true);
    }   
    if (accessToken!=null) {
        const user = JSON.parse(localStorage.getItem('UserDetails'))
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
                <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
                <div className="mb-6 overflow-y-auto overflow-hidden h-[95vh] z-50  w-full max-w-md">
                    <meta name='theme-color' content='#FFBCD1' />
                    <TopBar displayPic = {true} displayName = {true} backButton = {false} loggedInUserName = {user.first_name + ' ' + user.last_name} userid = {user.id} loggedInUserProfilePic = {"https://backend.pinkyswears.in/"+user.profileImg}/>
                    <div className="flex justify-around mx-6 top-24 ">
                        <button className="flex w-full bg-white rounded-lg justify-between items-center h-[32px] px-3">
							<p className="items-center">Feed</p>
							<p className="items-center align-center"><FeedIcon/></p>
						</button>
                    </div>
                    {isDataFetched?
                        <div className="">
                            {posts.map( (post) => <Card key={post.id} postid = {post.id} userid={post.user.id} username = {post.user.first_name + ' ' + post.user.last_name} profileImage = {post.user.profileImage} content={post.content} createdData = {dateFormat(post.created_at, "dS mmmm yyyy")} numberOfLikes = {post.numberOfLikes} /> )}
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
                <NavBar page="Feed"/>
            </div>
        );
    }
    else{
        return null
    }
}

export default feed;

