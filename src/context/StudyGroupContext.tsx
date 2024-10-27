import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    DataPacketType,
    DataPacket,
    UpdateStudyGroup
} from "../model/DataPacket";
import DataPacketService from "../service/DataPacketService";

interface StudyGroupContextValue {
    studyGroup: number;
}

export const StudyGroupContext = React.createContext({studyGroup: 0} as StudyGroupContextValue);


export const StudyGroupContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [studyGroup, setStudyGroup] = useState(0);
    const contextValue = useMemo(() => {
        return {studyGroup}
    }, [studyGroup]);

    const dataPacketService = useRef(DataPacketService.instance);

    const updateStudyGroup = useCallback(
        (packet: DataPacket) => {
            setStudyGroup((packet as UpdateStudyGroup).studyGroup);
        },
        [setStudyGroup]
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.UPDATE_STUDY_GROUP, (packet) => {updateStudyGroup(packet)});
    }, [updateStudyGroup]);

    return (<StudyGroupContext.Provider value={contextValue}>
        {children}
    </StudyGroupContext.Provider>)
}