import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import ItemAPI from "../utils/ItemAPI";
import UserAPI from "../utils/UserAPI";
import {AuthContext} from "../Context/AuthContext";

function Home() {
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const authContext = useContext(AuthContext);

    const {id} = useParams()

    useEffect(() => {
        ItemAPI.getItem(id)
            .then(res => {
                setItem(res.data);
                UserAPI.getUser(res.data.userID)
                    .then(res => setUser(res.data))
                    .catch(err => console.log(err.response));
            })
            .catch(err => console.log(err.response));
    }, [])

    return (
        <div>
            <h1>{item.title}</h1>
            {item.photo ?
                <img src={item.photo} alt={item.title} className="img-fluid img-thumbnail" style={{height:'25%', width: '25%'}}/> :
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" alt={item.title} className="img-fluid img-thumbnail" style={{height:'25%', width: '25%'}}/>
            }
            <p>{`details: ${item.details}`}</p>
            <p>{`condition: ${item.condition}`}</p>
            <p>{`user: ${item.user}`}</p>
            <p>{`value: $${item.value}`}</p>
            <p>{`zipcode: ${item.zipcode}`}</p>

            <div className="card shadow" style={{width: "18rem"}}>
                {user.photo ? 
                    <img src={user.photo} className="card-img-top img-fluid img-thumbnail" alt={user.username}/> :
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" className="card-img-top img-fluid img-thumbnail" alt={user.username}/>
                }
                <div className="card-body">
                    <h4 className="card-title">{user.username}</h4>
                    <h6 className="card-title">{user.first_name} {user.last_name}</h6>
                    <p className="card-text">{user.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;