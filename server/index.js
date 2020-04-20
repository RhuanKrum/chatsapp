// Node import
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const router = require('./router')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors())

io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return callback(error)

        // Emits message to the caller
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        
        // Broadcasts message to everybody else
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })

        socket.join(user.room)

        io.to(user.room).emit('room-data', { room: user.room , users: getUsersInRoom(user.room)})

        callback()
    })

    socket.on('send-message', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { room: user.room, users : getUsersInRoom(user.room) })

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })
        }
    })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
