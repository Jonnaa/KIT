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
        // Don't let page reload
        event.preventDefault()
        setUploadStatus("Uploading...")
        // Create post then go to post detail
        createPost({...formContent})
            .then(()=>{
                setUploadStatus("Upload successful!")
                navigate("/")
            })
            .catch(err=>console.log(err))
        setFormContent({
            title: '',
            img: '',
            description: ''
        })  
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className="bg-rose-100 w-11/12 max-w-md p-2 mx-auto mt-20 text-lg relative rounded-lg pl-2">
                <div className="flex flex-col sm:flex-row justify-between">
                    <label htmlFor="title">Title:</label>
                    <input
                        name="title"
                        value={formContent.title}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-black/25 rounded pl-1"
                        placeholder="title"
                    />
                </div>
                <br />
                <div className="flex flex-col sm:flex-row justify-between">
                    <label htmlFor="img">Image Link:</label>
                    <input
                        name="img"
                        value={formContent.img}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-black/25 rounded pl-1"
                        placeholder="url"
                    />
                </div>
                <br />
                <div className="flex flex-col sm:flex-row justify-between">
                    <label htmlFor="description" className="">Description:</label>
                    <input 
                        name="description"
                        value={formContent.description}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-black/25 rounded pl-1"
                        placeholder="description"
                    />
                </div>
                <br />
                <button type="submit" className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">
                    Upload
                </button>
            </form>
            <div className="text-lg md:text-xl">
                {uploadStatus}
            </div>
        </div>
    )
}