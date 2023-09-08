import {Calculator} from "../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";

export function arclightMultiplier(calculator: Calculator): number {
    if (calculator.gearSet.getWeapon().name === ItemName.Arclight && calculator.targetMonster.isDemon) {
        if (calculator.targetMonster.name === "Duke Sucellus") {
            return 1.5;
        } else {
            return 1.7;
        }
    }
    return 1;
}
