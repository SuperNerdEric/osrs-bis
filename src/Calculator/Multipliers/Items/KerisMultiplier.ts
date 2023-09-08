import {Calculator} from "../../Calculator";
import {MultiplierType} from "../MultiplierType";
import {ItemName} from "../../../DataObjects/ItemName";

export function kerisMultiplier(calculator: Calculator, multiplierType: MultiplierType): number {
    if (multiplierType === MultiplierType.Damage) {
        if (calculator.gearSet.getWeapon().name.includes("Keris") && calculator.targetMonster.isKalphite) {
            // https://archive.ph/6gN9c
            return 1.33;
        }
    } else if (multiplierType === MultiplierType.Accuracy) {
        if (calculator.gearSet.getWeapon().name === ItemName.KerisPartisanOfBreaching && calculator.targetMonster.isKalphite) {
            // Only breaching partisan gets accuracy bonus
            // assuming accuracy is same as damage
            return 1.33;
        }
    }

    return 1;
}
