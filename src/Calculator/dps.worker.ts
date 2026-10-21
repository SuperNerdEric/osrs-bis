import { evaluateGearBatch, GearCalcRequest, GearCalcResult, SharedCalcContext } from "./WikiDps";

export interface WorkerRequest {
    jobId: number;
    offset: number;
    context: SharedCalcContext;
    gear: GearCalcRequest[];
}

export interface WorkerResponse {
    jobId: number;
    offset: number;
    results: GearCalcResult[];
}

const workerScope = self as unknown as {
    onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
    postMessage: (message: WorkerResponse) => void;
};

workerScope.onmessage = (event: MessageEvent<WorkerRequest>) => {
    const { jobId, offset, context, gear } = event.data;
    workerScope.postMessage({
        jobId,
        offset,
        results: evaluateGearBatch(context, gear),
    });
};
