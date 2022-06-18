import TopBar from "../components/TopBar";
import { useState, useEffect, useRef } from 'react';
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Ellipse from '../assets/images/Ellipse.svg'
import dateFormat from 'dateformat';
import Router, { useRouter } from 'next/router'
import LoadingCard from "../components/LoadingCard";
import { isAccessTokenValid } from '../components/CommonFunctions'

let redirectToHomePage = () => {
    const router = useRouter()
    return router.push('/')
  };

const home = ({session}) => {
    console.log('=============================HOME=============================')

    const ref = useRef();

    let [All, setAll] = useState(false)
    let [Recent, setRecent] = useState(false)
    let [Most, setMost] = useState(false)
    let [Top, setTop] = useState(false)
    
    const [AccessToken, setAccessToken] = useState<any>()
    const [RefreshToken, setRefreshToken] = useState<any>()
    
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [posts, setPosts] = useState([])
    
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
                getAllPosts();
            }
            else{
                router.push('/')
            }
        }
    }, []);

    let getAllPosts = async (option=null) => {
        console.log('GET ALL POST')
        console.log(option)
        switch(option){
            case "All":
                console.log('========================INSIDE GETALL POST ALL===========================')
                let postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/`;
                let response = await fetch(postUrl);
                let data = await response.json();
                setPosts(data);
                setIsDataFetched(true);
                break;
            case "Recent":
                console.log('========================INSIDE GETALL POST RECENT===========================')
                postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/`;
                response = await fetch(postUrl);
                data = await response.json();
                setPosts(data);
                setIsDataFetched(true);
                break;
            case "Most":
                console.log('========================INSIDE GETALL POST MOST===========================')
                postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/`;
                response = await fetch(postUrl);
                data = await response.json();
                setPosts(data);
                setIsDataFetched(true);
                break;
            case "Top":
                console.log('========================INSIDE GETALL POST TOP===========================')
                postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/`;
                response = await fetch(postUrl);
                data = await response.json();
                setPosts(data);
                setIsDataFetched(true);
                break;
            default:
                console.log('========================INSIDE GETALL POST===========================')
                postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/`;
                response = await fetch(postUrl);
                data = await response.json();
                setPosts(data);
                setIsDataFetched(true);
                break;
        }
    }

    let setAllFalse = () =>{
        setAll(false);
        setRecent(false);
        setMost(false);
        setTop(false);
    }
    
    let pageSelected = (pageName) => {
        switch (pageName) {
            case "All":
                setAllFalse();
                setAll(true);
                getAllPosts('All')
                break;
            case "Recent":
                setAllFalse();
                setRecent(true);
                getAllPosts('Recent')
                break;
            case "Most":
                setAllFalse();
                setMost(true);
                getAllPosts('Most')
                break;
            case "Top":
                setAllFalse();
                setTop(true);
                getAllPosts('Top')
                break;
                    
            default:
                break;
        }
    }

    if (AccessToken!=null) {
        const user = JSON.parse(localStorage.getItem('UserDetails'))
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
                <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
                <div className="pb-5 overflow-y-auto overflow-hidden h-[92vh] z-50  w-full max-w-md ">
                    <meta name='theme-color' content='#FFBCD1' />
                    <TopBar displayPic = {true} displayName = {true} backButton = {false} loggedInUserName = {user.first_name + ' ' + user.last_name} userid = {user.id} loggedInUserProfilePic = {user.profileImg}/>
                    <div className="flex justify-around mx-10 top-24">
                        <button className={All?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("All")}>All</button>
                        <button className={Recent?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Recent")}>Recent</button>
                        <button className={Most?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Most")}>Most</button>
                        <button className={Top?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Top")}>Top</button>
                    </div>
                    <p className="mx-8 my-2">Today</p>
                    {console.log(posts)}
                    {isDataFetched?
                        <div className="">
                            {posts.map( (post) => <Card key={post.id} accessToken = {AccessToken} postid = {post.id} userid={post.user.id} username = {post.user.first_name + ' ' + post.user.last_name} profileImage = {post.user.profileImg} content={post.content} createdData = {dateFormat(post.created_at, "dS mmmm yyyy")} numberOfLikes = {post.likes} /> )}
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
                <NavBar page = {"Home"}/>
            </div>
        );
    }
    else{
        return null
    }
}

export default home;