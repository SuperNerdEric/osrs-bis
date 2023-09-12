import {Prayer, prayerBonuses, PrayerModifiers} from "./Prayer";

export interface Skill {
    level: number;
    boost: number;
}

export class Player {
    skills: {
        attack: Skill;
        strength: Skill;
        ranged: Skill;
        magic: Skill;
    };

    onTask: boolean = false;
    kandarinHardDiaryComplete: boolean = true;
    private _soulStacks: number = 5;
    prayers: Record<Prayer, boolean>;

    constructor() {
        this.skills = {
            attack: {level: 99, boost: 0},
            strength: {level: 99, boost: 0},
            ranged: {level: 99, boost: 0},
            magic: {level: 99, boost: 0},
        };

        this.prayers = {
            [Prayer.BurstOfStrength]: false,
            [Prayer.ClarityOfThought]: false,
            [Prayer.EagleEye]: false,
            [Prayer.HawkEye]: false,
            [Prayer.ImprovedReflexes]: false,
            [Prayer.IncredibleReflexes]: false,
            [Prayer.MysticLore]: false,
            [Prayer.MysticMight]: false,
            [Prayer.MysticWill]: false,
            [Prayer.SharpEye]: false,
            [Prayer.SuperhumanStrength]: false,
            [Prayer.UltimateStrength]: false,
            [Prayer.Augury]: true,
            [Prayer.Chivalry]: false,
            [Prayer.Piety]: true,
            [Prayer.Rigour]: true
        };
    }

    getActivePrayers(): Prayer[] {
        return Object.entries(this.prayers)
            .filter(([, isActive]) => isActive)
            .map(([prayer]) => prayer as Prayer);
    }

    getPrayerModifiers(): PrayerModifiers {
        const activePrayers = this.getActivePrayers();
        let modifiers: PrayerModifiers = {
            attack: 1,
            strength: 1,
            rangedAccuracy: 1,
            rangedStrength: 1,
            magic: 1
        };

        for (const prayer of activePrayers) {
            modifiers = {...modifiers, ...prayerBonuses[prayer]};
        }

        return modifiers;
    }

    get soulStacks(): number {
        return this._soulStacks;
    }

    set soulStacks(value: number) {
        if (value >= 0 && value <= 5) {
            this._soulStacks = value;
        } else {
            throw new Error("soulStacks must be between 0 and 5");
        }
    }
}
