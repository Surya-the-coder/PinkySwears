import Head from "next/head";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import { getSession } from "next-auth/react";
import Ellipse from '../assets/images/Ellipse.svg'

const profile = ({session}) => {
    if (session) {
        return (
            <div className="flex justify-center min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
            <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
            <Head>
                <meta name='theme-color' content='#FFBCD1' />
            </Head>
            <div className="flex flex-col w-full max-w-md z-50">
                <TopBar backButton={true} loggedInUserName = {session.user.name} loggedInUserProfilePic={session.user.image}/>
                <NavBar/>
            </div>
        </div>
        );
    }
}

export default profile;

export async function getServerSideProps (context) {
    const session = await getSession(context);
    if (!session) {
        return{redirect :{destination: '/', permanent : false}}
    }
    return {props : {session}}
}