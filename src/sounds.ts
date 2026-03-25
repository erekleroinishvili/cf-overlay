const fanfare = new Audio("./sounds/fanfare.mp3");
const error = new Audio("./sounds/error.mp3");
const failure = new Audio("./sounds/failure.mp3");
const unknown = new Audio("./sounds/eeh.mp3");
const start = new Audio("./sounds/start.mp3");
const stop = new Audio("./sounds/stop.mp3");

const allAudioElements = [fanfare, error, failure, unknown, start, stop];
allAudioElements.forEach((audio, index) => {
    audio || console.warn(`Audio element ${index} not found.`);
});

function stopAllAudio() {
    allAudioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = true;
    });
}

export type Sound = 'fanfare' | 'error' | 'failure' | 'unknown' | 'start' | 'stop';

export function playSound(sound: Sound) {
    stopAllAudio();
    switch (sound) {
        case 'fanfare':
            return playAudio(fanfare);
        case 'error':
            return playAudio(error);
        case 'failure':
            return playAudio(failure);
        case 'unknown':
            return playAudio(unknown);
        case 'start':
            return playAudio(start);
        case 'stop':
            return playAudio(stop);
        default:
            return playAudio(fanfare);
    }
}

function playAudio(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    audio.muted = false;
    return audio.play();
}
