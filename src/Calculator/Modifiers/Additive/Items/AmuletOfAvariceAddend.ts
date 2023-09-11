import {Calculator} from "../../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";

/**
 * Note: Avarice damage with Melee and Ranged is multiplicative, not additive.
 * For its multiplicative behavior with Melee and Ranged, refer to {@link amuletOfAvariceMultiplier}
 */
export function amuletOfAvariceAddend(calculator: Calculator): number {
    if (calculator.gearSet.hasItemByName(ItemName.AmuletOfAvarice) && calculator.targetMonster.name.includes("Revenant")) {
        return 20;
    }
    return 0;
}
