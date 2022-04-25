import TopBar from "../components/TopBar";
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Ellipse from '../assets/images/Ellipse.svg'
import dateFormat from 'dateformat';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingCard from "../components/LoadingCard";
// import SignInError from "../components/SignInError";


const home = ({session}) => {
    
    let [All, setAll] = useState(false)
    let [Recent, setRecent] = useState(false)
    let [Most, setMost] = useState(false)
    let [Top, setTop] = useState(false)
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [posts, setPosts] = useState([])
    
    let router = useRouter();
    
    const user = session?.user;
    console.log(session?.user)

    useEffect(() => {
            getAllPosts();
    }, []);

    let getAllPosts = async () => {
        let postUrl = 'https://dream-pg-backend.herokuapp.com/api/post/';
        let response = await fetch(postUrl);
        let data = await response.json();
        setPosts(data);
        setIsDataFetched(true);
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
                break;
            case "Recent":
                setAllFalse();
                setRecent(true);
                break;
            case "Most":
                setAllFalse();
                setMost(true);
                break;
            case "Top":
                setAllFalse();
                setTop(true);
                break;
                    
            default:
                break;
        }
    }

    if (session) {
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
                <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
                <div className="mb-6 overflow-y-auto overflow-hidden h-[95vh] z-50  w-full max-w-md">
                    <meta name='theme-color' content='#FFBCD1' />
                    <TopBar backButton = {false} loggedInUserName = {session.user.name} loggedInUserProfilePic = {session.user.image} />
                    <div className="flex justify-around mx-10 top-24">
                        <button className={All?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("All")}>All</button>
                        <button className={Recent?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Recent")}>Recent</button>
                        <button className={Most?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Most")}>Most</button>
                        <button className={Top?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Top")}>Top</button>
                    </div>
                    <p className="mx-8 my-8">Today</p>

                    {isDataFetched?
                        <div className="">
                            {posts.map( (post) => <Card username = {post.user.username} profileImage = {session.user.image} content={post.content} createdData = {dateFormat(post.created_at, "dS mmmm yyyy")} numberOfLikes = {post.numberOfLikes} /> )}
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
                <NavBar/>
            </div>
        );
    }
}

export default home;

export async function getServerSideProps (context) {
    const session = await getSession(context);
    if (!session) {
        return{redirect :{destination: '/', permanent : false}}
    }
    return {props : {session}}
}