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
        navigate("/")
    }
    let insideContent=<></>
    if(loggedIn){
        insideContent=<>
            <button onClick={toggleEditMode} className="bg-emerald-100 rounded-lg w-20 text-sm sm:text-md md:text-lg mr-2">Edit</button>
            <button onClick={handleDelete} className="bg-emerald-100 rounded-lg w-20 text-sm sm:text-md md:text-lg">Delete</button>
            {/* <Link to="/" onClick={handleDelete} className="bg-emerald-100 rounded-lg w-20">Delete</Link> */}
        </>
    }
    // Edit mode false
    let postDetails = <div className="mt-10 text-center w-11/12 mx-auto">
        <img src={postData.img} alt="post image" className="w-96 max-w-40 mx-auto"/>
        <h2 className="font-medium text-md sm:text-lg md:text-xl">{postData.title}</h2>
        <p className="text-sm sm:text-md md:text-lg">{postData.description}</p>
        {insideContent}
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
            <CommentsGallery postId={post._id} loggedIn={loggedIn}/>
        </>
    )
}