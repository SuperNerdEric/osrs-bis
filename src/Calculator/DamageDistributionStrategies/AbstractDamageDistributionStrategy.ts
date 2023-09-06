import {Calculator} from "../Calculator";
import {DamageProbability, generateUniformDistribution, upsertDamageProbability} from "./DamageProbability";

export abstract class AbstractDamageDistributionStrategy {
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

    /**
     * Get an array of damage probability distributions. In some cases, weapons can hit multiple times in a single attack
     * (e.g., Scythe of Vitur). Each distribution in the array represents the probabilities for one of those hits.
     *
     * @returns An array of damage probability distributions.
     */
    abstract getDamageDistributions(): DamageProbability[][];

}