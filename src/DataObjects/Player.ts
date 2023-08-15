export interface SkillSet {
    level: number;
    boost: number;
}

export class Player {
    skills: {
        attack: SkillSet;
        strength: SkillSet;
        ranged: SkillSet;
        magic: SkillSet;
    };

    onTask: boolean = false;
    kandarinHardDiaryComplete: boolean = true;
    prayers: {
        piety: boolean;
        rigour: boolean;
        augury: boolean;
    };

    constructor() {
        this.skills = {
            attack: { level: 99, boost: 0 },
            strength: { level: 99, boost: 0 },
            ranged: { level: 99, boost: 0 },
            magic: { level: 99, boost: 0 },
        };

        this.prayers = {
            piety: true,
            rigour: true,
            augury: true,
        };
    }
}
