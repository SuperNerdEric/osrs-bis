import { ItemName } from "./DataObjects/ItemName";
import { Calculator } from "./Calculator";
import { SpellName } from "./DataObjects/SpellName";
import { getGearDamageTotalAdditive } from "./Modifiers/Additive/AdditiveUtils";
import { Spell, SpellBookType } from "./DataObjects/Spell";
import { GearSet } from "./DataObjects/GearSets";
import { Slot, Weapon, WeaponCategory } from "./DataObjects/Item";

const elementalSpells: Record<"Air" | "Water" | "Earth" | "Fire", SpellName[]> = {
    Air: [SpellName.WindStrike, SpellName.WindBolt, SpellName.WindBlast, SpellName.WindWave, SpellName.WindSurge],
    Water: [
        SpellName.WaterStrike,
        SpellName.WaterBolt,
        SpellName.WaterBlast,
        SpellName.WaterWave,
        SpellName.WaterSurge,
    ],
    Earth: [
        SpellName.EarthStrike,
        SpellName.EarthBolt,
        SpellName.EarthBlast,
        SpellName.EarthWave,
        SpellName.EarthSurge,
    ],
    Fire: [SpellName.FireStrike, SpellName.FireBolt, SpellName.FireBlast, SpellName.FireWave, SpellName.FireSurge],
};

export function getMagicMaxHit(calculator: Calculator) {
    if (
        calculator.targetMonster.immuneToAncientMagicks &&
        calculator.gearSet.spell?.spellbook === SpellBookType.Ancient
    ) {
        return 0;
    }

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

export function elementalWeaknessMaxHitBonus(calculator: Calculator): number {
    const spell = calculator.gearSet.spell;
    const percent = matchingElementalWeaknessPercent(calculator);
    if (!spell || !percent) {
        return 0;
    }
    return Math.floor((spell.maxHit * percent) / 100);
}

export function elementalWeaknessAccuracyMultiplier(calculator: Calculator): number {
    const percent = matchingElementalWeaknessPercent(calculator);
    return percent ? 1 + percent / 100 : 1;
}

function matchingElementalWeaknessPercent(calculator: Calculator): number {
    const weakness = calculator.targetMonster.elementalWeakness;
    const spellName = calculator.gearSet.spell?.name;
    if (!weakness || !spellName) {
        return 0;
    }
    const spells = elementalSpells[weakness.type];
    if (!spells.includes(spellName)) {
        return 0;
    }
    return weakness.percent;
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
            return Math.floor((8 * magicLevel + 96) / 37);
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
