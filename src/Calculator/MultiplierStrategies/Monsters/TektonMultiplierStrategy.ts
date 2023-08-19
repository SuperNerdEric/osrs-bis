import {StyleType} from "../../../DataObjects/Item";
import {Calculator} from "../../Calculator";

export class TektonMultiplierStrategy {

    protected result: Calculator;

    constructor(result: Calculator) {
        this.result = result;
    }

    calculateMultiplier() {
        if (this.result.targetMonster.name.includes("Tekton")) {
            if (this.result.gearSet.styleType === StyleType.Ranged) {
                this.result.maxHit = 0;
                this.result.hitChance = 0;
            } else if(this.result.gearSet.styleType === StyleType.Magic) {
                this.result.maxHit = Math.floor(this.result.maxHit * 0.20);
            }
        }
    }
}