import {AssistantMessage, Message} from "./Message";

export interface DataPacket {
    packetType: DataPacketType
}

export enum DataPacketType {
    UPDATE_MESSAGES = "UPDATE_MESSAGES",
    UPDATE_WIDGET_MESSAGE = "UPDATE_WIDGET_MESSAGE",
    REQUEST_TEXT_INPUT_FOCUS = "REQUEST_TEXT_INPUT_FOCUS",
    UPDATE_LOG_STATUS = "UPDATE_LOG_STATUS",
    UPDATE_BUNDLE = "UPDATE_BUNDLE",
    UPDATE_COLOR_SCHEME = "UPDATE_COLOR_SCHEME"
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

export interface UpdateLogStatusPacket extends DataPacket {
    success: boolean
}

export interface UpdateBundlePacket extends DataPacket {
    locale: string
}

export interface UpdateColorSchemePacket extends DataPacket {
    scheme: string
}