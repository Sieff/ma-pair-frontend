import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {DataPacketType, UpdateWidgetMessagePacket, UpdateMessagesPacket, DataPacket} from "../model/DataPacket";
import DataPacketService from "../service/DataPacketService";
import {AssistantMessage, Message, MessageOrigin} from "../model/Message";

interface MessagesContextValue {
    messages: Message[];
    widgetMessage: AssistantMessage | undefined;
}

export const MessagesContext = React.createContext({messages: [], widgetMessage: undefined} as MessagesContextValue);


export const MessagesContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [messages, setMessages] = useState([] as Message[]);
    const [widgetMessage, setWidgetMessage] = useState(undefined as AssistantMessage | undefined);
    const contextValue = useMemo(() => {
        return {messages, widgetMessage}
    }, [messages, widgetMessage]);

    const dataPacketService = useRef(DataPacketService.instance);

    const updateMessages = useCallback(
        (packet: DataPacket) => {
            setMessages((packet as UpdateMessagesPacket).messages);
            setWidgetMessage((packet as UpdateMessagesPacket).widgetMessage)
        },
        [setMessages, setWidgetMessage]
    );

    const updateWidgetMessage = useCallback(
        (packet: DataPacket) => {
            setWidgetMessage((packet as UpdateWidgetMessagePacket).message)
        },
        [setWidgetMessage]
    );

    useEffect(() => {
        dataPacketService.current.setCallback(DataPacketType.UPDATE_MESSAGES, (packet) => {updateMessages(packet)});
        dataPacketService.current.setCallback(DataPacketType.UPDATE_WIDGET_MESSAGE, (packet) => {updateWidgetMessage(packet)});

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
    }, [updateWidgetMessage, updateMessages]);

    return (<MessagesContext.Provider value={contextValue}>
        {children}
    </MessagesContext.Provider>)
}