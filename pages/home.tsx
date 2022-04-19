import TopBar from "../components/TopBar";
import {useState} from 'react'

const home = () => {

    let [All, setAll] = useState(false)
    let [Recent, setRecent] = useState(false)
    let [Most, setMost] = useState(false)
    let [Top, setTop] = useState(false)

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
        <div className="bg-pink-200 min-h-screen bg-[mybg]">
            <TopBar/>
            <div className="flex justify-around">
                <button className={All?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("All")}>All</button>
                <button className={Recent?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Recent")}>Recent</button>
                <button className={Most?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Most")}>Most</button>
                <button className={Top?"bg-[#F67A95] text-white px-5 py-1 rounded-2xl" : " bg-white text-[#FF848E] px-5 py-1 rounded-2xl focus:bg-[#F67A95] focus:text-white"} onClick={() => pageSelected("Top")}>Top</button>
            </div>
        </div>
    );
}

export default home;