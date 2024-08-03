import React, {useCallback, useState} from "react";
import SendMessageService from "../../../service/SendMessageService";
import styles from './ChatInput.module.css'
import {TextInput} from "../../atom/TextInput";
import {Button} from "../../atom/Button";

const ChatInput: React.FC = () => {
    const sendMessageService = SendMessageService.instance;
    const [message, setMessage] = useState("");

    const sendMessage = useCallback(
        () => {
            sendMessageService.sendMessage(message)
        },
        [sendMessageService, message],
    );

    return (
        <div className={styles.container}>
            <TextInput onChange={setMessage} placeholder={"Sende eine Nachricht"} />
            <Button onClick={sendMessage}>Send</Button>
        </div>
    )
}

export default ChatInput;