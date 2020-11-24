import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ItemAPI from "../utils/ItemAPI";
import UserAPI from "../utils/UserAPI";
import { AuthContext } from "../Context/AuthContext";
import "../components/ItemsPage/style.css";
function Item() {
  const [item, setItem] = useState({});
  const [user, setUser] = useState({});
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    ItemAPI.getItem(id)
      .then((res) => {
        setItem(res.data);
        UserAPI.getUser(res.data.userID)
          .then((res) => setUser(res.data))
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <div>
      <div>
        <div className="row">
          <div
            className="col-md-6 col-sm-12"
            style={{ margin: "auto", marginTop: "10px", padding: "50px" }}
          >
            <div className="card">
              <div className="photo">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="card-img-top img-fluid img-thumbnail"
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
                    alt={item.title}
                    className="img-fluid img-thumbnail"
                  />
                )}
              </div>
              <h5 className="title">{item.title}</h5>
              <p className="category-text">
                <span style={{ fontWeight: "bolder" }}> {"Details:"} </span>{" "}
                {item.details}{" "}
              </p>
              <p className="category-text">
                <span style={{ fontWeight: "bolder" }}> {"Condition:"}</span>
                {item.condition}
              </p>
              <p className="category-text">
                <span style={{ fontWeight: "bolder" }}> {"User:"} </span>{" "}
                {item.user}
              </p>
              <p className="category-text">
                <span style={{ fontWeight: "bolder" }}> {"Value:"}</span>{" "}
                {`$${item.value}`}
              </p>
              <p className="category-text">
                {" "}
                <span style={{ fontWeight: "bolder" }}> {"Zipcode:"}</span>{" "}
                {item.zipcode}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div
            className="col-md-4 col-sm-12"
            style={{ margin: "auto", marginTop: "10px" }}
          >
            <div className="card">
              <div className="photo">
                <a
                  href={`mailto:${user.email}?subject=Hi, I am interested in your ${item.title} on One Man's Trash!`}
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      className="card-img-top img-fluid img-thumbnail"
                      alt={user.username}
                    />
                  ) : (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
                      className="card-img-top img-fluid img-thumbnail"
                      alt={user.username}
                    />
                  )}
                </a>
              </div>
              <div className="card-body">
                <p className="body-text">{user.username}</p>
                <p className="body-text">
                  {user.first_name} {user.last_name}
                </p>
                <p className="body-text">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Item;
