import {Message} from "../model/Message";

class SendMessageService {
    private static _instance: SendMessageService;

    private constructor() {
    }

    static get instance(): SendMessageService {
        if (this._instance == null) {
            this._instance = new SendMessageService();
        }
        return this._instance;
    }

    public sendMessage(message: string): any {
        const _window = window as any;
        if (_window.cefQuery) {
            const chatMessage: Message = { origin: MessageOrigin.USER, message }
            _window.cefQuery({
                request: JSON.stringify(chatMessage)
            });
        } else {
            throw new Error("cefQuery not initialized")
        }
    }
}

export default SendMessageService;