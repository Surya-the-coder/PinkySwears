import { useState } from "react";

const forTest = () => {

    const [firstPage, setFirstPage] = useState(true)
    const [secondPage, setSecondPage] = useState(false)
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            { firstPage?
                    <button onClick={() => {setFirstPage(false); setSecondPage(true)}}>Go to Second Page</button>
                :secondPage?
                    <button onClick={() => {setFirstPage(false); setSecondPage(false)}}>Go to Third Page</button>
                :
                    <div>ThirdPage</div>
            }
        </div>
    );
}

export default forTest;