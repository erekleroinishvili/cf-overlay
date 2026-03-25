import { CanvasStatus } from "./cf-socket.interface";
import { MaxAnimationDuration } from "./settings";
import { addError, clearErrors } from "./error";
import { playSound, Sound } from "./sounds";
import { getDomElement } from "./dom.utils";

const canvas = getDomElement('canvas')!;
const verdictBox = getDomElement('verdict')!;

let canvasClearSchedule: ReturnType<typeof setTimeout> | null = null;

setupCanvas(canvas);

function setupCanvas(canvas: HTMLElement) {
    canvas.addEventListener('animationend', cleanUpAfterAnimation);
    canvas.addEventListener('transitionend', cleanUpAfterAnimation);
}

function cleanUpAfterAnimation() {
    clearAllCssClasses(canvas);
    verdictBox.textContent = '';
    if (typeof canvasClearSchedule === 'number') {
        clearTimeout(canvasClearSchedule);
        canvasClearSchedule = null;
    }
}

function clearAllCssClasses(element: HTMLElement) {
    element.className = '';
    element.offsetWidth; // Force reflow to reset animation state
}

export function setCanvasToState(status: CanvasStatus, verdictText = '', sound: Sound | null) {
    cleanUpAfterAnimation();
    clearErrors();
    const cssClasses = getCanvasClassesForState(status);
    verdictBox.textContent = verdictText;
    canvas.classList.add(...cssClasses); // Add the new status class
    sound && playSound(sound).catch(processSoundError).catch(console.error);
    // Schedule cleanup after max animation duration
    // in case animationend/transitionend events are not fired, ensure cleanup after max duration
    canvasClearSchedule = setTimeout(cleanUpAfterAnimation, MaxAnimationDuration);
}

function getCanvasClassesForState(status: CanvasStatus): string[] {
    const socketStates: CanvasStatus[] = ["SOCKET_OPENED", "SOCKET_ERROR", "SOCKET_CLOSED"];
    const problemStates: CanvasStatus[] = ["SOCKET_ERROR", "SOCKET_CLOSED", "WRONG_ANSWER", "COMPILATION_ERROR", "TIME_LIMIT_EXCEEDED", "MEMORY_LIMIT_EXCEEDED", "RUNTIME_ERROR", "CHALLENGED", "SKIPPED", "REJECTED"];
    const cssClasses: string[] = [status];
    if (status === 'UNKNOWN') {
        cssClasses.unshift('UNKNOWN');
    } else if (problemStates.includes(status)) {
        cssClasses.unshift('PROBLEM');
    } else {
        cssClasses.unshift('SUCCESS');
    }
    if (socketStates.includes(status)) {
        cssClasses.unshift('SOCKET');
    } else {
        cssClasses.unshift('CF');
    }
    return cssClasses;
}

async function processSoundError(error: any) {
    addError(error);
    console.log(error)
    throw error
}
