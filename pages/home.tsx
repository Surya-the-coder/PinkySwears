import TopBar from "../components/TopBar";
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar";
import Card from "../components/Card";

const home = () => {

    let [All, setAll] = useState(false)
    let [Recent, setRecent] = useState(false)
    let [Most, setMost] = useState(false)
    let [Top, setTop] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
      getAllPosts();
    }, [])
    
    let getAllPosts = async () => {
        let postUrl = 'https://dream-pg-backend.herokuapp.com/api/post/';
        let response = await fetch(postUrl);
        let data = await response.json();
        // console.log(data);
        setPosts(data);
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

    return (
        <div className="bg-pink-200 min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1] overflow-y-auto overflow-hidden">
            <meta name='theme-color' content='#FFBCD1' />
            <TopBar/>
            <div className="flex justify-around mx-10 top-24">
                <button className={All?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("All")}>All</button>
                <button className={Recent?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Recent")}>Recent</button>
                <button className={Most?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Most")}>Most</button>
                <button className={Top?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Top")}>Top</button>
            </div>
            <p className="mx-8 my-8">Today</p>
            <div className="">
                <Card/>
                {posts.map((post) =>
                    <Card username = {post.user.username} createdData = {post.created_at}/>
                )}
            </div>

            <NavBar/>
        </div>
    );
}

export default home;