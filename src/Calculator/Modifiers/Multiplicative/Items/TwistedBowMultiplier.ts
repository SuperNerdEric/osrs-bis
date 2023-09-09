import {Calculator} from "../../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";
import {Raid} from "../../../DataObjects/Raid";
import {MultiplierType} from "../MultiplierType";

export function twistedBowMultiplier(calculator: Calculator, multiplierType: MultiplierType): number {
    if (calculator.gearSet.getWeapon().name !== ItemName.TwistedBow) {
        return 1;
    }

    const targetMagic = Math.max(calculator.targetMonster.magicLevel, calculator.targetMonster.magicAccuracy);

    if (multiplierType === MultiplierType.Damage) {
        return twistedBowStrengthMultiplier(targetMagic, calculator.targetMonster.raid);
    } else {
        return twistedBowAccuracyMultiplier(targetMagic, calculator.targetMonster.raid);
    }
}

function twistedBowStrengthMultiplier(targetMagic: number, raid: Raid): number {
    // The Magic level or accuracy caps at 250 outside the Chambers of Xeric, and 350 within.
    if (targetMagic > 350 && raid === Raid.ChambersOfXeric) {
        targetMagic = 350;
    } else if (targetMagic > 250) {
        targetMagic = 250;
    }

    let damageMultiplier = 250 + Math.floor((3 * targetMagic - 14) / 100) - Math.floor(Math.pow(3 * targetMagic / 10 - 140, 2) / 100);
    if (damageMultiplier > 250) {
        damageMultiplier = 250;
    }
    return damageMultiplier / 100;
}

function twistedBowAccuracyMultiplier(targetMagic: number, raid: Raid): number {
    // The Magic level or accuracy caps at 250 outside the Chambers of Xeric, and 350 within.
    if (targetMagic > 350 && raid === Raid.ChambersOfXeric) {
        targetMagic = 350;
    } else if (targetMagic > 250) {
        targetMagic = 250;
    }

    let accuracyMultiplier = 140 + Math.floor((3 * targetMagic - 10) / 100) - Math.floor(Math.pow(3 * targetMagic / 10 - 100, 2) / 100);
    if (accuracyMultiplier > 140) {
        accuracyMultiplier = 140;
    }
    return accuracyMultiplier / 100;
}