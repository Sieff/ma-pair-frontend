import React, {useCallback, useRef, useState} from "react";
import CefQueryService from "../../service/CefQueryService";
import styles from './ChatInput.module.css'
import TextInput from "../atom/TextInput";
import Button from "../atom/Button";
import {MessageOrigin} from "../../model/Message";
import {MaterialSymbol} from "react-material-symbols";

interface ChatInputProps {
    onSendMessage?: () => void,
    maxRows?: number
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage, maxRows}) => {
    const cefQueryService = useRef(CefQueryService.instance);
    const [message, setMessage] = useState("");

    const sendMessage = useCallback(
        () => {
            if (message === "") return

            cefQueryService.current.sendInput({message, origin: MessageOrigin.USER})

            setMessage("")
            if (onSendMessage) {
                onSendMessage()
            }
        },
        [message, onSendMessage],
    );

    return (
        <div className={styles.container}>
            <TextInput value={message} onChange={setMessage} placeholder={"Sende eine Nachricht"} onEnter={sendMessage} maxRows={maxRows ?? 1}/>
            <div className={styles.buttonContainer}>
                <Button onClick={sendMessage} disabled={message === ""}>
                    <MaterialSymbol icon={"send"} size={16} color={"white"} />
                </Button>
            </div>
        </div>
    )
}

export default ChatInput;