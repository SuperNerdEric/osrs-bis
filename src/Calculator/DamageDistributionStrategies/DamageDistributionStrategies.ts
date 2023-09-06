import {Calculator} from "../Calculator";
import {CombatClass, Item, Slot} from "../../DataObjects/Item";
import {ItemName} from "../../DataObjects/ItemName";
import {
    upsertDamageProbability,
    DamageProbability,
    generateUniformDistribution,
    rerollDamageAboveCap, combineMultipleDistributions, combineTwoDistributions
} from "./DamageProbability";
import {getBoltActivationRate} from "../BoltActivationRates";
import {AbstractDamageDistributionStrategy} from "./AbstractDamageDistributionStrategy";

export class ScytheOfViturStrategy extends AbstractDamageDistributionStrategy {
    getDamageDistributions() {
        const numberOfHits = Math.min(Number(this.result.targetMonster.size.at(0)), 3);
        let hitValue = this.result.maxHit;

        const distributions: DamageProbability[][] = [];
        for (let i = 0; i < numberOfHits; i++) {
            distributions.push(generateUniformDistribution(0, hitValue, this.result.hitChance));
            hitValue = Math.floor(hitValue / 2);
        }
        return distributions;
    }
}

export class OsmumtensFangStrategy extends AbstractDamageDistributionStrategy {
    getDamageDistributions() {
        const minHit = Math.floor(this.result.maxHit * 0.15);
        this.result.maxHit = this.result.maxHit - minHit;
        const distribution = generateUniformDistribution(minHit, this.result.maxHit, this.result.hitChance);
        return [distribution];
    }
}


export class KerisStrategy extends AbstractDamageDistributionStrategy {
    getDamageDistributions() {
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
            return [this.damageDistribution];
        } else {
            const defaultStrategy = new DefaultStrategy(this.result);
            return defaultStrategy.getDamageDistributions();
        }
    }
}

export class DiamondBoltEnchantedStrategy extends AbstractDamageDistributionStrategy {
    getDamageDistributions() {
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
        return [this.damageDistribution];
    }
}

export class RubyBoltEnchantedStrategy extends AbstractDamageDistributionStrategy {
    getDamageDistributions() {
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

        return [this.damageDistribution];
    }
}

export class OnyxBoltEnchantedStrategy extends AbstractDamageDistributionStrategy {
    getDamageDistributions() {
        this.result.procRate = getBoltActivationRate(ItemName.OnyxBoltsE, this.result.player.kandarinHardDiaryComplete) / 100;

        let damageMultiplier = 1.20;
        if (this.result.gearSet.getWeapon().name === ItemName.ZaryteCrossbow) {
            damageMultiplier = 1.32;
        }

        const procMaxHit = Math.floor(this.result.maxHit * damageMultiplier);
        const procHitChance = this.result.procRate * this.result.hitChance; //Does NOT bypass accuracy roll, so we have to include hit chance
        const procDistribution = generateUniformDistribution(0, procMaxHit, procHitChance);
        this.adjustDistributionForProc(procDistribution, this.result.procRate);
        return [this.damageDistribution];
    }
}

export class DefaultStrategy extends AbstractDamageDistributionStrategy {
    getDamageDistributions() {
        return [generateUniformDistribution(0, this.result.maxHit, this.result.hitChance)];
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
    let strategy: AbstractDamageDistributionStrategy;
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

    let distributions = strategy.getDamageDistributions();
    if (calculator.targetMonster.name.includes("Tekton")) {
        distributions = distributions.map(distribution => adjustForTekton(distribution, calculator));
    }

    if (calculator.targetMonster.name.includes("Zulrah")) {
        distributions = distributions.map(distribution => adjustForZulrah(distribution, calculator));
    }

    if (calculator.targetMonster.name.includes("Verzik") && calculator.targetMonster.activeVariant.variantName.includes("Phase 1")) {
        distributions = distributions.map(distribution => adjustForVerzikP1(distribution, calculator));
    }

    if (calculator.targetMonster.name.includes("Fragment of Seren")) {
        distributions = distributions.map(distribution => adjustForFragmentOfSeren(distribution));
    }

    if (calculator.targetMonster.title.toLowerCase().includes("kraken")) {
        distributions = distributions.map(distribution => adjustForKraken(distribution, calculator));
    }

    if (calculator.targetMonster.name.includes("Abyssal portal") || calculator.targetMonster.name.includes("TzKal-Zuk") ) {
        distributions = distributions.map(distribution => immuneToMelee(distribution, calculator));
    }

    const distribution = combineMultipleDistributions(distributions);
    return distribution;
}

export function adjustForTekton(distribution: DamageProbability[], calculator: Calculator): DamageProbability[] {
    if (calculator.gearSet.combatClass === CombatClass.Ranged) {
        return [{dmg: 0, probability: 1}];
    } else if (calculator.gearSet.combatClass === CombatClass.Magic) {
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
        return rerollDamageAboveCap(distribution, 45, 50);
    }
}

export function immuneToMelee(distribution: DamageProbability[], calculator: Calculator): DamageProbability[] {
    if (calculator.gearSet.combatClass === CombatClass.Melee) {
        return [{dmg: 0, probability: 1}];
    }
    return distribution;
}

export function adjustForVerzikP1(distribution: DamageProbability[], calculator: Calculator): DamageProbability[] {
    if (calculator.gearSet.getWeapon()?.name === ItemName.Dawnbringer) {
        // For Dawnbringer, assume 100% hit chance but rolls evenly from 0 to max hit
        return generateUniformDistribution(0, calculator.maxHit, 1);
    } else if (calculator.gearSet.combatClass === CombatClass.Melee) {
        const verzikCapDistribution = generateUniformDistribution(0, 10, 1);
        return combineTwoDistributions(distribution, verzikCapDistribution, Math.min);
    } else {
        const verzikCapDistribution = generateUniformDistribution(0, 3, 1);
        return combineTwoDistributions(distribution, verzikCapDistribution, Math.min);
    }
}

export function adjustForFragmentOfSeren(distribution: DamageProbability[]): DamageProbability[] {
    return rerollDamageAboveCap(distribution, 22, 24);
}

export function adjustForKraken(distribution: DamageProbability[], calculator: Calculator): DamageProbability[] {
    if (calculator.gearSet.combatClass === CombatClass.Melee) {
        return [{ dmg: 0, probability: 1 }];
    } else if (calculator.gearSet.combatClass === CombatClass.Ranged) {
        distribution = distribution.map(dmgProb => {
            if (dmgProb.dmg >= 1) {
                dmgProb.dmg = Math.max(Math.floor(dmgProb.dmg / 7), 1);
            }
            return dmgProb;
        });
    }
    return distribution;
}
