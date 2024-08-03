import React, {useContext, useMemo} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from './Widget.module.css';
import {MessageOrigin} from "../../../model/ChatMessageModel";
import MarkdownContainer from "../../atom/MarkdownContainer";

const Widget: React.FC = () => {
    const {messages} = useContext(MessagesContext);

    const displayMessage = useMemo(() => {
        const agentMessages = messages.filter(message => message.origin === MessageOrigin.AGENT);
        if (agentMessages.length > 0) {
            return agentMessages[agentMessages.length - 1]
        }
        return null
    }, [messages]);

    return (
        <div className={styles.container}>
            {displayMessage && (
                <div className={styles.message}>
                    <MarkdownContainer text={displayMessage.message} />
                </div>
            )}
            <img className={styles.avatar} src={"/avatar-full.png"} alt={"Avatar of the assistant"} />
        </div>
    )
}

export default Widget;