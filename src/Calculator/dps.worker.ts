import { evaluateGearBatch, GearCalcRequest, GearCalcResult, SharedCalcContext } from "./WikiDps";

export interface WorkerRequest {
    jobId: number;
    indices: number[];
    gear: GearCalcRequest[];
    context?: SharedCalcContext;
}

export interface WorkerResponse {
    jobId: number;
    indices: number[];
    results: GearCalcResult[];
}

const workerScope = self as unknown as {
    onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
    postMessage: (message: WorkerResponse) => void;
};

let context: SharedCalcContext | undefined;

workerScope.onmessage = (event: MessageEvent<WorkerRequest>) => {
    const { jobId, indices, gear } = event.data;
    if (event.data.context) {
        context = event.data.context;
    }

    let results: GearCalcResult[] = [];
    if (context) {
        results = evaluateGearBatch(context, gear);
    }

    workerScope.postMessage({ jobId, indices, results });
};
