export function getDomElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id)! as T
    if (!element) console.error(`Cannot find DOM element with id: "${id}"`)
    return element
}
