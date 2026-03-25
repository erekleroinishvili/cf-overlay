import { parseCFSocketMessageDates } from "./cf-dates.utils";
import type { CFSocketMessageRaw, CFSocketMessageText, CFDateTimeString, CFSocketMessage, CFMessage } from "./cf-socket.interface";

export function ingestCFSocketMessage(rawMessageStr: string): CFMessage {
    const messageObj = parseCFSocketMessage(rawMessageStr);
    const cfMessage = standardizeCFMessage(messageObj);
    return cfMessage;
}

/** Takes a socket message serialized in nested fashion at different levels
 * and deserializes it into a fully structured object */
function parseCFSocketMessage(rawMessageStr: string): CFSocketMessage {
    const rawMessage: CFSocketMessageRaw = JSON.parse(rawMessageStr);
    const textObjRaw: CFSocketMessageText<CFDateTimeString> = JSON.parse(rawMessage.text);
    const data = parseCFSocketMessageDates(textObjRaw.d);
    const socketMessage: CFSocketMessage = {
        ...rawMessage,
        text: {
            ...textObjRaw,
            d: data
        }
    };
    return socketMessage;
}

/** After deserialization at multiple levels,
 * socket message object can be converted to CFMessage */
function standardizeCFMessage(message: CFSocketMessage): CFMessage {
    const t = message.text.t;
    const d = message.text.d;
    return {
        id: message.id,
        channel: message.channel,
        type: ({ s: "submission", p: "problemUpdate" }[t] ?? t) as CFMessage["type"],
        submissionId: d[1],
        contestId: d[2],
        problemIndex: d[3],
        problemLetter: String.fromCharCode(65 + d[3]),
        phase: d[4],
        verdict: d[6],
        testsPassed: d[7],
        totalTests: d[8],
        timeMs: d[9],
        memoryKb: d[10],
        authorId: d[11],
        languageId: d[12],
        creationTime: d[13],
        updateTime: d[14],
    }
}
