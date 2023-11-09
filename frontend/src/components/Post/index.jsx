import { Link } from "react-router-dom"

// Post function receives props which has data and key
export default function Post({data, updateDetails}){
    // Post model only has title, img and desc
    const {title, img} = data
    
    
    return(
        <div className="w-full sm:w-1/2 max-w-md max-h-96 mx-auto mb-5 px-5">
            <Link 
                to="/details" 
                onClick={() => { updateDetails(data)}}
            >
                <div className="bg-rose-100 font-medium relative flex flex-col rounded-lg">
                    <h1>{title}</h1>
                    <img src={img} alt="" className="object-scale-down h-80 w-full rounded-lg"/>
                </div>
            </Link>
        </div>
    )
}