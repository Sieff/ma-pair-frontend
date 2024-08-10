import React, {useCallback, useContext, useState} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from "./WidgetInput.module.css"
import {Button, ButtonVariant} from "../../atom/Button";
import {MaterialSymbol} from "react-material-symbols";
import ChatInput from "../ChatInput";

const WidgetInput: React.FC = () => {
    const {temporaryMessage} = useContext(MessagesContext);
    const [showTextInput, setShowTextInput] = useState(false);



    return (<div className={styles.container}>
        <div className={styles.topRow}>
            {temporaryMessage?.quickReactions.map(reaction => {
                return (<Button onClick={() => {}} variant={ButtonVariant.REGULAR}>{reaction}</Button>)
            })}
            <Button onClick={() => {setShowTextInput(true)}} >
                <MaterialSymbol icon={"chat_bubble"} size={16} color={"white"}/>
            </Button>
        </div>
        {showTextInput && (
            <ChatInput onSendMessage={() => {setShowTextInput(false)}}/>
        )}
    </div>)
}

export default WidgetInput