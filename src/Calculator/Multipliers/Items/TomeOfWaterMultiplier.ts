import {ItemName} from "../../../DataObjects/ItemName";
import {SpellName} from "../../../DataObjects/SpellName";
import {Calculator} from "../../Calculator";

const WaterSpellMultiplier = 1.20;

const EligibleWaterSpells = [
    SpellName.WaterStrike,
    SpellName.WaterBolt,
    SpellName.WaterBlast,
    SpellName.WaterWave,
    SpellName.WaterSurge
];

export function tomeOfWaterMultiplier(calculator: Calculator): number {
    const hasTomeOfWater = calculator.gearSet.hasItemByName(ItemName.TomeOfWater);
    const isEligibleSpell = calculator.gearSet.spell && EligibleWaterSpells.includes(calculator.gearSet.spell.name);

    if (hasTomeOfWater && isEligibleSpell) {
        return WaterSpellMultiplier;
    }

    return 1;
}
