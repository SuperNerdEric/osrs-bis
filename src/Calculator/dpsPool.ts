import { evaluateGearBatch, GearCalcRequest, GearCalcResult, SharedCalcContext } from "./WikiDps";
import type { WorkerRequest, WorkerResponse } from "./dps.worker";
import { DpsQueue } from "./dpsQueue";

interface PoolWorker {
    worker: Worker;
    busy: boolean;
    seenJobId: number;
}

interface ActiveJob {
    id: number;
    cancelled: boolean;
    done: boolean;
    inflight: number;
    context: SharedCalcContext;
    gear: GearCalcRequest[];
    queue: DpsQueue;
    onChunk: (indices: number[], results: GearCalcResult[]) => void;
    onDone: () => void;
}

const CHUNK_SIZE = 32;
const MAIN_THREAD_CHUNK_SIZE = 16;

let workers: PoolWorker[] | null = null;
let workersFailed = false;
let active: ActiveJob | null = null;
let jobSeq = 0;

function finish(job: ActiveJob): void {
    if (job.done || job.cancelled) {
        return;
    }
    job.done = true;
    job.onDone();
}

function dispatch(poolWorker: PoolWorker): void {
    const job = active;
    if (!job || job.cancelled || poolWorker.busy) {
        return;
    }

    const indices = job.queue.take(CHUNK_SIZE);
    if (indices.length === 0) {
        if (job.inflight === 0) {
            finish(job);
        }
        return;
    }

    poolWorker.busy = true;
    job.inflight += 1;
    const message: WorkerRequest = {
        jobId: job.id,
        indices,
        gear: indices.map((index) => job.gear[index]),
    };
    if (poolWorker.seenJobId !== job.id) {
        message.context = job.context;
        poolWorker.seenJobId = job.id;
    }
    poolWorker.worker.postMessage(message);
}

function handleWorkerMessage(poolWorker: PoolWorker, event: MessageEvent<WorkerResponse>): void {
    poolWorker.busy = false;
    const job = active;
    if (job && event.data.jobId === job.id) {
        job.inflight -= 1;
        if (!job.cancelled) {
            job.onChunk(event.data.indices, event.data.results);
        }
    }
    dispatch(poolWorker);
}

function getWorkers(): PoolWorker[] {
    if (workers) {
        return workers;
    }
    if (workersFailed) {
        return [];
    }
    try {
        // Leave one core free so the page can paint and take clicks while the rest calculate.
        const count = Math.max(1, (navigator.hardwareConcurrency || 4) - 1);
        workers = Array.from({ length: count }, () => {
            const poolWorker: PoolWorker = {
                worker: new Worker(new URL("./dps.worker.ts", import.meta.url)),
                busy: false,
                seenJobId: -1,
            };
            poolWorker.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
                handleWorkerMessage(poolWorker, event);
            };
            return poolWorker;
        });
        return workers;
    } catch {
        workersFailed = true;
        return [];
    }
}

function runOnMainThread(job: ActiveJob): void {
    const step = () => {
        if (job.cancelled || active !== job) {
            return;
        }
        const indices = job.queue.take(MAIN_THREAD_CHUNK_SIZE);
        if (indices.length === 0) {
            finish(job);
            return;
        }
        job.onChunk(
            indices,
            evaluateGearBatch(
                job.context,
                indices.map((index) => job.gear[index]),
            ),
        );
        setTimeout(step, 0);
    };
    setTimeout(step, 0);
}

export interface DpsJob {
    cancel: () => void;
    reprioritize: (isPriority: (index: number) => boolean) => void;
}

export function runDpsJob(
    context: SharedCalcContext,
    gear: GearCalcRequest[],
    onChunk: (indices: number[], results: GearCalcResult[]) => void,
    onDone: () => void,
    isPriority?: (index: number) => boolean,
): DpsJob {
    const queue = new DpsQueue(gear.length);
    if (isPriority) {
        queue.reprioritize(isPriority);
    }

    const job: ActiveJob = {
        id: ++jobSeq,
        cancelled: false,
        done: false,
        inflight: 0,
        context,
        gear,
        queue,
        onChunk,
        onDone,
    };

    if (active) {
        active.cancelled = true;
    }
    active = job;

    const api: DpsJob = {
        cancel: () => {
            job.cancelled = true;
            if (active === job) {
                active = null;
            }
        },
        reprioritize: (predicate) => {
            if (!job.cancelled) {
                job.queue.reprioritize(predicate);
            }
        },
    };

    if (gear.length === 0) {
        finish(job);
        return api;
    }

    const pool = getWorkers();
    if (pool.length === 0) {
        runOnMainThread(job);
    } else {
        pool.forEach(dispatch);
    }
    return api;
}
