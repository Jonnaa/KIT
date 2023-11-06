import { useEffect, useState } from "react"
import { getComments, createComment } from "../../../utils/backend"

export default function CommentsGallery({id}){
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(id)
            .then(comments => setComments(comments))
    }, [])

    let commentGallery = <p>No one has commented on this post...</p>

    if(comments>0){
        commentGallery = comments.map(comment=>{
            return <p></p>
        })
    }
    return(
        <div>
            {commentGallery}
        </div>
    )
}