import PostsGallery from "../PostsGallery"

export default function LandingPage({updateDetails, posts, setPosts, loggedIn}){
    let name = localStorage.getItem('name')
    return(
        <>
            {loggedIn?<h1>Hello {name}</h1>
            :
            <h1>landing page</h1>
            }
            <PostsGallery updateDetails={updateDetails} posts={posts} setPosts={setPosts}/>
        </>
    )
}