import { useEffect, useState } from "react"
import { getComments, createComment } from "../../../utils/backend"
import Comment from "../Comment"

export default function CommentsGallery({id}){
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(id)
            .then(comments => setComments(comments))
    }, [])

    function refreshComments() {
        getComments(id)
            .then(newCommentData => setComments(newCommentData))
    }

    let commentGallery = <p>No one has commented on this post...</p>

    if(comments>0){
        commentGallery = comments.map(comment=>{
            return <Comment key={comment._id} data={comment} refreshComments={refreshComments}/>
        })
    }


    return(
        <div>
            {commentGallery}
        </div>
    )
}