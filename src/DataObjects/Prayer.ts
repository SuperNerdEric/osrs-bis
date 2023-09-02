export enum Prayer {
    ClarityOfThought = "Clarity of Thought",
    ImprovedReflexes = "Improved Reflexes",
    IncredibleReflexes = "Incredible Reflexes",
    BurstOfStrength = "Burst of Strength",
    SuperhumanStrength = "Superhuman Strength",
    UltimateStrength = "Ultimate Strength",
    Chivalry = "Chivalry",
    Piety = "Piety",
    MysticWill = "Mystic Will",
    MysticLore = "Mystic Lore",
    MysticMight = "Mystic Might",
    Augury = "Augury",
    SharpEye = "Sharp Eye",
    HawkEye = "Hawk Eye",
    EagleEye = "Eagle Eye",
    Rigour = "Rigour"
}

export interface PrayerModifiers {
    attack: number;
    strength: number;
    rangedAccuracy: number;
    rangedStrength: number;
    magic: number;
}

export const prayerBonuses: Record<Prayer, Partial<PrayerModifiers>> = {
    [Prayer.ClarityOfThought]: {attack: 1.05},
    [Prayer.ImprovedReflexes]: {attack: 1.10},
    [Prayer.IncredibleReflexes]: {attack: 1.15},
    [Prayer.BurstOfStrength]: {strength: 1.05},
    [Prayer.SuperhumanStrength]: {strength: 1.10},
    [Prayer.UltimateStrength]: {strength: 1.15},
    [Prayer.Chivalry]: {attack: 1.15, strength: 1.18},
    [Prayer.Piety]: {attack: 1.20, strength: 1.23},
    [Prayer.MysticWill]: {magic: 1.05},
    [Prayer.MysticLore]: {magic: 1.10},
    [Prayer.MysticMight]: {magic: 1.15},
    [Prayer.Augury]: {magic: 1.25},
    [Prayer.SharpEye]: {rangedAccuracy: 1.05, rangedStrength: 1.05},
    [Prayer.HawkEye]: {rangedAccuracy: 1.10, rangedStrength: 1.10},
    [Prayer.EagleEye]: {rangedAccuracy: 1.15, rangedStrength: 1.15},
    [Prayer.Rigour]: {rangedAccuracy: 1.20, rangedStrength: 1.23}
};