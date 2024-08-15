import {AssistantMessage, Message, MessageOrigin} from "../model/Message";
import MessageRelation from "../model/MessageRelation";

class MessageRelationService {

    private static _instance: MessageRelationService | undefined;

    private constructor() {
    }

    public static get instance(): MessageRelationService {
        if (!this._instance) {
            this._instance = new MessageRelationService();
        }
        return this._instance
    }

    getMessageRelations(messages: Message[]): MessageRelation[] {
        const firstInBlock: boolean[] = messages.map((message, index) => {
            if (index === 0) {
                return true
            }

            return message.origin !== messages[index - 1].origin
        })

        const lastInSelfInitiatedBlock: boolean[] = messages.map((message, index) => {
            // Message is a user message
            if (message.origin === MessageOrigin.USER) {
                return false
            }

            // Message is not self initiated
            if (!(message as AssistantMessage).selfInitiated) {
                return false
            }

            // Message is the last message
            if (index === messages.length - 1) {
                return true
            }

            // Next is a user message
            if (messages[index + 1].origin === MessageOrigin.USER) {
                return true
            }

            const nextMessage = messages[index + 1] as AssistantMessage

            // Next is not self initiated
            return !nextMessage.selfInitiated
        })

        return messages.map((_, index) => {
            return {
                firstInBlock: firstInBlock[index],
                lastInSelfInitiatedBlock: lastInSelfInitiatedBlock[index]
            }
        })
    }
}

export default MessageRelationService;