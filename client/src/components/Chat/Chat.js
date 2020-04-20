import React, { useState, useEffect } from 'react'
import querystring from 'query-string'
import io from 'socket.io-client'

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('') // [variable, setter]
    const [room, setRoom] = useState('') // [variable, setter]
    const [message, setMessage] = useState('') // [variable, setter]
    const [messages, setMessages] = useState([]) // [variable, setter]
    const ENDPOINT = (process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://rhuan-react-chat-application.herokuapp.com/')
    
    useEffect(() => {
        const { name, room } = querystring.parse(location.search)

        setName(name)
        setRoom(room)

        socket = io(ENDPOINT)

        socket.emit('join', { name, room }, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        } // Unmounting
    }, [ENDPOINT, location.search]) // useEffect will only be rendered if these values change

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        }, [messages]) // useEffect will only be rendered if these values change
    })

    const sendMessage = (event) => {
        event.preventDefault() // Prevent browser refreshing

        if (message) {
            socket.emit('send-message', message, () => setMessage(''))
        }
    }

    console.log(message, messages)

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                
                <Messages messages={messages} name={name} />

                <Input 
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            {/* <TextContainer users={users} /> */}
        </div>
    )
}

export default Chat