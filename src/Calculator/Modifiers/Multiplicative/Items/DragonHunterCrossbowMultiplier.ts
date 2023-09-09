import {Calculator} from "../../../Calculator";
import {MultiplierType} from "../MultiplierType";
import {ItemName} from "../../../DataObjects/ItemName";

export function dragonHunterCrossbowMultiplier(calculator: Calculator, multiplierType: MultiplierType): number {
    if (calculator.gearSet.getWeapon().name === ItemName.DragonHunterCrossbow && calculator.targetMonster.isDraconic) {
        if (multiplierType === MultiplierType.Damage) {
            return 1.25;
        } else {
            return 1.30;
        }
    }
    return 1;
}
