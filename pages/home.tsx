import TopBar from "../components/TopBar";
import { useState, useEffect, useRef } from 'react';
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
import HomeRecent from "../components/HomeRecent";
import HomeLikes from "../components/HomeLikes";
import HomeComments from "../components/HomeComments";




const home = ({}) => {

    const [currentPage, setCurrentPage] = useState("HomeRecent");
    const [isHomeRecent, setIsHomeRecent] = useState(true);
    const [isHomeLikes, setIsHomeLikes] = useState(false);
    const [isHomeComments, setIsHomeComments] = useState(false);

    let setAllFalse =() =>
    {
        setIsHomeRecent(false);
        setIsHomeLikes(false);
        setIsHomeComments(false);
    }

    useEffect(() => {
        if (sessionStorage.getItem("currentPage") != null)
        {
            setCurrentPage(sessionStorage.getItem("currentPage"));
        }
        switch (currentPage) {
            case "Home":
                setAllFalse();
                setIsHomeRecent(true);
                break;
            case "HomeLikes":
                setAllFalse();
                setIsHomeLikes(true)
                break;
            case "HomeComments":
                setAllFalse();
                setIsHomeComments(true)
        }

    }, []);

    useEffect(() => {
        switch (currentPage) {
            case "HomeRecent":
                setAllFalse();
                setIsHomeRecent(true);
                sessionStorage.setItem("currentPage", "HomeRecent");
                break;
            case "HomeLikes":
                setAllFalse();
                setIsHomeLikes(true)
                sessionStorage.setItem("currentPage", "HomeLikes");
                break;
            case "HomeComments":
                setAllFalse();
                setIsHomeComments(true)
                sessionStorage.setItem("currentPage", "HomeComments");
                break;
        }

    }, [currentPage]);

    return (
        <>
        {isHomeRecent?
                <HomeRecent setCurrentPage = {setCurrentPage}/>:null
        }
        {isHomeLikes?
            <HomeLikes setCurrentPage = {setCurrentPage}/>:null
        }
        {isHomeComments?
            <HomeComments setCurrentPage = {setCurrentPage}/>:null
        }
        </>


    )
}

export default home;