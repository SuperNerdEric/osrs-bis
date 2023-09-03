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
