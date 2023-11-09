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
    logOut()
    setLoggedIn(false)
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setLoggedIn(true)
    }
  },[])

  return (
    <>
      {loggedIn?  
        <div className='flex justify-between px-10 py-2'>
          <Link to="/" className=''>KIT</Link>
          <Link to="/create">Create Post</Link>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
        :
        <div className='flex justify-between px-10 py-2 text-lg bg-emerald-100 font-medium'>
          <Link to="/" className='text-2xl'>KIT</Link>
          <Link to="/auth/signup">Sign Up</Link>
          <Link to="/auth/login">Login</Link>
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


