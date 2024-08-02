import React from "react";
import {ChatMessageModel, MessageOrigin} from "../../model/ChatMessageModel";
import Markdown from "react-markdown";
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
    message: ChatMessageModel;
}

const ChatMessage: React.FC<ChatMessageProps> = ({message}) => {
    return (<>
        {message.origin === MessageOrigin.USER ? (
            <div className={styles.userMessageContainer}>
                <div className={styles.userMessage}>{message.message}</div>
            </div>
        ) : (
            <Markdown>{message.message}</Markdown>
        )}
    </>)
}

export default ChatMessage;