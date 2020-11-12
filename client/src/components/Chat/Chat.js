import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

import InfoBar from '../InfoBar/infoBar'
import Input from '../Input/input'
import Messages from '../Messages/messages'


let socket;



const Chat = ({location}) => {
    const [name, setName ] = useState('');
    const [room, setRoom ] = useState('');
    const [message, setMessage ] = useState('');
    const [messages, setMessages ] = useState([]);
    const ENDPOINT ='localhost:9000'


    useEffect(() => {
        const {name , room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
      
        socket.emit('join', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
      socket.on('message', (message) => {
        setMessages(messages => [...messages, message]);
      }) ; 
    });

    //function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage' , message, () => setMessage(''));
        }
    }

        // console.log(message,messages);
    return (
        <div className="outerContainer">
            <div className='container'>
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
        
    );
}

export default Chat;