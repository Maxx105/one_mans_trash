import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
// import ItemAPI from "../../utils/ItemAPI";

function MessagingComponent(props) {
  return (
    <div>
        <ul className="list-group">
            {props.users.map((user) => (
                <Link to={"/messages/" + user.id} key = {user.id} id="message-user">
                    <li className="list-group-item" id="messageUserlist" onClick = {props.conversationSelect}>
                        {/* <img src={user.photo} width="55" height="55" className="img-thumbnail rounded-circle" style={{marginRight: "10px"}}/> */}
                        <strong>{user.user}</strong> - {user.item}
                    </li>
                </Link>
            ))}
        </ul>

        
    </div>
  );
}
export default MessagingComponent;
