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
    imagePath: './Images/Items/Osmumtens_fang.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Osmumten%27s_fang",
    slot: Slot.MainHand,
    speedSeconds: 3,
    stab: 105,
    slash: 75,
    crush: 0,
    strength: 103,
});

createItem(ItemName.AvernicDefender, {
    imagePath: "./Images/Items/Avernic_defender.webp",
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
    imagePath: "./Images/Items/Torva_full_helm.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Torva_full_helm#Restored",
    slot: Slot.Helm,
    magic: -5,
    ranged: -5,
    strength: 8,
});

createItem(ItemName.TorvaPlatebody, {
    imagePath: "./Images/Items/Torva_platebody.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Torva_platebody#Restored",
    slot: Slot.Chest,
    magic: -18,
    ranged: -14,
    strength: 6,
});

createItem(ItemName.TorvaPlatelegs, {
    imagePath: "./Images/Items/Torva_platelegs.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Torva_platelegs#Restored",
    slot: Slot.Legs,
    magic: -24,
    ranged: -11,
    strength: 4,
});

createItem(ItemName.FerociousGloves, {
    imagePath: "./Images/Items/Ferocious_gloves.webp",
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
    imagePath: "./Images/Items/Primordial_boots.webp",
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
    imagePath: "./Images/Items/Amulet_of_torture.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Amulet_of_torture",
    slot: Slot.Neck,
    stab: 15,
    slash: 15,
    crush: 15,
    strength: 10,
});

createItem(ItemName.InfernalCape, {
    imagePath: "./Images/Items/Infernal_cape.webp",
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
    imagePath: "./Images/Items/Neitiznot_faceguard.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Neitiznot_faceguard",
    slot: Slot.Helm,
    strength: 6,
});

createItem(ItemName.BandosChestplate, {
    imagePath: "./Images/Items/Bandos_chestplate.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Bandos_chestplate",
    slot: Slot.Chest,
    magic: -15,
    ranged: -10,
    strength: 4,
});

createItem(ItemName.BandosTassets, {
    imagePath: "./Images/Items/Bandos_tassets.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Bandos_tassets",
    slot: Slot.Legs,
    magic: -21,
    ranged: -7,
    strength: 2,
});

createItem(ItemName.FireCape, {
    imagePath: "./Images/Items/Fire_cape.webp",
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
    imagePath: "./Images/Items/Amulet_of_fury.webp",
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
    imagePath: './Images/Items/Ghrazi_rapier.webp',
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
    imagePath: './Images/Items/Zamorakian_hasta.webp',
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
    imagePath: './Images/Items/Scythe_of_vitur.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Scythe_of_vitur#Charged",
    slot: Slot.TwoHand,
    speedSeconds: 3,
    stab: 70,
    slash: 110,
    crush: 30,
    magic: -6,
    strength: 75,
});

createWeapon(ItemName.ToxicBlowpipe, {
    category: WeaponCategory.Thrown,
    imagePath: './Images/Items/Toxic_blowpipe.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Toxic_blowpipe#Charged",
    slot: Slot.TwoHand,
    speedSeconds: 1.8,
    ranged: 30,
    rangedStrength: 20,
});

createItem(ItemName.DragonDart, {
    imagePath: './Images/Items/Dragon_dart.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Dragon_dart",
    slot: Slot.Ammo,
    rangedStrength: 35,
});

createItem(ItemName.MasoriMaskF, {
    imagePath: './Images/Items/Masori_mask_f.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Masori_mask_(f)",
    slot: Slot.Helm,
    magic: -1,
    ranged: 12,
    rangedStrength: 2,
});

createItem(ItemName.MasoriBodyF, {
    imagePath: './Images/Items/Masori_body_f.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Masori_body_(f)",
    slot: Slot.Chest,
    magic: -4,
    ranged: 43,
    rangedStrength: 4,
});

createItem(ItemName.MasoriChapsF, {
    imagePath: './Images/Items/Masori_chaps_f.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Masori_chaps_(f)",
    slot: Slot.Legs,
    magic: -2,
    ranged: 27,
    rangedStrength: 2,
});

createItem(ItemName.ZaryteVambraces, {
    imagePath: './Images/Items/Zaryte_vambraces.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Zaryte_vambraces",
    slot: Slot.Gloves,
    stab: -8,
    slash: -8,
    crush: -8,
    ranged: 18,
    rangedStrength: 2,
});

createItem(ItemName.NecklaceOfAnguish, {
    imagePath: './Images/Items/Necklace_of_anguish.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Necklace_of_anguish",
    slot: Slot.Neck,
    ranged: 15,
    rangedStrength: 5,
});

createItem(ItemName.AvasAssembler, {
    imagePath: './Images/Items/Avas_assembler.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Ava%27s_assembler",
    slot: Slot.Cape,
    ranged: 8,
    rangedStrength: 2,
});

createItem(ItemName.ArmadylHelmet, {
    imagePath: './Images/Items/Armadyl_helmet.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Armadyl_helmet",
    slot: Slot.Helm,
    stab: -5,
    slash: -5,
    crush: -5,
    magic: -5,
    ranged: 10,
});

createItem(ItemName.ArmadylChestplate, {
    imagePath: './Images/Items/Armadyl_chestplate.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Armadyl_chestplate",
    slot: Slot.Chest,
    stab: -7,
    slash: -7,
    crush: -7,
    magic: -15,
    ranged: 33,
});

createItem(ItemName.ArmadylChainskirt, {
    imagePath: './Images/Items/Armadyl_chainskirt.webp',
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
    imagePath: './Images/Items/Twisted_bow.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Twisted_bow",
    slot: Slot.TwoHand,
    speedSeconds: 3.6,
    ranged: 70,
    rangedStrength: 20,
});

createItem(ItemName.DragonArrow, {
    imagePath: './Images/Items/Dragon_arrow.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Dragon_arrow",
    slot: Slot.Ammo,
    rangedStrength: 60,
});

createItem(ItemName.BronzeArrow, {
    imagePath: './Images/Items/Bronze_arrow.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Bronze_arrow",
    slot: Slot.Ammo,
    rangedStrength: 7,
});

createItem(ItemName.BarrowsGloves, {
    imagePath: './Images/Items/Barrows_gloves.webp',
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
    imagePath: './Images/Items/Tumekens_shadow.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Tumeken%27s_shadow",
    slot: Slot.TwoHand,
    speedSeconds: 3,
    magic: 35,
});

createWeapon(ItemName.SanguinestiStaff, {
    category: WeaponCategory.PoweredStaff,
    imagePath: './Images/Items/Sanguinesti_staff.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Sanguinesti_staff#Charged",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    magic: 25,
});

createItem(ItemName.ElidinisWardF, {
    imagePath: './Images/Items/Elidinis_ward_f.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Elidinis%27_ward_(f)",
    slot: Slot.OffHand,
    magic: 25,
    mageStrength: 5,
});

createItem(ItemName.AncestralHat, {
    imagePath: "./Images/Items/Ancestral_hat.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Ancestral_hat",
    slot: Slot.Helm,
    magic: 8,
    mageStrength: 2,
});

createItem(ItemName.AncestralRobeTop, {
    imagePath: "./Images/Items/Ancestral_robe_top.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Ancestral_robe_top",
    slot: Slot.Chest,
    magic: 35,
    mageStrength: 2,
});

createItem(ItemName.AncestralRobeBottom, {
    imagePath: "./Images/Items/Ancestral_robe_bottom.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Ancestral_robe_bottom",
    slot: Slot.Legs,
    magic: 26,
    mageStrength: 2,
});

createItem(ItemName.TormentedBracelet, {
    imagePath: "./Images/Items/Tormented_bracelet.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Tormented_bracelet",
    slot: Slot.Gloves,
    magic: 10,
    mageStrength: 5,
});

createItem(ItemName.OccultNecklace, {
    imagePath: "./Images/Items/Occult_necklace.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Occult_necklace",
    slot: Slot.Neck,
    magic: 12,
    mageStrength: 10,
});

createItem(ItemName.ImbuedZamorakCape, {
    imagePath: "./Images/Items/Imbued_zamorak_cape.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Imbued_zamorak_cape",
    slot: Slot.Cape,
    magic: 15,
    mageStrength: 2,
});

createItem(ItemName.AhrimsHood, {
    imagePath: "./Images/ItemsOld/Ahrims_hood.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ahrim%27s_hood",
    slot: Slot.Helm,
    magic: 6,
    ranged: -2,
});

createItem(ItemName.AhrimsRobetop, {
    imagePath: "./Images/Items/Ahrims_robetop.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Ahrim%27s_robetop",
    slot: Slot.Chest,
    magic: 30,
});

createItem(ItemName.AhrimsRobeskirt, {
    imagePath: "./Images/Items/Ahrims_robeskirt.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Ahrim%27s_robeskirt",
    slot: Slot.Legs,
    magic: 22,
});

createItem(ItemName.EternalBoots, {
    imagePath: "./Images/ItemsOld/Eternal_boots.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Eternal_boots",
    slot: Slot.Boots,
    magic: 8,
});

createItem(ItemName.BookOfTheDead, {
    imagePath: './Images/Items/Book_of_the_dead.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Book_of_the_dead",
    slot: Slot.OffHand,
    magic: 6,
});

createWeapon(ItemName.KerisPartisan, {
    category: WeaponCategory.Partisan,
    imagePath: './Images/Items/Keris_partisan.webp',
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
    imagePath: './Images/Items/Keris_partisan_of_corruption.webp',
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
    imagePath: './Images/Items/Keris_partisan_of_the_sun.webp',
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
    imagePath: './Images/Items/Keris_partisan_of_breaching.webp',
    wikiLink: "https://oldschool.runescape.wiki/w/Keris_partisan_of_breaching",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 58,
    slash: -2,
    crush: 57,
    strength: 45,
});

createItem(ItemName.SlayerHelmetI, {
    imagePath: "./Images/Items/Slayer_helmet_(i).webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Slayer_helmet_(i)",
    slot: Slot.Helm,
    magic: 3,
    ranged: 3,
});

createItem(ItemName.SalveAmulet, {
    imagePath: "./Images/Items/Salve_amulet.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Salve_amulet",
    slot: Slot.Neck,
});

createItem(ItemName.SalveAmuletE, {
    imagePath: "./Images/Items/Salve_amulet_(e).webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Salve_amulet_(e)",
    slot: Slot.Neck,
});

createItem(ItemName.SalveAmuletI, {
    imagePath: "./Images/Items/Salve_amulet(i).webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Salve_amulet(i)",
    slot: Slot.Neck,
});

createItem(ItemName.SalveAmuletEI, {
    imagePath: "./Images/Items/Salve_amulet(ei).webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Salve_amulet(ei)",
    slot: Slot.Neck,
});

createItem(ItemName.BerserkerRingI, {
    imagePath: "./Images/Items/Berserker_ring_(i).webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Berserker_ring_(i)",
    strength: 8,
    slot: Slot.Ring,
});

createItem(ItemName.VoidMeleeHelm, {
    imagePath: "./Images/Items/Void_melee_helm.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Void_melee_helm",
    slot: Slot.Helm,
});

createItem(ItemName.VoidRangerHelm, {
    imagePath: "./Images/Items/Void_melee_helm.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Void_ranger_helm",
    slot: Slot.Helm,
});

createItem(ItemName.VoidMageHelm, {
    imagePath: "./Images/Items/Void_mage_helm.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Void_mage_helm",
    slot: Slot.Helm,
});

createItem(ItemName.VoidKnightTop, {
    imagePath: "./Images/Items/Void_knight_top.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Void_knight_top",
    slot: Slot.Chest,
});

createItem(ItemName.VoidKnightRobe, {
    imagePath: "./Images/Items/Void_knight_robe.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Void_knight_robe",
    slot: Slot.Legs,
});

createItem(ItemName.VoidKnightGloves, {
    imagePath: "./Images/Items/Void_knight_gloves.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Void_knight_gloves",
    slot: Slot.Gloves,
});

createItem(ItemName.EliteVoidTop, {
    imagePath: "./Images/Items/Elite_void_top.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Elite_void_top",
    slot: Slot.Chest,
});

createItem(ItemName.EliteVoidRobe, {
    imagePath: "./Images/Items/Elite_void_robe.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Elite_void_robe",
    slot: Slot.Chest,
});

createItem(ItemName.UltorRing, {
    imagePath: "./Images/Items/Ultor_ring.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Ultor_ring",
    strength: 12,
    slot: Slot.Ring,
});

createItem(ItemName.BellatorRing, {
    imagePath: "./Images/Items/Bellator_ring.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Bellator_ring",
    slash: 20,
    strength: 6,
    slot: Slot.Ring,
});

createItem(ItemName.MagusRing, {
    imagePath: "./Images/Items/Magus_ring.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Magus_ring",
    magic: 15,
    mageStrength: 2,
    slot: Slot.Ring,
});

createItem(ItemName.VenatorRing, {
    imagePath: "./Images/Items/Venator_ring.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Venator_ring",
    ranged: 10,
    rangedStrength: 2,
    slot: Slot.Ring,
});

createWeapon(ItemName.SoulreaperAxe, {
    category: WeaponCategory.Axe,
    imagePath: "./Images/Items/Soulreaper_axe.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Soulreaper_axe",
    slot: Slot.TwoHand,
    speedSeconds: 3,
    stab: 28,
    slash: 134,
    crush: 66,
    strength: 121,
});

createWeapon(ItemName.Arclight, {
    category: WeaponCategory.SlashSword,
    imagePath: "./Images/Items/Arclight.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Arclight",
    slot: Slot.TwoHand,
    speedSeconds: 2.4,
    stab: 10,
    slash: 38,
    crush: 0,
    strength: 8,
});

createWeapon(ItemName.DragonHunterLance, {
    category: WeaponCategory.Spear,
    imagePath: "./Images/Items/Dragon_hunter_lance.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Dragon_hunter_lance",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 85,
    slash: 65,
    crush: 65,
    strength: 70,
});

createWeapon(ItemName.InquisitorsMace, {
    category: WeaponCategory.Spiked,
    imagePath: "./Images/Items/Inquisitors_mace.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Inquisitor%27s_mace",
    slot: Slot.MainHand,
    speedSeconds: 2.4,
    stab: 52,
    slash: -4,
    crush: 95,
    strength: 89,
});

createWeapon(ItemName.AbyssalBludgeon, {
    category: WeaponCategory.Bludgeon,
    imagePath: "./Images/Items/Abyssal_bludgeon.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Abyssal_bludgeon",
    slot: Slot.TwoHand,
    speedSeconds: 2.4,
    stab: 0,
    slash: 0,
    crush: 102,
    strength: 85,
});

createItem(ItemName.InquisitorsGreatHelm, {
    imagePath: "./Images/Items/Inquisitors_great_helm.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Inquisitor%27s_great_helm",
    stab: -2,
    slash: -2,
    crush: 8,
    magic: -5,
    ranged: -5,
    strength: 4,
    slot: Slot.Helm,
});

createItem(ItemName.InquisitorsHauberk, {
    imagePath: "./Images/Items/Inquisitors_hauberk.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Inquisitor%27s_hauberk",
    stab: -3,
    slash: -3,
    crush: 12,
    magic: -11,
    ranged: -10,
    strength: 4,
    slot: Slot.Chest,
});

createItem(ItemName.InquisitorsPlateskirt, {
    imagePath: "./Images/Items/Inquisitors_plateskirt.webp",
    wikiLink: "https://oldschool.runescape.wiki/w/Inquisitor%27s_plateskirt",
    stab: -3,
    slash: -3,
    crush: 12,
    magic: -9,
    ranged: -5,
    strength: 2,
    slot: Slot.Legs,
});

createWeapon(ItemName.DragonCrossbow, {
    category: WeaponCategory.Crossbow,
    imagePath: "./Images/ItemsOld/Dragon_crossbow.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Dragon_crossbow",
    stab: 0,
    slash: 0,
    crush: 0,
    magic: 0,
    ranged: 94,
    speedSeconds: 3.6,
    slot: Slot.MainHand,
});

createWeapon(ItemName.ArmadylCrossbow, {
    category: WeaponCategory.Crossbow,
    imagePath: "./Images/ItemsOld/Armadyl_crossbow.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Armadyl_crossbow",
    stab: 0,
    slash: 0,
    crush: 0,
    magic: 0,
    ranged: 100,
    speedSeconds: 3.6,
    slot: Slot.MainHand,
});

createWeapon(ItemName.ZaryteCrossbow, {
    category: WeaponCategory.Crossbow,
    imagePath: "./Images/ItemsOld/Zaryte_crossbow.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Zaryte_crossbow",
    stab: 0,
    slash: 0,
    crush: 0,
    magic: 0,
    ranged: 110,
    speedSeconds: 3.6,
    slot: Slot.MainHand,
});

createItem(ItemName.TwistedBuckler, {
    imagePath: "./Images/ItemsOld/Twisted_buckler.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Twisted_buckler",
    stab: -7,
    slash: -8,
    crush: -7,
    magic: -10,
    ranged: 18,
    rangedStrength: 10,
    slot: Slot.OffHand,
});

createItem(ItemName.PegasianBoots, {
    imagePath: "./Images/ItemsOld/Pegasian_boots.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Pegasian_boots",
    stab: 0,
    slash: 0,
    crush: 0,
    magic: -12,
    ranged: 12,
    slot: Slot.Boots,
});

createItem(ItemName.DragonBolts, {
    imagePath: "./Images/ItemsOld/Dragon_bolts.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Dragon_bolts",
    rangedStrength: 122,
    slot: Slot.Ammo,
});

createItem(ItemName.DiamondBoltsE, {
    imagePath: "./Images/ItemsOld/Diamond_bolts_(e).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Diamond_bolts_(e)",
    rangedStrength: 105,
    slot: Slot.Ammo,
});


createItem(ItemName.DiamondDragonBoltsE, {
    imagePath: "./Images/ItemsOld/Diamond_dragon_bolts_(e).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Diamond_dragon_bolts_(e)",
    rangedStrength: 122,
    slot: Slot.Ammo,
});

createItem(ItemName.RubyBoltsE, {
    imagePath: "./Images/ItemsOld/Ruby_bolts_(e).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ruby_bolts_(e)",
    rangedStrength: 103,
    slot: Slot.Ammo,
});

createItem(ItemName.RubyDragonBoltsE, {
    imagePath: "./Images/ItemsOld/Ruby_dragon_bolts_(e).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Ruby_dragon_bolts_(e)",
    rangedStrength: 122,
    slot: Slot.Ammo,
});

createItem(ItemName.OnyxBoltsE, {
    imagePath: "./Images/ItemsOld/Onyx_bolts_(e).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Onyx_bolts_(e)",
    rangedStrength: 120,
    slot: Slot.Ammo,
});

createItem(ItemName.OnyxDragonBoltsE, {
    imagePath: "./Images/ItemsOld/Onyx_dragon_bolts_(e).png",
    wikiLink: "https://oldschool.runescape.wiki/w/Onyx_dragon_bolts_(e)",
    rangedStrength: 122,
    slot: Slot.Ammo,
});

createWeapon(ItemName.DragonHunterCrossbow, {
    category: WeaponCategory.Crossbow,
    imagePath: "./Images/ItemsOld/Dragon_hunter_crossbow.png",
    wikiLink: "https://oldschool.runescape.wiki/w/Dragon_hunter_crossbow",
    slot: Slot.MainHand,
    speedSeconds: 3.6,
    ranged: 95,
});