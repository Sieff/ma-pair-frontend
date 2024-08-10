import React, {useEffect, useRef} from "react";
import styles from './ChatWindow.module.css'
import ChatHistory from "./ChatHistory";
import ChatInput from "../ChatInput";
import CefQueryService from "../../../service/CefQueryService";

const ChatWindow: React.FC = () => {
    const cefQueryService = useRef(CefQueryService.instance);

    useEffect(() => {
        cefQueryService.current.requestMessages()
    }, []);

    return (
        <div className={styles.container}>
            <ChatHistory/>
            <ChatInput />
        </div>
    )
}

export default ChatWindow;