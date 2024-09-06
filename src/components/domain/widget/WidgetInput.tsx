import React, {useContext, useRef} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from "./WidgetInput.module.css"
import Button from "../../atom/Button";
import {MaterialSymbol} from "react-material-symbols";
import CefQueryService from "../../../service/CefQueryService";
import QuickReaction from "../QuickReaction";
import FocusTrap from "focus-trap-react";

const WidgetInput: React.FC = () => {
    const {widgetMessage} = useContext(MessagesContext);
    const cefQueryService = useRef(CefQueryService.instance);

    return (<div className={styles.container}>
        {widgetMessage && (
            <FocusTrap>
                <QuickReaction reactions={widgetMessage.reactions} widget={true}>
                    <div className={styles.buttonContainer}>
                        <Button onClick={() => {cefQueryService.current.requestToolWindowFocus()}} >
                            <MaterialSymbol icon={"chat_bubble"} size={16} color={"white"}/>
                        </Button>
                    </div>
                </QuickReaction>
            </FocusTrap>
        )}
    </div>)
}

export default WidgetInput