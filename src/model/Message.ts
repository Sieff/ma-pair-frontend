export interface Message {
    origin: MessageOrigin;
    message: string;
}

export interface QuickReactionMessage extends Message {
    quickReaction: boolean,
}

export enum MessageOrigin {
    AGENT = "AGENT",
    USER = "USER"
}

export interface AssistantMessage extends Message {
    phase: Phase,
    emotion: Emotion
    reactions: string[],
    proactive: boolean
}

export enum Emotion {
    HAPPY = "HAPPY",
    BORED = "BORED",
    PERPLEXED = "PERPLEXED",
    CONFUSED = "CONFUSED",
    CONCENTRATED = "CONCENTRATED",
    DEPRESSED = "DEPRESSED",
    SURPRISED = "SURPRISED",
    ANGRY = "ANGRY",
    ANNOYED = "ANNOYED",
    SAD = "SAD",
    FEARFUL = "FEARFUL",
    ANTICIPATING = "ANTICIPATING",
    DISGUST = "DISGUST",
    JOY = "JOY"
}

export enum Phase {
    CLARIFY = "CLARIFY",
    IDEA = "IDEA",
    DEVELOP = "DEVELOP",
    IMPLEMENT = "IMPLEMENT",
}