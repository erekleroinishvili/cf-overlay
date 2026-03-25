import { setCanvasToState } from "./canvas";
import { CFVerdictToSound } from "./cf.utils";
import { TabChannel } from "./cross-tab-connect";
import { CrossTabChannelName } from "./settings";

const crossTab = new TabChannel(CrossTabChannelName);
crossTab.onMessage(message => {
    switch (message.type) {
        case 'SOCKET_OPENED': return setCanvasToState('SOCKET_OPENED', 'Connection Opened', 'start');
        case 'SOCKET_CLOSED': return setCanvasToState('SOCKET_CLOSED', 'Connection Closed', 'stop');
        case 'SOCKET_ERROR': return setCanvasToState('SOCKET_ERROR', 'Connection Error', 'failure');
        case 'UNKNOWN': return setCanvasToState('UNKNOWN', 'Unknown State', 'unknown');
        case 'OK': return setCanvasToState('OK', 'Accepted', CFVerdictToSound('OK'));
        case 'WRONG_ANSWER': return setCanvasToState('WRONG_ANSWER', 'Wrong Answer', CFVerdictToSound('WRONG_ANSWER'));
        case 'COMPILATION_ERROR': return setCanvasToState('COMPILATION_ERROR', 'Compilation Error', CFVerdictToSound('COMPILATION_ERROR'));
        case 'TIME_LIMIT_EXCEEDED': return setCanvasToState('TIME_LIMIT_EXCEEDED', 'Time Limit Exceeded', CFVerdictToSound('TIME_LIMIT_EXCEEDED'));
        case 'MEMORY_LIMIT_EXCEEDED': return setCanvasToState('MEMORY_LIMIT_EXCEEDED', 'Memory Limit Exceeded', CFVerdictToSound('MEMORY_LIMIT_EXCEEDED'));
        case 'RUNTIME_ERROR': return setCanvasToState('RUNTIME_ERROR', 'Runtime Error', CFVerdictToSound('RUNTIME_ERROR'));
        case 'CHALLENGED': return setCanvasToState('CHALLENGED', 'Challenged', CFVerdictToSound('CHALLENGED'));
        case 'SKIPPED': return setCanvasToState('SKIPPED', 'Skipped', CFVerdictToSound('SKIPPED'));
        case 'TESTING': return setCanvasToState('TESTING', 'Testing', CFVerdictToSound('TESTING'));
        case 'REJECTED': return setCanvasToState('REJECTED', 'Rejected', CFVerdictToSound('REJECTED'));
        case 'OTHER':
        default: return setCanvasToState('OTHER', 'Other', CFVerdictToSound('OTHER'));
    }
});
