import { calculateDefenceLevel, calculateHits, DefenceReductionSummary } from "./DefenceCalculator";

const noSpecs: DefenceReductionSummary = {
    elderMaul: 0,
    dragonWarhammer: 0,
    tonalzticsOfRalos: 0,
    bandosGodsword: 0,
};

describe("defence reduction", () => {
    test("dragon warhammer removes 30% of current defence", () => {
        const defence = calculateDefenceLevel(100, { ...noSpecs, dragonWarhammer: 1 }, 100, 1);
        expect(defence).toBe(70);
    });

    test("elder maul removes 35% of current defence", () => {
        const defence = calculateDefenceLevel(100, { ...noSpecs, elderMaul: 1 }, 100, 1);
        expect(defence).toBe(65);
    });

    test("elder maul then dragon warhammer use the reduced defence", () => {
        const defence = calculateDefenceLevel(200, { ...noSpecs, elderMaul: 1, dragonWarhammer: 1 }, 200, 1);
        expect(defence).toBe(91);
    });

    test("tonalztics of ralos removes one eighth of magic level per hit", () => {
        const defence = calculateDefenceLevel(260, { ...noSpecs, tonalzticsOfRalos: 1 }, 260, 250);
        expect(defence).toBe(229);
    });

    test("charged ralos lands as two hits", () => {
        const defence = calculateDefenceLevel(260, { ...noSpecs, tonalzticsOfRalos: 2 }, 260, 250);
        expect(defence).toBe(198);
    });

    test("bandos godsword removes the damage dealt", () => {
        const defence = calculateDefenceLevel(130, { ...noSpecs, bandosGodsword: 40 }, 52, 200);
        expect(defence).toBe(90);
    });

    test("archive guardian defence cannot fall below 156", () => {
        const defence = calculateDefenceLevel(
            260,
            { ...noSpecs, elderMaul: 5, dragonWarhammer: 5, bandosGodsword: 104 },
            104,
            250,
        );
        expect(defence).toBe(156);
    });

    test("dreadnoth and the smorks can be reduced to 0", () => {
        expect(calculateDefenceLevel(125, { ...noSpecs, bandosGodsword: 125 }, 125, 220)).toBe(0);
        expect(calculateDefenceLevel(220, { ...noSpecs, bandosGodsword: 220 }, 220, 185)).toBe(0);
    });

    test("typing a defence level uses an elder maul hit when it lands exactly", () => {
        const hits = calculateHits(130, 200);
        expect(hits.elderMaul).toBe(1);
        expect(hits.dragonWarhammer).toBe(0);
        expect(hits.bandosGodsword).toBe(0);
        expect(calculateDefenceLevel(200, hits, 200, 1)).toBe(130);
    });
});
