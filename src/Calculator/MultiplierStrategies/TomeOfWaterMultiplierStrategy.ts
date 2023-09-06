import { ItemName } from "../../DataObjects/ItemName";
import { AbstractMultiplierStrategy } from "./AbstractMultiplierStrategy";
import { SpellName } from "../../DataObjects/SpellName";

const WaterSpellMultiplier = 1.20;

const EligibleWaterSpells = [
    SpellName.WaterStrike,
    SpellName.WaterBolt,
    SpellName.WaterBlast,
    SpellName.WaterWave,
    SpellName.WaterSurge
];

export class TomeOfWaterMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {

        const hasTomeOfWater = this.result.gearSet.hasItemByName(ItemName.TomeOfWater);
        const isEligibleSpell = this.result.gearSet.spell && EligibleWaterSpells.includes(this.result.gearSet.spell.name);

        if (hasTomeOfWater && isEligibleSpell) {
            return WaterSpellMultiplier;
        }

        return 1;
    }
}
