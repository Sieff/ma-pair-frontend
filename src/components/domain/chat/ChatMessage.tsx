import React, {forwardRef} from "react";
import {Message, MessageOrigin} from "../../../model/Message";
import styles from './ChatMessage.module.css';
import MarkdownContainer from "../../atom/MarkdownContainer";

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.ForwardRefExoticComponent<ChatMessageProps & React.RefAttributes<HTMLDivElement>> =
    forwardRef<HTMLDivElement, ChatMessageProps>(({message}, ref) => {
        return (<div ref={ref}>
            {message.origin === MessageOrigin.USER ? (
                <UserMessage message={message} />
            ) : (
                <AgentMessage message={message} />
            )}
        </div>)
})

const UserMessage: React.FC<ChatMessageProps> = ({message}) => {
    return (
        <div className={styles.userMessageContainer}>
            <div className={styles.userMessage}>
                <p className={styles.message}>
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