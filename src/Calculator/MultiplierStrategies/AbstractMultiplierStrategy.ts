import {Calculator} from "../Calculator";

export enum MultiplierType {
    Accuracy,
    Damage
}


export abstract class AbstractMultiplierStrategy {
    protected result: Calculator;

    constructor(result: Calculator) {
        this.result = result;
    }

    abstract calculateMultiplier(multiplierType?: MultiplierType): number;
}
