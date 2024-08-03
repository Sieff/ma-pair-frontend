import React from "react";
import styles from './ChatWindow.module.css'
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import {MessagesContextProvider} from "../../../context/MessagesContext";

const ChatWindow: React.FC = () => {
    return (
        <MessagesContextProvider>
            <div className={styles.container}>
                <ChatHistory/>
                <ChatInput />
            </div>
        </MessagesContextProvider>
    )
}

export default ChatWindow;