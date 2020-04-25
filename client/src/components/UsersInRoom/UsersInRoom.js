import React, { useState } from 'react'
import ReactEmoji from 'react-emoji'

import './UsersInRoom.css'

import onlineIcon from '../../icons/onlineIcon.png'

const UsersInRoom = ({ socket }) => {
    const [users, setUsers] = useState([])

    socket.on("update-room-data", ({ users }) => {
        setUsers(users);
    });

    return (
        <div className="usersInRoomContainer">
            <div className="usersInRoomBar">
                <h3>Online people:</h3>
            </div>
            {
                users ? (
                    <div className="usersInRoomList">
                        { 
                            users.map(({name}) => (
                                <div key={name} className="usersInRoomUser">
                                    <img alt="Online Icon" src={onlineIcon}/> 
                                    <p>{name}</p>
                                </div>
                            ))
                        }
                    </div>
                )
                : (
                    <h3>{ReactEmoji.emojify("Nobody :(")}</h3>
                )
            }
        </div>
    )
}

export default UsersInRoom