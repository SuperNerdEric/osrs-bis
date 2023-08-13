import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy, MultiplierType} from "./AbstractMultiplierStrategy";

export class DragonHunterCrossbowMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(multiplierType?: MultiplierType): number {
        if (this.result.gearSet.weapon.name === ItemName.DragonHunterCrossbow && this.result.targetMonster.isDraconic) {
            if (multiplierType === MultiplierType.Damage) {
                return 1.25;
            } else {
                return 1.30
            }
        }

        return 1;
    }
}
