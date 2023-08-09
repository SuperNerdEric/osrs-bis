import {ItemName} from "./ItemName";

export enum Slot {
    MainHand,
    OffHand,
    TwoHand,
    Ammo,
    Helm,
    Chest,
    Legs,
    Gloves,
    Boots,
    Neck,
    Cape,
    Ring,
    Undefined
}

export enum WeaponCategory {
    Axe = "Axe",
    Banner = "Banner",
    BladedStaff = "BladedStaff",
    Blunt = "Blunt",
    Bludgeon = "Bludgeon",
    Bow = "Bow",
    Bulwark = "Bulwark",
    Chinchompas = "Chinchompas",
    Claws = "Claws",
    Crossbow = "Crossbow",
    Gun = "Gun",
    Partisan = "Partisan",
    Pickaxe = "Pickaxe",
    Polearm = "Polearm",
    Polestaff = "Polestaff",
    PoweredStaff = "PoweredStaff",
    Salamander = "Salamander",
    Scythe = "Scythe",
    SlashSword = "SlashSword",
    Spear = "Spear",
    Spiked = "Spiked",
    Staff = "Staff",
    StabSword = "StabSword",
    Thrown = "Thrown",
    TwoHandedSword = "TwoHandedSword",
    Unarmed = "Unarmed",
    Whip = "Whip"
}

export enum CombatStyle {
    Accurate = "Accurate",
    Bash = "Bash",
    Block = "Block",
    Blaze = "Blaze",
    Chop = "Chop",
    Deflect = "Deflect",
    Fend = "Fend",
    Flare = "Flare",
    Flick = "Flick",
    Focus = "Focus",
    Hack = "Hack",
    Impale = "Impale",
    Jab = "Jab",
    Kick = "Kick",
    Lash = "Lash",
    LongFuse = "Long fuse",
    Longrange = "Longrange",
    Lunge = "Lunge",
    MediumFuse = "Medium fuse",
    Pound = "Pound",
    Pummel = "Pummel",
    Punch = "Punch",
    Rapid = "Rapid",
    Reap = "Reap",
    Scorch = "Scorch",
    ShortFuse = "Short fuse",
    Slash = "Slash",
    Smash = "Smash",
    Spike = "Spike",
    Stab = "Stab",
    Swipe = "Swipe"
}

export enum StyleType {
    Stab = "Stab",
    Slash = "Slash",
    Crush = "Crush",
    Magic = "Magic",
    Ranged = "Ranged",
}

export enum WeaponStyle {
    Accurate = "Accurate",
    Aggressive = "Aggressive",
    Controlled = "Controlled",
    Defensive = "Defensive",
    Longrange = "Longrange",
    Rapid = "Rapid",
}

export interface AttackOption {
    combatStyle: CombatStyle;
    styleType: StyleType;
    weaponStyle: WeaponStyle;
}

export enum CombatClass {
    Melee = 'Melee',
    Ranged = 'Ranged',
    Magic = 'Magic',
}

export const StyleToCombatClass: { [key in StyleType]: CombatClass } = {
    [StyleType.Stab]: CombatClass.Melee,
    [StyleType.Slash]: CombatClass.Melee,
    [StyleType.Crush]: CombatClass.Melee,
    [StyleType.Ranged]: CombatClass.Ranged,
    [StyleType.Magic]: CombatClass.Magic,
};

//https://oldschool.runescape.wiki/w/Weapons/Types
export const WeaponCategoryOptions: { [category in WeaponCategory]?: AttackOption[] } = {
    [WeaponCategory.Axe]: [
        {combatStyle: CombatStyle.Chop, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Hack, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Smash, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Banner]: [
        {combatStyle: CombatStyle.Lunge, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Swipe, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Pound, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.BladedStaff]: [
        {combatStyle: CombatStyle.Jab, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Swipe, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Fend, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Blunt]: [
        {combatStyle: CombatStyle.Pound, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Pummel, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Bludgeon]: [
        {combatStyle: CombatStyle.Pound, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Pummel, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Smash, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
    ],
    [WeaponCategory.Bow]: [
        {combatStyle: CombatStyle.Accurate, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Rapid, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Rapid},
        {combatStyle: CombatStyle.Longrange, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Longrange},
    ],
    [WeaponCategory.Bulwark]: [
        {combatStyle: CombatStyle.Pummel, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Accurate}, //Not implementing block because you can't even attack
    ],
    [WeaponCategory.Chinchompas]: [
        {combatStyle: CombatStyle.ShortFuse, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.MediumFuse, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Rapid},
        {combatStyle: CombatStyle.LongFuse, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Longrange},
    ],
    [WeaponCategory.Claws]: [
        {combatStyle: CombatStyle.Chop, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Slash, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Lunge, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Crossbow]: [
        {combatStyle: CombatStyle.Accurate, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Rapid, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Rapid},
        {combatStyle: CombatStyle.Longrange, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Longrange},
    ],
    [WeaponCategory.Gun]: [
        {combatStyle: CombatStyle.Kick, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
    ],
    [WeaponCategory.Partisan]: [
        {combatStyle: CombatStyle.Stab, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Lunge, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Pound, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Pickaxe]: [
        {combatStyle: CombatStyle.Spike, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Impale, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Smash, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Polearm]: [
        {combatStyle: CombatStyle.Jab, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Swipe, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Fend, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Polestaff]: [
        {combatStyle: CombatStyle.Jab, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Swipe, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Fend, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.PoweredStaff]: [
        {combatStyle: CombatStyle.Accurate, styleType: StyleType.Magic, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Accurate, styleType: StyleType.Magic, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Longrange, styleType: StyleType.Magic, weaponStyle: WeaponStyle.Longrange},
    ],
    [WeaponCategory.Salamander]: [
        {combatStyle: CombatStyle.Scorch, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Flare, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Rapid},
        {combatStyle: CombatStyle.Blaze, styleType: StyleType.Magic, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Scythe]: [
        {combatStyle: CombatStyle.Reap, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Chop, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Jab, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.SlashSword]: [
        {combatStyle: CombatStyle.Chop, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Slash, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Lunge, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Spear]: [
        {combatStyle: CombatStyle.Lunge, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Swipe, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Pound, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Spiked]: [
        {combatStyle: CombatStyle.Pound, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Pummel, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Spike, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.StabSword]: [
        {combatStyle: CombatStyle.Stab, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Lunge, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Slash, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Stab, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Staff]: [
        {combatStyle: CombatStyle.Bash, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Pound, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Focus, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Thrown]: [
        {combatStyle: CombatStyle.Accurate, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Rapid, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Rapid},
        {combatStyle: CombatStyle.Longrange, styleType: StyleType.Ranged, weaponStyle: WeaponStyle.Longrange},
    ],
    [WeaponCategory.TwoHandedSword]: [
        {combatStyle: CombatStyle.Chop, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Slash, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Smash, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Unarmed]: [
        {combatStyle: CombatStyle.Punch, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Kick, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Aggressive},
        {combatStyle: CombatStyle.Block, styleType: StyleType.Crush, weaponStyle: WeaponStyle.Defensive},
    ],
    [WeaponCategory.Whip]: [
        {combatStyle: CombatStyle.Flick, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Accurate},
        {combatStyle: CombatStyle.Lash, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Controlled},
        {combatStyle: CombatStyle.Deflect, styleType: StyleType.Slash, weaponStyle: WeaponStyle.Defensive},
    ],
};


export class Item {
    name: ItemName;
    imagePath: string = "";
    wikiLink: string = "";
    slot: Slot = Slot.Undefined;
    stab: number = 0;
    slash: number = 0;
    crush: number = 0;
    magic: number = 0;
    ranged: number = 0;
    strength: number = 0;
    rangedStrength: number = 0;
    mageStrength: number = 0;

    constructor(itemName: ItemName) {
        this.name = itemName;
    }
}

export class Weapon extends Item {
    style?: CombatStyle;
    category: WeaponCategory = WeaponCategory.Unarmed;
    speedSeconds: number = 0;
}