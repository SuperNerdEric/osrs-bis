import {Calculator} from "../../../Calculator";
import {obsidianMeleeWeapons} from "./ObsidianEquipmentMultiplier";
import {ItemName} from "../../../DataObjects/ItemName";

export function berserkerNecklaceMultiplier(calculator: Calculator): number {
    const currentWeapon = calculator.gearSet.getWeapon()?.name;

    const hasBerserkerNecklace = calculator.gearSet.hasItemByName(ItemName.BerserkerNecklace);

    if (obsidianMeleeWeapons.includes(currentWeapon) && hasBerserkerNecklace) {
        return 1.2;
    }

    return 1;
}
