import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Join.css'

const Join = () => {
    const [name, setName] = useState('') // [variable, setter]
    const [room, setRoom] = useState('') // [variable, setter]
    const [error, setError] = useState('')

    useEffect(() => {
        if (!name || name.length < 1) {
            setError("Please enter an username")
        }
        else if (!room || room.length < 1) {
            setError('Please enter a room')
        }
        else {
            setError()
        }
    }, [name, room])

    const authenticate = (event) => {
        if (error) {
            event.preventDefault()
        }
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join Chat</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => authenticate(event)} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20">Sign In</button>
                </Link>
                <div><label className="errorLabel mt-20">{error}</label></div>
            </div>
        </div>
    )
}

export default Join