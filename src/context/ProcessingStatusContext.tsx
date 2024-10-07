import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    DataPacketType,
    DataPacket,
    UpdateProcessingStatusPacket
} from "../model/DataPacket";
import DataPacketService from "../service/DataPacketService";

interface ProcessingStatusContextValue {
    processing: boolean;
}

export const ProcessingStatusContext = React.createContext({processing: false} as ProcessingStatusContextValue);


export const ProcessingStatusContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [processing, setProcessing] = useState(false);
    const contextValue = useMemo(() => {
        return {processing}
    }, [processing]);

    const dataPacketService = useRef(DataPacketService.instance);

    const updateProcessingStatus = useCallback(
        (packet: DataPacket) => {
            setProcessing((packet as UpdateProcessingStatusPacket).processing);
        },
        [setProcessing]
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.UPDATE_PROCESSING_STATUS, (packet) => {updateProcessingStatus(packet)});
    }, [updateProcessingStatus]);

    return (<ProcessingStatusContext.Provider value={contextValue}>
        {children}
    </ProcessingStatusContext.Provider>)
}