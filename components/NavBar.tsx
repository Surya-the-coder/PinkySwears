import Link from 'next/link'
import React, { useRef, useState } from 'react'

import HomeLight from '../assets/images/Home.svg'
import HomePink from '../assets/images/HomePink.svg'

import PostsLight from '../assets/images/Feed.svg'
import PostsPink from '../assets/images/FeedPink.svg'

import CreatePostLight from '../assets/images/CreatePost.svg'
import CreatePostPink from '../assets/images/CreatePostPink.svg'

import PeopleLight from '../assets/images/Activity.svg'
import PeoplePink from '../assets/images/ActivityPink.svg'

import PreferenceLight from '../assets/images/Preference.svg'
import PreferencePink from '../assets/images/PreferencePink.svg'

import UnderLine from '../assets/images/Underline.svg'

const NavBar = (props) => {
	
	const ref = useRef();

	return (
		<div className="fixed bottom-0 my-3 w-full max-w-md rounded-2xl bg-white py-6 shadow-navbar z-[100]">
			<nav>
				<ul className="flex justify-around">
					<li className="">
						  <Link href="/home">
						  	{props.page=="Home"?<div className='flex flex-col justify-center items-center'><HomePink refs={ref} className = 'cursor-pointer'/><UnderLine className="mt-2"/></div>:<div className='flex flex-col justify-center items-center'><HomeLight refs={ref} className = 'cursor-pointer'/></div>}
						  </Link>
					</li>
					<li>
						<Link href="/feed">
							{props.page=="Feed"?<div className='flex flex-col justify-center items-center'><PostsPink refs={ref}  className = 'cursor-pointer'/><UnderLine className="mt-2"/></div>:<div className='flex flex-col justify-center items-center'><PostsLight refs={ref}  className = 'cursor-pointer'/></div>}
						</Link>
					</li>
					<li>
						<Link href="/createpost">
						  {props.page=="CreatePost"?<div className='flex flex-col justify-center items-center'><CreatePostPink refs={ref} className = 'cursor-pointer'/><UnderLine className="mt-2"/></div>:<div className='flex flex-col justify-center items-center'><CreatePostLight refs={ref} className = 'cursor-pointer'/></div>}
						</Link>
					</li>
					<li>
						<Link href="/userinterest">
							{props.page=="Activity"?<div className='flex flex-col justify-center items-center'><PeoplePink refs={ref} className = 'cursor-pointer'/><UnderLine className="mt-2"/></div>:<div className='flex flex-col justify-center items-center'><PeopleLight refs={ref} className = 'cursor-pointer'/></div>}
						</Link>
					</li>
					<li>
						<Link href="/preference">
							{props.page=="Preference"?<div className='flex flex-col justify-center items-center'><PreferencePink refs={ref} className = 'cursor-pointer'/><UnderLine className="mt-2"/></div>:<div className='flex flex-col justify-center items-center'><PreferenceLight refs={ref} className = 'cursor-pointer'/></div>}
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default NavBar
