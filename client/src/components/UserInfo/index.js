import React from "react";
import "./style.css";
function UserInfo(props) {
    return (
        <div>
            <div id="profileBanner" >
                <div id="profile-photo">
                    {props.photo ?
                        <img src={props.photo} className="img-thumbnail rounded-circle" alt={props.alt} /> :
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" className="card-img-top" alt={props.alt} />
                    }
                </div>
                <h1 id="username-id">Hello, <strong>{props.currentUser}</strong>!</h1>
            </div>
        </div>
    )
}
export default UserInfo;