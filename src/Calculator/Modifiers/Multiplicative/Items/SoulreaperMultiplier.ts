import {Calculator} from "../../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";

export function soulreaperMultiplier(calculator: Calculator): number {
    const currentWeapon = calculator.gearSet.getWeapon()?.name;

    if (currentWeapon === ItemName.SoulreaperAxe) {
        return calculator.player.soulStacks * 0.06;
    }

    return 0;
}
