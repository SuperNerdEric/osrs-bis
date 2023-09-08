import {Calculator} from "../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";
import {spellBookMapping, SpellBookType} from "../../../DataObjects/Spell";

export function smokeBattlestaffMultiplier(calculator: Calculator): number {
    const validStaves = [ItemName.SmokeBattlestaff, ItemName.MysticSmokeStaff];
    const currentWeapon = calculator.gearSet.getWeapon()?.name;

    if (!validStaves.includes(currentWeapon)) {
        return 1;
    }

    if (calculator.gearSet.spell && spellBookMapping[SpellBookType.Standard].getSpell(calculator.gearSet.spell.name)) {
        return 1.1;
    }

    return 1;
}
