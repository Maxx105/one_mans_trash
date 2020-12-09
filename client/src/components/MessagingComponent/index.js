import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
// import ItemAPI from "../../utils/ItemAPI";

function MessagingComponent(props) {
  return (
    <div>
        <ul className="list-group">
            {props.users.map((user) => (
                <Link to={"/messages/" + user.id} key = {user.id}>
                    <li className="list-group-item" id="messageUserlist" onClick = {props.conversationSelect}>{user.user} - {user.item}</li>
                </Link>
            ))}
        </ul>

        
    </div>
  );
}
export default MessagingComponent;
