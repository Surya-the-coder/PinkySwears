import Head from "next/head";
import NavBar from "../components/NavBar";
import Ellipse from '../assets/images/Ellipse.svg'
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GoogleLogout } from "react-google-login";
import Link from "next/link";
import Image from 'next/image'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {isAccessTokenValid, profilePicLoader} from '../components/CommonFunctions'
import Compressor from 'compressorjs';
import ConfirmDialog from "../components/ConfirmDialog";

let signOut = (router) => {
    console.log("================Inside SignOut================")
    localStorage.clear()
    sessionStorage.clear()
    router.push('/')
}

const preference = () => {
    const router = useRouter()

    const [accessToken, setAccessToken] = useState<any>()
    const [refreshToken, setRefreshToken] = useState<any>()
    const [profilePic, setProfilePic] = useState<any>()
    const [profilePicUpdated, setProfilePicUpdated] = useState(false)
    const [profilePicDeleted, setProfilePicDeleted] = useState(false)

    const [userProfileImage, setUserProfileImage] = useState<any>('/media/userDefault.jpg')

    const inputFileRef = useRef( null );
    const[showUpdateMsg,setShowUpdateMsg]=useState(false)
    const [showProfilePicMsg, setShowProfilePicMsg] = useState(false)
    const [compressedFile, setCompressedFile] = useState<any>()
    const [avoidLoop, setAvoidLoop] = useState(true)

    useEffect(() => {
        console.log('=========================PREF LOG================================')
        let accessTokenLS = localStorage.getItem('access_token')
        let refreshTokenLS = localStorage.getItem('refresh_token')
        let accessTokenValid = false
        
        if (accessTokenLS == null) {
            console.log('No Access Token')
            router.push('/')
        }
        else{
            let userLS = JSON.parse(localStorage.getItem('UserDetails'))
            setAccessToken(accessTokenLS)
            setRefreshToken(refreshTokenLS)
            if(isAccessTokenValid(accessTokenLS, refreshTokenLS)){
                accessTokenValid = true
                setAccessToken(localStorage.getItem('access_token'))
                accessTokenLS = localStorage.getItem('access_token')
            }
            if (accessTokenValid) {
                getUserInfo(accessTokenLS)
            }
            else{
                router.push('/')
            }

            
            console.log(userLS)
        }
        console.log('=========================END EFFECT================================')
    }, [])

    let getUserInfo = async (accessToken) => {
		console.log("******getuserinfo*****")
		console.log(accessToken)
        
		let getuserInfoUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/info/`
		let response = await fetch(getuserInfoUrl, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+accessToken,
			},
		})
        let updatedUserData = await response.json();
        console.log(updatedUserData)
        localStorage.setItem('UserDetails', JSON.stringify(updatedUserData))
        const user = JSON.parse(localStorage.getItem('UserDetails'))
        setUserProfileImage(user.profileImg!==null?user.profileImg:'/media/userDefault.jpg')
    }

	let editUserDetails = async (formUserDetails,from_pic) => {

        console.log('=============================SAVE=============================')
        console.log(formUserDetails.first_name)
        console.log(formUserDetails.last_name)
        console.log(formUserDetails.gender)
        console.log(formUserDetails.culture)
        console.log(formUserDetails.years_in_relationShip)
        
        let fd = new FormData()
        fd.append('first_name', formUserDetails.first_name)
        fd.append('last_name', formUserDetails.last_name)
        fd.append('gender', formUserDetails.gender)
        fd.append('culture', formUserDetails.culture)
        fd.append('years_in_relationShip', formUserDetails.years_in_relationShip)
            if (profilePicUpdated) {
                fd.append('profileImg', profilePic)
            } else {
                if (profilePicDeleted)
                    fd.append('profileImg', 'deleted')
            }
            console.log(fd)
            let editUserDetailsUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/edit/`
            let response = await fetch(editUserDetailsUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: fd,
            })
            console.log(accessToken)
            console.log(response)
            if(response.status==200)
            {
                if (from_pic) {
                    setShowProfilePicMsg(true)
                    await timeout(2000);

                    // router.reload()
                }
                else {
                    setShowUpdateMsg(true)
                    await timeout(2000);
                }

            }
            console.log(await response.json())

            getUserInfo(accessToken)
	}

    function timeout(delay: number) {
		return new Promise( res => setTimeout(res, delay) );
	}

    let updateProfilePic = (e) => {
        new Compressor(e.target.files[0], {      
            quality: 0.8,
            success: (compressedResult) => {
                let compressedResultFile = new File([compressedResult], e.target.files[0].name);
              setProfilePic(compressedResultFile)
                setProfilePicUpdated(true)
            },
        });
    }

    useEffect(() => {
        if(profilePicUpdated || profilePicDeleted) {
            console.log('Profile Pic event-----------------------')
            const user = JSON.parse(localStorage.getItem('UserDetails'))
            editUserDetails(user,true).then(() => {
                setProfilePicUpdated(false)
                setProfilePicDeleted(false)
                setShowProfilePicMsg(false)
                setShowUpdateMsg(false)
            })
        }
    } , [profilePicUpdated,profilePicDeleted])

    let logout = () => {
        signOut(router)
    }

    if (accessToken != null) {
        const user = JSON.parse(localStorage.getItem('UserDetails'))
        return (
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-t from-[rgb(253,235,247)] to-[#FFBCD1]">
			    <Ellipse className="fixed top-0 left-0 z-0 md:hidden"/>
			    <Head>
			    	<meta name='theme-color' content='#FFBCD1' />
			    </Head>
                {/*{console.log(process.env.NEXT_PUBLIC_BACKEND_BASE_URL+user.profileImg)}*/}
			    <div className="flex flex-col w-full max-w-md z-50">
                    <div className='flex flex-col items-center w-full max-w-md pb-5 h-[91vh] overflow-y-auto px-2 '>
                        <div className='pt-2 flex justify-center items-center'>
                            <input type="file" name="profilePic" id="profilePic" className="hidden" ref={inputFileRef} onChange={(e) => {updateProfilePic(e)}}/>
                            <div className={'flex flex-col'}>
                            <button className="rounded-full w-16 h-16" onClick={() => inputFileRef.current.click()}>
                                <Image loader={profilePicLoader} src={userProfileImage} width={64} height={64} className = "rounded-full w-16 h-16"></Image>
                            </button>
                                <button
                                    onClick={()=>{setProfilePicDeleted(true);setUserProfileImage('/media/userDefault.jpg')}}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <h4 className='mx-4 text-[#A268AC] font-[Sarabun-SemiBold] font-semibold mt-2'>Username</h4>
                                <h4 className='mx-4 text-[#6E6E6E] font-[Sarabun-SemiBold] font-semibold '>{user.username}</h4>
                            </div>
			            </div>
                        {/* <AccountDetailsTopBar profileImg = {`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/`+user.profileImg} username = {user.username}/> */}
			            <form autoComplete='on' className='flex flex-col justify-center w-full' action='' method="POST">
                            <label className="mt-3 mx-7 text-[#6e6e6e] text-sm font-semibold">First Name</label>
			            	<input
                                className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-1  rounded-2xl border h-[56px] mx-3 font-[Sarabun-SemiBold] text-base font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:text-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]"
                                type="text"
                                name="firstname"
                                id="firstname"
                                defaultValue={user.first_name}
                                placeholder="First Name"
                                autoComplete='on'
                                onChange={(e) => {user.first_name=e.target.value}}
                            />
                            <label className="mt-3 mx-7 text-[#6e6e6e] text-sm font-semibold">Last Name</label>
			            	<input
                                className=" text-[#B9B9B9] focus-welcome-field-shadowfocus pl-6 mt-1  rounded-2xl border h-[56px] mx-3 font-[Sarabun-SemiBold] text-base font-semibold shadow-welcome-field-shadowbefore focus:border-2 focus:border-[#FFBCD1] focus:text-[#FFBCD1] focus:outline-none focus:placeholder:text-[#FFBCD1]"
                                type="text"
                                name="lastname"
                                id="lastname"
                                defaultValue={user.last_name}
                                placeholder="Last Name"
                                autoComplete='on'
                                onChange={(e) => {user.last_name=e.target.value}}
                            />
			            	
                            <div className='mx-2 mt-3 flex justify-between'>
                                <div className="mx-1">
                                    <label className="mt-3 mx-5 text-[#6e6e6e] text-sm font-semibold">Gender</label>
			            		    <select
                                        className='mt-1 pl-6 text-[#FF848E] bg-white rounded-2xl border font-[Sarabun-SemiBold] text-base font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] w-full h-[56px]'
                                        name="gender"
                                        id="gender"
                                        defaultValue={user.gender}
                                        onChange={(e) => {user.gender=e.target.value}}
                                    >
                          		    	<option value="Female">Female</option>
                          		    	<option value="Male">Male</option>
          	            		    </select>
                                </div>
                                <div className="mx-1">
                                    <label className="mt-3 mx-5 text-[#6e6e6e] text-sm font-semibold">Culture</label>
			            		    <select
                                        className='mt-1 pl-6 text-[#FF848E] bg-white rounded-2xl border font-[Sarabun-SemiBold] text-base font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] w-full h-[56px]'
                                        name="culture"
                                        id="culture"
                                        defaultValue={user.culture}
                                        onChange={(e) => {user.culture=e.target.value}}
                                    >
                          		    	{/* <option value={user.culture} disabled hidden>{user.culture}</option> */}
                          		    	<option value="South Indian">South Indian</option>
                          		    	<option value="North Indian">North Indian</option>
                          		    	<option value="East Indian">East Indian</option>
                          		    	<option value="Others">Others</option>
          	            		    </select>
                                </div>
			            	</div>
			            	
                            <label className="mt-3 mx-7 text-[#6e6e6e] text-sm font-semibold">Years in Relationship</label>
                            <select
                                className='pl-6 mx-3 mt-1 text-[#FF848E] bg-white rounded-2xl border font-[Sarabun-SemiBold] text-base font-semibold shadow-welcome-field-shadowbefore focus:border-2 border-[#FFBCD1] focus:outline-none select-text:font-[Sarabun-SemiBold] h-[56px] '
                                name="rel"
                                id="rel"
                                placeholder='rel'
                                defaultValue={user.years_in_relationShip}
                                onChange={(e) => {user.years_in_relationShip=e.target.value}}
                            >
			            		{/* <option value={user.years_in_relationShip} disabled hidden>{user.years_in_relationShip}</option> */}
                          		<option value="1">1</option>
                          		<option value="2">2</option>
                          		<option value="3">3</option>
                          		<option value="4">4</option>
          	            	</select>
			            	
                            <div className=' w-full flex justify-center'>
			            		<Link href="/changepassword">
			            			<button
                                        className='mx-3 mt-3 text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-full w-full h-[53px] cursor-pointer'
                                    >
                                        Click here to change password
                                    </button>
			            		</Link>
			            	</div>
			            	
                            <div className='flex mt-3 mb-6 mx-3 justify-between'>
                                <div className="flex justify-center">
                                    <GoogleLogout clientId={process.env.NEXT_PUBLIC_GOOGLE_ID} onLogoutSuccess={logout} render={ renderProps => (<button type="button" className="h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#C1C1C1] rounded-3xl cursor-pointer" onClick={renderProps.onClick} disabled = {renderProps.disabled}> Sign Out </button>)}/>
                                </div>
			            		<button
                                    type="button"
                                    className='ml-2 h-[53px] w-[160px] text-white shadow-button-shadow font-[Sarabun-Regular] font-normal -tracking-tighter bg-[#F67A95] rounded-3xl'
                                    onClick={() => editUserDetails(user,false)}>
                                    Save
                                </button>
			            	</div>
                            <Popup open={showUpdateMsg}>
								<div className='flex w-full h-[50px] rounded-3xl text-[#FF848E] text-center font-[Sarabun-SemiBold] font-semibold' >User Details Updated Successfully!</div>
							</Popup>
                            <Popup open={showProfilePicMsg}>
                                <div className='flex w-full h-[50px] rounded-3xl text-[#FF848E] text-center font-[Sarabun-SemiBold] font-semibold' >Profile Picture Updated!</div>
                            </Popup>
			            </form>
			        </div>
			        <NavBar page = "Preference"/>

			    </div>
		    </div>
        );
    }
    else{
        return null
    }
}

export default preference;