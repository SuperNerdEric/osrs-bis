import {ItemName} from "../../../DataObjects/ItemName";
import {StyleType, WeaponCategoryOptions} from "../../../DataObjects/Item";
import {Calculator} from "../../../Calculator";

const corpbaneWeapons = [
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

export function corporealBeastMultiplier(calculator: Calculator): number {
    if (calculator.targetMonster.name !== "Corporeal Beast") {
        return 1;
    }

    const weapon = calculator.gearSet.getWeapon();
    const combatStyle = calculator.gearSet.combatStyle;

    if (corpbaneWeapons.includes(weapon.name)) {
        const matchingStyle = WeaponCategoryOptions[weapon.category]?.find(option => option.combatStyle === combatStyle);
        if (matchingStyle?.styleType === StyleType.Stab) {
            return 1;
        }
    }

    if (calculator.gearSet.styleType === StyleType.Magic) {
        return 1;
    }

    return 0.5;
}
