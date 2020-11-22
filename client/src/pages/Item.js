import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ItemAPI from "../utils/ItemAPI";
import UserAPI from "../utils/UserAPI";
import { AuthContext } from "../Context/AuthContext";
import "../components/ItemsPage/style.css"





function Item() {
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const authContext = useContext(AuthContext);

    const { id } = useParams()

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
            <div className="grid-container">
                <div className="row">
                    <div className="card" style={{ width: "18rem" }}>
                        {item.photo ?
                            <img src={item.photo} alt={item.title} className="img-fluid img-thumbnail"/> :
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" alt={item.title} className="img-fluid img-thumbnail" />
                        }
                        <h5>{item.title}</h5>
                        <p className="card-text">{`Details: ${item.details}`}</p>
                        <p className="card-text">{`Condition: ${item.condition}`}</p>
                        <p className="card-text">{`User: ${item.user}`}</p>
                        <p className="card-text">{`Value: $${item.value}`}</p>
                        <p className="card-text">{`Zipcode: ${item.zipcode}`}</p>
                    </div>
                </div>
            </div>

            <div className="grid-container">
                <div className="row">
                    <div className="card" style={{ width: "18rem" }}>
                        {user.photo ?
                            <img src={user.photo} className="card-img-top img-fluid img-thumbnail" alt={user.username} /> :
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" className="card-img-top img-fluid img-thumbnail" alt={user.username} />
                        }
                        <div className="card-body">
                            <p className="card-text">{user.username}</p>
                            <p className="card-text">{user.first_name} {user.last_name}</p>
                            <p className="card-text">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;