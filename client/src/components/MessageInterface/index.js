import React from "react";
import MessageResponseForm from "../MessageResponseForm"

function MessageInterface(props) {
    const fromMessageStyle = {
        textAlign: "left",
        backgroundColor: "lightgrey"
    }
    const toMessageStyle = {
        textAlign: "right",
        backgroundColor: "lightblue"
    }
    return (
        <div style={{margin: "20px"}}>
            <h3 style={{textAlign: "center"}}><strong>{props.messageHeader.user} - {props.messageHeader.item}</strong></h3>
            {props.messages.map((message) => (
                message.fromUsername === props.user ? 
                <li className="list-group-item" id="messages" key={message.id} style={toMessageStyle}>{message.message}</li>
                : <li className="list-group-item" id="messages" key={message.message} style={fromMessageStyle}>{message.message}</li>
            ))}
        </div>
    );
}
export default MessageInterface;
