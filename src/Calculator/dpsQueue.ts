/**
 * Indices still waiting to be sent to a worker.
 * Priority indices move to the front and keep their relative order.
 */
export class DpsQueue {
    private pending: number[];

    constructor(count: number) {
        this.pending = Array.from({ length: count }, (_, index) => index);
    }

    get remaining(): number {
        return this.pending.length;
    }

    reprioritize(isPriority: (index: number) => boolean): void {
        if (this.pending.length < 2) {
            return;
        }
        const priority: number[] = [];
        const rest: number[] = [];
        for (const index of this.pending) {
            if (isPriority(index)) {
                priority.push(index);
            } else {
                rest.push(index);
            }
        }
        this.pending = priority.concat(rest);
    }

    take(count: number): number[] {
        if (count <= 0 || this.pending.length === 0) {
            return [];
        }
        return this.pending.splice(0, count);
    }
}
