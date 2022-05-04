import { Avatar, IconButton } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import React, { useState } from 'react'
import './Chat.css'

const Chat = () => {

    const [input, setInput] = useState('')

    const sendMessageHandler = e => {
        e.preventDefault()
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

            <div className="chat__body">
                <p className='chat__message'>
                    <span className='chat__name'>Jake</span>
                    This is a message
                    <span className='chat__timestamp'>
                        {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
                        {new Date().toLocaleString()}
                    </span>
                </p>

                <p className='chat__message chat__receiver'>
                    <span className='chat__name'>Larry</span>
                    This is a Response
                    <span className='chat__timestamp'>
                        {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
                        {new Date().toLocaleString()}
                    </span>
                </p>

                <p className='chat__message'>
                    <span className='chat__name'>Jake</span>
                    Now we are talking
                    <span className='chat__timestamp'>
                        {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
                        {new Date().toLocaleString()}
                    </span>
                </p>
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form onSubmit={sendMessageHandler}>
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type a message'
                    />
                    <button type='submit'>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
export default Chat
