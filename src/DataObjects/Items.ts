import {Item, Slot} from "./Item";
import {AttackStyle} from "./AttackStyle";

export const items = new Map<string, Item>;

let item = new Item();
item.name = "Osmumten's fang";
item.style = AttackStyle.Stab;
item.imagePath = './Images/Items/Osmumtens_fang.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Osmumten%27s_fang";
item.slot = Slot.MainHand;
item.speedSeconds = 3;
item.stab = 105;
item.slash = 75;
item.crush = 0;
item.strength = 103;
items.set(item.name, item);

item = new Item();
item.name = "Avernic defender";
item.imagePath = "./Images/Items/Avernic_defender.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Avernic_defender";
item.slot = Slot.OffHand;
item.stab = 30;
item.slash = 29;
item.crush = 28;
item.magic = -5;
item.ranged = -4;
item.strength = 8;
items.set(item.name, item);

item = new Item();
item.name = "Torva full helm";
item.imagePath = "./Images/Items/Torva_full_helm.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Torva_full_helm#Restored";
item.slot = Slot.Helm;
item.magic = -5;
item.ranged = -5;
item.strength = 8;
items.set(item.name, item);

item = new Item();
item.name = "Torva platebody";
item.imagePath = "./Images/Items/Torva_platebody.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Torva_platebody#Restored";
item.slot = Slot.Chest;
item.magic = -18;
item.ranged = -14;
item.strength = 6;
items.set(item.name, item);

item = new Item();
item.name = "Torva platelegs";
item.imagePath = "./Images/Items/Torva_platelegs.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Torva_platelegs#Restored";
item.slot = Slot.Legs;
item.magic = -24;
item.ranged = -11;
item.strength = 4;
items.set(item.name, item);

item = new Item();
item.name = "Ferocious gloves";
item.imagePath = "./Images/Items/Ferocious_gloves.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Ferocious_gloves";
item.slot = Slot.Gloves;
item.stab = 16;
item.slash = 16;
item.crush = 16;
item.magic = -16;
item.ranged = -16;
item.strength = 14;
items.set(item.name, item);

item = new Item();
item.name = "Primordial boots";
item.imagePath = "./Images/Items/Primordial_boots.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Primordial_boots";
item.slot = Slot.Boots;
item.stab = 2;
item.slash = 2;
item.crush = 2;
item.magic = -4;
item.ranged = -1;
item.strength = 5;
items.set(item.name, item);

item = new Item();
item.name = "Amulet of torture";
item.imagePath = "./Images/Items/Amulet_of_torture.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Amulet_of_torture";
item.slot = Slot.Neck;
item.stab = 15;
item.slash = 15;
item.crush = 15;
item.strength = 10;
items.set(item.name, item);

item = new Item();
item.name = "Infernal cape";
item.imagePath = "./Images/Items/Infernal_cape.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Infernal_cape";
item.slot = Slot.Cape;
item.stab = 4;
item.slash = 4;
item.crush = 4;
item.magic = 1;
item.ranged = 1;
item.strength = 8;
items.set(item.name, item);

item = new Item();
item.name = "Neitiznot faceguard";
item.imagePath = "./Images/Items/Neitiznot_faceguard.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Neitiznot_faceguard";
item.slot = Slot.Helm;
item.strength = 6;
items.set(item.name, item);

item = new Item();
item.name = "Bandos chestplate";
item.imagePath = "./Images/Items/Bandos_chestplate.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Bandos_chestplate";
item.slot = Slot.Chest;
item.magic = -15;
item.ranged = -10;
item.strength = 4;
items.set(item.name, item);

item = new Item();
item.name = "Bandos tassets";
item.imagePath = "./Images/Items/Bandos_tassets.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Bandos_tassets";
item.slot = Slot.Legs;
item.magic = -21;
item.ranged = -7;
item.strength = 2;
items.set(item.name, item);

item = new Item();
item.name = "Fire cape";
item.imagePath = "./Images/Items/Fire_cape.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Fire_cape";
item.slot = Slot.Cape;
item.stab = 1;
item.slash = 1;
item.crush = 1;
item.magic = 1;
item.ranged = 1;
item.strength = 4;
items.set(item.name, item);


item = new Item();
item.name = "Amulet of fury";
item.imagePath = "./Images/Items/Amulet_of_fury.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Amulet_of_fury";
item.slot = Slot.Neck;
item.stab = 10;
item.slash = 10;
item.crush = 10;
item.magic = 10;
item.ranged = 10;
item.strength = 8;
items.set(item.name, item);

item = new Item();
item.name = "Ghrazi rapier";
item.style = AttackStyle.Stab;
item.imagePath = './Images/Items/Ghrazi_rapier.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Ghrazi_rapier";
item.slot = Slot.MainHand;
item.speedSeconds = 2.4;
item.stab = 94;
item.slash = 55;
item.crush = 0;
item.strength = 89;
items.set(item.name, item);

item = new Item();
item.name = "Zamorakian hasta";
item.style = AttackStyle.Stab;
item.imagePath = './Images/Items/Zamorakian_hasta.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Zamorakian_hasta";
item.slot = Slot.MainHand;
item.speedSeconds = 2.4;
item.stab = 85;
item.slash = 65;
item.crush = 65;
item.strength = 75;
items.set(item.name, item);

item = new Item();
item.name = "Scythe of vitur";
item.style = AttackStyle.Slash;
item.imagePath = './Images/Items/Scythe_of_vitur.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Scythe_of_vitur#Charged";
item.slot = Slot.MainHand; //Todo How to handle 2hs?
item.speedSeconds = 3;
item.stab = 70;
item.slash = 110;
item.crush = 30;
item.magic = -6;
item.strength = 75;
items.set(item.name, item);

item = new Item();
item.name = "Toxic blowpipe";
item.style = AttackStyle.Rapid;
item.imagePath = './Images/Items/Toxic_blowpipe.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Toxic_blowpipe#Charged";
item.slot = Slot.MainHand; //Todo How to handle 2hs?
item.speedSeconds = 1.8;
item.ranged = 30;
item.rangedStrength = 20;
items.set(item.name, item);

item = new Item();
item.name = "Dragon dart";
item.imagePath = './Images/Items/Dragon_dart.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Dragon_dart";
item.slot = Slot.Ammo;
item.rangedStrength = 35;
items.set(item.name, item);

item = new Item();
item.name = "Masori mask (f)";
item.imagePath = './Images/Items/Masori_mask_f.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Masori_mask_(f)";
item.slot = Slot.Helm;
item.magic = -1;
item.ranged = 12;
item.rangedStrength = 2;
items.set(item.name, item);

item = new Item();
item.name = "Masori body (f)";
item.imagePath = './Images/Items/Masori_body_f.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Masori_body_(f)";
item.slot = Slot.Chest;
item.magic = -4;
item.ranged = 43;
item.rangedStrength = 4;
items.set(item.name, item);

item = new Item();
item.name = "Masori chaps (f)";
item.imagePath = './Images/Items/Masori_chaps_f.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Masori_chaps_(f)";
item.slot = Slot.Legs;
item.magic = -2;
item.ranged = 27;
item.rangedStrength = 2;
items.set(item.name, item);

item = new Item();
item.name = "Zaryte vambraces";
item.imagePath = './Images/Items/Zaryte_vambraces.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Zaryte_vambraces";
item.slot = Slot.Gloves;
item.stab = -8;
item.slash = -8;
item.crush = -8;
item.ranged = 18;
item.rangedStrength = 2;
items.set(item.name, item);

item = new Item();
item.name = "Necklace of anguish";
item.imagePath = './Images/Items/Necklace_of_anguish.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Necklace_of_anguish";
item.slot = Slot.Neck;
item.ranged = 15;
item.rangedStrength = 5;
items.set(item.name, item);

item = new Item();
item.name = "Ava's assembler";
item.imagePath = './Images/Items/Avas_assembler.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Ava%27s_assembler";
item.slot = Slot.Cape;
item.ranged = 8;
item.rangedStrength = 2;
items.set(item.name, item);

item = new Item();
item.name = "Armadyl helmet";
item.imagePath = './Images/Items/Armadyl_helmet.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Armadyl_helmet";
item.slot = Slot.Helm;
item.stab = -5;
item.slash = -5;
item.crush = -5;
item.magic = -5;
item.ranged = 10;
items.set(item.name, item);

item = new Item();
item.name = "Armadyl chestplate";
item.imagePath = './Images/Items/Armadyl_chestplate.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Armadyl_chestplate";
item.slot = Slot.Chest;
item.stab = -7;
item.slash = -7;
item.crush = -7;
item.magic = -15;
item.ranged = 33;
items.set(item.name, item);

item = new Item();
item.name = "Armadyl chainskirt";
item.imagePath = './Images/Items/Armadyl_chainskirt.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Armadyl_chainskirt";
item.slot = Slot.Legs;
item.stab = -6;
item.slash = -6;
item.crush = -6;
item.magic = -10;
item.ranged = 20;
items.set(item.name, item);

item = new Item();
item.name = "Twisted bow";
item.style = AttackStyle.Rapid;
item.imagePath = './Images/Items/Twisted_bow.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Twisted_bow";
item.slot = Slot.MainHand; //Todo How to handle 2hs?
item.speedSeconds = 3.6;
item.ranged = 70;
item.rangedStrength = 20;
items.set(item.name, item);

item = new Item();
item.name = "Dragon arrow";
item.imagePath = './Images/Items/Dragon_arrow.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Dragon_arrow";
item.slot = Slot.Ammo;
item.rangedStrength = 60;
items.set(item.name, item);

item = new Item();
item.name = "Barrows gloves";
item.imagePath = './Images/Items/Barrows_gloves.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Barrows_gloves";
item.slot = Slot.Gloves;
item.stab = 12;
item.slash = 12;
item.crush = 12;
item.magic = 6;
item.ranged = 12;
item.strength = 12;
items.set(item.name, item);

item = new Item();
item.name = "Tumeken's shadow";
item.style = AttackStyle.Magic;
item.imagePath = './Images/Items/Tumekens_shadow.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Tumeken%27s_shadow";
item.slot = Slot.MainHand;
item.speedSeconds = 3;
item.magic = 35;
items.set(item.name, item);

item = new Item();
item.name = "Sanguinesti staff";
item.style = AttackStyle.Magic;
item.imagePath = './Images/Items/Sanguinesti_staff.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Sanguinesti_staff#Charged";
item.slot = Slot.MainHand;
item.speedSeconds = 3;
item.magic = 35;
items.set(item.name, item);

item = new Item();
item.name = "Elidinis' ward (f)";
item.imagePath = './Images/Items/Elidinis_ward_f.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Elidinis%27_ward_(f)";
item.slot = Slot.OffHand;
item.magic = 25;
item.mageStrength = 5;
items.set(item.name, item);

item = new Item();
item.name = "Ancestral hat";
item.imagePath = "./Images/Items/Ancestral_hat.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Ancestral_hat";
item.slot = Slot.Helm;
item.magic = 8;
item.mageStrength = 2;
items.set(item.name, item);

item = new Item();
item.name = "Ancestral robe top";
item.imagePath = "./Images/Items/Ancestral_robe_top.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Ancestral_robe_top";
item.slot = Slot.Chest;
item.magic = 35;
item.mageStrength = 2;
items.set(item.name, item);

item = new Item();
item.name = "Ancestral robe bottom";
item.imagePath = "./Images/Items/Ancestral_robe_bottom.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Ancestral_robe_bottom";
item.slot = Slot.Legs;
item.magic = 26;
item.mageStrength = 2;
items.set(item.name, item);

item = new Item();
item.name = "Tormented bracelet";
item.imagePath = "./Images/Items/Ferocious_gloves.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Tormented_bracelet";
item.slot = Slot.Gloves;
item.magic = 10;
item.mageStrength = 5;
items.set(item.name, item);

item = new Item();
item.name = "Occult necklace";
item.imagePath = "./Images/Items/Occult_necklace.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Occult_necklace";
item.slot = Slot.Neck;
item.magic = 12;
item.mageStrength = 10;
items.set(item.name, item);

item = new Item();
item.name = "Imbued zamorak cape";
item.imagePath = "./Images/Items/Imbued_zamorak_cape.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Imbued_zamorak_cape";
item.slot = Slot.Cape;
item.stab = 4;
item.slash = 4;
item.crush = 4;
item.magic = 1;
item.ranged = 1;
item.strength = 8;
items.set(item.name, item);

item = new Item();
item.name = "Ahrim's robetop";
item.imagePath = "./Images/Items/Ahrims_robetop.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Ahrim%27s_robetop";
item.slot = Slot.Chest;
item.magic = 30;
items.set(item.name, item);

item = new Item();
item.name = "Ahrim's robeskirt";
item.imagePath = "./Images/Items/Ahrims_robeskirt.png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Ahrim%27s_robeskirt";
item.slot = Slot.Legs;
item.magic = 22;
items.set(item.name, item);