import React, { useState } from 'react'
import { BiSend } from "react-icons/bi"
import * as webrtchandler from "../../../utils/webrtchandler"
function NewMessageInput() {
    const [message, setMessage] = useState("")

    const handleTextChange = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyPressed = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            webrtchandler.sendMessageUasingDataChannel(message)
            setMessage("");
            console.log("sending message to other users")
        }
    }

    const sendMessage = () => {
        if (message.length > 0) {
            console.log("sending message to user");
            console.log(message)
            webrtchandler.sendMessageUasingDataChannel(message)
            setMessage("");

        }
    }
    return (
        <div className='new_message_container'>
            <input
                className='new_message_input'
                value={message}
                type="text"
                placeholder='Type your message...'
                onChange={handleTextChange}
                onKeyDown={handleKeyPressed}
            />
            <button
                className='new_message_button'
                onClick={sendMessage}
            >
                <BiSend />
            </button>

        </div>
    )
}

export default NewMessageInput