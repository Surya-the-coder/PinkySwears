import Head from "next/head";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Ellipse from '../assets/images/Ellipse.svg'
// import { getSession, signOut } from 'next-auth/react'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GoogleLogout } from "react-google-login";

let signOut = (router) => {
    console.log("================Inside SignOut================")
    localStorage.clear()
    sessionStorage.clear()
    router.push('/')
}

const preference = () => {

    const router = useRouter()

    const [accessToken, setaccessToken] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()
    const [user, setUser] = useState<any>()

    useEffect(() => {
        console.log('=========================PREF LOG================================')
        let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        
        if (accessTokenLS == null) {
            console.log('No Access Token')
            router.push('/')
        }
        else{
            let userLS = JSON.parse(localStorage.getItem('UserDetails'))
            
            setaccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            setUser(userLS)
            
            console.log(userLS)
        }
        console.log(localStorage.getItem('UserDetails'))
    }, [])


    let logout = () => {
        signOut(router)
    }

    if (accessToken != null) {
        return (
            <div className="flex flex-col  items-center min-h-screen bg-gradient-to-t from-[rgb(253,235,247)] to-[#FFBCD1]">
			    <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
			    <Head>
			    	<meta name='theme-color' content='#FFBCD1' />
			    </Head>
			    <div className="flex flex-col w-full max-w-md z-50">
                    <TopBar displayPic = {true} displayName = {true} loggedInUserName = {user.first_name + ' ' + user.last_name} loggedInUserProfilePic={user.profileImg}/>
			    	<div className="flex justify-center">
                        <GoogleLogout clientId='65395984080-s2sso604b22cihc6ntj7cg3vl2tmhn69.apps.googleusercontent.com' onLogoutSuccess={logout} render={ renderProps => (<button className="border-none bg-pink-400 rounded-full w-28 h-12 text-xl text-white" onClick={renderProps.onClick} disabled = {renderProps.disabled}> Sign Out </button>)}/>
                    </div>
			        <NavBar/>
			    </div>
		    </div>
        );
    }
    else{
        return null
    }
}

export default preference;