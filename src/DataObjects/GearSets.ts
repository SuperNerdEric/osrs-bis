import {CombatStyle, Item, Slot, StyleType, Weapon, WeaponCategoryOptions, WeaponStyle} from "./Item";
import {items} from "./Items";
import {ItemName} from "./ItemName";
import {Raid} from "./Raid";
import {generateRangedGearSets} from "./GearSets/RangedGearSets";
import {generateMeleeGearSets} from "./GearSets/MeleeGearSets";

export enum GearSetType {
    General,
    Slayer,
    Kalphites,
    Demon,
    Draconic,
    Undead
}

export class GearSet {
    types: GearSetType[];
    weapon: Weapon;
    combatStyle: CombatStyle;
    styleType: StyleType;
    weaponStyle: WeaponStyle;
    styleTypeBonus: number;
    styleStrength: number;
    items: Item[];
    raid?: Raid;

    constructor(gearSetTypes: GearSetType[], weaponName: ItemName, combatStyle: CombatStyle, otherItemNames: ItemName[], raid?: Raid) {
        const weapon = items.get(weaponName);
        if (weapon instanceof Weapon) {
            let styleType: StyleType | undefined;
            let weaponStyle: WeaponStyle | undefined;

            // If the weapon category is present in WeaponCategoryOptions
            const weaponOptions = WeaponCategoryOptions[weapon.category];

            if (weaponOptions) {
                // Look for the selected CombatStyle in the weapon's options
                const matchingOption = weaponOptions.find(option => option.combatStyle === combatStyle);
                // If a match is found, get the corresponding StyleType
                if (matchingOption) {
                    styleType = matchingOption.styleType;
                    weaponStyle = matchingOption.weaponStyle;
                }
            }

            if (styleType && weaponStyle) {
                const {gearItems, styleTypeBonus} = this.getStyleTypeBonus(weapon, otherItemNames, styleType);
                const styleStrength = this.getStyleStrengthBonus(styleType, gearItems);

                this.types = gearSetTypes;
                this.combatStyle = combatStyle;
                this.styleType = styleType;
                this.weapon = weapon;
                this.weaponStyle = weaponStyle;
                this.items = otherItemNames.map(name => items.get(name) as Item);
                this.items.sort((a, b) => a.slot - b.slot);

                this.styleTypeBonus = styleTypeBonus;
                this.styleStrength = styleStrength;

                if (this.weapon.name === ItemName.TumekensShadow && raid === Raid.TombsOfAmascut) {
                    this.styleTypeBonus *= 4;
                    this.styleStrength = Math.min(100, this.styleStrength * 4);
                } else if (this.weapon.name === ItemName.TumekensShadow) {
                    this.styleTypeBonus *= 3;
                    this.styleStrength = Math.min(100, this.styleStrength * 3);
                }

                gearSets.push(this);
                return this;
            } else {
                throw new Error(`Invalid CombatStyle for the selected weapon.`);
            }
        } else {
            throw new Error(`Weapon not found: ${weaponName}`);
        }
    }

    private getStyleTypeBonus(weapon: Weapon, otherItemNames: ItemName[], styleType: StyleType | undefined) {
        const gearItems = [weapon, ...otherItemNames.map(name => items.get(name) as Item)];

        // @ts-ignore
        const styleTypeBonus = gearItems.reduce((total: number, item: Item) => total + (item[styleType.toLowerCase() as "stab" | "slash" | "crush" | "magic" | "ranged"]), 0);
        return {gearItems, styleTypeBonus};
    }

    private getStyleStrengthBonus(styleType: StyleType.Stab | StyleType.Slash | StyleType.Crush | StyleType.Magic | StyleType.Ranged, gearItems: (Weapon | Item)[]) {
        // Determine the strength attribute to be summed up based on the style type
        let strengthAttribute: "strength" | "rangedStrength" | "mageStrength";
        switch (styleType) {
            case StyleType.Stab:
            case StyleType.Slash:
            case StyleType.Crush:
                strengthAttribute = "strength";
                break;
            case StyleType.Ranged:
                strengthAttribute = "rangedStrength";
                break;
            case StyleType.Magic:
                strengthAttribute = "mageStrength";
                break;
        }

        let styleStrength = gearItems.reduce((total: number, item: Item) => total + item[strengthAttribute], 0);

        if (this.applyEliteVoidMageBonus(gearItems)) {
            styleStrength += 2.5;
        }
        return styleStrength;
    }

    private applyEliteVoidMageBonus(gearItems: (Weapon | Item)[]): boolean {
        const requiredItems = [ItemName.VoidMageHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves];
        return requiredItems.every(requiredItem => gearItems.some(gearItem => gearItem.name === requiredItem));
    }


    //This must be idempotent or re-renders will keep increasing the value
    setRaid(raid: Raid) {
        this.raid = raid;
        const gearItems = [this.weapon, ...this.items];

        // @ts-ignore
        const styleTypeBonus = gearItems.reduce((total: number, item: Item) => total + (item[this.styleType.toLowerCase() as "stab" | "slash" | "crush" | "magic" | "ranged"]), 0);
        const styleStrength = this.getStyleStrengthBonus(this.styleType, gearItems);

        // Check if raid is TombsOfAmascut and if the weapon is Tumeken's shadow
        if (this.weapon.name === ItemName.TumekensShadow) {
            if (raid === Raid.TombsOfAmascut) {
                this.styleTypeBonus = styleTypeBonus * 4;
                this.styleStrength = Math.min(100, styleStrength * 4);
            } else {
                this.styleTypeBonus = styleTypeBonus * 3;
                this.styleStrength = Math.min(100, styleStrength * 3);
            }
        }
    }
}

export const gearSets: GearSet[] = [];

new GearSet([GearSetType.Slayer], ItemName.TumekensShadow, CombatStyle.Accurate, [
    ItemName.SlayerHelmetI,
    ItemName.AncestralRobeTop,
    ItemName.AncestralRobeBottom,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

new GearSet([GearSetType.General], ItemName.TumekensShadow, CombatStyle.Accurate, [
    ItemName.AncestralHat,
    ItemName.AncestralRobeTop,
    ItemName.AncestralRobeBottom,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
    ItemName.ElidinisWardF,
    ItemName.AncestralHat,
    ItemName.AncestralRobeTop,
    ItemName.AncestralRobeBottom,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
    ItemName.BookOfTheDead,
    ItemName.AhrimsRobetop,
    ItemName.AhrimsRobeskirt,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
    ItemName.ElidinisWardF,
    ItemName.AhrimsRobetop,
    ItemName.AhrimsRobeskirt,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
    ItemName.ElidinisWardF,
    ItemName.VoidMageHelm,
    ItemName.EliteVoidTop,
    ItemName.EliteVoidRobe,
    ItemName.VoidKnightGloves,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

new GearSet([GearSetType.General], ItemName.TumekensShadow, CombatStyle.Accurate, [
    ItemName.AncestralHat,
    ItemName.AncestralRobeTop,
    ItemName.AncestralRobeBottom,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape,
    ItemName.MagusRing
]);

generateRangedGearSets();
generateMeleeGearSets();

gearSets.map(gearSet => {
    // Create a new array of item names, excluding the existing amulet
    const newItemNames = gearSet.items.map(item => item.name).filter(name => items.get(name)?.slot !== Slot.Neck);

    // Add the SalveAmuletEI
    newItemNames.push(ItemName.SalveAmuletEI);

    // Use the existing gear set's properties for the new GearSet, but replace the items
    return new GearSet([GearSetType.Undead], gearSet.weapon.name, gearSet.combatStyle, newItemNames, gearSet.raid);
});

const gearSetsWithoutSalve = gearSets.filter(gearSet => !gearSet.items.some(item => item.name.includes(ItemName.SalveAmuletEI)));

gearSetsWithoutSalve.map(gearSet => {
    const newItemNames = gearSet.items.map(item => item.name).filter(name => items.get(name)?.slot !== Slot.Helm);
    newItemNames.push(ItemName.SlayerHelmetI);
    return new GearSet([GearSetType.Slayer], gearSet.weapon.name, gearSet.combatStyle, newItemNames, gearSet.raid);
});
