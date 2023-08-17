import {StyleType} from "./Item";
import {Raid} from "./Raid";

interface IMonsterStats {
    imagePath: string;
    currentHitpoints: number;
    defenceLevel: number;
    maxDefenceReduction: number;
    magicLevel: number;
    magicAccuracy: number;
    defenceStats: MonsterDefenceStats;
}

export class MonsterVariant implements IMonsterStats{
    variantName: string = "default";
    imagePath: string = "";
    currentHitpoints: number = 0;
    private _defenceLevel: number = 0;
    private _currentDefenceLevel: number = 0;
    maxDefenceReduction: number = 0;
    magicLevel: number = 0;
    magicAccuracy: number = 0;
    defenceStats: MonsterDefenceStats = {
        [StyleType.Stab]: 0,
        [StyleType.Slash]: 0,
        [StyleType.Crush]: 0,
        [StyleType.Magic]: 0,
        [StyleType.Ranged]: 0,
    };

    get defenceLevel(): number {
        return this._defenceLevel;
    }

    set defenceLevel(value: number) {
        this._defenceLevel = Number(value);
        this._currentDefenceLevel = Number(value);
    }

    get currentDefenceLevel(): number {
        return this._currentDefenceLevel;
    }

    set currentDefenceLevel(value: number) {
        this._currentDefenceLevel = Number(value);
    }
}
export class TargetMonster implements IMonsterStats {

    name: string = "";
    shortName: string = "";
    size: string = "1x1";
    raid: Raid = Raid.None;
    slayerMonster: boolean = false;
    isKalphite: boolean = false;
    isUndead: boolean = false;
    isDemon: boolean = false;
    isDraconic: boolean = false;
    isFiery: boolean = false;
    variants: Map<string, MonsterVariant> = new Map();
    private activeVariant!: MonsterVariant;

    setActiveVariant(variantName: string): void {
        const variant = this.variants.get(variantName);
        if(variant) {
            this.activeVariant = variant;
        }
    }
    get imagePath(): string {
        return this.activeVariant.imagePath;
    }


    get currentHitpoints(): number {
        return this.activeVariant.currentHitpoints;
    }

    get defenceLevel(): number {
        return this.activeVariant.defenceLevel;
    }

    get maxDefenceReduction(): number {
        return this.activeVariant.maxDefenceReduction;
    }

    get magicLevel(): number {
        return this.activeVariant.magicLevel;
    }

    get magicAccuracy(): number {
        return this.activeVariant.magicAccuracy;
    }

    get defenceStats(): MonsterDefenceStats {
        return this.activeVariant.defenceStats;
    }

    get currentDefenceLevel() {
        return this.activeVariant.currentDefenceLevel;
    }

    set currentDefenceLevel(value: number) {
        this.activeVariant.currentDefenceLevel = value;
    }

    addVariant(variant: MonsterVariant): void {
        this.variants.set(variant.variantName, variant);

        if (!this.activeVariant) {
            this.setActiveVariant(variant.variantName);
        }
    }
}

interface MonsterDefenceStats {
    [StyleType.Stab]: number;
    [StyleType.Slash]: number;
    [StyleType.Crush]: number;
    [StyleType.Magic]: number;
    [StyleType.Ranged]: number;
}