import React from "react";
import "./style.css";

function UserInfo(props) {
    const URL = "/uploads/";
    return (
        <div>
            <h1 id="username-id">Hello, <strong>{props.currentUser}</strong>!</h1>
        </div>
    )
}

export default UserInfo;