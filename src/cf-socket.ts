import { setCanvasToState } from "./canvas";
import { CFMessage } from "./cf-socket.interface";
import { ingestCFSocketMessage } from "./cf-socket.utils";
import { CFVerdictToSound, CFVerdictToText } from "./cf.utils";
import { connectSocket } from "./socket";

const onopen0: WebSocket["onopen"] = (event) => {
    console.error.bind(console, 'WebSocket connection opened');
    setCanvasToState("SOCKET_OPENED", "Connection Opened", 'start');
}
const onclose0: WebSocket["onclose"] = (event) => {
    console.error.bind(console, 'WebSocket connection closed');
    setCanvasToState("SOCKET_CLOSED", "Connection Closed", 'stop');
}
const onerror0: WebSocket["onerror"] = (event) => {
    console.error.bind(console, 'WebSocket error');
    setCanvasToState("SOCKET_ERROR", "Connection Error", 'failure');
}
const onmessage0: WebSocket["onmessage"] = (event) => {
    console.log(JSON.parse(event.data))
    const message = ingestCFSocketMessage(event.data);
    console.log(message)
    if (filterMessage(message)) {
        setCanvasToState(message.verdict, CFVerdictToText(message.verdict), CFVerdictToSound(message.verdict));
    }
}

const noop = () => { } // No operation - Do nothing function

/** Call all functions with the same signatures. Return what the last fn returns */
function all<T extends (this: any, ...args: any[]) => any>(
    ...fns: ReadonlyArray<T | undefined | null>
): T {
    return function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
        return fns.reduce((result, fn) => fn?.apply(this, args), undefined as ReturnType<T>)
    } as T;
}

function filterMessage(message: CFMessage): boolean {
    if (message.type !== "submission") return false; // Only process submission events

    return true;
}

export function connnectCFSocket(CfSocketUri: string, {
    onopen = noop as WebSocket["onopen"],
    onmessage = noop as WebSocket["onmessage"],
    onclose = noop as WebSocket["onclose"],
    onerror = noop as WebSocket["onerror"],
} = {}) {
    return connectSocket(CfSocketUri, {
        onopen: all(onopen0, onopen),
        onmessage: all(onmessage0, onmessage),
        onclose: all(onclose0, onclose),
        onerror: all(onerror0, onerror),
    });
}
