import Home from '../assets/images/home.svg'
import Posts from '../assets/images/Posts.svg'
import CreatePost from '../assets/images/CreatePost.svg'
import People from '../assets/images/People.svg'
import Preference from '../assets/images/Preference.svg'
import Link from 'next/link'
import React, { useRef } from 'react'

const NavBar = () => {
  const ref = useRef();
  return (
    <div className="fixed bottom-0 my-3 w-full max-w-md rounded-2xl bg-white py-6 shadow-navbar z-[100]">
      <nav>
        <ul className="flex justify-around">
          <li className="">
            <Link href="/home">
              <Home refs={ref}/>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Posts refs={ref} />
            </Link>
          </li>
          <li>
            <Link href="/createpost">
              <CreatePost refs={ref}/>
            </Link>
          </li>
          <li>
            <Link href="#">
              <People refs={ref}/>
            </Link>
          </li>
          <li>
            <Link href="/preference">
              <Preference refs={ref}/>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
