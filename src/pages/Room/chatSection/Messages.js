import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';


const Message = ({ author, content, sameAuthor, messageCreatedByMe }) => {
    const alignClass = messageCreatedByMe ? "message_align_right" : "message_align_left";
    const authorText = messageCreatedByMe ? "You" : author;

    const contentAdditionalStyles = messageCreatedByMe ?
        "message_right_styles" : "message_left_styles"

    return (
        <div className={`message_container ${alignClass}`}>
            {!sameAuthor && <p className={`message_title`}>
                {authorText}
            </p>}
            <p className={`message_content ${contentAdditionalStyles}`}>
                {content}
            </p>
        </div>
    )
}


function Messages(props) {
    const { messages } = useSelector((state) => state.counter)

    return (
        <div className="messages_container">
            {messages.map((message, i) => {
                const sameAuthor = i > 0 && message.identity === messages[i - 1].identity
                return (
                    <Message
                        key={`${message.content}${i}`}
                        author={message.identity}
                        content={message.content}
                        sameAuthor={sameAuthor}
                        messageCreatedByMe={message.messageCreatedByMe}
                    />
                )
            })}
        </div>
    )
}

export default Messages