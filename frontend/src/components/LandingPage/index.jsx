import PostsGallery from "../PostsGallery"

export default function LandingPage({updateDetails, posts, setPosts}){
    return(
        <>
            <h1>landing page</h1>
            <PostsGallery updateDetails={updateDetails} posts={posts} setPosts={setPosts}/>
        </>
    )
}