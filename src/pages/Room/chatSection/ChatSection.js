import React, { useMemo } from 'react'
import ChatLabel from './ChatLabel'
import Messages from "./Messages"
import NewMessageInput from './NewMessageInput'
function ChatSection() {

    return (
        <div className="chat_section_container">
            <ChatLabel />
            <Messages />
            <NewMessageInput />
        </div>
    )
}

export default ChatSection