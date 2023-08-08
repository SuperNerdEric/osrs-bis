import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";

export class ArclightMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.weapon.name === ItemName.Arclight && this.result.targetMonster.isDemon) {
            if (this.result.targetMonster.name === "Duke Sucellus") {
                return 1.5;
            } else {
                return 1.7;
            }
        }

        return 1;
    }
}
