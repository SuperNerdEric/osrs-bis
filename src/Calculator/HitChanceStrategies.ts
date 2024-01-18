import {Calculator} from "./Calculator";
import {Raid} from "./DataObjects/Raid";
import {ItemName} from "./DataObjects/ItemName";
import {StyleType} from "./DataObjects/Item";

abstract class HitChanceStrategy {
    protected result: Calculator;

    constructor(result: Calculator) {
        this.result = result;
    }

    abstract calculate(attackRoll: number, defenceRoll: number): number;
}

export class OsmumtensFangHitChanceStrategy extends HitChanceStrategy {
    calculate(attackRoll: number, defenceRoll: number) {
        let hitChance = new DefaultHitChanceStrategy(this.result).calculate(attackRoll, defenceRoll);
        if (this.result.targetMonster.raid === Raid.TombsOfAmascut) {
            hitChance = hitChance + (hitChance * (1 - hitChance));
        } else {
            if (attackRoll > defenceRoll) {
                hitChance = 1 - ((defenceRoll + 2) * (2 * defenceRoll + 3)) / (6 * Math.pow(attackRoll + 1, 2));
            } else {
                hitChance = (6 * Math.pow(attackRoll + 1, 2) - (attackRoll + 2) * (2 * attackRoll + 3)) / (6 * (defenceRoll + 1) * (attackRoll + 1));
            }
        }
        return hitChance;
    }
}


export class DefaultHitChanceStrategy extends HitChanceStrategy {
    calculate(attackRoll: number, defenceRoll: number): number {
        if (attackRoll > defenceRoll) {
            return 1 - ((defenceRoll + 2) / (2 * (attackRoll + 1)));
        } else {
            return attackRoll / (2 * (defenceRoll + 1));
        }
    }
}

export function calculateHitChance(calculator: Calculator, attackRoll: number, defenceRoll: number) {
    let strategy;

    if (calculator.gearSet.getWeapon().name === ItemName.OsmumtensFang && calculator.gearSet.styleType === StyleType.Stab) {
        strategy = new OsmumtensFangHitChanceStrategy(calculator);
    } else {
        strategy = new DefaultHitChanceStrategy(calculator);
    }
    return strategy.calculate(attackRoll, defenceRoll);
}