import React from "react";
import Login from "../components/Chat/Login"
import useLocalStorage from "../components/Hooks/useLocalStorage"
import Dashboard from "../components/Chat/Dashboard";
import { ContactsProvider } from "../Context/ContactsProvider";
import { ConversationsProvider } from "../Context/ConversationsProvider";



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