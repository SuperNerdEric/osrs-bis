type ValueOf<T> = (value: T, index: number, values: Iterable<T>) => number | null | undefined;

export function sum<T>(values: Iterable<T>, valueof?: ValueOf<T>): number {
    let total = 0;
    if (valueof === undefined) {
        for (const value of values as Iterable<number>) {
            const numeric = +value;
            if (numeric) {
                total += numeric;
            }
        }
    } else {
        let index = -1;
        for (const value of values) {
            const numeric = +valueof(value, ++index, values)!;
            if (numeric) {
                total += numeric;
            }
        }
    }
    return total;
}

export function max<T>(values: Iterable<T>, valueof?: ValueOf<T>): number | undefined {
    let result: number | undefined;
    if (valueof === undefined) {
        for (const value of values as Iterable<number | null | undefined>) {
            if (value != null && (result! < value || (result === undefined && value >= value))) {
                result = value;
            }
        }
    } else {
        let index = -1;
        for (const value of values) {
            const numeric = valueof(value, ++index, values);
            if (numeric != null && (result! < numeric || (result === undefined && numeric >= numeric))) {
                result = numeric;
            }
        }
    }
    return result;
}

export function min<T>(values: Iterable<T>, valueof?: ValueOf<T>): number | undefined {
    let result: number | undefined;
    if (valueof === undefined) {
        for (const value of values as Iterable<number | null | undefined>) {
            if (value != null && (result! > value || (result === undefined && value >= value))) {
                result = value;
            }
        }
    } else {
        let index = -1;
        for (const value of values) {
            const numeric = valueof(value, ++index, values);
            if (numeric != null && (result! > numeric || (result === undefined && numeric >= numeric))) {
                result = numeric;
            }
        }
    }
    return result;
}

export function some<T>(values: Iterable<T>, test: (value: T, index: number, values: Iterable<T>) => boolean): boolean {
    let index = -1;
    for (const value of values) {
        if (test(value, ++index, values)) {
            return true;
        }
    }
    return false;
}

export function cross<T>(a: Iterable<T>, b: Iterable<T>): [T, T][] {
    const pairs: [T, T][] = [];
    const right = Array.from(b);
    for (const left of a) {
        for (const item of right) {
            pairs.push([left, item]);
        }
    }
    return pairs;
}

export function range(start: number, stop: number): number[] {
    const values: number[] = [];
    for (let value = start; value < stop; value++) {
        values.push(value);
    }
    return values;
}
