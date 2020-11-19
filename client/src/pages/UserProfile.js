import React, { useState, useEffect, useContext, useParams } from "react";
import ItemCard from "../components/ItemCard";
import ItemAPI from "../utils/ItemAPI";
import UserAPI from "../utils/UserAPI";
import UserInfo from "../components/UserInfo";
import { AuthContext } from '../Context/AuthContext';

function UserProfile() {
    const [items, setItems] = useState([]);
    const authContext = useContext(AuthContext);

    // const {id} = useParams()

    // useEffect(() => {
    //     UserAPI.getUser(id)
    //     .then(res => setItem(res.data))
    //     .catch(err => console.log(err.response));
    // }, [])
    
    useEffect(() => {
        // console.log(id)
        // UserAPI.getUser(id)
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err.response));
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