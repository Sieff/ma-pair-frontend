import {AssistantMessage, Message} from "./Message";

export interface DataPacket {
    packetType: DataPacketType
}

export enum DataPacketType {
    UPDATE_MESSAGES = "UPDATE_MESSAGES",
    UPDATE_WIDGET_MESSAGE = "UPDATE_WIDGET_MESSAGE",
    REQUEST_TEXT_INPUT_FOCUS = "REQUEST_TEXT_INPUT_FOCUS",
    UPDATE_PLUGIN_STATUS = "UPDATE_PLUGIN_STATUS",
    UPDATE_BUNDLE = "UPDATE_BUNDLE",
    UPDATE_COLOR_SCHEME = "UPDATE_COLOR_SCHEME",
    UPDATE_PROCESSING_STATUS = "UPDATE_PROCESSING_STATUS",
    UPDATE_STUDY_GROUP = "UPDATE_STUDY_GROUP"
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

export interface UpdatePluginStatusPacket extends DataPacket {
    status: string
}

export interface UpdateProcessingStatusPacket extends DataPacket {
    processing: boolean
}

export interface UpdateBundlePacket extends DataPacket {
    locale: string
}

export interface UpdateColorSchemePacket extends DataPacket {
    scheme: string
}

export interface UpdateStudyGroup extends DataPacket {
    studyGroup: number
}