import React, {useContext, useEffect, useMemo, useRef} from "react";
import styles from './ChatHistory.module.css'
import ChatMessage from "./ChatMessage";
import {MessagesContext} from "../../../context/MessagesContext";
import useOnScreen from "../../../hooks/useOnScreen";
import {ButtonVariant} from "../../atom/Button";
import MessageRelationService from "../../../service/MessageRelationService";
import {AssistantMessage, Emotion, MessageOrigin, Phase} from "../../../model/Message";
import IconButton from "../../atom/IconButton";
import {ProcessingStatusContext} from "../../../context/ProcessingStatusContext";
import MessageRelation from "../../../model/MessageRelation";

const ChatHistory: React.FC = () => {
    const messageRelationService = useRef<MessageRelationService>(MessageRelationService.instance)
    const {messages} = useContext(MessagesContext);
    const {processing} = useContext(ProcessingStatusContext);

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

        if (processing) {
            scrollToBottom()
        } else {
            scrollToLast()
        }
    }, [messages, processing]);

    const messageRelations = useMemo(() => {
        return messageRelationService.current.getMessageRelations(messages)
    }, [messages]);

    const processingMessage = {
        origin: MessageOrigin.AGENT,
        phase: Phase.CLARIFY,
        message: "...",
        emotion: Emotion.HAPPY,
        reactions: [],
        proactive: false
    } as AssistantMessage

    const processingMessageRelation = {
        firstInBlock: true,
        inLastBlock: true,
        lastInSelfInitiatedBlock: true,
        secondToLast: false
    } as MessageRelation


    return (
        <div className={styles.container}>
            <div className={styles.messagesContainer}>
                {messages.map((message, idx) => (
                    <>
                        <ChatMessage key={idx} message={message} messageRelation={messageRelations[idx]} isLast={idx === messages.length - 1} ref={ref => {
                            if (idx === messages.length - 1) {
                                setRefElement(ref)
                            }
                        }} />
                    </>
                ))}
                {processing && (
                    <ChatMessage message={processingMessage} messageRelation={processingMessageRelation} isLast={true} />
                )}
            </div>

            <div className={styles.bottomAnchor} ref={messagesBottomRef} />

            {!bottomIsVisible && (
                <div className={styles.toBottom}>
                    <IconButton onClick={scrollToBottom} icon={"arrow_downward"} variant={ButtonVariant.REGULAR}/>
                </div>
            )}
        </div>
    )
}

export default ChatHistory;