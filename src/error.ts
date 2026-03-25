import { getDomElement } from "./dom.utils";

const errorContainer = getDomElement('error')!

export function addError(errorMessage: string) {
    const errorBox = document.createElement('div');
    errorBox.textContent = errorMessage;
    errorContainer.append(errorBox);
}

export function clearErrors() {
    errorContainer.replaceChildren();
}
