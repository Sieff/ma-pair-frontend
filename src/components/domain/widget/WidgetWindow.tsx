import React, {useEffect, useRef} from "react";
import CefQueryService from "../../../service/CefQueryService";
import AgentOutlet from "./AgentOutlet";
import styles from "./WidgetWindow.module.css";

const WidgetWindow: React.FC = () => {
    const cefQueryService = useRef(CefQueryService.instance);

    useEffect(() => {
        cefQueryService.current.requestMessages()
        cefQueryService.current.requestStudyGroup()
    }, []);

    return (
        <div className={styles.container}>
            <AgentOutlet />
        </div>
    )
}

export default WidgetWindow;
