import React, { useState, useEffect, useContext } from "react";
import MessageAPI from "../utils/MessageAPI";
import UserAPI from "../utils/UserAPI";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import MessagingComponent from "../components/MessagingComponent"
import MessageResponseForm from "../components/MessageResponseForm"
import MessageInterface from "../components/MessageInterface"

function Conversation() {
    const authContext = useContext(AuthContext);
    const [allMessages, setAllMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [conversationID, setConversationID] = useState('');
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState("");
    const [messageHeader, setMessageHeader] = useState({})

    const { id } = useParams();

    useEffect(() => {
        getConversations()
        handleConversationSelect()
    }, [id]);

    function handleConversationSelect() {
        if (id) {
        MessageAPI.getConversation(id)
        .then((res) => {
            let idCounter = 0
            let messages = res.message;
            let messagesWithID = messages.map(message => {
                message.id = idCounter++;
                return message
            })
            setMessages(messagesWithID)
            if (res.message[0].fromUsername === authContext.user.username) {
                setMessageHeader({user: res.message[0].toUsername, item: res.message[0].item})
            } else if (res.message[0].fromUsername !== authContext.user.username) {
                setMessageHeader({user: res.message[0].fromUsername, item: res.message[0].item})
            }
        })
        .catch((err) => console.log(err.response));
        } else return
    }

    function getConversations() {
        MessageAPI.getUserConversations()
        .then((res) => {
            const usersArray = []
            res.conversation.forEach(conversation => {
                if (conversation.message[0].fromUsername !== authContext.user.username) {
                    usersArray.push({user: conversation.message[0].fromUsername, item: conversation.message[0].item, id:conversation._id, userID: conversation.message[0].fromUserID})
                } else if (conversation.message[0].fromUsername === authContext.user.username) {
                    usersArray.push({user: conversation.message[0].toUsername, item: conversation.message[0].item, id:conversation._id, userID: conversation.message[0].toUserID})
                } if (conversation.message[0].fromUsername === conversation.message[0].toUsername) {
                    usersArray.pop({user: conversation.message[0].toUsername, item: conversation.message[0].item, id:conversation._id, userID: conversation.message[0].toUserID})
                }
            })
            setUsers(usersArray)
        })
        .catch((err) => console.log(err.response));
    }

    function handleResponseFormSubmit(e) {
        let userName = "";
        let userItem = "";
        let userID = "";
        users.forEach(user => {
            if (user.id === id) {
                userName = user.user
                userItem = user.item
                userID = user.userID
            }
        })
        MessageAPI.updateConversation({
        message: [{
            fromUsername: authContext.user.username,
            fromUserID: authContext.id._id,
            toUsername: userName,
            toUserID: userID,
            message: response,
            item: userItem
            // itemID: item._id
          }],
        _id: id
        })
        .then(res => getConversations())
        .catch(err => console.log(err.response));
        document.getElementById("response-input").value = "";
    }

    function handleResponseInputChange(e) {
        setResponse(e.target.value)
    }

    return (
        <div className= "row">
            <div className = "col-md-3">
                <MessagingComponent
                    conversationSelect = {handleConversationSelect}
                    users = {users}
                    id = {id}
                    // messages = {allMessages}
                    // id={conversationID}
                ></MessagingComponent>
            </div>
            { id ? (
                <div className = "col-md-9">
                    <MessageInterface
                    messages = {messages}
                    user = {authContext.user.username}
                    messageHeader = {messageHeader}
                    ></MessageInterface>
                    <MessageResponseForm
                    onResponseInputChange = {handleResponseInputChange}
                    sendResponse = {handleResponseFormSubmit}
                    ></MessageResponseForm>
                </div>
            ) : null }
        </div>
        
        
    )
}
export default Conversation;
