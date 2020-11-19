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
        user: ""
    });
    // const [title, setTitle] = useState("");
    // const [details, setDetails] = useState("");
    const [photo, setPhoto] = useState("");
    // const [value, setValue] = useState(0);
    // const [condition, setCondition] = useState("");
    // const [zipcode, setZipcode] = useState(0);
    // const [user, setUser] = useState("");

    const authContext = useContext(AuthContext);
    function handleInputChange(e) {
        if (e.target.name === 'value' || e.target.name === 'zipcode') {
            setItem({
                ...item, 
                ...{user: authContext.user.username}, 
                [e.target.name]: parseInt(e.target.value),
                ...{photo: photo.name}
            });
        } else {
            setItem({
                ...item, 
                ...{user: authContext.user.username}, 
                [e.target.name]: e.target.value,
                ...{photo: photo.name}
            });
        }
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        ItemAPI.postItem(item).then((data)=>{
            const { isAuthenticated, user, message } = data;
            setTimeout(() => props.history.push('/userProfile'), 3000);
            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
            }
        })
        const data = new FormData();
        data.append("photo", photo);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        ItemAPI.uploadPhoto(data, config).then(data => {
            alert("file is successfully uploaded")
        }).catch(err => console.log(err.response))
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        console.log(file);
        setPhoto(file);
        // setPhotoPath(data.path);
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