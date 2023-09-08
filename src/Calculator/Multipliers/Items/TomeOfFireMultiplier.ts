import {ItemName} from "../../../DataObjects/ItemName";
import {SpellName} from "../../../DataObjects/SpellName";
import {Calculator} from "../../Calculator";

const FireSpellMultiplier = 1.50;

const EligibleFireSpells = [
    SpellName.FireStrike,
    SpellName.FireBolt,
    SpellName.FireBlast,
    SpellName.FireWave,
    SpellName.FireSurge
];

export function tomeOfFireMultiplier(calculator: Calculator): number {
    const hasTomeOfFire = calculator.gearSet.hasItemByName(ItemName.TomeOfFire);
    const isEligibleSpell = calculator.gearSet.spell && EligibleFireSpells.includes(calculator.gearSet.spell.name);

    if (hasTomeOfFire && isEligibleSpell) {
        return FireSpellMultiplier;
    }

    return 1;
}
