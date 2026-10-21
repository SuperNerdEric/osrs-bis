import { StyleType } from "./Item";
import { Raid } from "./Raid";

export type ElementalWeakness = {
    type: "Air" | "Water" | "Earth" | "Fire";
    percent: number;
};

interface IMonsterStats {
    imagePath: string;
    currentHitpoints: number;
    defenceLevel: number;
    maxDefenceReduction: number;
    magicLevel: number;
    magicAccuracy: number;
    defenceStats: MonsterDefenceStats;
}

export class MonsterVariant implements IMonsterStats {
    variantName: string = "default";
    imagePath: string = "";
    currentHitpoints: number = 0;
    hitpoints: number = 0;
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
    flatArmour: number = 0;
    magicResistance: number = 0;
    meleeImmune: boolean = false;
    elementalWeakness?: ElementalWeakness;

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
    title: string = "";
    name: string = "";
    shortName: string = "";
    size: string = "1x1";
    raid: Raid = Raid.None;
    slayerMonster: boolean = false;
    slayerCategory: string = "";
    isKalphite: boolean = false;
    isUndead: boolean = false;
    isDemon: boolean = false;
    isDraconic: boolean = false;
    isFiery: boolean = false;
    isLeafy: boolean = false;
    isVampyre1: boolean = false;
    isVampyre2: boolean = false;
    isVampyre3: boolean = false;
    immuneToAncientMagicks: boolean = false;
    variants: Map<string, MonsterVariant> = new Map();
    private _activeVariant!: MonsterVariant;

    get activeVariant(): MonsterVariant {
        return this._activeVariant;
    }
    setActiveVariant(variantName: string): void {
        const variant = this.variants.get(variantName);
        if (variant) {
            this._activeVariant = variant;
        }
    }
    get imagePath(): string {
        return this.activeVariant.imagePath;
    }

    get currentHitpoints(): number {
        return this.activeVariant.currentHitpoints;
    }

    set currentHitpoints(value: number) {
        this.activeVariant.currentHitpoints = value;
    }

    get hitpoints(): number {
        return this.activeVariant.hitpoints;
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

    get flatArmour(): number {
        return this.activeVariant.flatArmour;
    }

    get magicResistance(): number {
        return this.activeVariant.magicResistance;
    }

    get meleeImmune(): boolean {
        return this.activeVariant.meleeImmune;
    }

    get elementalWeakness(): ElementalWeakness | undefined {
        return this.activeVariant.elementalWeakness;
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

    serialize() {
        return {
            name: this.name,
            shortName: this.shortName,
            size: this.size,
            raid: this.raid,
            slayerMonster: this.slayerMonster,
            slayerCategory: this.slayerCategory,
            isKalphite: this.isKalphite,
            isUndead: this.isUndead,
            isDemon: this.isDemon,
            isDraconic: this.isDraconic,
            isFiery: this.isFiery,
            isLeafy: this.isLeafy,
            isVampyre1: this.isVampyre1,
            isVampyre2: this.isVampyre2,
            isVampyre3: this.isVampyre3,
            immuneToAncientMagicks: this.immuneToAncientMagicks,
            variants: Array.from(this.variants.entries()),
            _activeVariant: this._activeVariant,
        };
    }
}

interface MonsterDefenceStats {
    [StyleType.Stab]: number;
    [StyleType.Slash]: number;
    [StyleType.Crush]: number;
    [StyleType.Magic]: number;
    [StyleType.Ranged]: number;
    Light?: number;
    Standard?: number;
    Heavy?: number;
}
