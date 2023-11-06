import { Link } from "react-router-dom"

// Post function receives props which has data and key
export default function Post({data, updateDetails}){
    // Post model only has title, img and desc
    const {title, img} = data
    
    
    return(
        <div className="w-1/3 mx-auto">
            <Link 
                to="/details" 
                onClick={() => { updateDetails(data)}}
            >
                <h1>{title}</h1>
                <img src={img} alt="" />
            </Link>
        </div>
    )
}