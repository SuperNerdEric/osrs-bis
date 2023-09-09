import {Calculator} from "../../Calculator";
import {ItemName} from "../../DataObjects/ItemName";
import {CombatClass} from "../../DataObjects/Item";

export function slayerHelmetMultiplier(calculator: Calculator): number {
    const slayerHelmetPresent = calculator.gearSet.hasItemByName(ItemName.SlayerHelmetI);
    if (slayerHelmetPresent && calculator.player.onTask) {
        if (calculator.gearSet.combatClass == CombatClass.Melee) {
            return 7 / 6;
        } else {
            return 1.15;
        }
    }
    return 1;
}