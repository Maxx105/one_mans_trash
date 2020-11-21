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
            [e.target.name]: e.target.value
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault(); 
        const data = new FormData();
        data.append("photo", photoFile, photoFile.name);
        const config = {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'content-type': `multipart/form-data; bounday=${data._boundary}`
            }
        };
        ItemAPI.uploadPhoto(data, config).then(data => {
            setUser(...user, {photo: data.location});
        }).catch(err => console.log(err.response))
        AuthAPI.register(user).then(data=>{
            console.log(user)
            const { error } = data;
            setMessage(data);
            setTimeout(() => setMessage({}), 3000);
            if(!error) {
                setTimeout(() => props.history.push('/login'), 3000);
            }
        });
    }

    function handleImageChange(e) {
        setPhotoFile(e.target.files[0]);
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