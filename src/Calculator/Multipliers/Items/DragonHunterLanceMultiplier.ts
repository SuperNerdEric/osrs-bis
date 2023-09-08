import {Calculator} from "../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";

export function dragonHunterLanceMultiplier(calculator: Calculator): number {
    if (calculator.gearSet.getWeapon().name === ItemName.DragonHunterLance && calculator.targetMonster.isDraconic) {
        return 1.2;
    }
    return 1;
}
