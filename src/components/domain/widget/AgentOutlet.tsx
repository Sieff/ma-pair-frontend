import React, {useContext, useEffect, useRef} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from './AgentOutlet.module.css';
import MarkdownContainer from "../../atom/MarkdownContainer";
import WidgetInput from "./WidgetInput";
import AgentAvatar from "./AgentAvatar";

const AgentOutlet: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const {temporaryMessage} = useContext(MessagesContext);

    useEffect(() => {
        ref.current?.scrollTo(0, 0);
    }, [temporaryMessage]);


    return (
        <div className={styles.container}>
            <div className={styles.interact}>
                {temporaryMessage && (
                    <div className={styles.messageContainer}>
                        <div className={styles.message}>
                            <MarkdownContainer text={temporaryMessage.message} ref={ref} />
                        </div>
                    </div>
                )}
                <WidgetInput />
            </div>

            <AgentAvatar emotion={temporaryMessage?.emotion} />
        </div>
    )
}

export default AgentOutlet;