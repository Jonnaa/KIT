import { useEffect, useState } from "react"
import { getComments, createComment } from "../../../utils/backend"
import Comment from "../Comment"

export default function CommentsGallery({postId, loggedIn}){
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
            .catch(err=> console.log(err))
    }

    function handleSubmit(event){
        event.preventDefault()
        setCreateMode(false)
        createComment({...newCommentData, postId:postId})
            .then(()=>refreshComments())
            .catch(err=> console.log(err))
    }

    let commentGallery = [<p key='0'>No one has commented on this post...</p>]

    if(comments.length>0){
        commentGallery = comments.map(comment=>{
            //<Comment key={comment._id} data={comment} refreshComments={refreshComments}/>
            return <Comment key={comment._id} data={comment} refreshComments={refreshComments}/>
        })
    }
    let formButton=<button onClick={toggleCreateComment} className="bg-emerald-100 rounded-lg w-40 mb-2">Create A Comment</button>
    if(createMode){formButton=<button onClick={toggleCreateComment} className="bg-emerald-100 rounded-lg w-20 mb-2">Cancel</button>}
        
    return(
        <div className="w-11/12 max-w-xl mx-auto bg-rose-100 mt-5 p-5 rounded-lg">
            <h1 className="text-lg pb-2">Comments</h1>
            {loggedIn?
                <>{formButton}</>
                :<></>
            }
            {createMode && <form onSubmit={handleSubmit} className="bg-violet-300/50 rounded-lg p-2">
                <input 
                name="name"
                value={newCommentData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                className="rounded-lg pl-2 mb-2 border-2 border-black/25"
                />
                <br />
                <textarea 
                    name="content"
                    value={newCommentData.content}
                    onChange={handleInputChange}
                    placeholder="Comment goes here"
                    required
                    className="rounded-lg pl-2 border-2 border-black/25 resize"
                />
                <br />
                <button type="submit" className="bg-emerald-100 rounded-lg w-20 mb-2">Submit</button>
            </form>}

            {commentGallery}
        </div>
    )
}