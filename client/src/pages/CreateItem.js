import React, { useState, useContext } from "react";
import CreateItemFrom from "../components/CreateItemForm";
import ItemAPI from "../utils/ItemAPI";
import { AuthContext } from '../Context/AuthContext';
// import image from "../public/uploads/IMG_0256 (1).jpg"

function CreateItem(props) {
    const [item, setItem] = useState({
        title: "",
        details: "",
        photo: "",
        value: 0,
        condition: "",
        zipcode: 0,
        user: "",
        userID: ""
    });

    const [photoFile, setPhotoFile] = useState("");
    const [photo, setPhoto] = useState("");


    const authContext = useContext(AuthContext);
    function handleInputChange(e) {
        if (e.target.name === 'value' || e.target.name === 'zipcode') {
            setItem({
                ...item, 
                ...{user: authContext.user.username},
                ...{userID: authContext.id._id}, 
                [e.target.name]: parseInt(e.target.value),
                ...{photo: photo}
            });
        } else {
            setItem({
                ...item, 
                ...{user: authContext.user.username},
                ...{userID: authContext.id._id},
                [e.target.name]: e.target.value,
                ...{photo: photo}
            });
        }
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        ItemAPI.postItem(item).then((data)=>{
            const { isAuthenticated, user, message } = data;
            setTimeout(() => props.history.push('/userprofile/' + authContext.id._id), 3000);
            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
            }
        })
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("photo", file, file.name);
        const config = {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'content-type': `multipart/form-data; bounday=${data._boundary}`
            }
        };
        ItemAPI.uploadPhoto(data, config).then(data => {
            setPhoto(data.location);
            setItem({
                ...item, 
                photo: data.location
            });
        }).catch(err => console.log(err.response)) 
    }

    return (
        <div className = "container">
            <CreateItemFrom
                onChange = {handleInputChange}
                onClick = {handleFormSubmit}
                imageChange = {handleImageChange}
            ></CreateItemFrom>
        </div>
    );
}
export default CreateItem;