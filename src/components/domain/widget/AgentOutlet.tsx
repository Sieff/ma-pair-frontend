import React, {useContext} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from './AgentOutlet.module.css';
import MarkdownContainer from "../../atom/MarkdownContainer";
import WidgetInput from "./WidgetInput";

const AgentOutlet: React.FC = () => {
    const {temporaryMessage} = useContext(MessagesContext);

    return (
        <div className={styles.container}>
            <div className={styles.interact}>
                {temporaryMessage && (
                    <div className={styles.messageContainer}>
                        <div className={styles.message}>
                            <MarkdownContainer text={temporaryMessage.message} />
                        </div>
                    </div>
                )}
                <WidgetInput />
            </div>

            <img className={styles.avatar} src={"/avatar-full.png"} alt={"Avatar of the assistant"} />
        </div>
    )
}

export default AgentOutlet;