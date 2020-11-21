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
    const [photoFile, setPhotoFile] = useState("");
    const [photo, setPhoto] = useState("");
    const [message, setMessage] = useState({});

    function handleInputChange(e) {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            photo: photo
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault(); 
        AuthAPI.register(user).then().then(data=>{
            const { error } = data;
            setMessage(data);
            setTimeout(() => setMessage({}), 3000);
            if(!error) {
                setTimeout(() => props.history.push('/login'), 3000);
            }
        })
        
    }

    function handleImageChange(e) {
        const file = e.target.files[0]
        const data = new FormData();
        data.append("photo", file);
        const config = {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'content-type': `multipart/form-data; bounday=${data._boundary}`
            }
        };
        ItemAPI.uploadPhoto(data, config).then(data => {
            setPhoto(data.location);
            setUser({
                ...user,
                photo: data.location
            });
        }).catch(err => console.log(err.response))
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