import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";
import {ItemName} from "../../DataObjects/ItemName";
import {Raid} from "../../DataObjects/Raid";

export class TwistedBowStrengthMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.getWeapon().name === ItemName.TwistedBow) {
            let targetMagic = Math.max(this.result.targetMonsterVariant.magicLevel, this.result.targetMonsterVariant.magicAccuracy);

            // The Magic level or accuracy caps at 250 outside the Chambers of Xeric, and 350 within.
            if (targetMagic > 350 && this.result.targetMonster.raid === Raid.ChambersOfXeric) {
                targetMagic = 350;
            } else if (targetMagic > 250) {
                targetMagic = 250;
            }
            let damageMultiplier = 250 + Math.floor((3 * targetMagic - 14) / 100) - Math.floor(Math.pow(3 * targetMagic / 10 - 140, 2) / 100)
            if (damageMultiplier > 250) {
                damageMultiplier = 250;
            }
            const tbowModifier = damageMultiplier / 100;
            return tbowModifier;
        }

        return 1;
    }
}

export class TwistedBowAccuracyMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.getWeapon().name !== ItemName.TwistedBow) {
            return 1;
        }
        let targetMagic = Math.max(this.result.targetMonsterVariant.magicLevel, this.result.targetMonsterVariant.magicAccuracy);

        // The Magic level or accuracy caps at 250 outside the Chambers of Xeric, and 350 within.
        if (targetMagic > 350 && this.result.targetMonster.raid === Raid.ChambersOfXeric) {
            targetMagic = 350;
        } else if (targetMagic > 250) {
            targetMagic = 250;
        }

        let tbowAccuracyGearModifier = 140 + Math.floor((3 * targetMagic - 10) / 100) - Math.floor(Math.pow(3 * targetMagic / 10 - 100, 2) / 100);
        if (tbowAccuracyGearModifier > 140) {
            tbowAccuracyGearModifier = 140;
        }

        return tbowAccuracyGearModifier / 100;
    }
}