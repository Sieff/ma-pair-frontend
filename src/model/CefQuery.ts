import {Message} from "./Message";

export interface CefQueryRequest {
    request: string
}

export interface CefQuery {
    queryType: CefQueryType
    type: "InputQuery" | "WidgetInputQuery" | "RequestToolWindowFocusQuery" | "RequestMessagesQuery" | "InputChangedEventQuery"
}

export enum CefQueryType {
    INPUT = "INPUT",
    WIDGET_INPUT = "WIDGET_INPUT",
    REQUEST_TOOL_WINDOW_FOCUS = "REQUEST_TOOL_WINDOW_FOCUS",
    REQUEST_MESSAGES = "REQUEST_MESSAGES",
    INPUT_CHANGED_EVENT = "INPUT_CHANGED_EVENT",
}

export interface InputQuery extends CefQuery {
    message: Message
}

export interface WidgetInputQuery extends InputQuery {

}

export interface RequestToolWindowFocusQuery extends CefQuery {

}

export interface RequestMessagesQuery extends CefQuery {

}

export interface InputChangedEventQuery extends CefQuery {

}