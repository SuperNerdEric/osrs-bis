import {
    CombatClass,
    CombatStyle,
    Item,
    Slot,
    StyleToCombatClass,
    StyleType,
    Weapon,
    WeaponCategoryOptions,
    WeaponStyle
} from "./Item";
import {items} from "./Items";
import {ItemName} from "./ItemName";
import {Raid} from "./Raid";
import {generateRangedGearSets} from "../../GearSets/RangedGearSets";
import {generateMeleeGearSets} from "../../GearSets/MeleeGearSets";
import {generateMageGearsets} from "../../GearSets/MageGearSets";
import * as _ from "lodash";
import {ancientSpellbook, arceuusSpellbook, Spell, spellBookMapping, SpellBookType, standardSpellbook} from "./Spell";
import {SpellName} from "./SpellName";

export enum GearSetType {
    General,
    Slayer,
    Kalphites,
    Demon,
    Draconic,
    Undead,
    Leafy
}

export class GearSet {
    types: GearSetType[];
    combatClass: CombatClass = CombatClass.Melee;
    combatStyle: CombatStyle = CombatStyle.Punch;
    styleType: StyleType = StyleType.Crush;
    weaponStyle: WeaponStyle = WeaponStyle.Accurate;
    spell?: Spell;
    styleTypeBonus: number = 0;
    styleStrength: number = 0;
    items: Map<Slot, Item> = new Map();
    raid?: Raid;

    constructor(gearSetTypes: GearSetType[], raid?: Raid) {
        this.types = gearSetTypes;
        this.raid = raid;
    }

    addItemByName(itemName: string): this {
        const item = items.get(itemName);
        if (!item) {
            throw new Error(`Item not found: ${itemName}`);
        }
        return this.addItem(item);
    }

    addItem(item: Item): this {
        if (item.slot === Slot.TwoHand) {
            this.items.delete(Slot.MainHand);
            this.items.delete(Slot.OffHand);
        } else if (item.slot === Slot.MainHand || item.slot === Slot.OffHand) {
            this.items.delete(Slot.TwoHand);
        }
        this.items.set(item.slot, item);
        this.recalculateAttributes();

        return this;
    }

    setSpellByName(spellName: SpellName): this {
        const spell = standardSpellbook.getSpell(spellName)
            || arceuusSpellbook.getSpell(spellName)
            || ancientSpellbook.getSpell(spellName);
        if (!spell) {
            throw new Error(`Spell not found: ${spellName}`);
        }
        this.spell = spell;
        this.recalculateAttributes();

        return this;
    }

    getItemBySlot(slot: Slot): Item | undefined {
        return this.items.get(slot);
    }

    getWeapon(): Weapon {
        const mainHand = this.getItemBySlot(Slot.MainHand);
        const twoHand = this.getItemBySlot(Slot.TwoHand);
        return twoHand as Weapon || mainHand as Weapon;
    }

    hasItemByName(itemName: ItemName): boolean {
        return Array.from(this.items.values()).some(item => item.name === itemName);
    }

    private recalculateAttributes(): void {
        const weapon = this.items.get(Slot.MainHand) || this.items.get(Slot.TwoHand);

        if (weapon) {
            const {gearItems, styleTypeBonus} = this.getStyleTypeBonus(this.items, this.styleType);
            const styleStrength = this.getStyleStrengthBonus(this.styleType, gearItems);

            this.styleTypeBonus = styleTypeBonus;
            this.styleStrength = styleStrength;

            if (weapon.name === ItemName.TumekensShadow) {
                const multiplier = this.raid === Raid.TombsOfAmascut ? 4 : 3;
                this.styleTypeBonus *= multiplier;
                this.styleStrength = Math.min(100, this.styleStrength * multiplier);
            }

            //Happens after Tumeken's for some reason https://archive.ph/mw2LB https://archive.ph/CtG0m
            if (this.applyEliteVoidMageBonus(gearItems)) {
                this.styleStrength += 2.5;
            }

            if (this.applySmokeBattleStaffBonus()) {
                this.styleStrength += 10;
            }
        }

        const virtusItems = [ItemName.VirtusMask, ItemName.VirtusRobeTop, ItemName.VirtusRobeBottom];
        let virtusBonus = 0;

        for (const item of virtusItems) {
            if (this.hasItemByName(item)) {
                if (this.spell && this.spell.spellbook === SpellBookType.Ancient) {
                    virtusBonus += 3;
                }
            }
        }

        this.styleStrength += virtusBonus;
    }

    setCombatStyle(combatStyle: CombatStyle): this {
        const weapon: Weapon = <Weapon>this.items.get(Slot.MainHand) || this.items.get(Slot.TwoHand);
        if (!weapon) {
            throw new Error("No weapon equipped.");
        }

        const weaponOptions = WeaponCategoryOptions[weapon.category];
        if (!weaponOptions) {
            throw new Error(`No weapon options available for category ${weapon.category}.`);
        }

        const matchingOption = weaponOptions.find(option => option.combatStyle === combatStyle);
        if (!matchingOption) {
            throw new Error(`Invalid CombatStyle for the selected weapon.`);
        }

        if(this.spell) {
            this.combatClass = CombatClass.Magic;
        } else {
            this.combatClass = StyleToCombatClass[matchingOption.styleType];
        }
        this.combatStyle = combatStyle;
        this.styleType = matchingOption.styleType;
        this.weaponStyle = matchingOption.weaponStyle;

        return this;
    }

    private getStyleTypeBonus(items: Map<Slot, Item>, styleType: StyleType | undefined) {
        const gearItems = Array.from(items.values());

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

        return gearItems.reduce((total: number, item: Item) => total + item[strengthAttribute], 0);
    }

    private applyEliteVoidMageBonus(gearItems: (Weapon | Item)[]): boolean {
        const requiredItems = [ItemName.VoidMageHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves];
        return requiredItems.every(requiredItem => gearItems.some(gearItem => gearItem.name === requiredItem));
    }

    private applySmokeBattleStaffBonus(): boolean {
        const validStaves = [ItemName.SmokeBattlestaff, ItemName.MysticSmokeStaff];
        const currentWeapon = this.getWeapon().name;
        if(validStaves.includes(currentWeapon) && this.spell && spellBookMapping[SpellBookType.Standard].getSpell(this.spell.name)) {
            return true;
        }
        return false;
    }

    setRaid(raid: Raid) {
        this.raid = raid;
        this.recalculateAttributes();
    }
}

export const gearSets: GearSet[] = [];

generateMageGearsets();
generateRangedGearSets();
generateMeleeGearSets();

const uniqueGearSets = new Set<string>();
const newGearSets: GearSet[] = [];

gearSets.forEach(gearSet => {
    const clonedGearset: GearSet = _.cloneDeep(gearSet);
    clonedGearset.addItemByName(ItemName.SalveAmuletEI);

    const gearSetString = [
        clonedGearset.combatStyle,
        ...Array.from(clonedGearset.items.values()).map(item => item.name)
    ].join();

    if (!uniqueGearSets.has(gearSetString)) {
        uniqueGearSets.add(gearSetString);
        clonedGearset.types = [GearSetType.Undead];
        newGearSets.push(clonedGearset);
    }
});

gearSets.push(...newGearSets);


const gearSetsWithoutSalve = gearSets.filter(gearSet => {
    const neckItem = gearSet.items.get(Slot.Neck);
    return !neckItem || neckItem.name !== ItemName.SalveAmuletEI;
});

gearSetsWithoutSalve.map(gearSet => {
    const clonedGearset: GearSet = _.cloneDeep(gearSet);
    clonedGearset.addItemByName(ItemName.SlayerHelmetI);
    clonedGearset.types = [GearSetType.Slayer];
    gearSets.push(clonedGearset);
    return clonedGearset;
});
