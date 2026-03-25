import { CFDateTimeString, CFSocketMessageTextData } from "./cf-socket.interface";

/** CodeForces uses Moscow time in Websocket messages */
function CFTime(
    year: number,
    month: number, // 1-based month (1 = January, 12 = December)
    day: number,
    hours: number,
    minutes: number,
    seconds: number
): Date {
    return new Date(Date.UTC(year, month - 1, day, hours - 3, minutes, seconds));
}

function parseCFDateTimeString(dateStr: CFDateTimeString): Date {
    const [date, time] = dateStr.split(/\s/);
    const [day, month, year] = date.split('.').map(Number);
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return CFTime(year, month - 1, day, hours, minutes, seconds);
}

export function parseCFSocketMessageDates(data: CFSocketMessageTextData<CFDateTimeString>): CFSocketMessageTextData {
    const indexesToParse = [13, 14] as const;
    const dataWithDates = [...data] as unknown as CFSocketMessageTextData;
    for (const index of indexesToParse) {
        dataWithDates[index] = parseCFDateTimeString(data[index] as CFDateTimeString);
    }
    return dataWithDates;
}
