import { Link } from "react-router-dom"

// Post function receives props which has data and key
export default function Post({data}){
    // Post model only has title, img and desc
    const {title, img, description} = data
    
    return(
        <div className="w-3/4 mx-auto">
            <h1>{title}</h1>
            <img src={img} alt="" />
            <p>{description}</p>
        </div>
    )
}