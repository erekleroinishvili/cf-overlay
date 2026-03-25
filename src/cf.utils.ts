import { CFVerdict } from "./cf-socket.interface";
import { Sound } from "./sounds";
import { wordToTitleCase } from "./utils";

export function CFVerdictToText(verdict: CFVerdict): string {
    return verdict
        .split('_')
        .map(wordToTitleCase)
        .join(' ');
}

export function CFVerdictToSound(verdict: CFVerdict): Sound | null {
    const verdictSoundMap: Record<CFVerdict, Sound> = {
        OK: 'fanfare',
        WRONG_ANSWER: 'error',
        COMPILATION_ERROR: 'error',
        RUNTIME_ERROR: 'error',
        TIME_LIMIT_EXCEEDED: 'error',
        MEMORY_LIMIT_EXCEEDED: 'error',
        CHALLENGED: 'unknown',
        SKIPPED: 'unknown',
        TESTING: 'unknown',
        REJECTED: 'error',
        OTHER: 'unknown',
    }
    return verdictSoundMap[verdict] || null;
}
