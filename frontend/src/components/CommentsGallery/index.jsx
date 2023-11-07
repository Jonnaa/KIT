import { useEffect, useState } from "react"
import { getComments, createComment } from "../../../utils/backend"
import Comment from "../Comment"

export default function CommentsGallery({postId}){
    const [comments, setComments] = useState([])
    const [createMode, setCreateMode]= useState(false)
    const [newCommentData, setNewCommentData] = useState({
        name:'',
        content:''
    })

    useEffect(() => {
        getComments(postId)
            .then(comments => setComments(comments))
    }, [])

    function handleInputChange(event) {
        setNewCommentData({
            ...newCommentData,
            [event.target.name]: event.target.value
        })
    }

    function toggleCreateComment(){
        setCreateMode(!createMode)
    }

    function refreshComments() {
        getComments(postId)
            .then(refreshCommentData => setComments(refreshCommentData))
    }

    function handleSubmit(event){
        event.preventDefault()
        setCreateMode(false)
        console.log(newCommentData)
        createComment({...newCommentData, postId:postId})
            .then(()=>refreshComments())
    }

    let commentGallery = <p>No one has commented on this post...</p>

    if(comments>0){
        commentGallery = comments.map(comment=>{
            return <Comment key={comment._id} data={comment} refreshComments={refreshComments}/>
        })
    }
    let formButton='Add a Comment'
    if(createMode)
        formButton= 'Cancel'
    return(
        <div>
            <h1>Comments</h1>
            <button onClick={toggleCreateComment}>{formButton}</button>
            {createMode && <form onSubmit={handleSubmit}>
                <input 
                name="name"
                value={newCommentData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                />
                <br />
                <textarea 
                    name="content"
                    value={newCommentData.content}
                    onChange={handleInputChange}
                    placeholder="Comment goes here"
                    required
                />
                <br />
                <button type="submit">Submit</button>
            </form>}

            {commentGallery}
        </div>
    )
}