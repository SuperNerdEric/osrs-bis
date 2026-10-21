export type DefenceReductionSummary = {
    elderMaul: number;
    dragonWarhammer: number;
    tonalzticsOfRalos: number;
    bandosGodsword: number;
};

export function ralosReductionPerHit(magicLevel: number): number {
    return Math.floor(magicLevel / 8);
}

export function calculateHits(currentDefence: number, baseDefence: number): DefenceReductionSummary {
    let elderMaul = 0;
    let dragonWarhammer = 0;
    let bandosGodsword = 0;
    let defence = baseDefence;

    while (defence > currentDefence) {
        const gap = defence - currentDefence;
        const elderReduction = Math.floor(defence * 0.35);
        const dwhReduction = Math.floor(defence * 0.3);

        if (gap <= 50) {
            bandosGodsword = gap;
            break;
        } else if (elderReduction > 0 && elderReduction <= gap) {
            elderMaul++;
            defence -= elderReduction;
        } else if (dwhReduction > 0 && dwhReduction <= gap) {
            dragonWarhammer++;
            defence -= dwhReduction;
        } else {
            bandosGodsword = gap;
            break;
        }
    }

    return {
        elderMaul,
        dragonWarhammer,
        tonalzticsOfRalos: 0,
        bandosGodsword,
    };
}

export function calculateDefenceLevel(
    baseDefence: number,
    reductionSummary: DefenceReductionSummary,
    maxReduction: number,
    magicLevel: number,
): number {
    const minimumDefence = Math.max(0, baseDefence - maxReduction);
    let defence = baseDefence;

    const apply = (nextDefence: number) => {
        defence = Math.max(minimumDefence, nextDefence);
    };

    for (let i = 0; i < reductionSummary.elderMaul; i++) {
        apply(defence - Math.floor(defence * 0.35));
    }
    for (let i = 0; i < reductionSummary.dragonWarhammer; i++) {
        apply(defence - Math.floor(defence * 0.3));
    }

    const perRalosHit = ralosReductionPerHit(magicLevel);
    for (let i = 0; i < reductionSummary.tonalzticsOfRalos; i++) {
        apply(defence - perRalosHit);
    }

    apply(defence - reductionSummary.bandosGodsword);
    return defence;
}
