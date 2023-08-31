import {ItemName} from "../../../DataObjects/ItemName";
import {AbstractMultiplierStrategy} from "../AbstractMultiplierStrategy";
import {StyleType, WeaponCategoryOptions} from "../../../DataObjects/Item";

export class CorporealBeastMultiplierStrategy extends AbstractMultiplierStrategy {

    private static corpbaneWeapons = [
        ItemName.BronzeSpear,
        ItemName.IronSpear,
        ItemName.SteelSpear,
        ItemName.BlackSpear,
        ItemName.MithrilSpear,
        ItemName.AdamantSpear,
        ItemName.RuneSpear,
        ItemName.DragonSpear,
        ItemName.BoneSpear,
        ItemName.GildedSpear,
        ItemName.LeafBladedSpear,
        ItemName.GuthansWarspear,
        ItemName.ZamorakianSpear,
        ItemName.BronzeHalberd,
        ItemName.IronHalberd,
        ItemName.SteelHalberd,
        ItemName.BlackHalberd,
        ItemName.WhiteHalberd,
        ItemName.MithrilHalberd,
        ItemName.AdamantHalberd,
        ItemName.RuneHalberd,
        ItemName.DragonHalberd,
        ItemName.CrystalHalberd,
        ItemName.OsmumtensFang
    ];

    calculateMultiplier(): number {
        if (this.result.targetMonster.name !== "Corporeal Beast") {
            return 1;
        }

        const weapon = this.result.gearSet.getWeapon();
        const combatStyle = this.result.gearSet.combatStyle;

        if (CorporealBeastMultiplierStrategy.corpbaneWeapons.includes(weapon.name)) {
            const matchingStyle = WeaponCategoryOptions[weapon.category]?.find(option => option.combatStyle === combatStyle);
            if (matchingStyle?.styleType === StyleType.Stab) {
                return 1;
            }
        }

        if (this.result.gearSet.styleType === StyleType.Magic) {
            return 1;
        }

        return 0.5;
    }
}
