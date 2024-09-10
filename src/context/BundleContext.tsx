import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {DataPacket, DataPacketType, UpdateBundlePacket} from "../model/DataPacket";
import DataPacketService from "../service/DataPacketService";
import {Dictionary} from "../util/Dictionary";

interface BundleContextValue {
    messages: Dictionary<MessageCode, string>;
}

export enum BundleLocale {
    de,
    en
}

export enum MessageCode {
    send_a_message,
    confirm,
    cancel,
    log_deactivated,
    reset_conversation
}

const deMessages: Dictionary<MessageCode, string> = {
    [MessageCode.send_a_message]: "Sende eine Nachricht",
    [MessageCode.confirm]: "OK",
    [MessageCode.cancel]: "Abbrechen",
    [MessageCode.log_deactivated]: "Fehler beim Erstellen des Logs",
    [MessageCode.reset_conversation]: "Möchtest du wirklich den gesamten Nachrichtenverlauf löschen?"
}

const enMessages: Dictionary<MessageCode, string> = {
    [MessageCode.send_a_message]: "Send a message",
    [MessageCode.confirm]: "OK",
    [MessageCode.cancel]: "Cancel",
    [MessageCode.log_deactivated]: "Error creating log file",
    [MessageCode.reset_conversation]: "Do you really want to reset the entire conversation?"
}

const bundles: Dictionary<BundleLocale, Dictionary<MessageCode, string>> = {
    [BundleLocale.de]: deMessages,
    [BundleLocale.en]: enMessages
}

export const BundleContext = React.createContext({messages: enMessages} as BundleContextValue);


export const BundleContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [bundle, setBundle] = useState(enMessages);
    const contextValue = useMemo(() => {
        return {messages: bundle}
    }, [bundle]);

    const dataPacketService = useRef(DataPacketService.instance);

    const updateBundle = useCallback(
        (packet: DataPacket) => {
            const locale = (packet as UpdateBundlePacket).locale
            if (locale === 'de') {
                setBundle(bundles[BundleLocale.de]);
            } else {
                setBundle(bundles[BundleLocale.en])
            }

        },
        [setBundle]
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.UPDATE_BUNDLE, (packet) => {updateBundle(packet)});
    }, [updateBundle]);

    return (<BundleContext.Provider value={contextValue}>
        {children}
    </BundleContext.Provider>)
}