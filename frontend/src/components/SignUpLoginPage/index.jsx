import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../../utils/backend"


export default function SignUpLoginPage({setLoggedIn}){
    const navigate = useNavigate();
    const { formType } = useParams()
    const [userData, setUserData] = useState({
        username:'',
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
            const { token } = await logIn(userData)
            localStorage.setItem('userToken', token)
            setLoggedIn(true)
        }else{
            const { token } = await signUp(userData)
            localStorage.setItem('userToken', token)
            setLoggedIn(true)
        }
        navigate('/')
    }
    let signUpEmail = <></>
    if(formType!=='login'){
        signUpEmail=<>
            <label htmlFor="email">E-mail</label>
            <input
                name="email"
                type="email"
                required
                placeholder="email@gmail.com"
                value={userData.email}
                onChange={handleInputChange}
                />
                <br />
        </>
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    minLength="6"
                    required
                    placeholder="username"
                    value={userData.username}
                    onChange={handleInputChange}
                 />
                 <br />
                {signUpEmail}
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    minLength="6"
                    required
                    placeholder="password"
                    value={userData.password}
                    onChange={handleInputChange}
                 />
                <button type="submit">
                    {authAction}
                </button>
            </form>
        </>
    )
}