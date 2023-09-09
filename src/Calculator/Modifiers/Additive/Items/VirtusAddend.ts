import {ItemName} from "../../../DataObjects/ItemName";
import {Calculator} from "../../../Calculator";
import {SpellBookType} from "../../../DataObjects/Spell";

export function virtusAddend(calculator: Calculator): number {
    const virtusItems = [
        ItemName.VirtusMask,
        ItemName.VirtusRobeTop,
        ItemName.VirtusRobeBottom
    ];

    let virtusBonus = 0;

    for (const item of virtusItems) {
        if (calculator.gearSet.hasItemByName(item)) {
            if (calculator.gearSet.spell && calculator.gearSet.spell.spellbook === SpellBookType.Ancient) {
                virtusBonus += 3;
            }
        }
    }

    return virtusBonus;
}
