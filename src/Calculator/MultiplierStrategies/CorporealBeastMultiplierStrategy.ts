import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";
import {StyleType, WeaponCategory, WeaponCategoryOptions} from "../../DataObjects/Item";

export class CorporealBeastMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.targetMonster.name !== "Corporeal Beast") {
            return 1;
        }

        const weapon = this.result.gearSet.weapon;
        const combatStyle = this.result.gearSet.combatStyle;

        if ([WeaponCategory.Spear, WeaponCategory.Polearm].includes(weapon.category)) {
            return 1;
        }

        if (weapon.name === ItemName.OsmumtensFang) {
            const matchingStyle = WeaponCategoryOptions[weapon.category]?.find(option => option.combatStyle === combatStyle);
            if (matchingStyle?.styleType === StyleType.Stab) {
                return 1;
            }
        }

        return 0.5;
    }
}