import React, { useState, useEffect } from "react";
import HomeFeed from "../components/HomeFeed";
// import ItemCard from "../components/ItemCard";
import ItemAPI from "../utils/ItemAPI";
function Home() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        ItemAPI.getAllItems().then(data=>{
            setItems(data)
        });
    }, []);
    return (
        <div>
            <HomeFeed
                items = {items}
            ></HomeFeed>
        </div>
    );
}
export default Home;