import { ItemName } from "../../DataObjects/ItemName";
import { AbstractMultiplierStrategy } from "./AbstractMultiplierStrategy";
import { SpellName } from "../../DataObjects/SpellName";

const FireSpellMultiplier = 1.50;

const EligibleFireSpells = [
    SpellName.FireStrike,
    SpellName.FireBolt,
    SpellName.FireBlast,
    SpellName.FireWave,
    SpellName.FireSurge
];

export class TomeOfFireMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {

        const hasTomeOfFire = this.result.gearSet.hasItemByName(ItemName.TomeOfFire);
        const isEligibleSpell = this.result.gearSet.spell && EligibleFireSpells.includes(this.result.gearSet.spell.name);

        if (hasTomeOfFire && isEligibleSpell) {
            return FireSpellMultiplier;
        }

        return 1;
    }
}
