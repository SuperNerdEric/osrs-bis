import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";
import {ItemName} from "../../DataObjects/ItemName";
import {StyleType} from "../../DataObjects/Item";

export class SlayerHelmetMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        const slayerHelmetPresent = this.result.gearSet.items.some(item => item.name === ItemName.SlayerHelmetI);
        if (slayerHelmetPresent && this.result.onTask) {
            if (this.result.gearSet.styleType == StyleType.Stab || this.result.gearSet.styleType == StyleType.Slash || this.result.gearSet.styleType == StyleType.Crush) {
                return 7 / 6;
            } else {
                return 1.15;
            }
        }
        return 1;
    }
}
