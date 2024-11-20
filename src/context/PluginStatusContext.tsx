import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    DataPacketType,
    DataPacket,
    UpdatePluginStatusPacket
} from "../model/DataPacket";
import DataPacketService from "../service/DataPacketService";

interface LogStatusContextValue {
    status: string;
}

export const PluginStatusContext = React.createContext({status: ""} as LogStatusContextValue);


export const LogStatusContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [status, setStatus] = useState("");
    const contextValue = useMemo(() => {
        return {status}
    }, [status]);

    const dataPacketService = useRef(DataPacketService.instance);

    const updateLogStatus = useCallback(
        (packet: DataPacket) => {
            setStatus((packet as UpdatePluginStatusPacket).status);
        },
        [setStatus]
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.UPDATE_PLUGIN_STATUS, (packet) => {updateLogStatus(packet)});
    }, [updateLogStatus]);

    return (<PluginStatusContext.Provider value={contextValue}>
        {children}
    </PluginStatusContext.Provider>)
}