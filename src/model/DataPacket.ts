import {AssistantMessage, Message} from "./Message";

export interface DataPacket {
    packetType: DataPacketType
}

export enum DataPacketType {
    UPDATE_MESSAGES = "UPDATE_MESSAGES",
    UPDATE_WIDGET_MESSAGE = "UPDATE_WIDGET_MESSAGE",
    REQUEST_TEXT_INPUT_FOCUS = "REQUEST_TEXT_INPUT_FOCUS"
}

export interface UpdateMessagesPacket extends DataPacket {
    messages: Message[]
    widgetMessage?: AssistantMessage
}

export interface UpdateWidgetMessagePacket extends DataPacket {
    message: AssistantMessage
}

export interface RequestTextInputFocusPacket extends DataPacket {
}