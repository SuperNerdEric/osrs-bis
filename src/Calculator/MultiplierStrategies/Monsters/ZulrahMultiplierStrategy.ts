import {CombatClass} from "../../../DataObjects/Item";
import {Calculator} from "../../Calculator";

export class ZulrahMultiplierStrategy {

    protected result: Calculator;

    constructor(result: Calculator) {
        this.result = result;
    }

    calculateMultiplier() {
        if (this.result.targetMonster.name.includes("Zulrah")) {
            if (this.result.gearSet.combatClass === CombatClass.Melee) {
                this.result.maxHit = 0;
                this.result.hitChance = 0;
                this.result.averageDamagePerHit = 0;
            } else if (this.result.maxHit > 50) {
                const probabilityOfMiss = 1 - this.result.hitChance;

                let hitsAbove50 = 0;
                if (this.result.baseMaxHit !== 0) {
                    if (this.result.baseMaxHit > 50) {
                        hitsAbove50 = this.result.baseMaxHit - 50;
                    }
                } else {
                    hitsAbove50 = this.result.maxHit - 50;
                }
                const probabilityOfEachSpecificHit = this.result.hitChance / (this.result.maxHit + 1);
                const probabilityAbove50 = hitsAbove50 * probabilityOfEachSpecificHit;

                const probabilityBelowOrEqualTo50 = 1 - probabilityAbove50 - probabilityOfMiss;

                const averageAbove50 = 47.5;
                const averageBelowOrEqualTo50 = 25;

                this.result.averageDamagePerHit = probabilityAbove50 * averageAbove50 + probabilityBelowOrEqualTo50 * averageBelowOrEqualTo50;

                if (this.result.baseMaxHit !== 0) {
                    //Todo this seems to slightly overestimate proc dps but not sure why
                    this.result.averageDamagePerHit = this.result.averageDamagePerHit * (1 - this.result.procRate) + averageAbove50 * this.result.procRate;
                }
                this.result.maxHit = 50;
            }
        }
    }
}