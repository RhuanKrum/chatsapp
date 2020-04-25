import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import querystring from 'query-string'

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import UsersInRoom from '../UsersInRoom/UsersInRoom'

const Chat = ({ socket }) => {
    const [name, setName] = useState('') // [variable, setter]
    const [room, setRoom] = useState('') // [variable, setter]
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('') // [variable, setter]
    const [messages, setMessages] = useState([]) // [variable, setter]
    const location = useLocation()
    
    useEffect(() => {
        const { name, room } = querystring.parse(location.search)
        setName(name)
        setRoom(room)
        socket.emit('join', { name, room })
        console.log(location)
    }, [socket])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message])
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('send-message', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <UsersInRoom socket={socket} />
            <div className="container">
                <InfoBar infoText={`Room: ${room}`} />
                
                <Messages messages={messages} id={socket.id} />

                <Input 
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    )
}

export default Chat