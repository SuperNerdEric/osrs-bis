import { ItemName } from "../../../DataObjects/ItemName";
import { CombatClass } from "../../../DataObjects/Item";
import { Calculator } from "../../../Calculator";
import { MultiplierType } from "../MultiplierType";

const AvariceMultiplierTable = {
    [ItemName.AmuletOfAvarice]: {
        [CombatClass.Melee]: {[MultiplierType.Accuracy]: 1.20, [MultiplierType.Damage]: 1.20},
        [CombatClass.Ranged]: {[MultiplierType.Accuracy]: 1.20, [MultiplierType.Damage]: 1.20},
        [CombatClass.Magic]: {[MultiplierType.Accuracy]: 1.20, [MultiplierType.Damage]: 1},
    }
};

type AvariceName = keyof typeof AvariceMultiplierTable;

/**
 * Note: Amulet of Avarice damage with Magic is additive, not multiplicative.
 * For its additive behavior with Magic, refer to {@link amuletOfAvariceAdditive}
 */
export function amuletOfAvariceMultiplier(calculator: Calculator, multiplierType: MultiplierType): number {
    const avariceNames = Object.keys(AvariceMultiplierTable) as AvariceName[];
    const avarice = avariceNames.find(avariceName => calculator.gearSet.hasItemByName(avariceName));

    if (!avarice || !calculator.targetMonster.name.includes("Revenant")) {
        return 1;
    }

    return AvariceMultiplierTable[avarice][calculator.gearSet.combatClass][multiplierType];
}
