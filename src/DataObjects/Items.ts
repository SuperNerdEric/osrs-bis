import {Item, Slot, Weapon, WeaponCategory} from "./Item";
import {ItemName} from "./ItemName";

export const items = new Map<string, Item>();

function createWeapon(name: ItemName, values: Partial<Weapon>) {
    const weapon = new Weapon(name);
    Object.assign(weapon, values);
    items.set(weapon.name, weapon);
}

function createItem(name: ItemName, values: Partial<Item>) {
    const item = new Item(name);
    Object.assign(item, values);
    items.set(item.name, item);
}

createWeapon(ItemName.OsmumtensFang, {
    category: WeaponCategory.StabSword,
    imagePath: './Images/Items/Osmumtens_fang.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Osmumten%27s_fang",
    slot: Slot.MainHand,
    speedSeconds: 3,
    stab: 105,
    slash: 75,
    crush: 0,
    strength: 103,
});

createItem(ItemName.AvernicDefender, {
    imagePath: "./Images/Items/Avernic_defender.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Avernic_defender",
    slot: Slot.OffHand,
    stab: 30,
    slash: 29,
    crush: 28,
    magic: -5,
    ranged: -4,
    strength: 8,
});

createItem(ItemName.TorvaFullHelm, {
    imagePath: "./Images/Items/Torva_full_helm.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Torva_full_helm#Restored",
    slot: Slot.Helm,
    magic: -5,
    ranged: -5,
    strength: 8,
});

createItem(ItemName.TorvaPlatebody, {
    imagePath: "./Images/Items/Torva_platebody.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Torva_platebody#Restored",
    slot: Slot.Chest,
    magic: -18,
    ranged: -14,
    strength: 6,
});

createItem(ItemName.TorvaPlatelegs, {
    imagePath: "./Images/Items/Torva_platelegs.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Torva_platelegs#Restored",
    slot: Slot.Legs,
    magic: -24,
    ranged: -11,
    strength: 4,
});

createItem(ItemName.TorvaPlatebody, {
    imagePath: "./Images/Items/Torva_platebody.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Torva_platebody#Restored",
    slot: Slot.Chest,
    magic: -18,
    ranged: -14,
    strength: 6,
});

createItem(ItemName.TorvaPlatelegs, {
    imagePath: "./Images/Items/Torva_platelegs.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Torva_platelegs#Restored",
    slot: Slot.Legs,
    magic: -24,
    ranged: -11,
    strength: 4,
});

createItem(ItemName.FerociousGloves, {
    imagePath: "./Images/Items/Ferocious_gloves.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ferocious_gloves",
    slot: Slot.Gloves,
    stab: 16,
    slash: 16,
    crush: 16,
    magic: -16,
    ranged: -16,
    strength: 14,
});

createItem(ItemName.PrimordialBoots, {
    imagePath: "./Images/Items/Primordial_boots.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Primordial_boots",
    slot: Slot.Boots,
    stab: 2,
    slash: 2,
    crush: 2,
    magic: -4,
    ranged: -1,
    strength: 5,
});

createItem(ItemName.AmuletOfTorture, {
    imagePath: "./Images/Items/Amulet_of_torture.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Amulet_of_torture",
    slot: Slot.Neck,
    stab: 15,
    slash: 15,
    crush: 15,
    strength: 10,
});

createItem(ItemName.InfernalCape, {
    imagePath: "./Images/Items/Infernal_cape.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Infernal_cape",
    slot: Slot.Cape,
    stab: 4,
    slash: 4,
    crush: 4,
    magic: 1,
    ranged: 1,
    strength: 8,
});

createItem(ItemName.NeitiznotFaceguard, {
    imagePath: "./Images/Items/Neitiznot_faceguard.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Neitiznot_faceguard",
    slot: Slot.Helm,
    strength: 6,
});

createItem(ItemName.BandosChestplate, {
    imagePath: "./Images/Items/Bandos_chestplate.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Bandos_chestplate",
    slot: Slot.Chest,
    magic: -15,
    ranged: -10,
    strength: 4,
});

createItem(ItemName.BandosTassets, {
    imagePath: "./Images/Items/Bandos_tassets.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Bandos_tassets",
    slot: Slot.Legs,
    magic: -21,
    ranged: -7,
    strength: 2,
});

createItem(ItemName.FireCape, {
    imagePath: "./Images/Items/Fire_cape.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Fire_cape",
    slot: Slot.Cape,
    stab: 1,
    slash: 1,
    crush: 1,
    magic: 1,
    ranged: 1,
    strength: 4,
});

createItem(ItemName.AmuletOfFury, {
    imagePath: "./Images/Items/Amulet_of_fury.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Amulet_of_fury",
    slot: Slot.Neck,
    stab: 10,
    slash: 10,
    crush: 10,
    magic: 10,
    ranged: 10,
    strength: 8,
});

createWeapon(ItemName.GhraziRapier, {
    category: WeaponCategory.StabSword,
    imagePath: './Images/Items/Ghrazi_rapier.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Ghrazi_rapier",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 94,
    slash: 55,
    crush: 0,
    strength: 89,
});

createWeapon(ItemName.ZamorakianHasta, {
    category: WeaponCategory.Spear,
    imagePath: './Images/Items/Zamorakian_hasta.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Zamorakian_hasta",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 85,
    slash: 65,
    crush: 65,
    strength: 75,
});

createWeapon(ItemName.ScytheOfVitur, {
    category: WeaponCategory.Scythe,
    imagePath: './Images/Items/Scythe_of_vitur.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Scythe_of_vitur#Charged",
    slot: Slot.MainHand,
    speedSeconds: 3,
    stab: 70,
    slash: 110,
    crush: 30,
    magic: -6,
    strength: 75,
});

createWeapon(ItemName.ToxicBlowpipe, {
    category: WeaponCategory.Thrown,
    imagePath: './Images/Items/Toxic_blowpipe.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Toxic_blowpipe#Charged",
    slot: Slot.MainHand,
    speedSeconds: 1.8,
    ranged: 30,
    rangedStrength: 20,
});

createItem(ItemName.DragonDart, {
    imagePath: './Images/Items/Dragon_dart.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Dragon_dart",
    slot: Slot.Ammo,
    rangedStrength: 35,
});

createItem(ItemName.MasoriMaskF, {
    imagePath: './Images/Items/Masori_mask_f.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Masori_mask_(f)",
    slot: Slot.Helm,
    magic: -1,
    ranged: 12,
    rangedStrength: 2,
});

createItem(ItemName.MasoriBodyF, {
    imagePath: './Images/Items/Masori_body_f.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Masori_body_(f)",
    slot: Slot.Chest,
    magic: -4,
    ranged: 43,
    rangedStrength: 4,
});

createItem(ItemName.MasoriChapsF, {
    imagePath: './Images/Items/Masori_chaps_f.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Masori_chaps_(f)",
    slot: Slot.Legs,
    magic: -2,
    ranged: 27,
    rangedStrength: 2,
});

createItem(ItemName.ZaryteVambraces, {
    imagePath: './Images/Items/Zaryte_vambraces.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Zaryte_vambraces",
    slot: Slot.Gloves,
    stab: -8,
    slash: -8,
    crush: -8,
    ranged: 18,
    rangedStrength: 2,
});

createItem(ItemName.NecklaceOfAnguish, {
    imagePath: './Images/Items/Necklace_of_anguish.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Necklace_of_anguish",
    slot: Slot.Neck,
    ranged: 15,
    rangedStrength: 5,
});

createItem(ItemName.AvasAssembler, {
    imagePath: './Images/Items/Avas_assembler.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Ava%27s_assembler",
    slot: Slot.Cape,
    ranged: 8,
    rangedStrength: 2,
});

createItem(ItemName.ArmadylHelmet, {
    imagePath: './Images/Items/Armadyl_helmet.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Armadyl_helmet",
    slot: Slot.Helm,
    stab: -5,
    slash: -5,
    crush: -5,
    magic: -5,
    ranged: 10,
});

createItem(ItemName.ArmadylChestplate, {
    imagePath: './Images/Items/Armadyl_chestplate.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Armadyl_chestplate",
    slot: Slot.Chest,
    stab: -7,
    slash: -7,
    crush: -7,
    magic: -15,
    ranged: 33,
});

createItem(ItemName.ArmadylChainskirt, {
    imagePath: './Images/Items/Armadyl_chainskirt.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Armadyl_chainskirt",
    slot: Slot.Legs,
    stab: -6,
    slash: -6,
    crush: -6,
    magic: -10,
    ranged: 20,
});

createWeapon(ItemName.TwistedBow, {
    category: WeaponCategory.Bow,
    imagePath: './Images/Items/Twisted_bow.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Twisted_bow",
    slot: Slot.MainHand,
    speedSeconds: 3.6,
    ranged: 70,
    rangedStrength: 20,
});

createItem(ItemName.DragonArrow, {
    imagePath: './Images/Items/Dragon_arrow.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Dragon_arrow",
    slot: Slot.Ammo,
    rangedStrength: 60,
});

createItem(ItemName.BronzeArrow, {
    imagePath: './Images/Items/Bronze_arrow.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Bronze_arrow",
    slot: Slot.Ammo,
    rangedStrength: 7,
});

createItem(ItemName.BarrowsGloves, {
    imagePath: './Images/Items/Barrows_gloves.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Barrows_gloves",
    slot: Slot.Gloves,
    stab: 12,
    slash: 12,
    crush: 12,
    magic: 6,
    ranged: 12,
    strength: 12,
});

createWeapon(ItemName.TumekensShadow, {
    category: WeaponCategory.PoweredStaff,
    imagePath: './Images/Items/Tumekens_shadow.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Tumeken%27s_shadow",
    slot: Slot.MainHand,
    speedSeconds: 3,
    magic: 35,
});

createWeapon(ItemName.SanguinestiStaff, {
    category: WeaponCategory.PoweredStaff,
    imagePath: './Images/Items/Sanguinesti_staff.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Sanguinesti_staff#Charged",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    magic: 25,
});

createItem(ItemName.ElidinisWardF, {
    imagePath: './Images/Items/Elidinis_ward_f.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Elidinis%27_ward_(f)",
    slot: Slot.OffHand,
    magic: 25,
    mageStrength: 5,
});

createItem(ItemName.AncestralHat, {
    imagePath: "./Images/Items/Ancestral_hat.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ancestral_hat",
    slot: Slot.Helm,
    magic: 8,
    mageStrength: 2,
});

createItem(ItemName.AncestralRobeTop, {
    imagePath: "./Images/Items/Ancestral_robe_top.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ancestral_robe_top",
    slot: Slot.Chest,
    magic: 35,
    mageStrength: 2,
});

createItem(ItemName.AncestralRobeBottom, {
    imagePath: "./Images/Items/Ancestral_robe_bottom.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ancestral_robe_bottom",
    slot: Slot.Legs,
    magic: 26,
    mageStrength: 2,
});

createItem(ItemName.TormentedBracelet, {
    imagePath: "./Images/Items/Tormented_bracelet.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Tormented_bracelet",
    slot: Slot.Gloves,
    magic: 10,
    mageStrength: 5,
});

createItem(ItemName.OccultNecklace, {
    imagePath: "./Images/Items/Occult_necklace.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Occult_necklace",
    slot: Slot.Neck,
    magic: 12,
    mageStrength: 10,
});

createItem(ItemName.ImbuedZamorakCape, {
    imagePath: "./Images/Items/Imbued_zamorak_cape.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Imbued_zamorak_cape",
    slot: Slot.Cape,
    magic: 15,
    mageStrength: 2,
});

createItem(ItemName.AhrimsRobetop, {
    imagePath: "./Images/Items/Ahrims_robetop.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ahrim%27s_robetop",
    slot: Slot.Chest,
    magic: 30,
});

createItem(ItemName.AhrimsRobeskirt, {
    imagePath: "./Images/Items/Ahrims_robeskirt.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ahrim%27s_robeskirt",
    slot: Slot.Legs,
    magic: 22,
});

createItem(ItemName.BookOfTheDead, {
    imagePath: './Images/Items/Book_of_the_dead.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Book_of_the_dead",
    slot: Slot.OffHand,
    magic: 6,
});

createWeapon(ItemName.KerisPartisan, {
    category: WeaponCategory.Partisan,
    imagePath: './Images/Items/Keris_partisan.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Keris_partisan",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 58,
    slash: -2,
    crush: 57,
    strength: 45,
});

createWeapon(ItemName.KerisPartisanOfCorruption, {
    category: WeaponCategory.Partisan,
    imagePath: './Images/Items/Keris_partisan_of_corruption.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Keris_partisan_of_corruption",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 58,
    slash: -2,
    crush: 57,
    strength: 45,
});

createWeapon(ItemName.KerisPartisanOfTheSun, {
    category: WeaponCategory.Partisan,
    imagePath: './Images/Items/Keris_partisan_of_the_sun.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Keris_partisan_of_the_sun",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 58,
    slash: -2,
    crush: 57,
    strength: 45,
});

createWeapon(ItemName.KerisPartisanOfBreaching, {
    category: WeaponCategory.Partisan,
    imagePath: './Images/Items/Keris_partisan_of_breaching.png',
    wikiLink: "https://oldschool.runescape.wiki/w/Keris_partisan_of_breaching",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 58,
    slash: -2,
    crush: 57,
    strength: 45,
});

createItem(ItemName.SlayerHelmetI, {
    imagePath: "./Images/Items/Slayer_helmet_(i).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Slayer_helmet_(i)",
    slot: Slot.Helm,
    magic: 3,
    ranged: 3,
});

createItem(ItemName.SalveAmulet, {
    imagePath: "./Images/Items/Salve_amulet.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Salve_amulet",
    slot: Slot.Neck,
});

createItem(ItemName.SalveAmuletE, {
    imagePath: "./Images/Items/Salve_amulet_(e).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Salve_amulet_(e)",
    slot: Slot.Neck,
});

createItem(ItemName.SalveAmuletI, {
    imagePath: "./Images/Items/Salve_amulet(i).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Salve_amulet(i)",
    slot: Slot.Neck,
});

createItem(ItemName.SalveAmuletEI, {
    imagePath: "./Images/Items/Salve_amulet(ei).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Salve_amulet(ei)",
    slot: Slot.Neck,
});

createItem(ItemName.BerserkerRingI, {
    imagePath: "./Images/Items/Berserker_ring_(i).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Berserker_ring_(i)",
    strength: 8,
    slot: Slot.Neck,
});

