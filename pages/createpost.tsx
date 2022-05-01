import Head from 'next/head';
import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'
import { getSession } from 'next-auth/react';
import Ellipse from '../assets/images/Ellipse.svg'
import { useState } from 'react';

const createpost = ({session}) => {
	const [PostContent, setPostContent] = useState<any>();
	let CreateNewPost = async () =>
	{
			let response= await fetch(`https://dream-pg-backend.herokuapp.com/api/post/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(PostContent),
			}); 
		console.log(response)
		console.log(PostContent)
	}
	if (session) {
		return (
			<div className="flex justify-center min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
				<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
				<Head>
					<meta name='theme-color' content='#FFBCD1' />
				</Head>
				<div className="flex flex-col w-full max-w-md z-50">
					<TopBar loggedInUserName = {session.user.name} loggedInUserProfilePic={session.user.image}/>
					<div className='flex mx-6'>
						<p className='font-[Sarabun-SemiBold] font-semibold text-[#2F2F2F] text-xl'>Create Post</p>			
					</div>
					<div className='mx-6 mt-5 justify-center'>
						<textarea className='shadow-welcome-field-shadowfocus pl-5 pt-8 rounded-xl w-full h-[45vh] max-h-[55vh]' id="caption" placeholder="write a caption.." onChange={(e)=>setPostContent(e.target.value)} />
						<div className='flex w-full justify-center'>
							<button className=' h-16 w-40 mt-5 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl'>Back</button>  
							<button className=' ml-8 h-16 w-40 mt-5 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl' onClick={CreateNewPost} >Post</button> 
						</div>
					</div>
					<NavBar/>
				</div>
			</div>
		);
	}
}

export default createpost;


export async function getServerSideProps (context) {
    const session = await getSession(context);
    if (!session) {
        return{redirect :{destination: '/', permanent : false}}
    }
    return {props : {session}}
}