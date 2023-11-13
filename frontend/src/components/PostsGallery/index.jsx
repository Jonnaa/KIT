import { useState, useEffect } from "react"
import {getPosts} from "../../../utils/backend"
import Post from "../Post"

export default function PostsGallery({updateDetails, posts, setPosts}){
    // All posts stored in db will go here
    // const [posts , setPosts] = useState([])

    // // Get all posts stored in db
    // useEffect(() => {
    //     getPosts()
    //         .then(posts => setPosts(posts))
    // }, [])

    let content = <p>Your posts are loading...</p>

    if (posts.length > 0){
        content = posts.map(post=>{
            return <Post key={post._id} data={post} updateDetails={updateDetails}/>
        })
    }
    return(
        <div className="flex flex-wrap gap-5">
            {content}
        </div>
        
    )
}