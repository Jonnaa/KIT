import PostsGallery from "../PostsGallery"

export default function LandingPage({updateDetails, posts, setPosts, loggedIn}){
    let name = localStorage.getItem('name')
    return(
        <>
            {loggedIn?<h1 className="my-5 pl-4 text-xl font-medium">Hello {name}</h1>
            :
            <h1 className="my-5 pl-4 text-xl font-medium">Latest Posts</h1>
            }
            <PostsGallery updateDetails={updateDetails} posts={posts} setPosts={setPosts}/>
        </>
    )
}