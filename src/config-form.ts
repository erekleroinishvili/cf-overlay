import { getDomElement } from "./dom.utils"

const configForm = getDomElement('config-form')
const cfSocketUriInput = getDomElement<HTMLInputElement>('cf-socket-uri')
const cfConnectButton = getDomElement('cf-connect-button')

export function hideConfigForm() {
    configForm.style.display = 'none';
}

export function showConfigForm() {
    configForm.style.display = 'block';
}

export function readCfSocketUriInput() {
    return cfSocketUriInput.value
}

export function cfConnectButtonOnClick(fn: (e: PointerEvent) => void, options?: boolean | AddEventListenerOptions) {
    cfConnectButton.addEventListener('click', fn, options)
}
