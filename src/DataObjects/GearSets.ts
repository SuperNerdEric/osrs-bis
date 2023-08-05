import {CombatStyle, Item, StyleType, Weapon, WeaponCategoryOptions, WeaponStyle} from "./Item";
import {items} from "./Items";

export enum GearSetType {
    General,
    Slayer,
    Kalphites
}

export interface GearSet {
    types: GearSetType[],
    weapon: Weapon,
    combatStyle: CombatStyle,
    styleType: StyleType;
    weaponStyle: WeaponStyle;
    items: Item[]
}

export const gearSets: GearSet[] = [];


export function createGearSet(gearSetTypes: GearSetType[], weaponName: string, combatStyle: CombatStyle, otherItemNames: string[]): GearSet {
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
            const gearSet: GearSet = {
                types: gearSetTypes,
                combatStyle: combatStyle,
                styleType: styleType,
                weapon: weapon,
                weaponStyle: weaponStyle,
                items: otherItemNames.map(name => items.get(name) as Item)
            };
            gearSets.push(gearSet);
            return gearSet;
        } else {
            throw new Error(`Invalid CombatStyle for the selected weapon.`);
        }
    } else {
        throw new Error(`Weapon not found: ${weaponName}`);
    }
}



createGearSet([GearSetType.General], "Osmumten's fang", CombatStyle.Lunge, ["Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General], "Osmumten's fang", CombatStyle.Lunge, ["Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]);
createGearSet([GearSetType.Slayer], "Osmumten's fang", CombatStyle.Lunge, ["Avernic defender", "Slayer helmet (i)", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General], "Ghrazi rapier", CombatStyle.Lunge, ["Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General], "Zamorakian hasta", CombatStyle.Lunge, ["Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General], "Zamorakian hasta", CombatStyle.Lunge, ["Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]);
createGearSet([GearSetType.General], "Scythe of vitur", CombatStyle.Chop, ["Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General], "Scythe of vitur", CombatStyle.Chop, ["Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]);
createGearSet([GearSetType.General], "Toxic blowpipe", CombatStyle.Rapid, ["Dragon dart", "Masori mask (f)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.General], "Toxic blowpipe", CombatStyle.Rapid, ["Dragon dart", "Armadyl helmet", "Armadyl chestplate", "Armadyl chainskirt", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.Slayer], "Twisted bow", CombatStyle.Rapid, ["Dragon arrow", "Slayer helmet (i)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.General], "Twisted bow", CombatStyle.Rapid, ["Dragon arrow", "Masori mask (f)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.General], "Twisted bow", CombatStyle.Rapid, ["Dragon arrow", "Armadyl helmet", "Armadyl chestplate", "Armadyl chainskirt", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.Slayer], "Tumeken's shadow", CombatStyle.Accurate, ["Slayer helmet (i)", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.General], "Tumeken's shadow", CombatStyle.Accurate, ["Ancestral hat", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.General], "Sanguinesti staff", CombatStyle.Accurate, ["Elidinis' ward (f)", "Ancestral hat", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.General], "Sanguinesti staff", CombatStyle.Accurate, ["Book of the dead", "Ahrim's robetop", "Ahrim's robeskirt", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.General], "Sanguinesti staff", CombatStyle.Accurate, ["Elidinis' ward (f)", "Ahrim's robetop", "Ahrim's robeskirt", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.Kalphites], "Keris partisan", CombatStyle.Lunge, ["Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.Kalphites], "Keris partisan", CombatStyle.Lunge, ["Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Fire cape"]);
createGearSet([GearSetType.Kalphites], "Keris partisan of breaching", CombatStyle.Lunge, ["Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.Kalphites], "Keris partisan of breaching", CombatStyle.Lunge, ["Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Fire cape"]);
createGearSet([GearSetType.Slayer], "Keris partisan of breaching", CombatStyle.Lunge, ["Avernic defender", "Slayer helmet (i)", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
