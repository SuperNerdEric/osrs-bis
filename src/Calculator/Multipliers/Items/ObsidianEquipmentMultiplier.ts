import {Calculator} from "../../Calculator";
import {ItemName} from "../../DataObjects/ItemName";

export const obsidianMeleeWeapons = [
    ItemName.ToktzXilEk,
    ItemName.ToktzXilAk,
    ItemName.TzhaarKetEm,
    ItemName.TzhaarKetOm,
    ItemName.TzhaarKetOmT,
    ItemName.ToktzMejTal
];

const obsidianEquipment = [
    ItemName.ObsidianHelmet,
    ItemName.ObsidianPlatebody,
    ItemName.ObsidianPlatelegs
];

export function obsidianEquipmentMultiplier(calculator: Calculator): number {
    const currentWeapon = calculator.gearSet.getWeapon()?.name;

    if (!obsidianMeleeWeapons.includes(currentWeapon)) {
        return 1;
    }

    const isFullObsidianSet = obsidianEquipment.every(piece => calculator.gearSet.hasItemByName(piece));

    if (!isFullObsidianSet) {
        return 1;
    }

    return 1.1;
}
