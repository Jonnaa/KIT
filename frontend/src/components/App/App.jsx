import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from '../LandingPage';
import DetailsPage from '../DetailsPage';
import CreatePostPage from '../CreatePostPage';
import SignUpLoginPage from '../SignUpLoginPage';
export default function App() {
  const [detailsContent, setDetailsContent] = useState([])
  // All posts stored in db will go here
  const [posts , setPosts] = useState([])
  return (
    <>
      <div className='flex justify-between px-10 py-2'>
        <Link to="/">KIT</Link>
        <Link to="/create">Create Post</Link>
        <Link to="/auth/signup">Sign Up</Link>
        <Link to="/auth/login">Login</Link>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage updateDetails={setDetailsContent} posts={posts} setPosts={setPosts}/>}/>
        <Route path="/details" element={<DetailsPage post={detailsContent} setPosts={setPosts}/>} />
        <Route path="/create" element={<CreatePostPage setPosts={setPosts}/>} />
        <Route path="/auth/:formType" element={<SignUpLoginPage />} />
      </Routes>
    </>
  )
}


