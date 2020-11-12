import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import ItemAPI from "../utils/ItemAPI";

function UserProfile() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        ItemAPI.getUserItems().then(data=>{
            console.log(data)
            setItems(data.items)
        });
    }, []);
    
    return (
        <div>
            <ItemCard
                items = {items}
            ></ItemCard>
        </div>
    );
}

export default UserProfile;