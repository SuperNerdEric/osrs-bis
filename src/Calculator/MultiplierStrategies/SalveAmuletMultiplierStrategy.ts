import {ItemName} from "../../DataObjects/ItemName";
import {CombatClass, StyleToCombatClass} from "../../DataObjects/Item";
import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";

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


export class SalveAmuletMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        const salve = this.result.gearSet.items.find(item => Object.keys(SalveMultiplierTable).includes(item.name));

        if (!salve) {
            return 1;
        }

        const combatClass = StyleToCombatClass[this.result.gearSet.styleType];
        return SalveMultiplierTable[salve.name as SalveName][combatClass];
    }
}