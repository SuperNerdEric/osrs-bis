import {Item, Slot, Weapon, WeaponCategory} from "./Item";

export const items = new Map<string, Item>;

let weapon = new Weapon();
weapon.name = "Osmumten's fang";
weapon.category = WeaponCategory.StabSword;
weapon.imagePath = './Images/Items/Osmumtens_fang.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Osmumten%27s_fang";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 3;
weapon.stab = 105;
weapon.slash = 75;
weapon.crush = 0;
weapon.strength = 103;
items.set(weapon.name, weapon);

let item = new Item();
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

weapon = new Weapon();
weapon.name = "Ghrazi rapier";
weapon.category = WeaponCategory.StabSword;
weapon.imagePath = './Images/Items/Ghrazi_rapier.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Ghrazi_rapier";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 2.4;
weapon.stab = 94;
weapon.slash = 55;
weapon.crush = 0;
weapon.strength = 89;
items.set(weapon.name, weapon);

weapon = new Weapon();
weapon.name = "Zamorakian hasta";
weapon.category = WeaponCategory.Spear;
weapon.imagePath = './Images/Items/Zamorakian_hasta.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Zamorakian_hasta";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 2.4;
weapon.stab = 85;
weapon.slash = 65;
weapon.crush = 65;
weapon.strength = 75;
items.set(weapon.name, weapon);

weapon = new Weapon();
weapon.name = "Scythe of vitur";
weapon.category = WeaponCategory.Scythe;
weapon.imagePath = './Images/Items/Scythe_of_vitur.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Scythe_of_vitur#Charged";
weapon.slot = Slot.MainHand; //Todo How to handle 2hs?
weapon.speedSeconds = 3;
weapon.stab = 70;
weapon.slash = 110;
weapon.crush = 30;
weapon.magic = -6;
weapon.strength = 75;
items.set(weapon.name, weapon);

weapon = new Weapon();
weapon.name = "Toxic blowpipe";
weapon.category = WeaponCategory.Thrown;
weapon.imagePath = './Images/Items/Toxic_blowpipe.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Toxic_blowpipe#Charged";
weapon.slot = Slot.MainHand; //Todo How to handle 2hs?
weapon.speedSeconds = 1.8;
weapon.ranged = 30;
weapon.rangedStrength = 20;
items.set(weapon.name, weapon);

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

weapon = new Weapon();
weapon.name = "Twisted bow";
weapon.category = WeaponCategory.Bow;
weapon.imagePath = './Images/Items/Twisted_bow.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Twisted_bow";
weapon.slot = Slot.MainHand; //Todo How to handle 2hs?
weapon.speedSeconds = 3.6;
weapon.ranged = 70;
weapon.rangedStrength = 20;
items.set(weapon.name, weapon);

item = new Item();
item.name = "Dragon arrow";
item.imagePath = './Images/Items/Dragon_arrow.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Dragon_arrow";
item.slot = Slot.Ammo;
item.rangedStrength = 60;
items.set(item.name, item);

item = new Item();
item.name = "Bronze arrow";
item.imagePath = './Images/Items/Bronze_arrow.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Bronze_arrow";
item.slot = Slot.Ammo;
item.rangedStrength = 7;
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

weapon = new Weapon();
weapon.name = "Tumeken's shadow";
weapon.category = WeaponCategory.PoweredStaff;
weapon.imagePath = './Images/Items/Tumekens_shadow.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Tumeken%27s_shadow";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 3;
weapon.magic = 35;
items.set(weapon.name, weapon);

weapon = new Weapon();
weapon.name = "Sanguinesti staff";
weapon.category = WeaponCategory.PoweredStaff;
weapon.imagePath = './Images/Items/Sanguinesti_staff.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Sanguinesti_staff#Charged";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 2.4;
weapon.magic = 25;
items.set(weapon.name, weapon);

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
item.imagePath = "./Images/Items/Tormented_bracelet.png";
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
item.magic = 15;
item.mageStrength = 2;
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

item = new Item();
item.name = "Book of the dead";
item.imagePath = './Images/Items/Book_of_the_dead.png';
item.wikiLink = "https://oldschool.runescape.wiki/w/Book_of_the_dead)";
item.slot = Slot.OffHand;
item.magic = 6;
items.set(item.name, item);

weapon = new Weapon();
weapon.name = "Keris partisan";
weapon.category = WeaponCategory.Partisan;
weapon.imagePath = './Images/Items/Keris_partisan.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Keris_partisan";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 2.4;
weapon.stab = 58;
weapon.slash = -2;
weapon.crush = 57;
weapon.strength = 45;
items.set(weapon.name, weapon);

weapon = new Weapon();
weapon.name = "Keris partisan of corruption";
weapon.category = WeaponCategory.Partisan;
weapon.imagePath = './Images/Items/Keris_partisan_of_corruption.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Keris_partisan_of_corruption";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 2.4;
weapon.stab = 58;
weapon.slash = -2;
weapon.crush = 57;
weapon.strength = 45;
items.set(weapon.name, weapon);

weapon = new Weapon();
weapon.name = "Keris partisan of the sun";
weapon.category = WeaponCategory.Partisan;
weapon.imagePath = './Images/Items/Keris_partisan_of_the_sun.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Keris_partisan_of_the_sun";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 2.4;
weapon.stab = 58;
weapon.slash = -2;
weapon.crush = 57;
weapon.strength = 45;
items.set(weapon.name, weapon);

weapon = new Weapon();
weapon.name = "Keris partisan of breaching";
weapon.category = WeaponCategory.Partisan;
weapon.imagePath = './Images/Items/Keris_partisan_of_breaching.png';
weapon.wikiLink = "https://oldschool.runescape.wiki/w/Keris_partisan_of_breaching";
weapon.slot = Slot.MainHand;
weapon.speedSeconds = 2.4;
weapon.stab = 58;
weapon.slash = -2;
weapon.crush = 57;
weapon.strength = 45;
items.set(weapon.name, weapon);

item = new Item();
item.name = "Slayer helmet (i)";
item.imagePath = "./Images/Items/Slayer_helmet_(i).png";
item.wikiLink = "https://oldschool.runescape.wiki/w/Slayer_helmet_(i)";
item.slot = Slot.Helm;
item.magic = 3;
item.ranged = 3;
items.set(item.name, item);