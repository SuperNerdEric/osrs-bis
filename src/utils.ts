export function devLog(log: unknown) {
    if (process.env.NODE_ENV === "development") {
        console.log(log);
    }
}
