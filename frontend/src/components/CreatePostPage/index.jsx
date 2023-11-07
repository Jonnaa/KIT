import { useState } from "react"
import { createPost, getPosts } from "../../../utils/backend"
import { Link } from "react-router-dom";

export default function CreatePostPage({setPosts}){
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

    // function handleSubmit(event){
    function handleSubmit(){

        // Don't let page reload
        // event.preventDefault()
        setUploadStatus("Uploading...")
        // Create post then go to post detail
        createPost({...formContent})
            .then((data)=>{
                console.log(data)
                setUploadStatus("Upload successful!")
                getPosts()
                    .then(posts=>setPosts(posts))
            })
        // setFormContent({
        //     title: '',
        //     img: '',
        //     description: ''
        // })
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
                {/* <button type="submit">
                    Upload
                </button> */}
                <Link to="/" onClick={handleSubmit}>Upload</Link>
            </form>
            {uploadStatus}
        </div>
    )
}