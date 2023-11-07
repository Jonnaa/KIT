import { useState } from "react"
import { updateComment, deleteComment } from "../../../utils/backend"

export default function Comment({data, refreshComments}){
    const [editMode, setEditMode] = useState(false)
    const [editModeData, setEditModeData]= useState({
        title: data.title,
        img: data.img,
        description: data.description
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
            <p>{data.title}</p>
            <img src={data.img} alt="" />
            <p>{data.description}</p>
            <button onClick={()=>{setEditMode(true)}}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>

    // Edit mode true
    if(editMode){
        commentDisplay = <form onSubmit={handleSubmit}>
            <input 
                name="title"
                value={editModeData.title}
                onChange={handleInputChange}
                required
            />
            <br />
            <input 
                name="img"
                value={editModeData.img}
                onChange={handleInputChange}
                required
            />
            <br />
            <input 
                name="description"
                value={editModeData.description}
                onChange={handleInputChange}
                required
            />
            <button onClick={()=>{setEditMode(false)}}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    }

    return(
        {commentDisplay}
    )
}