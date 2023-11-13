import { Link } from "react-router-dom"

// Post function receives props which has data and key
export default function Post({data, updateDetails}){
    // Post model only has title, img and desc
    const {title, img} = data
    
    return(
        <div className="w-72 sm:w-96 mx-auto mb-5">
            <Link 
                to="/details" 
                onClick={() => { updateDetails(data)}}
            >
                <div className="bg-rose-100 w-full font-medium relative flex flex-col rounded-lg shadow-xl hover:shadow-emerald-100">
                    <h1 className="absolute top-0 text-xl w-full bg-emerald-300/75 pl-2 py-0 tracking-wide rounded-t-lg">{title}</h1>
                    <img src={img} alt="" className="rounded-lg"/>
                </div>
            </Link>
        </div>
    )
}