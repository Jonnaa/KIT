export default function DetailsPage({post}){
    return(
        <div>
            <div className="border-y-4 border-y-black">
                <h2>{post.title}</h2>
                <img src={post.img} alt="post image" />
                <p>{post.description}</p>
            </div>
            <div>
                <h3>comments would go here</h3>
            </div>
        </div>
    )
}