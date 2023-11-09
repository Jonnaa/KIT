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
            <form onSubmit={handleSubmit} className="bg-rose-100 w-11/12 max-w-md p-2 mx-auto mt-20 text-lg relative rounded-lg pl-2">
                <div className="flex justify-between">
                    <label htmlFor="title">Title:</label>
                    <input
                        name="title"
                        value={formContent.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br />
                <div className="flex justify-between">
                    <label htmlFor="img">Image Link:</label>
                    <input
                        name="img"
                        value={formContent.img}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br />
                <div className="flex justify-between">
                    <label htmlFor="description">Description:</label>
                    <input 
                        name="description"
                        value={formContent.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br />
                <button type="submit" className="bg-emerald-100 rounded-lg w-20">
                    Upload
                </button>
                {/* <Link to="/" onClick={handleSubmit}>Upload</Link> */}
            </form>
            {uploadStatus}
        </div>
    )
}