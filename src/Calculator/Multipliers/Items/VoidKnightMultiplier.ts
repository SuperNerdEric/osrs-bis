import {ItemName} from "../../../DataObjects/ItemName";
import {MultiplierType} from "../MultiplierType";
import {CombatClass, Item} from "../../../DataObjects/Item";
import {Calculator} from "../../Calculator";

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

export function voidKnightMultiplier(calculator: Calculator, multiplierType?: MultiplierType): number {
    const helm = Array.from(calculator.gearSet.items.values()).find(item => item.name in VoidKnightMultiplierTable);

    if (!helm || !hasValidVoidSetCombination(calculator)) {
        return 1;
    }

    const combatClass = calculator.gearSet.combatClass;
    let multiplier = VoidKnightMultiplierTable[helm.name as HelmName][combatClass];

    const isDamageCalculation = (multiplierType === MultiplierType.Damage);

    /**
     * Mage elite bonus is on the {@link GearSet#applyEliteVoidMageBonus} itself as it goes on the equipment stats
     */
    if (hasEliteVoidSet(calculator) && (combatClass === CombatClass.Ranged) && isDamageCalculation) {
        multiplier += 0.025;
    }

    return multiplier;
}

function hasValidVoidSetCombination(calculator: Calculator): boolean {
    const requiredItems = [
        (item: Item) => [ItemName.VoidMeleeHelm, ItemName.VoidMageHelm, ItemName.VoidRangerHelm].includes(item.name),
        (item: Item) => item.name === ItemName.VoidKnightGloves,
        (item: Item) => [ItemName.VoidKnightTop, ItemName.EliteVoidTop].includes(item.name),
        (item: Item) => [ItemName.VoidKnightRobe, ItemName.EliteVoidRobe].includes(item.name)
    ];

    return requiredItems.every(condition => {
        const conditionMet = Array.from(calculator.gearSet.items.values()).some(condition);
        return conditionMet;
    });
}

function hasEliteVoidSet(calculator: Calculator): boolean {
    const eliteVoidKnightItems = [ItemName.EliteVoidTop, ItemName.EliteVoidRobe];
    return eliteVoidKnightItems.every(itemName => calculator.gearSet.hasItemByName(itemName));
}
