import React, {forwardRef, useCallback, useRef} from "react";
import {AssistantMessage, Message, MessageOrigin} from "../../../model/Message";
import styles from './ChatMessage.module.css';
import MarkdownContainer from "../../atom/MarkdownContainer";
import MessageRelation from "../../../model/MessageRelation";
import {cls} from "../../../cls";
import Button, {ButtonVariant} from "../../atom/Button";
import {MaterialSymbol} from "react-material-symbols";
import CefQueryService from "../../../service/CefQueryService";

interface ChatMessageProps {
    message: Message;
    messageRelation: MessageRelation;
    isLast: boolean;
}

interface UserMessageProps {
    message: Message;
}

interface AssistantMessageProps {
    message: AssistantMessage;
    messageRelation: MessageRelation;
    isLast: boolean;
}

const ChatMessage: React.ForwardRefExoticComponent<ChatMessageProps & React.RefAttributes<HTMLDivElement>> =
    forwardRef<HTMLDivElement, ChatMessageProps>(({message, messageRelation, isLast}, ref) => {

        return (<div ref={ref}>
            {message.origin === MessageOrigin.USER ? (
                <UserMessage message={message} />
            ) : (
                <AgentMessage message={message as AssistantMessage} messageRelation={messageRelation} isLast={isLast}/>
            )}
        </div>)
})

const UserMessage: React.FC<UserMessageProps> = ({message}) => {
    return (
        <div className={styles.userMessageContainer}>
            <div className={styles.userMessage}>
                <p className={styles.message}>
                    {message.message}
                </p>
            </div>
        </div>
    )
}

const AgentMessage: React.FC<AssistantMessageProps> = ({message, messageRelation, isLast}) => {
    const cefQueryService = useRef<CefQueryService>(CefQueryService.instance)

    const regenerateLastMessage = useCallback(
        () => {
            cefQueryService.current.regenerateLastMessage()
        },
        [],
    );

    return (
        <div className={styles.agentMessageContainer}>
            {messageRelation.firstInBlock ? (
                <div className={styles.iconWrapper}>
                    <img className={cls(styles.avatarIcon, styles.avatarIconWidth)} src={"avatar-icon.png"} alt={"Chat message avatar icon of the Assistant"}></img>
                </div>
            ) : (
                <div className={styles.avatarIconWidth} />
            )}
            <div className={styles.textContainer}>
                <MarkdownContainer text={message.message} lowlight={message.proactive && !messageRelation.lastInSelfInitiatedBlock} />
                {isLast && (
                    <Button onClick={regenerateLastMessage} variant={ButtonVariant.REGULAR}>
                        <MaterialSymbol icon={"replay"} size={16} color={"white"} />
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ChatMessage;