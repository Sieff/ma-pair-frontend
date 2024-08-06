import React from "react";
import {Message, MessageOrigin} from "../../../model/Message";
import styles from './ChatMessage.module.css';
import MarkdownContainer from "../../atom/MarkdownContainer";

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({message}) => {
    return (<>
        {message.origin === MessageOrigin.USER ? (
            <UserMessage message={message} />
        ) : (
            <AgentMessage message={message} />
        )}
    </>)
}

const UserMessage: React.FC<ChatMessageProps> = ({message}) => {
    return (
        <div className={styles.userMessageContainer}>
            <div className={styles.userMessage}>
                <p>
                    {message.message}
                </p>
            </div>
        </div>
    )
}

const AgentMessage: React.FC<ChatMessageProps> = ({message}) => {
    return (
        <div className={styles.agentMessageContainer}>
            <img className={styles.avatar} src={"avatar-icon.png"} alt={"Chat message avatar icon of the Assistant"}></img>
            <MarkdownContainer text={message.message} />
        </div>
    )
}

export default ChatMessage;