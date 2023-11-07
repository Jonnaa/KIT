import { useState } from "react"
import { updateComment, deleteComment } from "../../../utils/backend"

export default function Comment({data, refreshComments}){
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
    }

    function handleDelete() {
        deleteComment(data._id)
            .then(() => refreshComments())
    }

    // Edit mode false
    let commentDisplay =<div>
            <p>{data.name}</p>
            <p>{data.content}</p>
            <button onClick={()=>{setEditMode(true)}}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>

    // Edit mode true
    if(editMode){
        commentDisplay = <form onSubmit={handleSubmit}>
            <input 
                name="name"
                value={editModeData.name}
                onChange={handleInputChange}
                required
            />
            <br />
            <textarea 
                name="content"
                value={editModeData.content}
                onChange={handleInputChange}
                required
            />
            <br />
            <button onClick={()=>{setEditMode(false)}}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    }

    return(
        {commentDisplay}
    )
}