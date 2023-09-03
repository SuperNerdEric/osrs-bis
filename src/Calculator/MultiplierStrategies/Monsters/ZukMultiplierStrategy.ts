import {CombatClass} from "../../../DataObjects/Item";
import {AbstractMultiplierStrategy} from "../AbstractMultiplierStrategy";

export class ZukMultiplierStrategy extends AbstractMultiplierStrategy {

    calculateMultiplier(): number {
        if (this.result.targetMonster.name.includes("TzKal-Zuk")) {
            if (this.result.gearSet.combatClass === CombatClass.Melee) {
                this.result.maxHit = 0;
                this.result.hitChance = 0;
                return 0;
            }
        }
        return 1;
    }
}