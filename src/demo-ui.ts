import { TabChannel } from "./cross-tab-connect";
import { getDomElement } from "./dom.utils";
import { CrossTabChannelName } from "./settings";

type ButtonType =
    'primary' |
    'secondary' |
    'success' |
    'danger' |
    'warning' |
    'info' |
    'light' |
    'dark' |
    'link';

function getButtonClass(buttonType: ButtonType): string[] {
    return ['btn', 'btn-sm', 'btn-' + buttonType]
}

function createButton(label: string, clickHandler: () => void, buttonType: ButtonType = 'info'): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add(...getButtonClass(buttonType));
    button.addEventListener('click', clickHandler);
    return button;
}

const crossTab = new TabChannel(CrossTabChannelName);

const buttons = [
    createButton('🟢 Socket Opened', () => crossTab.send({ type: 'SOCKET_OPENED' }), 'success'),
    createButton('❌ Socket Error', () => crossTab.send({ type: 'SOCKET_ERROR' }), 'danger'),
    createButton('🔒 Socket Closed', () => crossTab.send({ type: 'SOCKET_CLOSED' }), 'warning'),
    createButton('❓ Unknown State', () => crossTab.send({ type: 'UNKNOWN' }), 'info'),
    createButton('✔ Accepted', () => crossTab.send({ type: 'OK' }), 'success'),
    createButton('✖ Wrong Answer', () => crossTab.send({ type: 'WRONG_ANSWER' }), 'danger'),
    createButton('🛠 Compilation Error', () => crossTab.send({ type: 'COMPILATION_ERROR' }), 'danger'),
    createButton('⏳ Time Limit Exceeded', () => crossTab.send({ type: 'TIME_LIMIT_EXCEEDED' }), 'danger'),
    createButton('💾 Memory Limit Exceeded', () => crossTab.send({ type: 'MEMORY_LIMIT_EXCEEDED' }), 'danger'),
    createButton('💥 Runtime Error', () => crossTab.send({ type: 'RUNTIME_ERROR' }), 'warning'),
    createButton('⚔ Challenged', () => crossTab.send({ type: 'CHALLENGED' }), 'warning'),
    createButton('⏭ Skipped', () => crossTab.send({ type: 'SKIPPED' }), 'info'),
    createButton('🧪 Testing', () => crossTab.send({ type: 'TESTING' }), 'info'),
    createButton('🚫 Rejected', () => crossTab.send({ type: 'REJECTED' }), 'info'),
    createButton('❔ Other', () => crossTab.send({ type: 'OTHER' }), 'dark'),
];

const div = getDomElement('buttons-box');
div.append(...buttons);
