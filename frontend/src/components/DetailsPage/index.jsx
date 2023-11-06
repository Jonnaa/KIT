import CommentsGallery from "../CommentsGallery"

export default function DetailsPage({post}){
    return(
        <div>
            <div className="border-y-4 border-y-black">
                <h2>{post.title}</h2>
                <img src={post.img} alt="post image" />
                <p>{post.description}</p>
            </div>
            <CommentsGallery id={post._id}/>
        </div>
    )
}