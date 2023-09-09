import {Calculator} from "../../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";
import {CombatClass} from "../../../DataObjects/Item";

const SalveAdditiveTable = {
    [ItemName.SalveAmulet]: {
        [CombatClass.Magic]: 0,
    },
    [ItemName.SalveAmuletE]: {
        [CombatClass.Magic]: 0,
    },
    [ItemName.SalveAmuletI]: {
        [CombatClass.Magic]: 15,
    },
    [ItemName.SalveAmuletEI]: {
        [CombatClass.Magic]: 20,
    },
};

type SalveAdditiveName = keyof typeof SalveAdditiveTable;

/**
 * Note: Salve damage with Melee and Ranged is multiplicative, not additive.
 * For its multiplicative behavior with Melee and Ranged, refer to {@link salveAmuletMultiplier}
 */
export function salveAmuletAddend(calculator: Calculator): number {
    const salveNames = Object.keys(SalveAdditiveTable) as SalveAdditiveName[];
    const salve = salveNames.find(salveName => calculator.gearSet.hasItemByName(salveName));

    if (!salve || !calculator.targetMonster.isUndead || calculator.gearSet.combatClass !== CombatClass.Magic) {
        return 0;
    }

    return SalveAdditiveTable[salve][CombatClass.Magic];
}
