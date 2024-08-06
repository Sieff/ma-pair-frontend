import {DataPacket, DataPacketType} from "../model/DataPacket";

class DataPacketService {
    private static _instance: DataPacketService | undefined;
    private _callbacks: {[key in DataPacketType]: (packet: DataPacket) => void} = {
        UPDATE_TEMPORARY_MESSAGE: (_) => {},
        UPDATE_MESSAGES: (_) => {}
    };

    private constructor() {
        const w = window as any;
        w.sendDataPacket = (packet: DataPacket) => {this.sendDataPacket(packet)};
    }

    public static get instance(): DataPacketService {
        if (!this._instance) {
            this._instance = new DataPacketService();
        }
        return this._instance
    }

    setCallback(type: DataPacketType, callback: (packet: DataPacket) => void) {
        this._callbacks[type] = callback;
    }

    public sendDataPacket(packet: DataPacket) {
        this._callbacks[packet.packetType](packet)
    }
}

export default DataPacketService;