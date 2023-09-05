import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy, MultiplierType} from "./AbstractMultiplierStrategy";

export class CrystalEquipmentMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(multiplierType: MultiplierType): number {
        const validBows = [ItemName.BowOfFaerdhinen, ItemName.CrystalBow];
        const currentWeapon = this.result.gearSet.getWeapon()?.name;

        if (!validBows.includes(currentWeapon)) return 1;

        const bonuses = [
            { piece: ItemName.CrystalHelm, damageBonus: 0.025, accuracyBonus: 0.05 },
            { piece: ItemName.CrystalBody, damageBonus: 0.075, accuracyBonus: 0.15 },
            { piece: ItemName.CrystalLegs, damageBonus: 0.05, accuracyBonus: 0.10 }
        ];

        let totalDamageBonus = 0;
        let totalAccuracyBonus = 0;

        bonuses.forEach(bonus => {
            if (this.result.gearSet.hasItemByName(bonus.piece)) {
                totalDamageBonus += bonus.damageBonus;
                totalAccuracyBonus += bonus.accuracyBonus;
            }
        });

        switch (multiplierType) {
            case MultiplierType.Damage:
                return 1 + totalDamageBonus;
            case MultiplierType.Accuracy:
                return 1 + totalAccuracyBonus;
            default:
                return 1;
        }
    }
}
