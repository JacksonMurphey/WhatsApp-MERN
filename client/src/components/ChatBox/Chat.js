import { Avatar, IconButton } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../axios';

import React, { useState } from 'react'
import './Chat.css'

const Chat = (props) => {

    const { messages } = props

    const [input, setInput] = useState('')

    const sendMessageHandler = async (e) => {
        e.preventDefault()
        const newMessage = {
            message: input,
            name: 'Hard-Coded',
            timestamp: new Date().getTime(),
            received: true
        }
        await axios.post('/api/messages/new', newMessage)
        setInput('')
    }


    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body" id='chatBody'>
                {messages.map((message) => (
                    <p className={`chat__message ${!message.received && 'chat__receiver'}`} key={message._id}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {message.createdAt = new Date().toUTCString()}
                            {/* {new Date().toLocaleString()} */}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer" >
                <InsertEmoticonIcon />
                <form >
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type a message'
                    />
                    <button onClick={sendMessageHandler} type='submit'>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
export default Chat
