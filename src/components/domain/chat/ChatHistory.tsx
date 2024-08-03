import React, {useContext} from "react";
import styles from './ChatHistory.module.css'
import ChatMessage from "./ChatMessage";
import {MessagesContext} from "../../../context/MessagesContext";

const ChatHistory: React.FC = () => {
    const {messages} = useContext(MessagesContext);

    return (
        <div className={styles.container}>
            {messages.map((message, idx) => (
                <ChatMessage key={idx} message={message} />
            ))}
        </div>
    )
}

export default ChatHistory;