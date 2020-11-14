import React, { useState, useEffect, useContext } from "react";
import ItemCard from "../components/ItemCard";
import ItemAPI from "../utils/ItemAPI";
import UserInfo from "../components/UserInfo"
import { AuthContext } from '../Context/AuthContext';

function UserProfile() {
    const [items, setItems] = useState([]);
    const authContext = useContext(AuthContext);
    
    useEffect(() => {
        loadItems()
    }, []);

    function loadItems() {
        ItemAPI.getUserItems().then(data=>{
            setItems(data.items)
        });
    }
    
    return (
        <div>
            <UserInfo
                currentUser = {authContext.user.username}
            ></UserInfo>
            <ItemCard
                items = {items}
                loadItems = {() => loadItems()}
            ></ItemCard>
        </div>
    );
}

export default UserProfile;