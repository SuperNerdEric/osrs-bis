import {CombatClass} from "../../DataObjects/Item";
import {Calculator} from "../Calculator";

export class ZukMultiplierStrategy {

    protected result: Calculator;

    constructor(result: Calculator) {
        this.result = result;
    }

    calculateMultiplier() {
        if (this.result.targetMonster.name.includes("TzKal-Zuk")) {
            if (this.result.gearSet.combatClass === CombatClass.Melee) {
                this.result.maxHit = 0;
                this.result.hitChance = 0;
            }
        }
    }
}