import React, {forwardRef} from "react";
import {AssistantMessage, Message, MessageOrigin} from "../../../model/Message";
import styles from './ChatMessage.module.css';
import MarkdownContainer from "../../atom/MarkdownContainer";
import MessageRelation from "../../../model/MessageRelation";
import {cls} from "../../../cls";

interface ChatMessageProps {
    message: Message;
    messageRelation: MessageRelation;
}

interface UserMessageProps {
    message: Message;
}

interface AssistantMessageProps {
    message: AssistantMessage;
    messageRelation: MessageRelation;
}

const ChatMessage: React.ForwardRefExoticComponent<ChatMessageProps & React.RefAttributes<HTMLDivElement>> =
    forwardRef<HTMLDivElement, ChatMessageProps>(({message, messageRelation}, ref) => {

        return (<div ref={ref}>
            {message.origin === MessageOrigin.USER ? (
                <UserMessage message={message} />
            ) : (
                <AgentMessage message={message as AssistantMessage} messageRelation={messageRelation}/>
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

const AgentMessage: React.FC<AssistantMessageProps> = ({message, messageRelation}) => {
    return (
        <div className={styles.agentMessageContainer}>
            {messageRelation.firstInBlock ? (
                <img className={cls(styles.avatarIcon, styles.avatarIconWidth)} src={"avatar-icon.png"} alt={"Chat message avatar icon of the Assistant"}></img>
            ) : (
                <div className={styles.avatarIconWidth} />
            )}
            <MarkdownContainer text={message.message} lowlight={message.proactive && !messageRelation.lastInSelfInitiatedBlock} />
        </div>
    )
}

export default ChatMessage;