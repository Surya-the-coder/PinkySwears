import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingCard from "../../components/LoadingCard";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import Ellipse from '../../assets/images/Ellipse.svg'
import SinglePostCard from "../../components/SinglePostCard";


const SinglePost = ({session}) => {
    
    const [singlePostData, setSinglePostData] = useState([]);
    const [PostUserInfo, setPostUserInfo] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false)
    
    const router = useRouter();

    useEffect(() => {
      getSinglePostData()
    }, []);

    let getSinglePostData = async () => {
        let fetchSinglePostApiUrl = `https://dream-pg-backend.herokuapp.com/api/post/${router.query.postid}/`;
        let response = await fetch(fetchSinglePostApiUrl);
        let postData = await response.json()
        setSinglePostData(postData);
        setPostUserInfo(postData.user)
        setIsDataFetched(true);
    }
    
    if(session){
        return (
            <div className="flex justify-center bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] w-full">
            <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
            <div className="mb-6 overflow-y-auto overflow-hidden h-[95vh] z-50  w-full max-w-md">
                <meta name='theme-color' content='#FFBCD1' />
                <TopBar backButton = {true} loggedInUserName = {session.user.name} loggedInUserProfilePic = {session.user.image} />
                <div className="flex justify-around mx-10 top-24">
                </div>

                {isDataFetched?
                    <div className="">
                        <SinglePostCard />
                    </div>
                :
                <div className="">
                    <LoadingCard></LoadingCard>
                </div>
                }
            </div>
            <NavBar/>
        </div>
        );
    }
}

export default SinglePost;

export async function getServerSideProps (context) {
    const session = await getSession(context);
    if (!session) {
        return{redirect :{destination: '/', permanent : false}}
    }
    return {props : {session}}
}