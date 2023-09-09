import {ItemName} from "../../../DataObjects/ItemName";
import {spellBookMapping, SpellBookType} from "../../../DataObjects/Spell";
import {Calculator} from "../../../Calculator";

export function smokeBattleStaffAddend(calculator: Calculator): number {
    const validStaves = [ItemName.SmokeBattlestaff, ItemName.MysticSmokeStaff];
    const currentWeapon = calculator.gearSet.getWeapon().name;
    if (validStaves.includes(currentWeapon) && calculator.gearSet.spell && spellBookMapping[SpellBookType.Standard].getSpell(calculator.gearSet.spell.name)) {
        return 10;
    }
    return 0;
}