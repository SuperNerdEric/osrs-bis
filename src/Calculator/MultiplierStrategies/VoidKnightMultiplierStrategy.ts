import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy, MultiplierType} from "./AbstractMultiplierStrategy";
import {CombatClass, Item, StyleToCombatClass} from "../../DataObjects/Item";

const VoidKnightMultiplierTable = {
    [ItemName.VoidMeleeHelm]: {
        [CombatClass.Melee]: 1.10,
        [CombatClass.Ranged]: 1,
        [CombatClass.Magic]: 1
    },
    [ItemName.VoidRangerHelm]: {
        [CombatClass.Melee]: 1,
        [CombatClass.Ranged]: 1.10,
        [CombatClass.Magic]: 1
    },
    [ItemName.VoidMageHelm]: {
        [CombatClass.Melee]: 1,
        [CombatClass.Ranged]: 1,
        [CombatClass.Magic]: 1.45
    },
};

type HelmName = keyof typeof VoidKnightMultiplierTable;

export class VoidKnightMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(multiplierType?: MultiplierType): number {
        const helm = Array.from(this.result.gearSet.items.values()).find(item => item.name in VoidKnightMultiplierTable);


        if (!helm || !this.hasValidVoidSetCombination()) {
            return 1;
        }

        const combatClass = StyleToCombatClass[this.result.gearSet.styleType];
        let multiplier = VoidKnightMultiplierTable[helm.name as HelmName][combatClass];

        const isDamageCalculation = (multiplierType === MultiplierType.Damage);

        /**
         * Mage elite bonus is on the {@link GearSet#applyEliteVoidMageBonus} itself as it goes on the equipment stats
         */
        if (this.hasEliteVoidSet() && (combatClass === CombatClass.Ranged) && isDamageCalculation) {
            multiplier += 0.025;
        }

        return multiplier;
    }

    private hasValidVoidSetCombination(): boolean {
        const requiredItems = [
            (item: Item) => item.name in VoidKnightMultiplierTable, // Helm
            (item: Item) => item.name === ItemName.VoidKnightGloves, // Gloves
            (item: Item) => [ItemName.VoidKnightTop, ItemName.EliteVoidTop].includes(item.name), // Top
            (item: Item) => [ItemName.VoidKnightRobe, ItemName.EliteVoidRobe].includes(item.name) // Robe
        ];

        return requiredItems.every(condition => {
            const conditionMet = Array.from(this.result.gearSet.items.values()).some(condition);
            return conditionMet;
        });
    }


    private hasEliteVoidSet(): boolean {
        const eliteVoidKnightItems = [ItemName.EliteVoidTop, ItemName.EliteVoidRobe];
        return eliteVoidKnightItems.every(itemName => this.result.gearSet.hasItemByName(itemName));
    }
}




