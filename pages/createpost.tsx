import Head from 'next/head';
import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'
import { getSession } from 'next-auth/react';
import Ellipse from '../assets/images/Ellipse.svg'
import LoadingSpinner from '../components/LoadingSpinner'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';


let redirectToHomePage = (router) => {
	return router.push('/home')
  };


const createpost = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [accessToken, setaccessToken] = useState<any>()
	const [refreshToken, setRefreshToken] = useState<any>()
	const [PostContent, setPostContent] = useState<any>();
	
	
    useEffect(() => {
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
        }
    }, []);
	
	let CreateNewPost = async () =>{
		setLoading(true)
		console.log(accessToken)
		let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/post/`, {
			method: "POST",
			headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${accessToken}` },
			body: JSON.stringify({'content' : PostContent}),
		});
		console.log(response)
		redirectToHomePage(router)
	}

	if (accessToken != null) {
		const user = JSON.parse(localStorage.getItem('UserDetails'))
		return (
			<div className="flex justify-center min-h-screen bg-gradient-to-t from-[#FDEBF7] to-[#FFBCD1]">
				<Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
				<Head>
					<meta name='theme-color' content='#FFBCD1' />
				</Head>
				<div className="flex flex-col w-full max-w-md">
				<TopBar displayPic = {true} displayName = {true} backButton = {false} loggedInUserName = {user.first_name + ' ' + user.last_name} userid = {user.id} loggedInUserProfilePic = {`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/`+user.profileImg}/>
					{loading?<LoadingSpinner/>:
						<>
							<div className='flex mx-6'>
								<p className='font-[Sarabun-SemiBold] font-semibold text-[#2F2F2F] text-xl z-0'>Create Post</p>
							</div>
							<div className='mx-6 mt-5 justify-center'>
								<textarea className='shadow-welcome-field-shadowfocus pl-5 pt-8 rounded-xl w-full h-[45vh] max-h-[55vh] focus:outline-none' id="caption" placeholder="write a caption.." onChange={(e)=>setPostContent(e.target.value)} />
								<div className='flex w-full justify-center'>
									<button className=' h-16 w-40 mt-5 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl'>Back</button>  
									<button className=' ml-8 h-16 w-40 mt-5 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl' onClick={CreateNewPost} >Post</button> 
								</div>
							</div>
						</>
					}
					<NavBar page = "CreatePost" />
				</div>
			</div>
		);
	}
	else{
		return null
	}
}

export default createpost;