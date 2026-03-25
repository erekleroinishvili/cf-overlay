// Connect to a socket and set up event handlers
export function connectSocket(
    uri: string,
    {
        onopen = null as WebSocket["onopen"],
        onmessage = null as WebSocket["onmessage"],
        onclose = null as WebSocket["onclose"],
        onerror = null as WebSocket["onerror"],
    } = {}
) {
    const socket = new WebSocket(uri);

    socket.onopen = onopen;
    socket.onmessage = onmessage;
    socket.onclose = onclose;
    socket.onerror = onerror;
    return socket;
}
