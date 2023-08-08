import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";

export class DragonHunterLanceMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.weapon.name === ItemName.DragonHunterLance && this.result.targetMonster.isDraconic) {
            return 1.2;
        }

        return 1;
    }
}
