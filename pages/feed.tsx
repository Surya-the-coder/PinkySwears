import TopBar from "../components/TopBar";
import { useState, useEffect, useRef } from 'react';
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import NotificationCard from "../components/NotificationCard";
import NotificationFollow from "../components/NotificationFollow";
import Ellipse from '../assets/images/Ellipse.svg'
import dateFormat from 'dateformat';
import Router, { useRouter } from 'next/router'
import LoadingCard from "../components/LoadingCard";
import FeedIcon from '../assets/images/FeedIcon.svg'
import { isAccessTokenValid } from '../components/CommonFunctions'
import { gsap } from "gsap";
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
const { ScrollToPlugin } = require("gsap/dist/ScrollToPlugin");

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


const scrollToCard = () => {
        console.log('Scrolling to card')
        const scrollDiv = `#card-${sessionStorage.getItem('clickedFeed')}`
        gsap.to(window, {scrollTo:scrollDiv}).then(()=>{
            gsap.from(scrollDiv, {duration: 1, backgroundColor:"yellow" })
        })
        sessionStorage.setItem('clickedFeed', '')
}

const feed = () => {
    console.log('=============================FEED=============================')   
    const [AccessToken, setAccessToken] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()
    
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [posts, setPosts] = useState([])

    const [clickedFeed,setClickedFeed] = useState<any>()
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
            setAccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            if(isAccessTokenValid(accessTokenLS, refreshTokenLS)){
                accessTokenValid = true
                setAccessToken(localStorage.getItem('access_token'))
            }
            if (accessTokenValid) {
                getAllPosts().then(() => {
                    scrollToCard()
                })

            }
            else{
                router.push('/')
            }
        }
    }, []);

    let getAllPosts = async () => {
        let accessTokenLS = localStorage.getItem('access_token')
        console.log('========================INSIDE GETALL POST===========================')
        let postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/feed/`;
        let response = await fetch(postUrl,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ accessTokenLS,
            },
        });
        let data = await response.json();
        setPosts(data);
        console.log(data);
        setIsDataFetched(true);
    }   
    if (AccessToken!=null) {
        const user = JSON.parse(localStorage.getItem('UserDetails'))
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
                <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
                <div className="pb-5 overflow-y-auto overflow-hidden z-50 mb-[10vh] w-full max-w-md ">
                    <meta name='theme-color' content='#FFBCD1' />
                    <TopBar displayPic = {true} displayName = {true} backButton = {false} loggedInUserName = {user.first_name + ' ' + user.last_name} userid = {user.id} loggedInUserProfilePic = {user.profileImg}/>
                    <div className="flex justify-around mx-6 top-24 ">
                        <button className="flex w-full bg-white rounded-lg justify-between items-center h-[32px] px-3">
							<p className="items-center">Feed</p>
							<p className="items-center align-center"><FeedIcon/></p>
						</button>
                    </div>
                    {isDataFetched?
                        <div className="">
                            {posts.map( (post) =>
                                    post.user?
                                    <NotificationCard
                                        key={post.id}
                                        postid={post.id}
                                        userid={post.user.id}
                                        username={post.user.first_name + ' ' + post.user.last_name}
                                        profileImage={post.user.profileImg}
                                        content={post.content}
                                        createdData={dateFormat(post.created_at, "dS mmmm yyyy")}
                                        numberOfLikes={12}
                                        setClickedFeed={setClickedFeed}
                                    />:
                                        post.target_type=='follow'?
                                            <NotificationFollow
                                                key={post.id}
                                                sourceuser={post.source_user}
                                                message={post.message}
                                                createdData={dateFormat(post.created_at, "dS mmmm yyyy")}
                                                setClickedFeed={setClickedFeed}
                                            />:
                                            post.target_type=='comment'?<div>zz_rrrrrrrrrrrrrrcomment</div>:null



                            )}
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

