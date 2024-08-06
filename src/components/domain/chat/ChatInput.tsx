import React, {useCallback, useRef, useState} from "react";
import CefQueryService from "../../../service/CefQueryService";
import styles from './ChatInput.module.css'
import {TextInput} from "../../atom/TextInput";
import {Button} from "../../atom/Button";
import {MessageOrigin} from "../../../model/Message";

const ChatInput: React.FC = () => {
    const cefQueryService = useRef(CefQueryService.instance);
    const [message, setMessage] = useState("");

    const sendMessage = useCallback(
        () => {
            cefQueryService.current.sendInput({message, origin: MessageOrigin.USER})
        },
        [cefQueryService, message],
    );

    return (
        <div className={styles.container}>
            <TextInput onChange={setMessage} placeholder={"Sende eine Nachricht"} />
            <Button onClick={sendMessage}>Send</Button>
        </div>
    )
}

export default ChatInput;