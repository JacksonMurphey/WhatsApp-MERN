import React from 'react'
import './Sidebar.css'
import { default as image } from '../../media/sample.png'

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Avatar } from '@material-ui/core';
import SidebarChat from './SidebarChat';
//IconButton is a parent component provided by material-ui, which allows us to make the child component a button

const Sidebar = () => {

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src={image} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar