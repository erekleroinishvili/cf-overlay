import { connnectCFSocket } from "./cf-socket";
import { cfConnectButtonOnClick, hideConfigForm, readCfSocketUriInput, showConfigForm } from "./config-form";
import { readSocketUriFromSession, writeSocketUriFromSession } from "./local-storage";

let socket: WebSocket;

hideConfigForm();
cfConnectButtonOnClick(() => {
    socket = connectCfSocket(readCfSocketUriInput());
});

let cfSocketUri = readSocketUriFromSession()

if (cfSocketUri) {
    hideConfigForm();
    socket = connectCfSocket(cfSocketUri);
} else {
    showConfigForm();
}

function connectCfSocket(cfSocketUri: string) {
    return connnectCFSocket(cfSocketUri, {
        onopen: () => {
            writeSocketUriFromSession(cfSocketUri)
            hideConfigForm()
        },
        onerror: showConfigForm,
        onclose: showConfigForm,
    });
}

window.addEventListener("storage", () => {
    let cfSocketUriNew = readSocketUriFromSession()
    if (cfSocketUriNew && cfSocketUri !== cfSocketUriNew && ! socket?.OPEN) {
        console.log("Socket in local storage changed")
        socket = connectCfSocket(cfSocketUriNew);
    }
})