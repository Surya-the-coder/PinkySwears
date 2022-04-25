import Head from "next/head";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Ellipse from '../assets/images/Ellipse.svg'
import { getSession, signOut } from 'next-auth/react'

const preference = ({session}) => {
    if (session) {   
        return (
            <div className="flex flex-col  items-center min-h-screen bg-gradient-to-t from-[rgb(253,235,247)] to-[#FFBCD1]">
				<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
				<Head>
					<meta name='theme-color' content='#FFBCD1' />
				</Head>
				<div className="flex flex-col w-full max-w-md z-50">
                    <TopBar loggedInUserName = {session.user.name} loggedInUserProfilePic={session.user.image}/>
					<div className="flex justify-center">
                        <button className="border-none bg-pink-400 rounded-full w-28 h-12 text-xl text-white" onClick={() => signOut()}> Sign Out </button>
                    </div>
				    <NavBar/>
				</div>
			</div>
        );
    }
}

export default preference;

export async function getServerSideProps (context) {
    const session = await getSession(context);
    if (!session) {
        return{redirect :{destination: '/', permanent : false}}
    }
    return {props : {session}}
}