export type DamageProbability = { dmg: number, probability: number };

export function generateUniformDistribution(minHit: number, maxHit: number, hitChance: number): DamageProbability[] {
    const distribution: DamageProbability[] = [];
    const probability = 1 / (maxHit - minHit + 1);

    const missProbability = 1 - hitChance;
    distribution.push({dmg: 0, probability: missProbability});

    for (let dmg = minHit; dmg <= maxHit; dmg++) {
        upsertDamageProbability(distribution, dmg, hitChance * probability);
    }

    return distribution;
}

export function averageDamage(distribution: DamageProbability[]): number {
    return distribution.reduce((acc, curr) => acc + curr.dmg * curr.probability, 0);
}

/**
 * Updates or inserts a damage value's probability in the given distribution.
 * If the damage value already exists, their probabilities are summed up.
 * Otherwise, the damage value is inserted with the provided probability.
 *
 * @param distribution - The array of damage probabilities to update.
 * @param dmg - The specific damage value.
 * @param probability - The probability to add or insert.
 */
export function upsertDamageProbability(distribution: DamageProbability[], dmg: number, probability: number) {
    const dmgIndex = distribution.findIndex(d => d.dmg === dmg);
    if (dmgIndex !== -1) {
        distribution[dmgIndex].probability += probability;
    } else {
        distribution.push({ dmg: dmg, probability: probability });
    }
}

/**
 * Redistributes damage probabilities above a given cap evenly across a specified range.
 *
 * @param distribution - The original damage probabilities distribution.
 * @param minReroll - The minimum damage value for rerolled hits.
 * @param damageCap - The maximum damage before rerolling occurs.
 * @returns The adjusted damage probabilities distribution.
 */
export function rerollDamageAboveCap(distribution: DamageProbability[], minReroll: number, damageCap: number): DamageProbability[] {
    const adjustedDistribution: DamageProbability[] = [];
    const rerollRange = damageCap - minReroll + 1;

    for (const dmgProb of distribution) {
        if (dmgProb.dmg > damageCap) {
            // Redistribute evenly across range
            const redistributedProbability = dmgProb.probability / rerollRange;
            for (let dmgValue = minReroll; dmgValue <= damageCap; dmgValue++) {
                upsertDamageProbability(adjustedDistribution, dmgValue, redistributedProbability);
            }
        } else {
            adjustedDistribution.push(dmgProb);
        }
    }

    return adjustedDistribution;
}

export function combineMultipleDistributions(distributions: DamageProbability[][]): DamageProbability[] {
    let combinedDistribution: DamageProbability[] = distributions[0];

    for (let i = 1; i < distributions.length; i++) {
        combinedDistribution = combineTwoDistributions(combinedDistribution, distributions[i]);
    }

    return combinedDistribution;
}

type CombinerFunction = (a: number, b: number) => number;

/**
 * Combines two damage probability distributions using a provided combiner function.
 *
 * @remarks
 * The default combiner function is addition, which sums the damages.
 * For special combat mechanics, like Verzik P1's damage cap, you can use an alternate combiner like `Math.min`.
 *
 * @param distribution1 - The first damage probability distribution.
 * @param distribution2 - The second damage probability distribution.
 * @param combiner - Function to combine damage values. Defaults to addition.
 * @returns Combined damage probability distribution.
 */
export function combineTwoDistributions(distribution1: DamageProbability[], distribution2: DamageProbability[], combiner: CombinerFunction = (a, b) => a + b): DamageProbability[] {
    const combined: DamageProbability[] = [];

    for (const damageProbability1 of distribution1) {
        for (const damageProbability2 of distribution2) {
            const combinedDmg = combiner(damageProbability1.dmg, damageProbability2.dmg);
            const combinedProb = damageProbability1.probability * damageProbability2.probability;
            upsertDamageProbability(combined, combinedDmg, combinedProb);
        }
    }

    return combined;
}
