export interface ChatMessageModel {
    origin: MessageOrigin;
    message: string;
}

export enum MessageOrigin {
    AGENT = "0",
    USER = "1"
}

