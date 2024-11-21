import React, {useCallback, useRef} from "react";
import styles from "./QuickReaction.module.css";
import Button, {ButtonVariant} from "../atom/Button";
import {MessageOrigin} from "../../model/Message";
import CefQueryService from "../../service/CefQueryService";

interface QuickReactionsProps {
    reactions: string[],
    widget: boolean
}

const QuickReaction: React.FC<React.PropsWithChildren<QuickReactionsProps>> = ({reactions, widget, children}) => {
    const cefQueryService = useRef(CefQueryService.instance);

    const sendMessage = useCallback(
        (message: string) => {
            cefQueryService.current.sendQuickReactionInput({origin: MessageOrigin.USER, message: message})
        },
        [],
    );
    
    
    return (
        <div className={styles.row}>
            {reactions.map(reaction => {
                return (<Button onClick={() => sendMessage(reaction)} variant={ButtonVariant.REGULAR}>{reaction}</Button>)
            })}
            {children}
        </div>
    )
}

export default QuickReaction;