import {ItemName} from "./DataObjects/ItemName";

export  function getMagicWeaponMaxHit(weaponName: ItemName, boostedMagicLevel: number) {
    return getPoweredStaffMaxHit(weaponName, boostedMagicLevel)
        || getSalamanderMaxHit(weaponName, boostedMagicLevel)
        || 0;
}
export function getPoweredStaffMaxHit(weaponName: ItemName, magicLevel: number): number | undefined {
    switch (weaponName) {
        case ItemName.StarterStaff:
            return 8;
        case ItemName.TridentOfTheSeas:
        case ItemName.TridentOfTheSeasE:
            return Math.floor(magicLevel / 3 - 5);
        case ItemName.ThammaronsSceptre:
            return Math.floor(magicLevel / 3 - 8);
        case ItemName.AccursedSceptre:
            return Math.floor(magicLevel / 3 - 6);
        case ItemName.TridentOfTheSwamp:
        case ItemName.TridentOfTheSwampE:
            return Math.floor(magicLevel / 3 - 2);
        case ItemName.SanguinestiStaff:
        case ItemName.HolySanguinestiStaff:
            return Math.floor(magicLevel / 3 - 1);
        case ItemName.Dawnbringer:
            return Math.floor(magicLevel / 6 - 1);
        case ItemName.TumekensShadow:
            return Math.floor(magicLevel / 3 + 1);
        case ItemName.CrystalStaffBasic:
        case ItemName.CorruptedStaffBasic:
            return 23;
        case ItemName.CrystalStaffAttuned:
        case ItemName.CorruptedStaffAttuned:
            return 31;
        case ItemName.CrystalStaffPerfected:
        case ItemName.CorruptedStaffPerfected:
            return 39;
        case ItemName.WarpedSceptre:
            return 16 + Math.floor((8 * (magicLevel - 62)) / 37);
        default:
            return undefined;
    }
}

export function getSalamanderMaxHit(weaponName: ItemName, magicLevel: number): number | undefined {
    switch (weaponName) {
        case ItemName.SwampLizard:
            return Math.floor((magicLevel * (56 + 64) + 320) / 640);
        case ItemName.OrangeSalamander:
            return Math.floor((magicLevel * (59 + 64) + 320) / 640);
        case ItemName.RedSalamander:
            return Math.floor((magicLevel * (77 + 64) + 320) / 640);
        case ItemName.BlackSalamander:
            return Math.floor((magicLevel * (92 + 64) + 320) / 640);
        default:
            return undefined;
    }
}