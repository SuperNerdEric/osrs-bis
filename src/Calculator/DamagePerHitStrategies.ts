import {Calculator} from "./Calculator";

abstract class DamagePerHitStrategy {
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

        for (let i = 0; i < 3; i++, hitValue /= 2) {
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

export class DefaultStrategy extends DamagePerHitStrategy {
    calculate() {
        return this.result.calculateAverageDamagePerHit(this.result.maxHit, this.result.hitChance);
    }
}
