import React from "react";
import Login from "./Login.js"
import useLocalStorage from '../hooks/useLocalStorage'
import Dashboard from "./Dashboard.js";
import { ContactsProvider } from "../contexts/ContactsProvider.js";
import { ConversationsProvider } from "../contexts/ConversationsProvider.js";


function MessagingSystem() {
    
const [ id, setId] = useLocalStorage('id')
// this uses the contexts to grab contacts you'll probably want to take this out...
const dashboard = (
    <ContactsProvider>
        <ConversationsProvider id={id}>
        <Dashboard id={id} />
        </ConversationsProvider>
    </ContactsProvider>
)

    return(
        id ? dashboard : <Login onIdSubmit = {setId}/> 
        //original
        // id ? <Dashboard id={id} /> : <Login onIdSubmit = {setId}/> 
        
    );
}

export default MessagingSystem;