import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

const App = () => (
    <Router>
        {/* Login Form */}
        <Route path="/" exact component={Join} /> 
        {/* Chat Component */}
        <Route path="/chat" component={Chat} />
    </Router>
)

export default App