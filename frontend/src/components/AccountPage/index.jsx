import PostsGallery from "../PostsGallery"
import {getPostsForUser} from "../../../utils/backend"
import { useEffect, useState } from "react"

export default function AccountPage({updateDetails}){
    const [userPosts, setUserPosts]= useState([])
    let name = localStorage.getItem('name')

    useEffect(() => {
        getPostsForUser()
            .then(posts => setUserPosts(posts))
    }, [])

    return(
        <>  
            <h1 className="ml-20 mt-5 font-medium text-md md:text-xl">Hello {name}</h1>
            <div className="max-h-[32rem] overflow-auto w-11/12 mt-5 mx-auto rounded-lg shadow-2xl">
                <h1 className="pl-10 py-5 mb-5 text-md md:text-xl bg-rose-100/75 rounded-t-lg">Posts you have created</h1>
                <PostsGallery updateDetails={updateDetails} posts={userPosts} setPosts={setUserPosts}/>
            </div>
        </>
    )
}