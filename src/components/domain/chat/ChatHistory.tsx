import React, {useContext, useEffect, useRef} from "react";
import styles from './ChatHistory.module.css'
import ChatMessage from "./ChatMessage";
import {MessagesContext} from "../../../context/MessagesContext";

const ChatHistory: React.FC = () => {
    const {messages} = useContext(MessagesContext);

    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className={styles.container}>
            {messages.map((message, idx) => (
                <ChatMessage key={idx} message={message} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatHistory;