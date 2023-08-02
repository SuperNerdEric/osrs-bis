import {Item} from "./Item";
import {items} from "./Items";

export const gearSets: Item[][] = [];

function createGearSet(itemNames: string[]): Item[] {
    return itemNames.map(name => items.get(name) as Item);
}

gearSets.push(createGearSet(["Osmumten's fang", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]));
gearSets.push(createGearSet(["Osmumten's fang", "Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]));
gearSets.push(createGearSet(["Ghrazi rapier", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]));
gearSets.push(createGearSet(["Zamorakian hasta", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]));
gearSets.push(createGearSet(["Zamorakian hasta", "Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]));
gearSets.push(createGearSet(["Scythe of vitur", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]));
gearSets.push(createGearSet(["Scythe of vitur", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of fury", "Fire cape"]));
gearSets.push(createGearSet(["Toxic blowpipe", "Dragon dart", "Masori mask (f)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]));
gearSets.push(createGearSet(["Toxic blowpipe", "Dragon dart", "Armadyl helmet", "Armadyl chestplate", "Armadyl chainskirt", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]));
gearSets.push(createGearSet(["Twisted bow", "Dragon arrow", "Masori mask (f)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]));
gearSets.push(createGearSet(["Twisted bow", "Dragon arrow", "Armadyl helmet", "Armadyl chestplate", "Armadyl chainskirt", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]));
gearSets.push(createGearSet(["Tumeken's shadow", "Ancestral hat", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]));
gearSets.push(createGearSet(["Sanguinesti staff", "Elidinis' ward (f)", "Ancestral hat", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]));
gearSets.push(createGearSet(["Sanguinesti staff", "Book of the dead", "Ahrim's robetop", "Ahrim's robeskirt", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]));
gearSets.push(createGearSet(["Sanguinesti staff", "Elidinis' ward (f)", "Ahrim's robetop", "Ahrim's robeskirt", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"]));
gearSets.push(createGearSet(["Keris partisan", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]));
gearSets.push(createGearSet(["Keris partisan", "Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Fire cape"]));
gearSets.push(createGearSet(["Keris partisan of breaching", "Avernic defender", "Torva full helm", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]));
gearSets.push(createGearSet(["Keris partisan of breaching", "Avernic defender", "Neitiznot faceguard", "Bandos chestplate", "Bandos tassets", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Fire cape"]));
