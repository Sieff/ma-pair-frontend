import React, {useContext, useRef} from "react";
import {MessagesContext} from "../../../context/MessagesContext";
import styles from "./WidgetInput.module.css"
import CefQueryService from "../../../service/CefQueryService";
import QuickReaction from "../QuickReaction";
import FocusTrap from "focus-trap-react";
import IconButton from "../../atom/IconButton";

const WidgetInput: React.FC = () => {
    const {widgetMessage} = useContext(MessagesContext);
    const cefQueryService = useRef(CefQueryService.instance);

    return (<div className={styles.container}>
        {widgetMessage && (
            <FocusTrap>
                <QuickReaction reactions={widgetMessage.reactions} widget={true}>
                    <div className={styles.buttonContainer}>
                        <IconButton onClick={() => {cefQueryService.current.requestToolWindowFocus()}} icon={"chat_bubble"} />
                    </div>
                </QuickReaction>
            </FocusTrap>
        )}
    </div>)
}

export default WidgetInput