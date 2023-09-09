import {Calculator} from "../../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";

export function amuletOfAvariceAddend(calculator: Calculator): number {
    if (calculator.gearSet.hasItemByName(ItemName.AmuletOfAvarice) && calculator.targetMonster.name.includes("Revenant")) {
        return 20;
    }
    return 0;
}
