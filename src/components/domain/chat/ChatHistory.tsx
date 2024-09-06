import React, {useCallback, useContext, useEffect, useMemo, useRef} from "react";
import styles from './ChatHistory.module.css'
import ChatMessage from "./ChatMessage";
import {MessagesContext} from "../../../context/MessagesContext";
import useOnScreen from "../../../hooks/useOnScreen";
import {MaterialSymbol} from "react-material-symbols";
import Button, {ButtonVariant} from "../../atom/Button";
import MessageRelationService from "../../../service/MessageRelationService";
import {AssistantMessage, MessageOrigin} from "../../../model/Message";
import CefQueryService from "../../../service/CefQueryService";

const ChatHistory: React.FC = () => {
    const messageRelationService = useRef<MessageRelationService>(MessageRelationService.instance)
    const cefQueryService = useRef<CefQueryService>(CefQueryService.instance)
    const {messages} = useContext(MessagesContext);

    const lastElement = useRef<HTMLDivElement | null>(null)
    const messagesBottomRef = useRef<HTMLDivElement | null>(null)
    const bottomIsVisible = useOnScreen(messagesBottomRef)

    const scrollToBottom = () => {
        messagesBottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    const scrollToLast = () => {
        lastElement.current?.scrollIntoView({ behavior: "smooth" })
    }

    const setRefElement = (el: HTMLDivElement | null) => {
        if (!el) return;
        lastElement.current = el;
    };

    useEffect(() => {
        if (messages.length === 0) {
            return;
        }

        const lastMessage = messages[messages.length - 1]
        if (lastMessage.origin === MessageOrigin.AGENT) {
            if ((lastMessage as AssistantMessage).proactive) {
                return
            }
        }

        scrollToLast()
    }, [messages]);

    const messageRelations = useMemo(() => {
        return messageRelationService.current.getMessageRelations(messages)
    }, [messages]);

    const regenerateLastMessage = useCallback(
        () => {
            cefQueryService.current.regenerateLastMessage()
        },
        [],
    );


    return (
        <div className={styles.container}>
            <div className={styles.messagesContainer}>
                {messages.map((message, idx) => (
                    <>
                        <ChatMessage key={idx} message={message} messageRelation={messageRelations[idx]} ref={ref => {
                            if (idx === messages.length - 1) {
                                setRefElement(ref)
                            }
                        }} />
                        {message.origin === MessageOrigin.AGENT && idx === messages.length - 1 && (
                            <div className={styles.regenerateButton}>
                                <Button onClick={regenerateLastMessage} variant={ButtonVariant.REGULAR}>
                                    <MaterialSymbol icon={"replay"} size={16} color={"white"} />
                                </Button>
                            </div>
                        )}
                    </>
                ))}
            </div>

            <div ref={messagesBottomRef} />

            {!bottomIsVisible && (
                <div className={styles.toBottom}>
                    <Button variant={ButtonVariant.REGULAR} onClick={scrollToBottom} >
                        <MaterialSymbol icon={"arrow_downward"} size={16} color={"white"}/>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ChatHistory;