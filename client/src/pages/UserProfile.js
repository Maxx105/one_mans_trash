import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import ItemAPI from "../utils/ItemAPI";
import UserAPI from "../utils/UserAPI";
import UserInfo from "../components/UserInfo";
import { AuthContext } from "../Context/AuthContext";

function UserProfile() {
  const [items, setItems] = useState([]);
  const authContext = useContext(AuthContext);
  const [photo, setPhoto] = useState("");
  const [alt, setAlt] = useState("");

  const { id } = useParams();

  // useEffect(() => {
  //     UserAPI.getUser(id)
  //     .then(res => setItem(res.data))
  //     .catch(err => console.log(err.response));
  // }, [])

  useEffect(() => {
    // authContext.setId()
    UserAPI.getUser(id)
      .then((res) => {
        setPhoto(res.data.photo);
        setAlt(`${res.data.first_name} ${res.data.last_name}`);
      })
      .catch((err) => console.log(err.response));
    loadItems();
  }, []);

  function loadItems() {
    ItemAPI.getUserItems().then((data) => {
      setItems(data.items);
    });
  }

  return (
    <div>
      <UserInfo
        alt={alt}
        photo={photo}
        currentUser={authContext.user.username}
      ></UserInfo>
      <ItemCard
        items={items}
        loadItems={() => loadItems()}
        className="col-md-4 col-sm-12"
        style={{ margin: "auto", marginTop: "10px" }}
      ></ItemCard>
    </div>
  );
}

export default UserProfile;
