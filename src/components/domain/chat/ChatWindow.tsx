import React, {useEffect, useRef} from "react";
import styles from './ChatWindow.module.css'
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import CefQueryService from "../../../service/CefQueryService";
import Divider from "../../atom/Divider";
import DeleteConversation from "../DeleteConversation";
import FocusTrap from "focus-trap-react";

const ChatWindow: React.FC = () => {
    const cefQueryService = useRef(CefQueryService.instance);

    useEffect(() => {
        cefQueryService.current.requestMessages()
    }, []);

    return (
        <FocusTrap>
            <div className={styles.container}>
                <Divider />
                <div className={styles.topBar}>
                    <DeleteConversation />
                </div>

                <Divider />

                <div className={styles.chat}>
                    <ChatHistory/>
                    <ChatInput maxRows={5} />
                </div>
            </div>
        </FocusTrap>
    )
}

export default ChatWindow;