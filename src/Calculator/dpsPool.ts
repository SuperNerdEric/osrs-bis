import { evaluateGearBatch, GearCalcRequest, GearCalcResult, SharedCalcContext } from "./WikiDps";

interface WorkerMessage {
    jobId: number;
    offset: number;
    results: GearCalcResult[];
}

let workers: Worker[] | null = null;
let jobSeq = 0;

function getWorkers(): Worker[] {
    if (workers) {
        return workers;
    }
    const count = Math.max(1, (navigator.hardwareConcurrency || 4) - 1);
    workers = Array.from({ length: count }, () => new Worker(new URL("./dps.worker.ts", import.meta.url)));
    return workers;
}

export function runDpsJob(
    context: SharedCalcContext,
    gear: GearCalcRequest[],
    onChunk: (offset: number, results: GearCalcResult[]) => void,
    onDone: () => void,
): { cancel: () => void } {
    const jobId = ++jobSeq;
    let cancelled = false;
    const cancel = () => {
        cancelled = true;
    };
    const finish = () => {
        if (!cancelled && jobId === jobSeq) {
            onDone();
        }
    };

    if (gear.length === 0) {
        finish();
        return { cancel };
    }

    let pool: Worker[] = [];
    try {
        pool = getWorkers();
    } catch {
        pool = [];
    }

    if (pool.length === 0) {
        let offset = 0;
        const step = () => {
            if (cancelled) {
                return;
            }
            const slice = gear.slice(offset, offset + 40);
            if (slice.length === 0) {
                finish();
                return;
            }
            const start = offset;
            offset += slice.length;
            onChunk(start, evaluateGearBatch(context, slice));
            setTimeout(step, 0);
        };
        setTimeout(step, 0);
        return { cancel };
    }

    let cursor = 0;
    let inflight = 0;
    const chunkSize = 80;

    const pump = (worker: Worker) => {
        if (cancelled) {
            return;
        }
        if (cursor >= gear.length) {
            if (inflight === 0) {
                finish();
            }
            return;
        }

        const offset = cursor;
        const slice = gear.slice(cursor, cursor + chunkSize);
        cursor += slice.length;
        inflight += 1;

        const handler = (event: MessageEvent<WorkerMessage>) => {
            if (event.data.jobId !== jobId || event.data.offset !== offset) {
                return;
            }
            worker.removeEventListener("message", handler);
            inflight -= 1;
            if (!cancelled) {
                onChunk(offset, event.data.results);
            }
            pump(worker);
        };
        worker.addEventListener("message", handler);
        worker.postMessage({ jobId, offset, context, gear: slice });
    };

    pool.forEach(pump);
    return { cancel };
}
