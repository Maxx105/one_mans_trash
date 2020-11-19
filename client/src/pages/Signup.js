import React, { useState } from "react";
import AuthAPI from "../utils/AuthAPI";
import SignupForm from "../components/SignupForm";

function Signup(props) {
    const [user, setUser] = useState({
        username: "", 
        password: "",
        first_name: "",
        last_name: "",
        email: ""
    });
    const [message, setMessage] = useState({});

    function handleInputChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        AuthAPI.register(user).then(data=>{
            const { error } = data;
            setMessage(data);
            setTimeout(() => setMessage({}), 3000);
            if(!error) {
                setTimeout(() => props.history.push('/login'), 3000);
            }
        });
    }

    function handleImageChange(e) {

    }

    return (
        <div className = "container">
            <SignupForm
                imageChange = {handleImageChange}
                onChange = {handleInputChange}
                onSubmit = {handleFormSubmit}
                message = {message.message}
                error = {message.error}
            ></SignupForm>
        </div>
    );
}

export default Signup;