export type DefenceReductionSummary = {
    dragonWarhammer: number,
    bandosGodsword: number
};

export function calculateHits(currentDefence: number, baseDefence: number): DefenceReductionSummary {
    let hitsFromDWH = 0;
    let bgsDamage = 0;

    while (baseDefence > currentDefence) {
        const potentialReduction = Math.floor(baseDefence * 0.3);
        const defenceDifference = baseDefence - currentDefence;

        if (defenceDifference <= 50) {
            bgsDamage = defenceDifference;
            break;
        } else if (potentialReduction <= defenceDifference) {
            hitsFromDWH++;
            baseDefence -= potentialReduction;
        } else {
            bgsDamage = defenceDifference;
            break;
        }
    }

    return {
        dragonWarhammer: hitsFromDWH,
        bandosGodsword: bgsDamage
    };
}

export function calculateDefenceLevel(baseDefence: number, reductionSummary: DefenceReductionSummary, maxReduction: number): number {
    const minimumDefence = baseDefence - maxReduction;

    let resultingDefence = baseDefence;
    for (let i = 0; i < reductionSummary.dragonWarhammer; i++) {
        const reduction = Math.floor(resultingDefence * 0.3);
        resultingDefence -= reduction;
    }

    resultingDefence -= reductionSummary.bandosGodsword;
    return Math.max(minimumDefence, resultingDefence);
}
