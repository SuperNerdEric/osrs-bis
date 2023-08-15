import {Calculator} from "./Calculator";
import {Raid} from "../DataObjects/Raid";
import {ItemName} from "../DataObjects/ItemName";
import {Slot} from "../DataObjects/Item";
import {getBoltActivationRate} from "./DamagePerHitStrategies";

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

export class DiamondBoltHitChanceStrategy extends HitChanceStrategy {
    calculate(attackRoll: number, defenceRoll: number): number {
        const bolt = this.result.gearSet.items.find(item => item.slot === Slot.Ammo && item.name.includes('bolt'));
        if (!bolt || ![ItemName.DiamondBoltsE, ItemName.DiamondDragonBoltsE, ItemName.RubyBoltsE, ItemName.RubyDragonBoltsE].includes(bolt.name)) {
            return new DefaultHitChanceStrategy(this.result).calculate(attackRoll, defenceRoll);
        }

        const activationPercent = getBoltActivationRate(bolt.name, this.result.player.kandarinHardDiaryComplete);

        const activationRate = activationPercent / 100;
        const nonActivationRate = 1 - activationRate;

        this.result.baseHitChance = new DefaultHitChanceStrategy(this.result).calculate(attackRoll, defenceRoll);

        const overallHitChance = (nonActivationRate * this.result.baseHitChance) + activationRate;

        return overallHitChance;
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
