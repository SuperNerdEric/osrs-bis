import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy, MultiplierType} from "./AbstractMultiplierStrategy";

export class KerisMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(multiplierType: MultiplierType): number {
        if (multiplierType === MultiplierType.Damage) {
            if (this.result.gearSet.getWeapon().name.includes("Keris") && this.result.targetMonster.isKalphite) {
                // https://archive.ph/6gN9c
                return 1.33;
            }
        } else if (multiplierType === MultiplierType.Accuracy) {
            if (this.result.gearSet.getWeapon().name === ItemName.KerisPartisanOfBreaching && this.result.targetMonster.isKalphite) {
                // Only breaching partisan gets accuracy bonus
                // assuming accuracy is same as damage
                return 1.33;
            }
        }

        return 1;
    }
}
