import {ItemName} from "../../DataObjects/ItemName";
import {CombatClass} from "../../DataObjects/Item";
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
        const salveNames = Object.keys(SalveMultiplierTable) as SalveName[];
        const salve = salveNames.find(salveName => this.result.gearSet.hasItemByName(salveName));


        if (!salve || !this.result.targetMonster.isUndead) {
            return 1;
        }

        return SalveMultiplierTable[salve][this.result.gearSet.combatClass];
    }
}