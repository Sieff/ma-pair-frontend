import React, {PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ChatMessageModel} from "../model/ChatMessageModel";

interface MessagesContextValue {
    messages: ChatMessageModel[];
    setMessages: (messages: ChatMessageModel[]) => void
}

export const MessagesContext = React.createContext({messages: [], setMessages: () => {}} as MessagesContextValue);


export const MessagesContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [messages, setMessages] = useState([] as ChatMessageModel[]);
    const contextValue = useMemo(() => {
        return {messages, setMessages}
    }, [messages, setMessages]);

    const queue = useRef<string[]>([]);
    const processing = useRef(false);

    const processQueue = useCallback(() => {
        if (queue.current.length > 0 && !processing.current) {
            processing.current = true;
            const data = queue.current.shift()!;
            const newMessages = JSON.parse(data) as ChatMessageModel[];
            setMessages(newMessages);
            processing.current = false;
            // Recursively process the next message
            processQueue();
        }
    }, [setMessages]);

    const publishMessage = useCallback(
        (message: string) => {
            queue.current.push(message);
            processQueue();
        },
        [processQueue],
    );

    useEffect(() => {
        const _window = window as any;
        _window.setData = publishMessage;
    }, [publishMessage]);

    return (<MessagesContext.Provider value={contextValue}>
        {children}
    </MessagesContext.Provider>)
}