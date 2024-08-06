import React, {useCallback, useRef, useState} from "react";
import CefQueryService from "../../../service/CefQueryService";
import styles from './ChatInput.module.css'
import {TextInput} from "../../atom/TextInput";
import {Button} from "../../atom/Button";
import {MessageOrigin} from "../../../model/Message";
import {MaterialSymbol} from "react-material-symbols";

const ChatInput: React.FC = () => {
    const cefQueryService = useRef(CefQueryService.instance);
    const [message, setMessage] = useState("");

    const sendMessage = useCallback(
        () => {
            cefQueryService.current.sendInput({message, origin: MessageOrigin.USER})
            setMessage("")
        },
        [cefQueryService, message],
    );

    return (
        <div className={styles.container}>
            <TextInput value={message} onChange={setMessage} placeholder={"Sende eine Nachricht"} onEnter={sendMessage} />
            <div className={styles.buttonContainer}>
                <Button onClick={sendMessage}>
                    <MaterialSymbol icon={"arrow_upward"} size={16} color={"white"} />
                </Button>
            </div>
        </div>
    )
}

export default ChatInput;