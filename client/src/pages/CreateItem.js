import React, { useState, useContext } from "react";
import CreateItemFrom from "../components/CreateItemForm";
import ItemAPI from "../utils/ItemAPI";
import { AuthContext } from '../Context/AuthContext';
function CreateItem() {
    const [item, setItem] = useState({
        title: "",
        details: "",
        photo: "",
        value: 0,
        condition: "",
        zipcode: 0,
        user: []
    })
    const authContext = useContext(AuthContext);
    function handleInputChange(e) {
        if (e.target.name === 'value' || e.target.name === 'zipcode') {
            setItem({...item, [e.target.name]: parseInt(e.target.value)});
        } else {
            setItem({...item, [e.target.name]: e.target.value});
        }
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        ItemAPI.postItem(item).then((data)=>{
            const { isAuthenticated, user, message } = data;
            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                // changes page to home page
                // props.history.push('/');
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