import React from 'react'
import ReactEmoji from 'react-emoji'

import './Message.css'

const Message = ({ message, id }) => {
    const isSentByCurrentUser = message.userId === id

    return (
        isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10 pt-10">You</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(message.text)}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(message.text)}</p>
                </div>
                <p className="sentText pl-10">{message.userName}</p>
            </div>
        )
    )
}

export default Message