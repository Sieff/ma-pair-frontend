import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import CefQueryService from "../../../service/CefQueryService";
import styles from './ChatInput.module.css'
import TextInput from "../../atom/TextInput";
import {MessageOrigin} from "../../../model/Message";
import {MessagesContext} from "../../../context/MessagesContext";
import QuickReaction from "../QuickReaction";
import {BundleContext, MessageCode} from "../../../context/BundleContext";
import IconButton from "../../atom/IconButton";

interface ChatInputProps {
    onSendMessage?: () => void,
    maxRows?: number
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage, maxRows}) => {
    const cefQueryService = useRef(CefQueryService.instance);
    const {widgetMessage} = useContext(MessagesContext);
    const [message, setMessage] = useState("");

    const {messages} = useContext(BundleContext);

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

    useEffect(() => {
        cefQueryService.current.inputChangedEvent()
    }, [message]);


    return (
        <div className={styles.container}>
            {widgetMessage && widgetMessage.reactions.length > 0 && (
                <div className={styles.quickReactionContainer}>
                    <QuickReaction reactions={widgetMessage.reactions} widget={false} />
                </div>
            )}
            <div className={styles.inputContainer}>
                <TextInput value={message}
                           onChange={setMessage}
                           placeholder={messages[MessageCode.send_a_message]}
                           onEnter={sendMessage}
                           maxRows={maxRows ?? 1}/>
                <div className={styles.buttonContainer}>
                    <IconButton onClick={sendMessage} icon={"send"} disabled={message === ""} />
                </div>
            </div>
        </div>
)}

export default ChatInput;
