import Home from '../assets/images/home.svg'
import Posts from '../assets/images/Posts.svg'
import CreatePost from '../assets/images/CreatePost.svg'
import People from '../assets/images/People.svg'
import Preference from '../assets/images/Preference.svg'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="fixed bottom-0 my-3 w-full rounded-2xl bg-white py-6">
      <nav>
        <ul className="flex justify-around">
          <li className="">
            <Link href="#">
              <Home/>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Posts />
            </Link>
          </li>
          <li>
            <Link href="#">
              <CreatePost />
            </Link>
          </li>
          <li>
            <Link href="#">
              <People />
            </Link>
          </li>
          <li>
            <Link href="#">
              <Preference />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
