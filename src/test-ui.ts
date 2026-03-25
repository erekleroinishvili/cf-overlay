import { setCanvasToState } from "./canvas";
import { CFVerdictToSound } from "./cf.utils";

function createButton(label: string, clickHandler: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', clickHandler);
    return button;
}

const buttons = [
    createButton('🟢 Socket Opened', () => setCanvasToState('SOCKET_OPENED', 'Connection Opened', 'start')),
    createButton('❌ Socket Error', () => setCanvasToState('SOCKET_ERROR', 'Connection Error', 'failure')),
    createButton('🔒 Socket Closed', () => setCanvasToState('SOCKET_CLOSED', 'Connection Closed', 'stop')),
    createButton('❓ Unknown State', () => setCanvasToState('UNKNOWN', 'Unknown State', 'unknown')),
    createButton('✔ Accepted', () => setCanvasToState('OK', 'Accepted', CFVerdictToSound('OK'))),
    createButton('✖ Wrong Answer', () => setCanvasToState('WRONG_ANSWER', 'Wrong Answer', CFVerdictToSound('WRONG_ANSWER'))),
    createButton('🛠 Compilation Error', () => setCanvasToState('COMPILATION_ERROR', 'Compilation Error', CFVerdictToSound('COMPILATION_ERROR'))),
    createButton('⏳ Time Limit Exceeded', () => setCanvasToState('TIME_LIMIT_EXCEEDED', 'Time Limit Exceeded', CFVerdictToSound('TIME_LIMIT_EXCEEDED'))),
    createButton('💾 Memory Limit Exceeded', () => setCanvasToState('MEMORY_LIMIT_EXCEEDED', 'Memory Limit Exceeded', CFVerdictToSound('MEMORY_LIMIT_EXCEEDED'))),
    createButton('💥 Runtime Error', () => setCanvasToState('RUNTIME_ERROR', 'Runtime Error', CFVerdictToSound('RUNTIME_ERROR'))),
    createButton('⚔ Challenged', () => setCanvasToState('CHALLENGED', 'Challenged', CFVerdictToSound('CHALLENGED'))),
    createButton('⏭ Skipped', () => setCanvasToState('SKIPPED', 'Skipped', CFVerdictToSound('SKIPPED'))),
    createButton('🧪 Testing', () => setCanvasToState('TESTING', 'Testing', CFVerdictToSound('TESTING'))),
    createButton('🚫 Rejected', () => setCanvasToState('REJECTED', 'Rejected', CFVerdictToSound('REJECTED'))),
    createButton('❔ Other', () => setCanvasToState('OTHER', 'Other', CFVerdictToSound('OTHER'))),
];

const div = document.createElement('div');
div.style.position = 'fixed';
div.style.bottom = '0';
div.style.right = '10px';
div.style.zIndex = '100';
div.style.display = 'flex';
div.style.flexWrap = 'wrap';
div.style.alignItems = 'flex-start';
div.style.alignContent = 'flex-start';
div.style.padding = '10px';
div.style.gap = '10px';
div.append(...buttons);
document.body.appendChild(div);
