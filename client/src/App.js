import React, { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

import { createSocket, getEndpoint } from './SocketConfig'

const App = () => {
    const socket = createSocket()

    useEffect(() => {
        return () => {
            socket.emit('disconnect')
            socket.off()
        } // Unmounting
    }, [socket])

    return (
        <Router>
            {/* Join Form */}
            <Route path="/" exact component={() => <Join socket={socket}/>} /> 
            {/* Chat Component */}
            <Route path="/chat" component={() => <Chat socket={socket}/>} />
        </Router>
    )
}

export default App