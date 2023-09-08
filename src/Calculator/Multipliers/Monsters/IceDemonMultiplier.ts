import {Calculator} from "../../Calculator";
import {SpellName} from "../../../DataObjects/SpellName";

const EligibleFireSpells = [
    SpellName.FireStrike,
    SpellName.FireBolt,
    SpellName.FireBlast,
    SpellName.FireWave,
    SpellName.FireSurge,
    SpellName.FlamesOfZamorak
];

export function iceDemonMultiplier(calculator: Calculator): number {
    if (calculator.targetMonster.name !== "Ice demon") {
        return 1;
    }

    if (calculator.gearSet.spell && EligibleFireSpells.includes(calculator.gearSet.spell.name)) {
        return 1.5;
    }

    return 1 / 3;
}
