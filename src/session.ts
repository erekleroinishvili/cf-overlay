import { connnectCFSocket } from "./cf-socket";
import { cfConnectButtonOnClick, hideConfigForm, readCfSocketUriInput, showConfigForm } from "./config-form";
import { readSocketUriFromSession, writeSocketUriFromSession } from "./local-storage";

hideConfigForm();
cfConnectButtonOnClick(() => {
    hideConfigForm();
    connectCfSocket(readCfSocketUriInput());
});

let cfSocketUri = readSocketUriFromSession()

if (cfSocketUri) {
    hideConfigForm();
    connectCfSocket(cfSocketUri);
} else {
    showConfigForm();
}

function connectCfSocket(cfSocketUri: string) {
    connnectCFSocket(cfSocketUri, {
        onopen: () => writeSocketUriFromSession(cfSocketUri),
        onerror: showConfigForm,
        onclose: showConfigForm,
    });
}