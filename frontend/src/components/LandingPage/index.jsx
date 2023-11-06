import PostsGallery from "../PostsGallery"

export default function LandingPage({updateDetails}){
    return(
        <>
            <h1>landing page</h1>
            <PostsGallery updateDetails={updateDetails}/>
        </>
    )
}