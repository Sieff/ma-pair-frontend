export interface ChatMessageModel {
    origin: MessageOrigin;
    message: string;
}

export enum MessageOrigin {
    AGENT = "AGENT",
    USER = "USER"
}

