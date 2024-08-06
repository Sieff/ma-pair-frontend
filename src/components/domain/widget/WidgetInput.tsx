import React, {useContext} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from "./WidgetInput.module.css"
import {Button, ButtonVariant} from "../../atom/Button";
import {MaterialSymbol} from "react-material-symbols";

const WidgetInput: React.FC = () => {
    const {temporaryMessage} = useContext(MessagesContext);

    return (<div className={styles.container}>
        {temporaryMessage?.quickReactions.map(reaction => {
            return (<Button onClick={() => {}} variant={ButtonVariant.REGULAR}>{reaction}</Button>)
        })}
        <Button onClick={() => {}} >
            <MaterialSymbol icon={"chat_bubble"} size={16} color={"white"}/>
        </Button>
    </div>)
}

export default WidgetInput