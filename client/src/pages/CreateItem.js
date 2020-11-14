import React, { useState, useContext } from "react";
import CreateItemFrom from "../components/CreateItemForm";
import ItemAPI from "../utils/ItemAPI";
import { AuthContext } from '../Context/AuthContext';
function CreateItem(props) {
    const [item, setItem] = useState({
        title: "",
        details: "",
        photo: "",
        value: 0,
        condition: "",
        zipcode: 0,
        user: ""
    })
    const authContext = useContext(AuthContext);
    function handleInputChange(e) {
        if (e.target.name === 'value' || e.target.name === 'zipcode') {
            setItem({
                ...item, 
                ...{user: authContext.user.username}, 
                [e.target.name]: parseInt(e.target.value)
            });
        } else {
            setItem({
                ...item, 
                ...{user: authContext.user.username}, 
                [e.target.name]: e.target.value
            });
        }
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        ItemAPI.postItem(item).then((data)=>{
            const { isAuthenticated, user, message } = data;
            setTimeout(() => props.history.push('/userProfile'), 3000);
            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
            }
        })
    }
    return (
        <div className = "container">
            <CreateItemFrom
                onChange = {handleInputChange}
                onClick = {handleFormSubmit}
            ></CreateItemFrom>
        </div>
    );
}
export default CreateItem;