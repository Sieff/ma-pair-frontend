import React, {useEffect, useRef} from "react";
import CefQueryService from "../../../service/CefQueryService";
import AgentOutlet from "./AgentOutlet";
import styles from "./WidgetWindow.module.css";
import FocusTrap from "focus-trap-react";

const WidgetWindow: React.FC = () => {
    const cefQueryService = useRef(CefQueryService.instance);

    useEffect(() => {
        cefQueryService.current.requestMessages()
    }, []);

    return (
        <FocusTrap>
            <div className={styles.container}>
                <AgentOutlet />
            </div>
        </FocusTrap>
    )
}

export default WidgetWindow;
