import { MessageType } from "./cf-socket.interface";

export type TabChannelMessage = {
    type: MessageType;
};

export class TabChannel<TMessage = TabChannelMessage> {
    private readonly channel: BroadcastChannel;
    private readonly listeners = new Set<(message: TMessage) => void>();

    constructor(channelName: string) {
        this.channel = new BroadcastChannel(channelName);
        this.channel.addEventListener("message", this.handleMessage);
    }

    private handleMessage = (event: MessageEvent<TMessage>): void => {
        for (const listener of this.listeners) {
            listener(event.data);
        }
    };

    public send(message: TMessage): void {
        this.channel.postMessage(message);
    }

    public onMessage(listener: (message: TMessage) => void): () => void {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }

    public close(): void {
        this.channel.removeEventListener("message", this.handleMessage);
        this.listeners.clear();
        this.channel.close();
    }
}
