import { useState } from "react";
import PIC from '../assets/images/Doggy.jpg'

import Image from 'next/image'


const forTest = () => {

    const [firstPage, setFirstPage] = useState(true)
    const [secondPage, setSecondPage] = useState(false)

    const picurl = 'https://picsum.photos/id/237/200/300'

    let profilePicLoader = ({ src, width, quality }) => {
        return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${src}?w=${width}&q=${quality || 75}`
    }
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex items-center rounded-full w-16 h-16 max-h-16 max-w-[4rem] border-2 border-red-600">
                <Image loader={profilePicLoader} src={"/media/profile_images/Outside2.jpeg"} width={64} height={64} className="rounded-full w-16 h-16"></Image>
            </div>
        </div>
        // <div className="flex flex-col justify-center items-center min-h-screen">
        //     { firstPage?
        //             <button onClick={() => {setFirstPage(false); setSecondPage(true)}}>Go to Second Page</button>
        //         :secondPage?
        //             <button onClick={() => {setFirstPage(false); setSecondPage(false)}}>Go to Third Page</button>
        //         :
        //             <div>ThirdPage</div>
        //     }
        // </div>
    );
}

export default forTest;