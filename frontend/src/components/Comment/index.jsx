import { useState } from "react"
import { updateComment, deleteComment } from "../../../utils/backend"

export default function Comment({data, refreshComments, loggedIn}){
    const [editMode, setEditMode] = useState(false)
    const [editModeData, setEditModeData]= useState({
        name: data.name,
        content: data.content
    })
    function handleInputChange(event) {
        setEditModeData({
            ...editModeData,
            [event.target.name]: event.target.value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        setEditMode(false)
        updateComment(editModeData, data._id)
            .then(() => refreshComments())
            .catch(err=> console.log(err))
    }

    function handleDelete() {
        if(confirm("Are you sure you want to delete this comment?")){
            deleteComment(data._id)
                .then(() => refreshComments())
                .catch(err=> console.log(err))
        }
    }

    // Edit mode false
    let commentDisplay =<div className="border-t-4 border-white p-2 pl-5">
            <h1 className="text-lg md:text-xl">{data.name}</h1>
            <p className="text-md md:text-lg">{data.content}</p>
            {loggedIn?<>
                <button onClick={()=>{setEditMode(true)}} className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg mr-2 shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">Edit</button>
                <button onClick={handleDelete} className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">Delete</button>
                </>
            :<></>
            }
        </div>

    // Edit mode true
    if(editMode){
        commentDisplay = <form onSubmit={handleSubmit} className="border-t-4 border-white p-2 pl-5">
            <input 
                name="name"
                value={editModeData.name}
                onChange={handleInputChange}
                required
                className="border-2 border-black/25 rounded pl-1 mb-2 text-md md:text-lg"
            />
            <br />
            <textarea 
                name="content"
                value={editModeData.content}
                onChange={handleInputChange}
                required
                className="border-2 border-black/25 rounded pl-1 resize text-md md:text-lg"
            />
            <br />
            <button onClick={()=>{setEditMode(false)}} className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg mr-2 shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">Cancel</button>
            <button type="submit" className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">Submit</button>
        </form>
    }

    return(
        // <h1>test</h1>
        <>
            {commentDisplay}
        </>
    )
}