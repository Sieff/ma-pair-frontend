import React from "react";
import styles from './ChatWindow.module.css'
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

const ChatWindow: React.FC = () => {
    return (
        <div className={styles.container}>
            <ChatHistory/>
            <ChatInput />
        </div>
    )
}

export default ChatWindow;