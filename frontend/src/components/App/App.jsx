import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from '../LandingPage';
import DetailsPage from '../DetailsPage';
import CreatePostPage from '../CreatePostPage';
import SignUpLoginPage from '../SignUpLoginPage';
import { logOut } from "../../../utils/backend"

export default function App() {
  const [detailsContent, setDetailsContent] = useState([])
  // All posts stored in db will go here
  const [posts , setPosts] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  function handleLogout(){
    if(confirm("Are you sure you want to logout?"))
    {
      logOut()
      setLoggedIn(false)
    }
    
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setLoggedIn(true)
    }
  },[])

  return (
    <>
      {loggedIn?  
        <div className='flex justify-between px-10 py-2 text-lg bg-emerald-100 font-medium drop-shadow-lg items-center'>
          <Link to="/" className='text-2xl md:text-3xl xl:text-4xl text-violet-600 hover:text-rose-500'>KIT</Link>
          <div>
            <Link to="/create" className='text-md md:text-xl hover:text-rose-500 mr-6'>Create Post</Link>
            <Link to="/" onClick={handleLogout} className='text-md md:text-xl hover:text-rose-500'>Logout</Link>
          </div>
        </div>
        :
        <div className='flex justify-between px-10 py-2 text-lg bg-emerald-100 font-medium drop-shadow-lg items-center'>
          <Link to="/" className='text-2xl md:text-3xl xl:text-4xl text-violet-600 hover:text-rose-500'>KIT</Link>
          <div>
            <Link to="/auth/signup" className='text-md md:text-xl hover:text-rose-500 mr-6'>Sign Up</Link>
            <Link to="/auth/login" className='text-md md:text-xl hover:text-rose-500'>Login</Link>
          </div>
          
        </div>
      }

      <Routes>
        <Route path="/" element={<LandingPage updateDetails={setDetailsContent} posts={posts} setPosts={setPosts} loggedIn={loggedIn}/>}/>
        <Route path="/details" element={<DetailsPage post={detailsContent} setPosts={setPosts} loggedIn={loggedIn}/>} />
        <Route path="/create" element={<CreatePostPage setPosts={setPosts}/>} />
        <Route path="/auth/:formType" element={<SignUpLoginPage setLoggedIn={setLoggedIn}/>} />
      </Routes>
    </>
  )
}


