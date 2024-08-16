export interface Message {
    origin: MessageOrigin;
    message: string;
}

export enum MessageOrigin {
    AGENT = "AGENT",
    USER = "USER"
}

export interface AssistantMessage extends Message {
    emotion: Emotion
    reactions: string[],
    proactive: boolean
}

export enum Emotion {
    NEUTRAL = "NEUTRAL",
    HAPPY = "HAPPY",
    SAD = "SAD",
    CONFUSED = "CONFUSED",
}