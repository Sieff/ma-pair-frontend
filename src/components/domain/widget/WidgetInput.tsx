import React, {useContext, useRef} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from "./WidgetInput.module.css"
import Button, {ButtonVariant} from "../../atom/Button";
import {MaterialSymbol} from "react-material-symbols";
import {cls} from "../../../cls";
import CefQueryService from "../../../service/CefQueryService";
import {MessageOrigin} from "../../../model/Message";

const WidgetInput: React.FC = () => {
    const {temporaryMessage} = useContext(MessagesContext);
    const cefQueryService = useRef(CefQueryService.instance);

    return (<div className={styles.container}>
        <div className={cls(styles.topRow, styles.previousElement)}>
            {temporaryMessage?.quickReactions.map(reaction => {
                return (<Button onClick={() => {cefQueryService.current.sendWidgetInput({origin: MessageOrigin.USER, message: reaction})}} variant={ButtonVariant.REGULAR}>{reaction}</Button>)
            })}
            <Button onClick={() => {cefQueryService.current.requestToolWindowFocus()}} >
                <MaterialSymbol icon={"chat_bubble"} size={16} color={"white"}/>
            </Button>
        </div>
    </div>)
}

export default WidgetInput