import {ItemName} from "./DataObjects/ItemName";
import {Calculator} from "./Calculator";
import {SpellName} from "./DataObjects/SpellName";
import {getGearDamageTotalAdditive} from "./Modifiers/Additive/AdditiveUtils";
import {Spell} from "./DataObjects/Spell";
import {GearSet} from "./DataObjects/GearSets";
import {Slot, Weapon, WeaponCategory} from "./DataObjects/Item";

export function getMagicMaxHit(calculator: Calculator) {
    let maxHit;
    const boostedMagicLevel = calculator.player.skills.magic.level + calculator.player.skills.magic.boost;

    if (calculator.gearSet.spell?.name === SpellName.MagicDart) {
        maxHit = getMagicDartMaxHit(calculator.gearSet.getWeapon().name, boostedMagicLevel);
    } else if (calculator.gearSet.spell) {
        maxHit = calculator.gearSet.spell.maxHit;
        if (!calculator.targetMonster.isUndead && calculator.gearSet.spell.name === SpellName.CrumbleUndead) {
            return 0;
        }
        maxHit += chaosGauntletBoost(calculator.gearSet.spell, calculator.gearSet);
    } else {
        maxHit = getMagicWeaponMaxHit(calculator.gearSet.getWeapon(), boostedMagicLevel);
    }
    calculator.gearSet.styleStrength += getGearDamageTotalAdditive(calculator);
    maxHit = Math.floor(maxHit * (1 + calculator.gearSet.styleStrength / 100));

    return maxHit;
}

export function getMagicWeaponMaxHit(weapon: Weapon, boostedMagicLevel: number) {
    if (weapon.category === WeaponCategory.PoweredStaff) {
        return getPoweredStaffMaxHit(weapon.name, boostedMagicLevel);
    } else if (weapon.category === WeaponCategory.Salamander) {
        return getSalamanderMaxHit(weapon.name, boostedMagicLevel);
    }
    return 0;
}

export function getPoweredStaffMaxHit(weaponName: ItemName, magicLevel: number): number {
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
            return Math.floor((8 * (magicLevel) + 96) / 37);
        default:
            return 0;
    }
}

export function getSalamanderMaxHit(weaponName: ItemName, magicLevel: number): number {
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
            return 0;
    }
}

export function getMagicDartMaxHit(weaponName: ItemName, boostedMagicLevel: number): number {
    if (weaponName === ItemName.SlayersStaffE) {
        return Math.floor(boostedMagicLevel / 6) + 13;
    }
    return Math.floor(boostedMagicLevel / 10) + 10;
}

export function chaosGauntletBoost(spell: Spell, gearSet: GearSet): number {
    if (gearSet.getItemBySlot(Slot.Gloves)?.name === ItemName.ChaosGauntlets && spell.name.includes("Bolt")) {
        return 3;
    }
    return 0;
}