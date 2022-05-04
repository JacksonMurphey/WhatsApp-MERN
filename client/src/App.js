import './App.css';
import Chat from './components/ChatBox/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react'
import axios from './axios'
//importing the local axios

import Pusher from 'pusher-js'
//npm install pusher-js


function App() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/api/messages/sync')
      .then(res => {
        setMessages(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    const pusher = new Pusher('2e2fa9c81dc5c29fd19f', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('new-messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages((prevMessages) => {
        return [...prevMessages, newMessage]
      })
    });

    //Cleanup function
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }

  }, [messages])

  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
