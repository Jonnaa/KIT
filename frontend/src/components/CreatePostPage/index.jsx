import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createPost, getPosts } from "../../../utils/backend"

export default function CreatePostPage({setPosts}){
    const navigate = useNavigate();
    const [formContent, setFormContent] = useState({
        title: '',
        img: '',
        description: ''
    })

    const [uploadStatus, setUploadStatus] = useState("")

    function handleInputChange(event) {
        setFormContent({
            ...formContent,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event){
    // function handleSubmit(){

        // Don't let page reload
        event.preventDefault()
        setUploadStatus("Uploading...")
        console.log("Uploading...")
        // Create post then go to post detail
        createPost({...formContent})
            .then(()=>{
                setUploadStatus("Upload successful!")
                console.log("Upload successful!")
                // getPosts()
                //     .then(posts=>setPosts(posts))
                //     .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        setFormContent({
            title: '',
            img: '',
            description: ''
        })
        navigate("/")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    name="title"
                    value={formContent.title}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <label htmlFor="img">Image Link:</label>
                <input
                    name="img"
                    value={formContent.img}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <label htmlFor="description">Description:</label>
                <input 
                    name="description"
                    value={formContent.description}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <button type="submit">
                    Upload
                </button>
                {/* <Link to="/" onClick={handleSubmit}>Upload</Link> */}
            </form>
            {uploadStatus}
        </div>
    )
}