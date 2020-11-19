import React, { useState } from "react";
import AuthAPI from "../utils/AuthAPI";
import ItemAPI from "../utils/ItemAPI";
import SignupForm from "../components/SignupForm";

function Signup(props) {
    const [user, setUser] = useState({
        username: "", 
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        photo: ""
    });
    const [photo, setPhoto] = useState("");
    const [message, setMessage] = useState({});

    function handleInputChange(e) {
        e.preventDefault()
        if (e.target.name === "photo") {
            setUser({
                ...user, 
                [e.target.name]: e.target.files[0].name
            });
        } else {
            setUser({
                ...user, 
                [e.target.name]: e.target.value
            });
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        AuthAPI.register(user).then(data=>{
            // console.log(data)
            const { error } = data;
            setMessage(data);
            setTimeout(() => setMessage({}), 3000);
            if(!error) {
                setTimeout(() => props.history.push('/login'), 3000);
            }
        });
        const data = new FormData();
        data.append("photo", photo);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        ItemAPI.uploadPhoto(data, config).then(data => {
            // console.log(data)
        }).catch(err => console.log(err.response))
    }

    function handleImageChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        setPhoto(file);
        console.log(file)
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