import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";

export class KerisMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.weapon.name === ItemName.KerisPartisanOfBreaching && this.result.targetMonster.isKalphite) {
            // Only breaching partisan gets accuracy bonus
            // https://archive.ph/6gN9c assuming accuracy is same as damage
            return 1.33;
        }

        return 1;
    }
}
