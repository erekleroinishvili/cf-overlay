/** CodeForces returns dates in a specific string format */
export type CFDateTimeString = '31.01.1970 23:59:59';

/** Highly processed and enriched message from CodeForces
 * Has fields re-interpreted and added in
 */
export interface CFMessage {
    id: number;
    channel: string;
    type: "submission" | "problemUpdate";
    submissionId: number;
    contestId: number;
    problemIndex: number;
    problemLetter: string;
    phase: "TESTS" | "PRETESTS";
    verdict: CFVerdict;
    testsPassed: number;
    totalTests: number;
    timeMs: number;
    memoryKb: number;
    authorId: string;
    languageId: string;
    creationTime: Date;
    updateTime: Date;
}

export type CFVerdict = "OK" | "WRONG_ANSWER" | "COMPILATION_ERROR" | "TIME_LIMIT_EXCEEDED" | "MEMORY_LIMIT_EXCEEDED" | "RUNTIME_ERROR" | "CHALLENGED" | "SKIPPED" | "TESTING" | "REJECTED" | "OTHER";
export type MessageType = CFVerdict | "SOCKET_OPENED" | "SOCKET_ERROR" | "SOCKET_CLOSED" | "UNKNOWN";

/** CodeForces socket message, but deserialized `JSON.parse(), new Date()` at multiple nested levels */
export interface CFSocketMessage {
    id: number;
    channel: string;
    text: CFSocketMessageText;
}

/** Raw socket message, before parsing, as received from the socket.
 *  Just deserialized `JSON.parse()` once at the top level */
export interface CFSocketMessageRaw {
    id: number;
    channel: string;
    text: string; // CFSocketMessageText serialized as JSON string
}

/** Socket Message ⟶ `.text` (after deserialization) */
export interface CFSocketMessageText<DateFormat extends CFDateTimeString | Date = Date> {
    t: "s" | "p"; // "s" for submission, "p" for problem update
    d: CFSocketMessageTextData<DateFormat>;
}

/** Socket Message ⟶ `.text` (parsed) ⟶ `.d` (tuple) */
export type CFSocketMessageTextData<DateFormat extends CFDateTimeString | Date = Date> = [
    // Core identity
    number, // Submission event ID (unique, large)
    number, // Submission ID
    number, // Contest ID
    number, // Problem index (0 = A, 1 = B, etc.)

    // Judging state
    "TESTS" | "PRETESTS", // Phase
    null, // ?
    CFVerdict,  // Verdict

    // Test progress
    number, // Number of tests passed tests
    number, // Total tests (or current test index)

    // Performance
    number, // Time (ms)
    number, // Memory (KB?)

    // Submission metadata
    string, // Author / participant ID
    string, // Programming Language ID
    DateFormat, // Creation time
    DateFormat, // Last update time

    // Misceleneous
    number, // Often 2147483647 → sentinel (max int)
    number, // ?
    number, // Final flag / state code
]
