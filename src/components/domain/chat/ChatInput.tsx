import React, {useCallback, useContext, useRef, useState} from "react";
import CefQueryService from "../../../service/CefQueryService";
import styles from './ChatInput.module.css'
import TextInput from "../../atom/TextInput";
import Button from "../../atom/Button";
import {MessageOrigin} from "../../../model/Message";
import {MaterialSymbol} from "react-material-symbols";
import {MessagesContext} from "../../../context/MessagesContext";
import QuickReaction from "../QuickReaction";

interface ChatInputProps {
    onSendMessage?: () => void,
    maxRows?: number
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage, maxRows}) => {
    const cefQueryService = useRef(CefQueryService.instance);
    const {temporaryMessage} = useContext(MessagesContext);
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
            {temporaryMessage && (
                <QuickReaction reactions={temporaryMessage.reactions} widget={false} />
            )}
            <div className={styles.inputContainer}>
                <TextInput value={message} onChange={setMessage} placeholder={"Sende eine Nachricht"} onEnter={sendMessage} maxRows={maxRows ?? 1}/>
                <div className={styles.buttonContainer}>
                    <Button onClick={sendMessage} disabled={message === ""}>
                        <MaterialSymbol icon={"send"} size={16} color={"white"} />
                    </Button>
                </div>
            </div>
        </div>
)}

export default ChatInput;
