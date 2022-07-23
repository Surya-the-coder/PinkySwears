import dateFormat from 'dateformat';
import { useRouter } from "next/router";
import {useEffect, useRef, useState} from "react";
import { getSession } from "next-auth/react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import Ellipse from '../../assets/images/Ellipse.svg'
import LoadingCard from "../../components/LoadingCard";
import SearchGray from '../../assets/images/Search-Gray.svg'
import SinglePostCard from "../../components/SinglePostCard";
import CommentCard from '../../components/CommentCard';
import { isAccessTokenValid } from '../../components/CommonFunctions'
import { gsap } from "gsap";
import ConfirmDialog from "../../components/ConfirmDialog";
import InformDialog from "../../components/InformDialog";
const { ScrollTrigger } = require("gsap/dist/ScrollTrigger");
const { ScrollToPlugin } = require("gsap/dist/ScrollToPlugin");

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const addAnimations = (commentCardRef) => {
    let cardsCount = commentCardRef.current.length
    for (let i = 6; i < cardsCount; i++) {
        gsap.from(commentCardRef.current[i], {
            x:50,y:20,
            scrollTrigger: {
                trigger: commentCardRef.current[i],
                toggleActions: "restart none none reset",
                start: "top bottom",
                end: "top 90%",
            }
        })
    }
}
const SinglePost = () => {

    const commentCardRef = useRef([]);
    
    const [singlePostData, setSinglePostData] = useState<any>([]);
    const [PostUserInfo, setPostUserInfo] = useState<any>();
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [accessToken, setAccessToken] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()
    const [userData, setUserData] = useState<any>()
    const [newComment, setNewComment] = useState<any>(null)

    const [commentForAction, setCommentForAction] = useState<any>(null)

    const [informDialogOpen, setInformDialogOpen] = useState(false)
    const [informDialogTitle, setInformDialogTitle] = useState('')
    const [informDialogContent, setInformDialogContent] = useState('')

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [confirmDialogTitle, setConfirmDialogTitle] = useState('')
    const [confirmDialogContent, setConfirmDialogContent] = useState('')
    const [confirmDialogAction, setConfirmDialogAction] = useState('')

    // let user = JSON.parse(localStorage.getItem('UserDetails'))
    
    const router = useRouter();

    useEffect(() => {
        let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        let accessTokenValid = false

        if (accessTokenLS == null) {
            // console.log('No Access Token')
            router.push('/')
        }
        else{
            setAccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            if(isAccessTokenValid(accessTokenLS, refreshTokenLS)){
                accessTokenValid = true
                setAccessToken(localStorage.getItem('access_token'))
            }

        }
    }, []);

    useEffect(() => {
        getSinglePostData()
    }, [newComment])


    useEffect(() => {
        let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        let accessTokenValid = false
        
        if (accessTokenLS == null) {
            // console.log('No Access Token')
            router.push('/')
        }
        else{
            let userLS = JSON.parse(localStorage.getItem('UserDetails'))

            setAccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            // console.log('Setting UserData')
            setUserData(userLS)
            if(isAccessTokenValid(accessTokenLS, refreshTokenLS)){
                accessTokenValid = true
                setAccessToken(localStorage.getItem('access_token'))
            }
            if (accessTokenValid) {
                if (router.isReady) {
                    getSinglePostData()
                        .then(res =>
                    {
                        gsap.from(".post-content", {
                            y:-30, duration:1,ease:"bounce.out",
                        })
                        gsap.from(".comment-cards", {
                            y:30, duration:1,ease:"bounce.out",
                        }).then(() => {
                            addAnimations(commentCardRef)
                        })
                    })
                        .catch(err => {})
                }
            }
            else{
                router.push('/')
            }
        }
    }, [router.isReady]);

    let getSinglePostData = async () => {
        let accessTokenLS = localStorage.getItem('access_token')
        // console.log('========================= IN GET SINGLE POST DATA =========================')
        while(router.query.postid)
            break
        let fetchSinglePostApiUrl = await `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/${router.query.postid}/`;
        // console.log(fetchSinglePostApiUrl)
        let response = await fetch(fetchSinglePostApiUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+ accessTokenLS,
			},
		});
        // console.log(response)
        let postData = await response.json()
        // console.log(postData)
        setSinglePostData(postData);
        setPostUserInfo(postData.user);
        // console.log('Setting is Data Fetched to true in getSinglePostData')
        setIsDataFetched(true);

    }

    let deletePostAPI = async() => {
        let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/${router.query.postid}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ accessToken,
            },
        });
    }

    let reportPostAPI = async() => {
        let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/report/post/${router.query.postid}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ accessToken,
            },
        });
    }

    let deleteCommentAPI = async() => {
        let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/comment/delete/${commentForAction}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ accessToken,
            },
        });
    }

    let reportCommentAPI = async() => {
        let response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/report/comment/${commentForAction}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ accessToken,
            },
        });
    }

    let DeleteReportAction = async() => {
        switch (confirmDialogAction) {
            case 'deletePost':
                console.log("deleting post")
                deletePostAPI().then(() => {
                    router.back()
                })
                break;
            case 'deleteComment':
                console.log("deleting comment")
                deleteCommentAPI().then(() => {
                    getSinglePostData()
                })
                break;
            case 'reportPost':
                console.log("reporting post")
                reportPostAPI().then(() => {
                    console.log("reported post")
                    setInformDialogTitle("Done.!")
                    setInformDialogContent("Your report has been sent to the admin. We will review it and take appropriate action.")
                    setInformDialogOpen(true)
                })
                break;
            case 'reportComment':
                console.log("reporting comment")
                reportCommentAPI().then(() => {
                    console.log("reported comment")
                    setInformDialogTitle("Done.!")
                    setInformDialogContent("Your report has been sent to the admin. We will review it and take appropriate action.")
                    setInformDialogOpen(true)
                })
                break;
            default:
                break;
        }
    }

    if (accessToken!=null) {
        return (
            <div className="full-page flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
            <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
            {/*<div className="pb-8 overflow-y-visible overflow-visible h-[92vh] z-50  w-full max-w-md">*/}
            <div className="pb-28 overflow-y-visible overflow-x-hidden z-50  w-full max-w-md">
                <meta name='theme-color' content='#FFBCD1' />
                <TopBar displayPic = {true} displayName = {true} backButton = {true} loggedInUserName = {userData.first_name + ' ' + userData.last_name} loggedInUserProfilePic = {userData.profileImg}/>
                {/* <div className="mx-5 my-3 py-1 flex bg-white rounded-full items-center">
                    <div className="pl-4 pr-2 py-1">
                        <SearchGray/>
                    </div>
                    <div className='w-full'>
                        <input type="text" name="SearchBox" id="searchBox" placeholder="Search Here" className="bg-transparent text-xs text-gray-400 border-none focus:outline-none w-full"/>
                    </div>
                </div> */}
                <div className="flex justify-around mx-10 top-24">
                </div>
                {isDataFetched?
                    <div className="single-card">
                        <SinglePostCard
                            userid = {PostUserInfo.id}
                            setConfirmDialogOpen = {setConfirmDialogOpen}
                            setConfirmDialogAction = {setConfirmDialogAction}
                            setConfirmDialogTitle = {setConfirmDialogTitle}
                            setConfirmDialogContent = {setConfirmDialogContent}
                            postid = {router.query.postid}
                            accessToken = {accessToken}
                            postUserImage = {PostUserInfo.profileImg}
                            currentUserImage = {userData.profileImg}
                            postUserName = {PostUserInfo.first_name + ' ' + PostUserInfo.last_name}
                            postCreatedDate = {dateFormat(singlePostData.created_at, "dS mmmm yyyy")}
                            postContent = {singlePostData.content}
                            setNewComment = {setNewComment}
                            likes = {singlePostData.likes}
                            isLiked = {singlePostData.is_liked}
                            comments = {singlePostData.comments_count}
                            isReported = {singlePostData.is_reported}
                            hashTags={singlePostData.hashtags}
                            isSameUserPost = {PostUserInfo.id == userData.id}
                        />
                        {singlePostData.comments.map( (comment,i) => <CommentCard
                            setCommentForAction = {setCommentForAction}
                            setConfirmDialogOpen = {setConfirmDialogOpen}
                            setConfirmDialogAction = {setConfirmDialogAction}
                            setConfirmDialogTitle = {setConfirmDialogTitle}
                            setConfirmDialogContent = {setConfirmDialogContent}
                            id={`commentCard${i}`}
                            ref={el => commentCardRef.current[i] = el}
                            accessToken = {accessToken}
                            key={comment.id}
                            commentID = {comment.id}
                            commentLikes = {comment.likes}
                            commentUserProfilePic = {comment.user.profileImg}
                            commentUsername = {comment.user.first_name + " " + comment.user.last_name}
                            commentContent = {comment.content}
                            isLiked = {comment.is_liked}
                            isSameUserComment = {comment.user.id == userData.id}
                        />
                        )}
                        {
                            // typeof singlePostData.comments[0].id === 'undefined' ? null : singlePostData.comments.map((comment) => {<CommentCard accessToken = {accessToken} commentID = {comment.id} commentLikes = {comment.likes} commentUserProfilePic = {comment.user.profileImg} commentUsername = {comment.user.first_name + " " + comment.user.last_name} commentContent = {comment.content}  isLiked = {comment.is_liked}/>})
                        }
                    </div>
                : //else
                    <div className="">
                        <LoadingCard></LoadingCard>
                    </div>
                }
            </div>
            <NavBar page = "Home" />
                <ConfirmDialog
                    title={confirmDialogTitle}
                    content={confirmDialogContent}
                    open={confirmDialogOpen}
                    onClose={() => setConfirmDialogOpen(false)}
                    onConfirm={DeleteReportAction}
                />
                <InformDialog
                    title={informDialogTitle}
                    content={informDialogContent}
                    open={informDialogOpen}
                    onClose={() => setInformDialogOpen(false)}
                />
        </div>
        );
    }
    else{
        return null;
    }
}

export default SinglePost;