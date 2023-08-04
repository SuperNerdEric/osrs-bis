import {Item} from "./Item";
import {items} from "./Items";

export enum GearSetType {
    General,
    Slayer,
    Kalphites
}

export interface GearSet {
    types: GearSetType[],
    items: Item[]
}

export const gearSets: GearSet[] = [];

export function createGearSet(types: GearSetType[], itemNames: string[]): GearSet {
    const gearSet: GearSet = {
        types: types,
        items: itemNames.map(name => items.get(name) as Item)
    };
    gearSets.push(gearSet);
    return gearSet;
}

createGearSet([GearSetType.General],["Osmumten's fang", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General],["Osmumten's fang", "Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]);
createGearSet([GearSetType.Slayer],["Osmumten's fang", "Avernic defender", "Slayer helmet (i)", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General],["Ghrazi rapier", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General],["Zamorakian hasta", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General],["Zamorakian hasta", "Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]);
createGearSet([GearSetType.General],["Scythe of vitur", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.General],["Scythe of vitur", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]);
createGearSet([GearSetType.General],["Toxic blowpipe", "Dragon dart", "Masori mask (f)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.General],["Toxic blowpipe", "Dragon dart", "Armadyl helmet", "Armadyl chestplate", "Armadyl chainskirt", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.Slayer],["Twisted bow", "Dragon arrow", "Slayer helmet (i)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.General],["Twisted bow", "Dragon arrow", "Masori mask (f)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.General],["Twisted bow", "Dragon arrow", "Armadyl helmet", "Armadyl chestplate", "Armadyl chainskirt", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
createGearSet([GearSetType.Slayer],["Tumeken's shadow", "Slayer helmet (i)", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.General],["Tumeken's shadow", "Ancestral hat", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.General],["Sanguinesti staff", "Elidinis' ward (f)", "Ancestral hat", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.General],["Sanguinesti staff", "Book of the dead", "Ahrim's robetop", "Ahrim's robeskirt", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.General],["Sanguinesti staff", "Elidinis' ward (f)", "Ahrim's robetop", "Ahrim's robeskirt", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]);
createGearSet([GearSetType.Kalphites],["Keris partisan", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.Kalphites],["Keris partisan", "Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Fire cape"]);
createGearSet([GearSetType.Kalphites],["Keris partisan of breaching", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
createGearSet([GearSetType.Kalphites],["Keris partisan of breaching", "Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Fire cape"]);
createGearSet([GearSetType.Slayer],["Keris partisan of breaching", "Avernic defender", "Slayer helmet (i)", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
