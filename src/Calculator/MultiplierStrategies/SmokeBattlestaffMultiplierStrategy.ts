import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";
import {spellBookMapping, SpellBookType} from "../../DataObjects/Spell";

export class SmokeBattlestaffMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        const validStaves = [ItemName.SmokeBattlestaff, ItemName.MysticSmokeStaff];
        const currentWeapon = this.result.gearSet.getWeapon()?.name;
        if (!validStaves.includes(currentWeapon)) {
            return 1;
        }

        if (this.result.gearSet.spell && spellBookMapping[SpellBookType.Standard].getSpell(this.result.gearSet.spell.name)) {
            return 1.1;
        }

        return 1;
    }
}
