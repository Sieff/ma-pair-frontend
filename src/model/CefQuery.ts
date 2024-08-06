import {Message} from "./Message";

export interface CefQueryRequest {
    request: string
}

export interface CefQuery {
    queryType: CefQueryType
    type: "InputQuery" | "WidgetInputQuery" | "RequestToolWindowQuery" | "RequestMessagesQuery"
}

export enum CefQueryType {
    INPUT = "INPUT",
    WIDGET_INPUT = "WIDGET_INPUT",
    REQUEST_TOOL_WINDOW = "REQUEST_TOOL_WINDOW",
    REQUEST_MESSAGES = "REQUEST_MESSAGES",
}

export interface InputQuery extends CefQuery {
    message: Message
}

export interface WidgetInputQuery extends InputQuery {

}

export interface RequestToolWindowQuery extends CefQuery {

}

export interface RequestMessagesQuery extends CefQuery {

}