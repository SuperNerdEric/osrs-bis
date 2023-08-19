import { AbstractMultiplierStrategy } from "../AbstractMultiplierStrategy";
import { SpellName } from "../../../DataObjects/SpellName";  // Import SpellName for our fire spells check

const EligibleFireSpells = [
    SpellName.FireStrike,
    SpellName.FireBolt,
    SpellName.FireBlast,
    SpellName.FireWave,
    SpellName.FireSurge,
    SpellName.FlamesOfZamorak
];

export class IceDemonMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.targetMonster.name !== "Ice demon") {
            return 1;
        }

        if (this.result.gearSet.spell && EligibleFireSpells.includes(this.result.gearSet.spell.name)) {
            return 1.5;
        }

        return 1/3;
    }
}
