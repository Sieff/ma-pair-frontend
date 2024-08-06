import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {DataPacketType, UpdateTemporaryMessagePacket, UpdateMessagesPacket, DataPacket} from "../model/DataPacket";
import DataPacketService from "../service/DataPacketService";
import {AssistantMessage, Message, MessageOrigin} from "../model/Message";

interface MessagesContextValue {
    messages: Message[];
    temporaryMessage: AssistantMessage | undefined;
}

export const MessagesContext = React.createContext({messages: [], temporaryMessage: undefined} as MessagesContextValue);


export const MessagesContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [messages, setMessages] = useState([] as Message[]);
    const [temporaryMessage, setTemporaryMessage] = useState(undefined as AssistantMessage | undefined);
    const contextValue = useMemo(() => {
        return {messages, temporaryMessage}
    }, [messages, temporaryMessage]);

    const dataPacketService = useRef(DataPacketService.instance);

    const updateMessages = useCallback(
        (packet: DataPacket) => {
            setMessages((packet as UpdateMessagesPacket).messages);
            setTemporaryMessage((packet as UpdateMessagesPacket).temporaryMessage)
        },
        [setMessages, setTemporaryMessage]
    );

    const updateTemporaryMessage = useCallback(
        (packet: DataPacket) => {
            setTemporaryMessage((packet as UpdateTemporaryMessagePacket).message)
        },
        [setTemporaryMessage]
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.UPDATE_MESSAGES, (packet) => {updateMessages(packet)});
        dataPacketService.current.setCallback(DataPacketType.UPDATE_TEMPORARY_MESSAGE, (packet) => {updateTemporaryMessage(packet)});

        // Dev setup
        const _window = window as any;
        _window.setDevMessages = () => {
            setMessages([
                {origin: MessageOrigin.USER, message: "hi"},
                {origin: MessageOrigin.AGENT, message: "was geht brudi ich hab gerade gar nicht ma so viel zu tun ich bin jetzt echt weit mit dem client und der kommt gut voran"},
                {origin: MessageOrigin.USER, message: "nmhby"},
                {origin: MessageOrigin.AGENT, message: "## devnnn \n\n - erstens \n - zweitens \n\n askjldfhaklshfakljshdfkljahklajhkljashfkljahsfkljashflahsflhsdljafhaslfkjhasklfjhalkfjhaslkfhlkfhklafhlakhflkashflkasjhfkldsjhlkasjhf \n\n moin"},
                {origin: MessageOrigin.USER, message: "Fehler bei der Kommunikation mit dem Agenten"},
                {origin: MessageOrigin.AGENT, message: "Fehler bei der Kommunikation mit dem Agenten"},
            ])
        }
    }, [updateTemporaryMessage, updateMessages]);

    return (<MessagesContext.Provider value={contextValue}>
        {children}
    </MessagesContext.Provider>)
}