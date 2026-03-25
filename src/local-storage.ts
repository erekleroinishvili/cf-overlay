import { CfSocketUri_Key } from './settings';

export function readSocketUriFromSession() {
    return localStorage.getItem(CfSocketUri_Key)
}

export function writeSocketUriFromSession(CfSocketUri: string) {
    return localStorage.setItem(CfSocketUri_Key, CfSocketUri)
}
