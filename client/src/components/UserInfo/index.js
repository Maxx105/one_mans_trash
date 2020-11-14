import React from "react";
import "./style.css";

function UserInfo(props) {
    console.log(props)
    return (
        <h1 id="username-id">Hello, <strong>{props.currentUser}</strong>!</h1>
    )
}

export default UserInfo;