import TopBar from "../components/TopBar";
import { useState, useEffect, useRef } from 'react';

import useScrollRestoration from "../components/useScrollRestoration";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Ellipse from '../assets/images/Ellipse.svg'
import dateFormat from 'dateformat';
import { useRouter } from 'next/router'
import LoadingCard from "../components/LoadingCard";
import { isAccessTokenValid, paginate } from '../components/CommonFunctions'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingSpinner from '../components/LoadingSpinner'
import Search from '../assets/images/Search.svg';
import { gsap } from "gsap";
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
const { ScrollToPlugin } = require("gsap/dist/ScrollToPlugin");


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
// let redirectToHomePage = () => {
//     const router = useRouter()
//     return router.push('/')
//   };

let oldCardsCount = 0

const scrollToCard = () => {
    const scrollDiv = `#card-${sessionStorage.getItem('clickedCard')}`
    console.log("Name is ", scrollDiv)
    gsap.to(window, {scrollTo:`#card-${sessionStorage.getItem('clickedCard')}`})
    sessionStorage.setItem('clickedCard', '')
}


const addAnimations = (cardRef) => {

    let cardsCount = cardRef.current.length
    console.log(cardsCount)
    for (let i = oldCardsCount; i < cardsCount; i++) {
        gsap.to(cardRef.current[i], {
            x: 0, y:70,xPercent:10,scale:0.9,
            scrollTrigger: {
                trigger: cardRef.current[i],
                toggleActions: "play pause reverse reset",
                scrub:true,
                start: "10% top",
                end: "bottom",
            }
        })
        gsap.from(cardRef.current[i], {
            x: 0,y:20,
            scrollTrigger: {
                trigger: cardRef.current[i],
                toggleActions: "restart none reverse reset",
                start: "top 80%",
                end: "top 70%",
                scrub:1,
            }
        })
        //test - code below.
        // gsap.from(cardRef.current[i], {
        //     y:30, rotationY:45,ease: "back.out(1.6)",opacity:0.6,
        //         scrollTrigger: {
        //             trigger: cardRef.current[i],
        //             toggleActions: "restart none none reset",
        //             start: "top 80%",
        //             end: "top 70%",
        //             // scrub:true,
        //         }
        //     })

    }
    oldCardsCount = cardsCount
}



const homeOld = ({session}) => {

    console.log('=============================HOME=============================')

    const ref = useRef();
    const cardRef = useRef([]);


    let [All, setAll] = useState(false)
    let [Recent, setRecent] = useState(true)
    let [Most, setMost] = useState(false)
    let [Top, setTop] = useState(false)

    const [AccessToken, setAccessToken] = useState<any>()
    const [RefreshToken, setRefreshToken] = useState<any>()

    const [isDataFetched, setIsDataFetched] = useState(false)
    const [posts, setPosts] = useState([])
    const [url,setUrl] = useState<any>(`/api/post/`)
    const [searchString,setSearchString] = useState<string>()
    const [finalSearchString,setFinalSearchString] = useState<string>()
    const [showSearch,setShowSearch] = useState(false)
    const [showSearchResults,setShowSearchResults] = useState(false)
    const [clickedCard,setClickedCard] = useState<any>()
    const router = useRouter()
    useScrollRestoration(router)
    const searchRef = useRef<any>()

    useEffect(() => {
        console.log(sessionStorage.getItem('clickedCard'))

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
                getAllPosts()
                    .then(res => {
                        addAnimations(cardRef)
                        scrollToCard()
                    })
                    .catch(err => {}) ;

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
                setUrl('/api/post/')
                break;
            case "Most":
                console.log('========================INSIDE GETALL POST MOST===========================')
                postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/mostliked/`;
                response = await fetch(postUrl);
                data = await response.json();
                setPosts(data);
                setIsDataFetched(true);
                setUrl('/api/post/mostliked/')
                break;
            case "Top":
                console.log('========================INSIDE GETALL POST TOP===========================')
                postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/mostcommented/`;
                response = await fetch(postUrl);
                data = await response.json();
                setPosts(data);
                setIsDataFetched(true);
                setUrl('/api/post/mostcommented/')
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
                setShowSearchResults(false)
                setShowSearch(false)
                break;
            case "Recent":
                setAllFalse();
                setRecent(true);
                getAllPosts('Recent')
                setShowSearchResults(false)
                setShowSearch(false)
                break;
            case "Most":
                setAllFalse();
                setMost(true);
                getAllPosts('Most')
                setShowSearchResults(false)
                setShowSearch(false)
                break;
            case "Top":
                setAllFalse();
                setTop(true);
                getAllPosts('Top')
                setShowSearchResults(false)
                setShowSearch(false)
                break;

            default:
                break;
        }
    }

    let showSearchFn = () => {
        setShowSearch(!showSearch)
        searchRef.current.value=''
    }

    let clearSearchFn= () => {
        setShowSearch(!showSearch)
        searchRef.current.value=''
        pageSelected("Recent")
    }

    let searchKeyHandler = (e) => {
        if (e.key === 'Enter') {
            SearchHandler()
        }
    }

    let SearchHandler=()=>{
        if(searchString!=null){
            setFinalSearchString(searchString)
            setUrl(`/api/post/search/`)
            setShowSearchResults(true)
        }
    }
    let searchStringOnChange=(tempSearchString)=>{
        console.log("Inside On change");
        console.log(tempSearchString);
        if(tempSearchString==""){
            setFinalSearchString(null)
            setSearchString(null)
            url==='/api/post/'?null:setUrl(`/api/post/`)
        }
        else
        {
            setSearchString(tempSearchString)
        }
    }
    let {isLoading, PaginatedData, error, isValidating, mutate, size, setSize, reachedEnd} = paginate(url,finalSearchString)
    let PaginatedPosts = PaginatedData?.flat()

    useEffect(() => {
        addAnimations(cardRef)
    }, [PaginatedData]);

    if (AccessToken!=null) {
        const user = JSON.parse(localStorage.getItem('UserDetails'))
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
                <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
                <div className="pb-5 overflow-y-auto overflow-hidden z-50 mb-[10vh] w-full max-w-md ">
                    <meta name='theme-color' content='#FFBCD1' />
                    <TopBar displayPic = {true} displayName = {true} backButton = {false} loggedInUserName = {user.first_name + ' ' + user.last_name} userid = {user.id} loggedInUserProfilePic = {user.profileImg}/>
                    <div className={`flex justify-left items-center mx-6 bg-white rounded-full mb-4 h-10 w-${showSearch?100:10} `}>
                        <button onClick={showSearchFn} className="pl-2 no-highlights"> <Search className=" mr-4"/> </button>
                        <input type="text" name="Search" ref={searchRef} id="Search" placeholder="Search here..." className={`outline-none font-Sarabun text-sm px-2 bg-transparent ${showSearch?null:'hidden'}`} onChange={(e)=>searchStringOnChange(e.target.value) } onKeyUp={searchKeyHandler}/>

                    </div>
                    <div className={`flex justify-around mx-10 top-24 ${showSearch?null:'hidden'}`}>
                        <button className={`bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white no-highlights`} onClick={clearSearchFn}>Clear Search</button>
                    </div>
                    <div className={`flex justify-around mx-10 top-24 ${showSearch?'hidden':null}`}>
                        {/* <button className={All?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("All")}>All</button> */}
                        <button className={Recent?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl no-highlights" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white no-highlights"} onClick={() => pageSelected("Recent")}>Recent</button>
                        <button className={Most?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl no-highlights" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white no-highlights"} onClick={() => pageSelected("Most")}>Most</button>
                        <button className={Top?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl no-highlights" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white no-highlights"} onClick={() => pageSelected("Top")}>Top</button>
                    </div>
                    {finalSearchString?null:<p className="mx-8 my-2">Today</p>}
                    {console.log(posts)}
                    {isDataFetched?
                        <div className="">
                            <div className={`flex flex-wrap justify-around items-center mx-10 mt-5 ${showSearchResults?null:'hidden'}`}>Showing Search results for '{finalSearchString}'</div>
                            <InfiniteScroll dataLength={PaginatedPosts?.length ?? 0} next={()=>setSize(size+1)} hasMore={!reachedEnd} loader={<LoadingSpinner/>} endMessage={<div className="flex justify-center items-center mb-10 text-gray-400"><p>No more posts to show</p></div>}>
                                {console.log(reachedEnd)}
                                {PaginatedPosts?.map( (post,i) => <Card ref={el => cardRef.current[i] = el} key={post.id} accessToken = {AccessToken} postid = {post.id} userid={post.user.id} setClickedCard = {setClickedCard} username = {post.user.first_name + ' ' + post.user.last_name} profileImage = {post.user.profileImg} content={post.content} createdData = {dateFormat(post.created_at, "dS mmmm yyyy")} numberOfLikes = {post.likes} commentsCount={post.comments_count} /> )}
                            </InfiniteScroll>
                        </div>
                        :
                        <div className="">
                            <LoadingCard></LoadingCard>
                            <LoadingCard></LoadingCard>
                            <LoadingCard></LoadingCard>
                            <LoadingCard></LoadingCard>
                        </div>
                    }
                    {/* <div className="flex justify-center items-center mb-10">
                        <button onClick={()=>setSize(size+1)}>Load More...</button>
                    </div> */}
                </div>
                <NavBar page = {"Home"}/>
            </div>
        );
    }
    else{
        return null
    }
}

export default homeOld;