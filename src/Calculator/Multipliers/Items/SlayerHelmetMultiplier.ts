import {Calculator} from "../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";
import {StyleType} from "../../../DataObjects/Item";

export function slayerHelmetMultiplier(calculator: Calculator): number {
    const slayerHelmetPresent = calculator.gearSet.hasItemByName(ItemName.SlayerHelmetI);
    if (slayerHelmetPresent && calculator.player.onTask) {
        if (calculator.gearSet.styleType == StyleType.Stab || calculator.gearSet.styleType == StyleType.Slash || calculator.gearSet.styleType == StyleType.Crush) {
            return 7 / 6;
        } else {
            return 1.15;
        }
    }
    return 1;
}