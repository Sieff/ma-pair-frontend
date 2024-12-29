import React, {forwardRef, useContext} from "react";
import {AssistantMessage, Message, MessageOrigin} from "../../../model/Message";
import styles from './ChatMessage.module.css';
import MarkdownContainer from "../../atom/MarkdownContainer";
import MessageRelation from "../../../model/MessageRelation";
import {cls} from "../../../util/cls";
import AgentAvatar from "../widget/AgentAvatar";
import {MessagesContext} from "../../../context/MessagesContext";
import {StudyGroupContext} from "../../../context/StudyGroupContext";

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
    const {widgetMessage} = useContext(MessagesContext);
    const {studyGroup} = useContext(StudyGroupContext);

    return (
        <div className={styles.agentMessageContainer}>
            {studyGroup !== 2 && (
                <>
                    {messageRelation.firstInBlock && (
                        <div className={cls(!isLast && styles.iconWrapper)}>
                            <img className={cls(styles.avatarIcon, styles.avatarIconWidth)} src={"baseline-icon.png"} alt={"Chat message avatar icon of the Assistant"}></img>
                        </div>
                    )}
                    {!messageRelation.firstInBlock && (
                        <div className={styles.avatarIconWidth} />
                    )}
                </>
            )}
            {studyGroup === 2 && (
                <>
                    {messageRelation.firstInBlock && !messageRelation.inLastBlock && (
                        <div className={cls(!isLast && styles.iconWrapper)}>
                            <img className={cls(styles.avatarIcon, styles.avatarIconWidth)} src={"avatar-icon.png"} alt={"Chat message avatar icon of the Assistant"}></img>
                        </div>
                    )}
                    {isLast && (
                        <AgentAvatar emotion={widgetMessage?.emotion} />
                    )}
                    {((!messageRelation.firstInBlock && !isLast) || (messageRelation.firstInBlock && messageRelation.inLastBlock && !isLast)) && (
                        <div className={styles.avatarIconWidth} />
                    )}
                </>
            )}
            <div className={styles.textContainer}>
                <MarkdownContainer text={message.message} lowlight={message.proactive && !messageRelation.lastInSelfInitiatedBlock} />
            </div>
        </div>
    )
}

export default ChatMessage;