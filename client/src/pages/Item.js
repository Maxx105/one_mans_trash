import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ItemAPI from "../utils/ItemAPI";
import UserAPI from "../utils/UserAPI";
import MessageAPI from "../utils/MessageAPI";
import { AuthContext } from "../Context/AuthContext";
import "../components/ItemsPage/style.css";
import ItemMessageForm from "../components/ItemMessageForm";

function Item(props) {
  const [item, setItem] = useState({});
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({})

  const authContext = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    MessageAPI.getUserConversations()
    .then(res => {
       console.log(res)
    })
    .catch((err) => console.log(err.response));
    ItemAPI.getItem(id)
      .then((res) => {
        setItem(res.data);
        UserAPI.getUser(res.data.userID)
          .then((res) => setUser(res.data))
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
  }, []);

  function messageSubmitHandler(e) {
    e.preventDefault()

    MessageAPI.getUserConversations()
    .then(res => {
      for (let i = 0; i < res.conversation.length; i++) {
        if (item.title === res.conversation[i].message[0].item && user.username === res.conversation[i].message[0].toUsername && authContext.user.username === res.conversation[i].message[0].fromUsername) {
          setErrorMessage({message: "Already sent message to this user. Please respond on the message page.", error: true})
          return; 
        }
      }
      postInitialConversation()
    })
    .catch((err) => console.log(err.response));
    document.getElementById("message-input").value = "";
    setTimeout(
      () => props.history.push("/messages"),
      5000
    );
  }

  function postInitialConversation() {
    MessageAPI.postInitialMessage({
      message: [{
        fromUsername: authContext.user.username,
        fromUserID: authContext.id._id,
        toUsername: user.username,
        toUserID: user._id,
        message: message,
        item: item.title,
        itemID: item._id
      }]
    })
    .then(data => {
      setErrorMessage({message: data.message, error: false})
      console.log(data)
      MessageAPI.updateUserWithConversation(user._id, {
        conversation: message,
        id: data.id
      })
      .then(data => console.log(data))
      .catch((err) => console.log(err.response))
    })
    .catch((err) => console.log(err.response));
  }

  function messageChangeHandler(e) {
    setMessage(e.target.value)
  }

  return (
    <div>
      <div className="container" style={{marginTop: "20px"}}>
        <div className="card">
          <div className="row">

            <div className="col-md-4 col-sm-12" style={{paddingTop: "30px"}}>
              <div className="photo">
                <a
                  href={`mailto:${user.email}?subject=Hi, I am interested in your ${item.title} on One Man's Trash!`}
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      className="card-img-top img-fluid img-thumbnail rounded-circle"
                      alt={user.username}
                    />
                  ) : (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
                      className="card-img-top img-fluid img-thumbnail rounded-circle"
                      alt={user.username}
                    />
                  )}
                </a>
              </div>
            </div>

            <div className="col-md-8 col-sm-12" style = {{padding: "70px 0"}}>
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
    <div>
      <div className="row">
        <div
          className="col-md-6 col-sm-12"
          style={{ margin: "auto", padding: "50px" }}
        >
          <div className="card" style={{textAlign: "center"}}>
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
      <ItemMessageForm
        item = {item}
        user = {user}
        submit = {messageSubmitHandler}
        onMessageChange = {messageChangeHandler}
        errorMessage = {errorMessage}
      ></ItemMessageForm>
    </div>
  );
}
export default Item;
