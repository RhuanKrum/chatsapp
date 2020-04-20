import io from 'socket.io-client'

const ENDPOINT_DEV = 'http://localhost:5000'
const ENDPOINT_PRD = 'https://rhuan-react-chat-application.herokuapp.com/'

const ENDPOINT = (process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? ENDPOINT_DEV : ENDPOINT_PRD)

export const createSocket = () => {
    const socket = io(ENDPOINT)
    return socket
}

export const getEndpoint = () => {
    return ENDPOINT
}