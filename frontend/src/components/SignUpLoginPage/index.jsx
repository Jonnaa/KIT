import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../../utils/backend"


export default function SignUpLoginPage({setLoggedIn}){
    const navigate = useNavigate();
    const { formType } = useParams()
    const [userData, setUserData] = useState({
        username:'',
        name:'',
        email:'',
        password:'',
    })
    let authAction ='Log In'
    if(formType!== 'login'){
        authAction='Sign Up'
    }
    const handleInputChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    async function handleSubmit(event){
        event.preventDefault()
        if(formType ==='login'){
            const data = await logIn(userData)
            const {token} = data
            localStorage.setItem('userToken', token)
            setLoggedIn(true)
            
        }else{
            const data = await signUp(userData)
            const {token} = data
            if(token){
                localStorage.setItem('userToken', token)
                setLoggedIn(true)
            }
            else{
                alert(data.data)
            }
        }
        navigate('/')
    }
    let signUpEmail = <></>
    if(formType!=='login'){
        signUpEmail=<>
            <div className="flex justify-between">
                <label htmlFor="name">First Name</label>
                <input
                    name="name"
                    type="name"
                    required
                    placeholder="first name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-7/12 rounded-lg pl-2 border-2 border-black/25"
                />
            </div>
            <br />
            <div className="flex justify-between">
                <label htmlFor="email">E-mail</label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-7/12 rounded-lg pl-2 border-2 border-black/25"
                />
            </div>
            <br />
        </>
    }
    return(
        <>
            <form onSubmit={handleSubmit} className="bg-rose-100 w-11/12 max-w-md p-2 mx-auto mt-20 text-lg relative rounded-lg pl-2">
                <div className="flex justify-between">
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        minLength="6"
                        required
                        placeholder="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="w-7/12 rounded-lg pl-2 border-2 border-black/25"
                    />
                </div>
                <br />
                {signUpEmail}   
                <div className="flex justify-between">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        minLength="6"
                        required
                        placeholder="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className="w-7/12 rounded-lg pl-2 border-2 border-black/25"
                    />
                </div>
                <br />
                <button type="submit" className="bg-emerald-100 rounded-lg w-20 text-md md:text-lg shadow-lg hover:shadow-violet-300 hover:bg-emerald-300">
                    {authAction}
                </button>
            </form>
        </>
    )
}