import express from 'express'
import socketio from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'
import router from './router'

import { addUser, removeUser, getUser, getUsersInRoom, countUsersInRoom } from './users'

const PORT = process.env.PORT || 5000

const app = express()
const server = createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors())

io.on('connection', (socket) => {
    
    socket.on('join', ({ name, room }) => {
        const existingUser = getUser(socket.id)
        if (existingUser) {
            return
        }

        let usersInRoom = countUsersInRoom(room)
        if (!usersInRoom) {
            usersInRoom = 0;
        }

        const { user } = addUser({ id: socket.id, name, room })
        
        if (usersInRoom == 0) {
            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to '${user.room}'. You are the only one in the room :(` })
        } else if (usersInRoom == 1) {
            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to '${user.room}'. There is currently ${usersInRoom} user online.` })
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined.` })
        } else {
            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to '${user.room}'. There are currently ${usersInRoom} users online.` })
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined.` })
        }
        
        socket.join(user.room)

        io.to(user.room).emit('update-room-data', { room: user.room, users : getUsersInRoom(user.room) })
    })

    socket.on('send-message', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { userId: user.id, userName: user.name, text: message })

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
            io.to(user.room).emit('update-room-data', { room: user.room, users : getUsersInRoom(user.room) })
        }
    })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
