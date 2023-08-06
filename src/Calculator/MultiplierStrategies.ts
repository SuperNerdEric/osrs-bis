import {Calculator} from "./Calculator";
import {ItemName} from "../DataObjects/ItemName";
import {Raid} from "../DataObjects/Raid";
import {CombatClass, StyleToCombatClass, StyleType} from "../DataObjects/Item";

export abstract class MultiplierStrategy {
    protected result: Calculator;

    constructor(result: Calculator) {
        this.result = result;
    }

    abstract calculateMultiplier(): number;
}

export class SlayerHelmetMultiplierStrategy extends MultiplierStrategy {
    calculateMultiplier(): number {
        const slayerHelmetPresent = this.result.gearSet.items.some(item => item.name === ItemName.SlayerHelmetI);
        if (slayerHelmetPresent && this.result.onTask) {
            if (this.result.gearSet.styleType == StyleType.Stab || this.result.gearSet.styleType == StyleType.Slash || this.result.gearSet.styleType == StyleType.Crush) {
                return 7 / 6;
            } else {
                return 1.15;
            }
        }
        return 1;
    }
}

const SalveMultiplierTable = {
    [ItemName.SalveAmulet]: {
        [CombatClass.Melee]: 7 / 6,
        [CombatClass.Ranged]: 1,
        [CombatClass.Magic]: 1
    },
    [ItemName.SalveAmuletE]: {
        [CombatClass.Melee]: 1.20,
        [CombatClass.Ranged]: 1,
        [CombatClass.Magic]: 1
    },
    [ItemName.SalveAmuletI]: {
        [CombatClass.Melee]: 7 / 6,
        [CombatClass.Ranged]: 7 / 6,
        [CombatClass.Magic]: 1.15
    },
    [ItemName.SalveAmuletEI]: {
        [CombatClass.Melee]: 1.20,
        [CombatClass.Ranged]: 1.20,
        [CombatClass.Magic]: 1.20
    },
};

type SalveName = keyof typeof SalveMultiplierTable;


export class SalveAmuletMultiplierStrategy extends MultiplierStrategy {
    calculateMultiplier(): number {
        const salve = this.result.gearSet.items.find(item => Object.keys(SalveMultiplierTable).includes(item.name));

        if (!salve) {
            return 1;
        }

        const combatClass = StyleToCombatClass[this.result.gearSet.styleType];
        return SalveMultiplierTable[salve.name as SalveName][combatClass];
    }
}

export class TwistedBowStrengthMultiplierStrategy extends MultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.weapon.name === ItemName.TwistedBow) {
            let targetMagic = Math.max(this.result.targetMonster.magicLevel, this.result.targetMonster.magicAccuracy);

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

export class TwistedBowAccuracyMultiplierStrategy extends MultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.weapon.name !== ItemName.TwistedBow) {
            return 1;
        }
        let targetMagic = Math.max(this.result.targetMonster.magicLevel, this.result.targetMonster.magicAccuracy);

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

export class KerisMultiplierStrategy extends MultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.weapon.name === ItemName.KerisPartisanOfBreaching && this.result.targetMonster.isKalphite) {
            // Only breaching partisan gets accuracy bonus
            // https://archive.ph/6gN9c assuming accuracy is same as damage
            return 1.33;
        }

        return 1;
    }
}
