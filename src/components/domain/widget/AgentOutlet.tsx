import React, {useContext, useEffect, useRef} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from './AgentOutlet.module.css';
import MarkdownContainer from "../../atom/MarkdownContainer";
import WidgetInput from "./WidgetInput";
import AgentAvatar from "./AgentAvatar";

const AgentOutlet: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const {widgetMessage} = useContext(MessagesContext);

    useEffect(() => {
        ref.current?.scrollTo(0, 0);
    }, [widgetMessage]);


    return (
        <div className={styles.container}>
            <div className={styles.interact}>
                {widgetMessage && (
                    <div className={styles.messageContainer}>
                        <div className={styles.message}>
                            <MarkdownContainer text={widgetMessage.message} ref={ref} />
                        </div>
                    </div>
                )}
                <WidgetInput />
            </div>

            <AgentAvatar emotion={widgetMessage?.emotion} />
        </div>
    )
}

export default AgentOutlet;