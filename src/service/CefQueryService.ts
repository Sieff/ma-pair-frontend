import {
    CefQuery,
    CefQueryRequest,
    CefQueryType,
    InputQuery,
    RequestMessagesQuery,
    RequestToolWindowFocusQuery,
    WidgetInputQuery
} from "../model/CefQuery";
import {Message} from "../model/Message";

class CefQueryService {
    private static _instance: CefQueryService;

    private constructor() {
    }

    static get instance(): CefQueryService {
        if (this._instance == null) {
            this._instance = new CefQueryService();
        }
        return this._instance;
    }

    public sendInput(message: Message) {
        const query: InputQuery = {
            queryType: CefQueryType.INPUT,
            message,
            type: "InputQuery"
        }

        this.queryRequest(query)
    }

    public sendWidgetInput(message: Message) {
        const query: WidgetInputQuery = {
            queryType: CefQueryType.WIDGET_INPUT,
            message,
            type: "WidgetInputQuery"
        }

        this.queryRequest(query)
    }

    public requestMessages() {
        const query: RequestMessagesQuery = {
            queryType: CefQueryType.REQUEST_MESSAGES,
            type: "RequestMessagesQuery"
        }

        this.queryRequest(query)
    }

    public requestToolWindowFocus() {
        const query: RequestToolWindowFocusQuery = {
            queryType: CefQueryType.REQUEST_TOOL_WINDOW_FOCUS,
            type: "RequestToolWindowFocusQuery"
        }

        this.queryRequest(query)
    }

    private queryRequest(request: CefQuery): any {
        const _window = window as any;
        if (_window.cefQuery) {
            _window.cefQuery(this.toCefQueryRequest(request));
        } else {
            alert("cefQuery not initialized")
        }
    }

    private toCefQueryRequest(query: CefQuery): CefQueryRequest {
        return {request: JSON.stringify(query)}
    }
}

export default CefQueryService;