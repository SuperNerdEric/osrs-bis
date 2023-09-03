import {Calculator} from "./Calculator";
import {CombatClass, Item, Slot, StyleType} from "../DataObjects/Item";
import {ItemName} from "../DataObjects/ItemName";
import {upsertDamageProbability, DamageProbability, generateUniformDistribution} from "./DamageProbability";
import {getBoltActivationRate} from "./BoltActivationRates";

export abstract class DamageDistributionStrategy {
    protected result: Calculator;
    protected damageDistribution: DamageProbability[];

    constructor(result: Calculator) {
        this.result = result;
        this.damageDistribution = generateUniformDistribution(0, this.result.maxHit, this.result.hitChance);
    }

    /**
     * Adjusts the base damage distribution to account for a special effect (proc).
     * - Reduces base damage probabilities based on the proc rate.
     * - Merges the proc's damage distribution into the base distribution.
     *
     * @param procDistribution - The distribution for the special effect outcomes.
     * @param procRate - The probability of the special effect activating.
     */
    protected adjustDistributionForProc(procDistribution: DamageProbability[], procRate: number) {
        for (const dmgProb of this.damageDistribution) {
            dmgProb.probability *= (1 - procRate);
        }

        for (const dmgProb of procDistribution) {
            upsertDamageProbability(this.damageDistribution, dmgProb.dmg, dmgProb.probability);
        }
    }

    abstract getDamageDistribution(): DamageProbability[];
}

export class ScytheOfViturStrategy extends DamageDistributionStrategy {
    getDamageDistribution() {
        const numberOfHits = Math.min(Number(this.result.targetMonster.size.at(0)), 3);
        let hitValue = this.result.maxHit;

        for (let i = 1; i < numberOfHits; i++) {
            hitValue = Math.floor(hitValue / 2);
            const currentHitDistribution = generateUniformDistribution(0, hitValue, this.result.hitChance);

            const newDistribution: DamageProbability[] = [];

            for (const mainProb of this.damageDistribution) {
                for (const currentProb of currentHitDistribution) {
                    const combinedDmg = mainProb.dmg + currentProb.dmg;
                    const combinedProb = mainProb.probability * currentProb.probability;
                    upsertDamageProbability(newDistribution, combinedDmg, combinedProb);
                }
            }

            this.damageDistribution = newDistribution;
        }

        return this.damageDistribution;
    }
}

export class OsmumtensFangStrategy extends DamageDistributionStrategy {
    getDamageDistribution() {
        const minHit = Math.floor(this.result.maxHit * 0.15);
        this.result.maxHit = this.result.maxHit - minHit;
        const distribution = generateUniformDistribution(minHit, this.result.maxHit, this.result.hitChance);
        return distribution;
    }
}


export class KerisStrategy extends DamageDistributionStrategy {
    getDamageDistribution() {
        if (this.result.targetMonster.isKalphite) {
            this.result.procRate = 1 / 51;
            const procMultiplier = 3;

            const procDistribution: DamageProbability[] = [];
            for (const dmgProb of this.damageDistribution) {
                const proc = dmgProb.dmg * procMultiplier;
                upsertDamageProbability(procDistribution, proc, dmgProb.probability * this.result.procRate);
            }

            this.adjustDistributionForProc(procDistribution, this.result.procRate);

            this.result.baseMaxHit = this.result.maxHit;
            return this.damageDistribution;
        } else {
            const defaultStrategy = new DefaultStrategy(this.result);
            return defaultStrategy.getDamageDistribution();
        }
    }
}

export class DiamondBoltEnchantedStrategy extends DamageDistributionStrategy {
    getDamageDistribution() {
        this.result.procRate = getBoltActivationRate(ItemName.DiamondBoltsE, this.result.player.kandarinHardDiaryComplete) / 100;

        let damageMultiplier;
        if (this.result.gearSet.getWeapon().name === ItemName.ZaryteCrossbow) {
            damageMultiplier = 1.26;
        } else {
            damageMultiplier = 1.15;
        }

        const procMaxHit = Math.floor(this.result.maxHit * damageMultiplier);
        const procDistribution = generateUniformDistribution(0, procMaxHit, this.result.procRate);

        this.adjustDistributionForProc(procDistribution, this.result.procRate);
        return this.damageDistribution;
    }
}

export class RubyBoltEnchantedStrategy extends DamageDistributionStrategy {
    getDamageDistribution() {
        this.result.procRate = getBoltActivationRate(ItemName.RubyBoltsE, this.result.player.kandarinHardDiaryComplete) / 100;

        let procMaxHit;
        if (this.result.gearSet.getWeapon().name === ItemName.ZaryteCrossbow) {
            procMaxHit = Math.min(Math.floor(this.result.targetMonster.currentHitpoints * 0.22), 110);
        } else {
            procMaxHit = Math.min(Math.floor(this.result.targetMonster.currentHitpoints * 0.2), 100);
        }

        const procDistribution: DamageProbability[] = [];
        upsertDamageProbability(procDistribution, procMaxHit, this.result.procRate);
        this.adjustDistributionForProc(procDistribution, this.result.procRate);

        return this.damageDistribution;
    }
}

export class OnyxBoltEnchantedStrategy extends DamageDistributionStrategy {
    getDamageDistribution() {
        this.result.procRate = getBoltActivationRate(ItemName.OnyxBoltsE, this.result.player.kandarinHardDiaryComplete) / 100;

        let damageMultiplier = 1.20;
        if (this.result.gearSet.getWeapon().name === ItemName.ZaryteCrossbow) {
            damageMultiplier = 1.32;
        }

        const procMaxHit = Math.floor(this.result.maxHit * damageMultiplier);
        const procHitChance = this.result.procRate * this.result.hitChance; //Does NOT bypass accuracy roll, so we have to include hit chance
        const procDistribution = generateUniformDistribution(0, procMaxHit, procHitChance);
        this.adjustDistributionForProc(procDistribution, this.result.procRate);
        return this.damageDistribution;
    }
}

export class DefaultStrategy extends DamageDistributionStrategy {
    getDamageDistribution() {
        return generateUniformDistribution(0, this.result.maxHit, this.result.hitChance);
    }
}

export function getStrategyFromBolt(calculator: Calculator, boltName: ItemName) {
    if ([ItemName.DiamondBoltsE, ItemName.DiamondDragonBoltsE].includes(boltName)) {
        return new DiamondBoltEnchantedStrategy(calculator);
    }
    if ([ItemName.RubyBoltsE, ItemName.RubyDragonBoltsE].includes(boltName)) {
        return new RubyBoltEnchantedStrategy(calculator);
    }
    if ([ItemName.OnyxBoltsE, ItemName.OnyxDragonBoltsE].includes(boltName)) {
        return new OnyxBoltEnchantedStrategy(calculator);
    }
    return new DefaultStrategy(calculator);
}

export function getDamageDistribution(calculator: Calculator) {
    let strategy: DamageDistributionStrategy;
    const ammoItem = calculator.gearSet.getItemBySlot(Slot.Ammo) as Item;
    const bolt = ammoItem?.name.includes('bolt') ? ammoItem : undefined;
    if (calculator.gearSet.getWeapon().name === ItemName.ScytheOfVitur) {
        strategy = new ScytheOfViturStrategy(calculator);
    } else if (calculator.gearSet.getWeapon().name === ItemName.OsmumtensFang) {
        strategy = new OsmumtensFangStrategy(calculator);
    } else if (calculator.gearSet.getWeapon().name.includes("Keris")) {
        strategy = new KerisStrategy(calculator);
    } else if (bolt) {
        strategy = getStrategyFromBolt(calculator, bolt.name);
    } else {
        strategy = new DefaultStrategy(calculator);
    }

    let distribution = strategy.getDamageDistribution();
    if (calculator.targetMonster.name.includes("Tekton")) {
        distribution = adjustForTekton(distribution, calculator);
    }
    if (calculator.targetMonster.name.includes("Zulrah")) {
        distribution = adjustForZulrah(distribution, calculator);
    }

    return distribution;
}

export function adjustForTekton(distribution: DamageProbability[], calculator: Calculator): DamageProbability[] {
    if (calculator.gearSet.styleType === StyleType.Ranged) {
        return [{dmg: 0, probability: 1}];
    } else if (calculator.gearSet.styleType === StyleType.Magic) {
        distribution = distribution.map(d => {
            d.dmg = Math.floor(d.dmg * 0.20);
            return d;
        });
    }
    return distribution;
}

export function adjustForZulrah(distribution: DamageProbability[], calculator: Calculator): DamageProbability[] {
    if (calculator.gearSet.combatClass === CombatClass.Melee) {
        return [{dmg: 0, probability: 1}];
    } else {
        const adjustedDistribution: DamageProbability[] = [];

        for (const dmgProb of distribution) {
            if (dmgProb.dmg > 50) {
                // Redistribute evenly across 45-50
                const redistributedProbability = dmgProb.probability / 6;
                for (let dmgValue = 45; dmgValue <= 50; dmgValue++) {
                    upsertDamageProbability(adjustedDistribution, dmgValue, redistributedProbability);
                }
            } else {
                adjustedDistribution.push(dmgProb);
            }
        }

        return adjustedDistribution;
    }
}
