import {ItemName} from "../../DataObjects/ItemName";
import {CombatClass} from "../../DataObjects/Item";
import {Calculator} from "../../Calculator";

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

export function salveAmuletMultiplier(calculator: Calculator): number {
    const salveNames = Object.keys(SalveMultiplierTable) as SalveName[];
    const salve = salveNames.find(salveName => calculator.gearSet.hasItemByName(salveName));

    if (!salve || !calculator.targetMonster.isUndead) {
        return 1;
    }

    return SalveMultiplierTable[salve][calculator.gearSet.combatClass];
}
