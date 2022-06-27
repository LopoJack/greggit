import React, {useState, useContext} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);
    let navigate = useNavigate();

    const login = () => {
        const data = {username: username, password: password};  //need user id
        axios.post("http://localhost:3001/auth/login", data).then((response) =>{
            //console.log(response.data);
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username, 
                    id: response.data.id, 
                    status: true,
                });
                navigate("/");
            }
        })
    };

    return(
        <div className='loginContainer'>
            <div className='formContainer'>
                <label>Username:</label>
                <input type="text" id="inputCreatePost" onChange={event => {setUsername(event.target.value)}}/>
                <label>Password:</label>
                <input type="password" id="inputCreatePost" onChange={event => {setPassword(event.target.value)}}/>

                <button onClick={login}>Login</button>
            </div>
            
        </div>
    )
}

export default Login;