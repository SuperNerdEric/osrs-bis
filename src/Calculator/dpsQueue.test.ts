import { DpsQueue } from "./dpsQueue";

describe("DPS work queue", () => {
    test("priority setups stay in their original order at the front of the queue", () => {
        const queue = new DpsQueue(5);
        queue.reprioritize((index) => index === 3 || index === 1);

        expect(queue.take(3)).toEqual([1, 3, 0]);
        expect(queue.take(3)).toEqual([2, 4]);
        expect(queue.remaining).toBe(0);
    });

    test("a new filter reorders only the setups that have not been sent yet", () => {
        const queue = new DpsQueue(5);
        queue.reprioritize((index) => index === 4);
        expect(queue.take(1)).toEqual([4]);

        queue.reprioritize((index) => index === 2);
        expect(queue.take(3)).toEqual([2, 0, 1]);
        expect(queue.take(1)).toEqual([3]);
    });
});
