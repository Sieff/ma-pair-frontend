import React, {useEffect, useRef} from "react";
import CefQueryService from "../../../service/CefQueryService";
import AgentOutlet from "./AgentOutlet";

const WidgetWindow: React.FC = () => {
    const cefQueryService = useRef(CefQueryService.instance);

    useEffect(() => {
        cefQueryService.current.requestMessages()
    }, []);

    return (
        <AgentOutlet />
    )
}

export default WidgetWindow;