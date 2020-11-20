import React from "react";
import Login from "../components/Chat/Login"
import useLocalStorage from "../components/Hooks/useLocalStorage"
import Dashboard from "../components/Chat/Dashboard";
import { ContactsProvider } from "../Context/ContactsProvider";
import { ConversationsProvider } from "../Context/ConversationsProvider";
import { SocketProvider } from '../Context/SocketProvider';



function MessagingSystem() {
    
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />
  )
}

export default MessagingSystem;