import { Link } from "react-router-dom"

// Post function receives props which has data and key
export default function Post({data, updateDetails}){
    // Post model only has title, img and desc
    const {title, img} = data
    
    
    return(
        <div className="w-96 max-h-96 mx-auto mb-5 px-5">
            <Link 
                to="/details" 
                onClick={() => { updateDetails(data)}}
            >
                <div className="bg-rose-100 w-96 font-medium relative flex flex-col rounded-lg ">
                    <h1 className="absolute top-0 text-white text-xl w-full bg-gray-200/25 pl-2 py-0 tracking-wide rounded-t-lg">{title}</h1>
                    <img src={img} alt="" className="rounded-lg"/>
                </div>
            </Link>
        </div>
    )
}