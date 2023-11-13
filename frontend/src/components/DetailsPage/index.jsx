import { useState } from "react"
import CommentsGallery from "../CommentsGallery"
import { getPosts, updatePost, deletePost } from "../../../utils/backend"
import { Link, useNavigate } from "react-router-dom"
export default function DetailsPage({post, setPosts, loggedIn}){
    const navigate = useNavigate();
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
            .then(()=>setEditMode(false))
            .catch(err=> console.log(err))
    }

    function handleDelete(){
        if(confirm("Are you sure you want to delete this post?")){
            deletePost(post._id)
            .then(()=>{
                getPosts()
                    .then(posts=>setPosts(posts))
                    .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        }
        
        navigate("/")
    }
    let insideContent=<></>
    if(loggedIn){
        insideContent=<div className="bg-rose-100 rounded-b-lg pb-2 max-w-lg mx-auto">
            <button onClick={toggleEditMode} className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg mr-2 shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">Edit</button>
            <button onClick={handleDelete} className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">Delete</button>
        </div>
    }
    // Edit mode false
    let postDetails = <div className="mt-5 text-center w-11/12 mx-auto">
        <img src={postData.img} alt="post image" className="w-full max-w-md active:max-w-3xl mx-auto mb-5 rounded-lg shadow-xl hover:shadow-emerald-100"/>
        <h2 className="font-medium text-lg md:text-xl bg-rose-100/50 rounded-t-lg pt-2 max-w-lg mx-auto ">{postData.title}</h2>
        <p className="text-md md:text-lg bg-rose-100 py-2 max-w-lg mx-auto">{postData.description}</p>
        {insideContent}
    </div>

    // Edit Mode true
    if(editMode){
        postDetails = <form onSubmit={handleSubmit} className="mt-5 text-center bg-rose-100 w-11/12 max-w-lg mx-auto rounded-lg p-5">
            <input 
                name="title"
                value={postData.title}
                onChange={handleInputChange}
                required
                className="w-11/12 max-w-sm rounded-lg pl-2 mb-2 border-2 border-black/25 text-md md:text-lg"
            />
            <br />
            <input 
                name="img"
                value={postData.img}
                onChange={handleInputChange}
                required
                className="w-11/12 max-w-sm rounded-lg pl-2 mb-2 border-2 border-black/25 text-md md:text-lg"
            />
            <br />
            <input 
                name="description"
                value={postData.description}
                onChange={handleInputChange}
                required
                className="w-11/12 max-w-sm rounded-lg pl-2 mb-2 border-2 border-black/25 text-md md:text-lg"
            />
            <br />
            <button onClick={toggleEditMode} className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg mr-2 shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">Cancel</button>
            <button type="submit" className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">Submit</button>
        </form>
    }

    return(
        <>
            {postDetails}
            <CommentsGallery postId={post._id} loggedIn={loggedIn}/>
        </>
    )
}