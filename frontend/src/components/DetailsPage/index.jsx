import { useState } from "react"
import CommentsGallery from "../CommentsGallery"
import { getPosts, updatePost, deletePost } from "../../../utils/backend"
import { Link } from "react-router-dom"

export default function DetailsPage({post, setPosts, loggedIn}){
    const [editMode, setEditMode]= useState(false)
    const [postData, setPostData] = useState({
        title:post.title,
        img:post.img,
        description:post.description
    })

    // Function to toggle in or out of edit mode
    function toggleEditMode(){
        setEditMode(!editMode)
    }

    function handleInputChange(event){
        setPostData({
            ...postData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        
        updatePost(postData, post._id)
            .then(()=>{setEditMode(false)
                console.log("Successfuly updated post")})
            .catch(err=> console.log(err))
    }

    function handleDelete(){
        deletePost(post._id)
            .then(()=>{
                console.log("Post deleted")
                getPosts()
                    .then(posts=>setPosts(posts))
                    .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
    }
    let insideContent=<></>
    if(loggedIn){
        insideContent=<>
            <button onClick={toggleEditMode}>Edit</button>
            <Link to="/" onClick={handleDelete}>Delete</Link>
        </>
    }
    // Edit mode false
    let postDetails = <div>
        <div className="border-y-4 border-y-black">
            <h2>{postData.title}</h2>
            <img src={postData.img} alt="post image" />
            <p>{postData.description}</p>
            {insideContent}
        </div>
    </div>

    // Edit Mode true
    if(editMode){
        postDetails = <form onSubmit={handleSubmit}>
            <input 
                name="title"
                value={postData.title}
                onChange={handleInputChange}
                required
            />
            <br />
            <input 
                name="img"
                value={postData.img}
                onChange={handleInputChange}
                required
            />
            <br />
            <input 
                name="description"
                value={postData.description}
                onChange={handleInputChange}
                required
            />
            <br />
            <button onClick={toggleEditMode}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    }

    return(
        <>
            {postDetails}
            <CommentsGallery postId={post._id}/>
        </>
    )
}