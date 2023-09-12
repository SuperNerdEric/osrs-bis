import {Calculator} from "../../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";
import {MultiplierType} from "../MultiplierType";
import {TargetMonster} from "../../../DataObjects/TargetMonster";

enum VampyreTier {
    TIER1,
    TIER2,
    TIER3,
    NONE
}

function getVampyreTier(targetMonster: TargetMonster): VampyreTier {
    if (targetMonster.isVampyre1) return VampyreTier.TIER1;
    if (targetMonster.isVampyre2) return VampyreTier.TIER2;
    if (targetMonster.isVampyre3) return VampyreTier.TIER3;
    return VampyreTier.NONE;
}

const silverWeapon = [
    ItemName.BlessedAxe,
    ItemName.IvandisFlail,
    ItemName.BlisterwoodFlail,
    ItemName.SilverSickle,
    ItemName.SilverSickleB,
    ItemName.EmeraldSickleB,
    ItemName.EnchantedEmeraldSickleB,
    ItemName.RubySickleB,
    ItemName.EnchantedRubySickleB,
    ItemName.BlisterwoodSickle,
    ItemName.Silverlight,
    ItemName.Darklight,
    ItemName.Arclight,
    ItemName.RodOfIvandis,
    ItemName.Wolfbane
];

const silverAmmo = [ItemName.SilverBolts];

const tier3Weapon = [ItemName.IvandisFlail, ItemName.BlisterwoodSickle, ItemName.BlisterwoodFlail];

export function vampyreMultiplier(calculator: Calculator, multiplierType: MultiplierType): number {
    const weaponName = calculator.gearSet.getWeapon().name;
    const vampyreTier = getVampyreTier(calculator.targetMonster);


    if (vampyreTier != VampyreTier.NONE) {
        if (weaponName === ItemName.IvandisFlail) {
            return multiplierType === MultiplierType.Damage ? 1.20 : 1;
        }
        if (weaponName === ItemName.BlisterwoodSickle) {
            return multiplierType === MultiplierType.Damage ? 1.15 : 1.05;
        }
        if (weaponName === ItemName.BlisterwoodFlail) {
            return multiplierType === MultiplierType.Damage ? 1.25 : 1.05;
        }
    }

    switch (vampyreTier) {
        case VampyreTier.TIER1:
            if (silverWeapon.includes(weaponName)) {
                return multiplierType === MultiplierType.Damage ? 1.1 : 1;
            }
            break;
        case VampyreTier.TIER2:
            if (!silverWeapon.includes(weaponName)) {
                return 0;
            }
            break;
        case VampyreTier.TIER3:
            if (!tier3Weapon.includes(weaponName)) {
                return 0;
            }
            break;
    }

    return 1;
}