import {ItemName} from "../../../DataObjects/ItemName";
import {CombatClass} from "../../../DataObjects/Item";
import {Calculator} from "../../../Calculator";
import {MultiplierType} from "../MultiplierType";

const SalveMultiplierTable = {
    [ItemName.SalveAmulet]: {
        [CombatClass.Melee]: {[MultiplierType.Accuracy]: 7 / 6, [MultiplierType.Damage]: 7 / 6},
        [CombatClass.Ranged]: {[MultiplierType.Accuracy]: 1, [MultiplierType.Damage]: 1},
        [CombatClass.Magic]: {[MultiplierType.Accuracy]: 1, [MultiplierType.Damage]: 1},
    },
    [ItemName.SalveAmuletE]: {
        [CombatClass.Melee]: {[MultiplierType.Accuracy]: 1.20, [MultiplierType.Damage]: 1.20},
        [CombatClass.Ranged]: {[MultiplierType.Accuracy]: 1, [MultiplierType.Damage]: 1},
        [CombatClass.Magic]: {[MultiplierType.Accuracy]: 1, [MultiplierType.Damage]: 1},
    },
    [ItemName.SalveAmuletI]: {
        [CombatClass.Melee]: {[MultiplierType.Accuracy]: 7 / 6, [MultiplierType.Damage]: 7 / 6},
        [CombatClass.Ranged]: {[MultiplierType.Accuracy]: 7 / 6, [MultiplierType.Damage]: 7 / 6},
        [CombatClass.Magic]: {[MultiplierType.Accuracy]: 1.15, [MultiplierType.Damage]: 1},
    },
    [ItemName.SalveAmuletEI]: {
        [CombatClass.Melee]: {[MultiplierType.Accuracy]: 1.20, [MultiplierType.Damage]: 1.20},
        [CombatClass.Ranged]: {[MultiplierType.Accuracy]: 1.20, [MultiplierType.Damage]: 1.20},
        [CombatClass.Magic]: {[MultiplierType.Accuracy]: 1.20, [MultiplierType.Damage]: 1},
    },
};

type SalveName = keyof typeof SalveMultiplierTable;

/**
 * Note: Salve damage with Magic is additive, not multiplicative.
 * For its additive behavior with Magic, refer to {@link salveAmuletAddend}
 */
export function salveAmuletMultiplier(calculator: Calculator, multiplierType: MultiplierType): number {
    const salveNames = Object.keys(SalveMultiplierTable) as SalveName[];
    const salve = salveNames.find(salveName => calculator.gearSet.hasItemByName(salveName));

    if (!salve || !calculator.targetMonster.isUndead) {
        return 1;
    }

    if (calculator.gearSet.combatClass === CombatClass.Magic && multiplierType === MultiplierType.Damage) {
        return 1;
    }

    return SalveMultiplierTable[salve][calculator.gearSet.combatClass][multiplierType];
}
