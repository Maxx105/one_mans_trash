import React, { useState, useContext } from "react";
import AuthAPI from "../utils/AuthAPI";
import {AuthContext} from "../Context/AuthContext";
import LoginForm from "../components/LoginForm";

function Login(props) {
    const [user, setUser] = useState({username: "", password: ""});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    function handleInputChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        AuthAPI.login(user).then((data)=>{
            const { isAuthenticated, user, message, id } = data;
            if(isAuthenticated) {
                authContext.setId(id);
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                // changes page to home page
                props.history.push('/');
            }
            else 
                setMessage(message);
        })
    }

    return (
        <div className = "container">
            <LoginForm 
                onChange={handleInputChange}
                onSubmit={handleFormSubmit}
                message = {message}
            ></LoginForm>
        </div>
        
    );
}

export default Login;