export function devLog(log: any) {
    if (process.env.NODE_ENV === 'development') {
        console.log(log);
    }
}