import TopBar from "../components/TopBar";
import React, {useState, useEffect, useRef, PropsWithChildren} from 'react';
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


let oldCardsCount = 0

const scrollToCard = () => {
    if (sessionStorage.currentPage === "HomeRecent")
    {
    console.log('Scrolling to card')
    const scrollDiv = `#card-${sessionStorage.getItem('clickedCard')}`
    gsap.to(window, {scrollTo:scrollDiv}).then(()=>{
        gsap.from(scrollDiv, {duration: 1, backgroundColor:"yellow" })
    })

        sessionStorage.setItem('clickedCard', '')
    }
    // sessionStorage.setItem('clickedCard', '')
}


const addAnimations = (cardRef) => {
    let cardsCount = cardRef.current.length
    for (let i = 0; i < cardsCount; i++) {
        gsap.to(cardRef.current[i], {
            x: 0, y:70,xPercent:10,
            scrollTrigger: {
                trigger: cardRef.current[i],
                toggleActions: "play pause reverse reset",
                scrub:true,
                start: "10% top",
                end: "bottom",
            }
        })
    }
    oldCardsCount = cardsCount
}

const homerecent = (props:PropsWithChildren<any>) => {

    const [canAccess,setCanAccess] = useState(false)
    const router = useRouter()
    // console.log('=============================HOME=============================')
    const ref = useRef();
    const cardRef = useRef([]);
    let accessToken

    const [isDataFetched, setIsDataFetched] = useState(false)
    const [posts, setPosts] = useState([])
    const [url,setUrl] = useState<any>(`/api/post/`)
    const [searchType,setSearchType] = useState('all')
    const [searchString,setSearchString] = useState<string>()
    const [finalSearchString,setFinalSearchString] = useState<string>()
    const [showSearch,setShowSearch] = useState(false)
    const [showSearchResults,setShowSearchResults] = useState(false)
    const [clickedCard,setClickedCard] = useState<any>()
    const [renderComplete,setRenderComplete] = useState(false)
    const searchRef = useRef<any>()
    let postUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/`;
    let response
    let data


    useEffect(() => {
        let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        let accessToken = null
        if (accessTokenLS == null) {
            console.log('No Access Token')
            router.push('/')
        }
        else {
            if (isAccessTokenValid(accessTokenLS, refreshTokenLS)) {
                accessToken = localStorage.getItem('access_token')
                let currentTab = sessionStorage.getItem('clickedTab')
                if (sessionStorage.getItem('searchClicked') == 'true') {
                    setFinalSearchString(sessionStorage.getItem('searchString'))
                    console.log("search string is ", searchString)
                    setShowSearch(!showSearch)
                    setUrl(`/api/post/search/`)
                    setSearchType(sessionStorage.getItem('searchType'))
                    sessionStorage.setItem('searchType', 'all')
                    setShowSearchResults(true)
                    setCanAccess(true)
                    console.log("all set")
                    setIsDataFetched(true)
                    addAnimations(cardRef)
                    scrollToCard()

                } else {
                    getAllPosts().then(res => {
                        addAnimations(cardRef)
                        scrollToCard()
                    })
                    setShowSearchResults(false)
                    setShowSearch(false)
                    setCanAccess(true)

                }
            }
            else {
                console.log('No Access Token')
                router.push('/')
            }
            setRenderComplete(true)
        }

        // setRenderComplete(true)

    }, []);



    useEffect(() => {
        if (renderComplete) {
            let searchBox = document.getElementById("Search") as HTMLInputElement
            searchBox.value = sessionStorage.getItem('searchString')
            // addAnimations(cardRef)
            // scrollToCard()
        }
    }, [renderComplete])


    let getAllPosts = async (option=null) => {
        console.log('getting posts')
        response = await fetch(postUrl);
        data = await response.json();
        setPosts(data);
        setIsDataFetched(true);
        setUrl('/api/post/')
    }

    let showSearchFn = () => {
        setShowSearch(!showSearch)
        searchRef.current.value=''
    }

    let clearSearchFn= () => {
        setShowSearch(!showSearch)
        searchRef.current.value=''
        setUrl(`/api/post/`)
        setShowSearchResults(false)
        sessionStorage.setItem('searchClicked','false')
        sessionStorage.setItem('searchString','')
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
            sessionStorage.setItem('searchClicked','true')
            sessionStorage.setItem('searchString',searchString)
            setSearchType('all')
        }
    }

    let loadRecentPage = () =>{
        sessionStorage.setItem('searchClicked','false')
        sessionStorage.setItem('searchString','')
        sessionStorage.setItem('currentPage','HomeRecent')
        props.setCurrentPage('HomeRecent')
    }

    let loadLikesPage = () =>{
        sessionStorage.setItem('searchClicked','false')
        sessionStorage.setItem('searchString','')
        sessionStorage.setItem('currentPage','HomeLikes')
        props.setCurrentPage('HomeLikes')
    }

    let loadCommentsPage = () =>{
        sessionStorage.setItem('searchClicked','false')
        sessionStorage.setItem('searchString','')
        sessionStorage.setItem('currentPage','HomeComments')
        props.setCurrentPage('HomeComments')
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

    let {isLoading, PaginatedData, error, isValidating, mutate, size, setSize, reachedEnd} = paginate(url,finalSearchString,searchType)
    let PaginatedPosts = PaginatedData?.flat()

    useEffect(() => {
        addAnimations(cardRef)
    }, [PaginatedData])

    useEffect(() => {
        router.beforePopState(({ as }) => {
            if (as !== router.asPath) {
                if (sessionStorage.getItem('searchClicked') == 'true') {
                    sessionStorage.setItem('searchClicked', 'false')
                }
                // Will run when leaving the current page; on back/forward actions
                // Add your logic here, like toggling the modal state
            }
            return true;
        });
        return () => {
            router.beforePopState(() => true);
        };
    }, [router]);

    if (canAccess) {
        const user = JSON.parse(localStorage.getItem('UserDetails'))
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
                <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
                <div className="pb-5 overflow-y-auto overflow-hidden z-50 mb-[10vh] w-full max-w-md ">


                    <meta name='theme-color' content='#FFBCD1' />
                    <TopBar displayPic = {true} displayName = {true} backButton = {false} loggedInUserName = {user.first_name + ' ' + user.last_name} userId = {user.id} loggedInUserProfilePic = {user.profileImg}/>
                    
                    <div className={`flex justify-around mx-5 top-24 ${showSearch?'':null}`}>
                        <button onClick={showSearchFn} className={`bg-white rounded-full px-4 no-highlights ${showSearch?'hidden':null}`}> <Search className=""/> </button>
                        <input type="text" name="Search" ref={searchRef} id="Search" placeholder="Search here..." className={`outline-none font-Sarabun text-sm px-2 bg-white rounded-2xl w-full text-[#FF848E] ${showSearch ? '':'hidden'}`} onChange={(e)=>searchStringOnChange(e.target.value) } onKeyUp={searchKeyHandler} />
                        <button className={`bg-white text-[#FF848E] px-4 py-2 rounded-2xl focus:bg-[#F67A95] focus:text-white no-highlights ${showSearch ? '' :'hidden'} ml-1`} onClick={clearSearchFn}>Clear</button>
                        
                        <button className={`bg-[#F67A95] text-white px-4 py-2 rounded-2xl no-highlights text-sm ${showSearch?'hidden':null} `} onClick={loadRecentPage}>Recent</button>
                        <button className={`bg-white text-[#FF848E] px-4 py-2 rounded-2xl focus:bg-[#F67A95] focus:text-white no-highlights text-sm ${showSearch?'hidden':null} `} onClick={loadLikesPage}>By likes</button>
                        <button className={`bg-white text-[#FF848E] px-4 py-2 rounded-2xl focus:bg-[#F67A95] focus:text-white no-highlights text-sm ${showSearch?'hidden':null} `} onClick={loadCommentsPage}>By comments</button>
                    </div>

                    {/*{console.log(posts)}*/}
                    {isDataFetched?
                        <div className="">
                            <div className={`flex flex-wrap justify-around items-center mx-10 mt-5 ${showSearchResults?null:'hidden'}`}>Showing Search results for '{finalSearchString}'</div>
                            <InfiniteScroll className="!overflow-x-hidden" dataLength={PaginatedPosts?.length ?? 0} next={()=>setSize(size+1)} hasMore={!reachedEnd} loader={<LoadingSpinner/>} endMessage={<div className="flex justify-center items-center mb-10 text-gray-400"><p>No more posts to show</p></div>}>
                                {/*{console.log(reachedEnd)}*/}
                                {PaginatedPosts?.map( (post,i) => <Card ref={el => cardRef.current[i] = el} key={post.id} accessToken = {accessToken} postid = {post.id} userid={post.user.id} setClickedCard = {setClickedCard} username = {post.user.first_name + ' ' + post.user.last_name} profileImage = {post.user.profileImg} content={post.content} createdData = {dateFormat(post.created_at, "dS mmmm yyyy")} numberOfLikes = {post.likes} commentsCount={post.comments_count} /> )}
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

export default homerecent;