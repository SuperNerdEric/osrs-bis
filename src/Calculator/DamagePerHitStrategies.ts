import {Calculator} from "./Calculator";
import {Item, Slot} from "../DataObjects/Item";
import {ItemName} from "../DataObjects/ItemName";

export abstract class DamagePerHitStrategy {
    protected result: Calculator;

    constructor(result: Calculator) {
        this.result = result;
    }

    abstract calculate(): number;
}

export class ScytheOfViturStrategy extends DamagePerHitStrategy {
    calculate() {
        let hitValue = this.result.maxHit;
        let averageDamagePerHit = this.result.maxHit = 0;

        const scytheHits = Math.min(Number(this.result.targetMonster.size.at(0)), 3);

        for (let i = 0; i < scytheHits; i++, hitValue /= 2) {
            averageDamagePerHit += (Math.floor(hitValue) * this.result.hitChance) / 2;
            this.result.maxHit += Math.floor(hitValue);
        }
        return averageDamagePerHit;
    }
}

export class OsmumtensFangStrategy extends DamagePerHitStrategy {
    calculate() {
        const averageDamagePerHit = this.result.calculateAverageDamagePerHit(this.result.maxHit, this.result.hitChance);
        const minHit = Math.floor(this.result.maxHit * 0.15);
        this.result.maxHit = this.result.maxHit - minHit;
        return averageDamagePerHit;
    }
}

export class KerisPartisanStrategy extends DamagePerHitStrategy {
    calculate() {
        if (this.result.targetMonster.isKalphite) {
            //https://archive.ph/6gN9c
            const baseMaxHit = Math.floor(this.result.maxHit * 133 / 100);
            this.result.maxHit = baseMaxHit * 3;

            const averageMaxHit = 50 / 51 * baseMaxHit + (1 / 51 * this.result.maxHit);
            return this.result.calculateAverageDamagePerHit(averageMaxHit, this.result.hitChance);
        } else {
            const defaultStrategy = new DefaultStrategy(this.result);
            return defaultStrategy.calculate();
        }
    }
}

export class BoltEnchantedStrategy extends DamagePerHitStrategy {
    calculate() {
        const ammoItem = this.result.gearSet.getItemBySlot(Slot.Ammo) as Item;
        const bolt = ammoItem?.name.includes('bolt') ? ammoItem : undefined;

        if (!bolt) {
            const defaultStrategy = new DefaultStrategy(this.result);
            return defaultStrategy.calculate();
        }

        const diamondBolts = [ItemName.DiamondBoltsE, ItemName.DiamondDragonBoltsE];
        const rubyBolts = [ItemName.RubyBoltsE, ItemName.RubyDragonBoltsE];
        const onyxBolts = [ItemName.OnyxBoltsE, ItemName.OnyxDragonBoltsE];

        if (diamondBolts.includes(bolt.name)) {
            const diamondStrategy = new DiamondBoltEnchantedStrategy(this.result);
            return diamondStrategy.calculate();
        } else if (rubyBolts.includes(bolt.name)) {
            const rubyStrategy = new RubyBoltEnchantedStrategy(this.result);
            return rubyStrategy.calculate();
        } else if (onyxBolts.includes(bolt.name)) {
            const onyxStrategy = new OnyxBoltEnchantedStrategy(this.result);
            return onyxStrategy.calculate();
        } else {
            const defaultStrategy = new DefaultStrategy(this.result);
            return defaultStrategy.calculate();
        }
    }
}

export class DiamondBoltEnchantedStrategy extends DamagePerHitStrategy {
    calculate() {
        const ammoItem = this.result.gearSet.getItemBySlot(Slot.Ammo) as Item;
        const bolt = ammoItem?.name.includes('bolt') ? ammoItem : undefined;

        const diamondBolts = [ItemName.DiamondBoltsE, ItemName.DiamondDragonBoltsE];

        if (!bolt || !diamondBolts.includes(bolt.name)) {
            const defaultStrategy = new DefaultStrategy(this.result);
            return defaultStrategy.calculate();
        }

        const activationPercent = getBoltActivationRate(bolt.name, this.result.player.kandarinHardDiaryComplete);

        const baseMaxHit = this.result.maxHit;
        const baseAverageDamagePerHit = this.result.calculateAverageDamagePerHit(baseMaxHit, this.result.baseHitChance);

        if (this.result.gearSet.getWeapon().name === ItemName.ZaryteCrossbow) {
            this.result.maxHit = Math.floor(baseMaxHit * 1.265);
        } else {
            this.result.maxHit = Math.floor(baseMaxHit * 1.15);
        }

        const procAverageDamagePerHit = this.result.calculateAverageDamagePerHit(this.result.maxHit, 1)

        const activationRate = (activationPercent / 100);
        const averageDamagePerHit = baseAverageDamagePerHit * (1 - activationRate) + (activationRate * procAverageDamagePerHit);

        return averageDamagePerHit;
    }
}

export class RubyBoltEnchantedStrategy extends DamagePerHitStrategy {
    calculate() {
        const ammoItem = this.result.gearSet.getItemBySlot(Slot.Ammo) as Item;
        const bolt = ammoItem?.name.includes('bolt') ? ammoItem : undefined;

        const rubyBolts = [ItemName.RubyBoltsE, ItemName.RubyDragonBoltsE];

        if (!bolt || !rubyBolts.includes(bolt.name)) {
            const defaultStrategy = new DefaultStrategy(this.result);
            return defaultStrategy.calculate();
        }

        const activationPercent = getBoltActivationRate(bolt.name, this.result.player.kandarinHardDiaryComplete);

        const baseMaxHit = this.result.maxHit;
        const baseAverageDamagePerHit = this.result.calculateAverageDamagePerHit(baseMaxHit, this.result.baseHitChance);

        //Todo this doesn't take into account that your targets health goes down as you fight it...
        let procMaxHit;
        if (this.result.gearSet.getWeapon().name === ItemName.ZaryteCrossbow) {
            procMaxHit = Math.min(Math.floor(this.result.targetMonsterVariant.currentHitpoints * 0.22), 110);
        } else {
            procMaxHit = Math.min(Math.floor(this.result.targetMonsterVariant.currentHitpoints * 0.2), 100);
        }

        if (this.result.targetMonster.name === "Corporeal Beast") {
            procMaxHit = procMaxHit * 0.5;
        } else if (this.result.targetMonster.name === "Tekton") {
            procMaxHit = 0;
        }

        this.result.maxHit = procMaxHit;

        // This is because it either misses (0) or hits max
        const procAverageDamagePerHit = procMaxHit;

        const activationRate = (activationPercent / 100);
        const averageDamagePerHit = baseAverageDamagePerHit * (1 - activationRate) + (activationRate * procAverageDamagePerHit);

        return averageDamagePerHit;
    }
}

export class OnyxBoltEnchantedStrategy extends DamagePerHitStrategy {
    calculate() {
        const ammoItem = this.result.gearSet.getItemBySlot(Slot.Ammo) as Item;
        const bolt = ammoItem?.name.includes('bolt') ? ammoItem : undefined;

        const onyxBolts = [ItemName.OnyxBoltsE, ItemName.OnyxDragonBoltsE];

        if (!bolt || !onyxBolts.includes(bolt.name) || this.result.targetMonster.isUndead) {
            const defaultStrategy = new DefaultStrategy(this.result);
            return defaultStrategy.calculate();
        }

        const activationPercent = getBoltActivationRate(bolt.name, this.result.player.kandarinHardDiaryComplete);
        const baseMaxHit = this.result.maxHit;
        const baseAverageDamagePerHit = this.result.calculateAverageDamagePerHit(baseMaxHit, this.result.hitChance);

        let damageMultiplier = 1.20;
        if (this.result.gearSet.getWeapon().name === ItemName.ZaryteCrossbow) {
            damageMultiplier = 1.32;
        }

        const procMaxHit = Math.floor(baseMaxHit * damageMultiplier);
        this.result.maxHit = procMaxHit;

        const procAverageDamagePerHit = this.result.calculateAverageDamagePerHit(procMaxHit, this.result.hitChance);

        const activationRate = (activationPercent / 100);
        const averageDamagePerHit = baseAverageDamagePerHit * (1 - activationRate) + (activationRate * procAverageDamagePerHit);

        return averageDamagePerHit;
    }
}

export function getBoltActivationRate(boltName: ItemName, hasKandarinHeadgear: boolean): number {
    const baseRates: { [key in ItemName]?: number } = {
        [ItemName.OpalBoltsE]: 5,
        [ItemName.OpalDragonBoltsE]: 5,
        [ItemName.PearlBoltsE]: 6,
        [ItemName.PearlDragonBoltsE]: 6,
        [ItemName.EmeraldBoltsE]: 55,
        [ItemName.EmeraldDragonBoltsE]: 55,
        [ItemName.RubyBoltsE]: 6,
        [ItemName.RubyDragonBoltsE]: 6,
        [ItemName.DiamondBoltsE]: 10,
        [ItemName.DiamondDragonBoltsE]: 10,
        [ItemName.DragonstoneBoltsE]: 6,
        [ItemName.DragonstoneDragonBoltsE]: 6,
        [ItemName.OnyxBoltsE]: 11,
        [ItemName.OnyxDragonBoltsE]: 11
    };

    const kandarinRates: { [key in ItemName]?: number } = {
        [ItemName.OpalBoltsE]: 5.5,
        [ItemName.OpalDragonBoltsE]: 5.5,
        [ItemName.PearlBoltsE]: 6.6,
        [ItemName.PearlDragonBoltsE]: 6.6,
        [ItemName.EmeraldBoltsE]: 60.5,
        [ItemName.EmeraldDragonBoltsE]: 60.5,
        [ItemName.RubyBoltsE]: 6.6,
        [ItemName.RubyDragonBoltsE]: 6.6,
        [ItemName.DiamondBoltsE]: 11,
        [ItemName.DiamondDragonBoltsE]: 11,
        [ItemName.DragonstoneBoltsE]: 6.6,
        [ItemName.DragonstoneDragonBoltsE]: 6.6,
        [ItemName.OnyxBoltsE]: 12.1,
        [ItemName.OnyxDragonBoltsE]: 12.1
    };


    return hasKandarinHeadgear ? (kandarinRates[boltName] || 0) : (baseRates[boltName] || 0);
}


export class DefaultStrategy extends DamagePerHitStrategy {
    calculate() {
        return this.result.calculateAverageDamagePerHit(this.result.maxHit, this.result.hitChance);
    }
}
