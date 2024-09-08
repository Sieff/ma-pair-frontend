import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    DataPacketType,
    DataPacket,
    UpdateLogStatusPacket
} from "../model/DataPacket";
import DataPacketService from "../service/DataPacketService";

interface LogStatusContextValue {
    success: boolean;
}

export const LogStatusContext = React.createContext({success: true} as LogStatusContextValue);


export const LogStatusContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [success, setSuccess] = useState(true);
    const contextValue = useMemo(() => {
        return {success}
    }, [success]);

    const dataPacketService = useRef(DataPacketService.instance);

    const updateLogStatus = useCallback(
        (packet: DataPacket) => {
            setSuccess((packet as UpdateLogStatusPacket).success);
        },
        [setSuccess]
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.UPDATE_LOG_STATUS, (packet) => {updateLogStatus(packet)});
    }, [updateLogStatus]);

    return (<LogStatusContext.Provider value={contextValue}>
        {children}
    </LogStatusContext.Provider>)
}