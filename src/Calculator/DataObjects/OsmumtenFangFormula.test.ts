import {Player} from './Player';
import {TbowTest} from "./Tbow.test";
import { randomInt } from 'mathjs';

export class OsmumtenFangFormulaTest {

    getRandomNumber(min: number, max: number): number {
        // The randomInt function from mathjs generates a random integer between min (inclusive) and max (exclusive).
        // To make it inclusive for max, we simply add 1 to max before passing it.
        return randomInt(min, max + 1);
    }

    simulateOsmumten(maxAttackRoll: number, maxDefenceRoll: number, trials = 1_000_000) {
        let hits = 0;

        for (let i = 0; i < trials; i++) {
            const attackRoll1 = this.getRandomNumber(0, maxAttackRoll);
            const attackRoll2 = this.getRandomNumber(0, maxAttackRoll);

            const defenceRoll = this.getRandomNumber(0, maxDefenceRoll);
            const defenceRoll2 = this.getRandomNumber(0, maxDefenceRoll);

            if (attackRoll1 > defenceRoll || attackRoll2 > defenceRoll2) {
                hits++;
            }
        }

        return hits / trials; // returns the average hit rate as a fraction of 1 (or percentage when multiplied by 100)
    }

    acceptedFormula(attackRoll: number, defenceRoll: number): number {
        if (attackRoll > defenceRoll) {
            return 1 - ((defenceRoll + 2) / (2 * (attackRoll + 1)));
        } else {
            return attackRoll / (2 * (defenceRoll + 1));
        }
    }

    simulate(maxAttackRoll: number, maxDefenceRoll: number, trials = 100_000_000) {
        let hits = 0;

        const attackRollMap = new Map<number, number>();

        for (let i = 0; i < trials; i++) {
            const attackRoll = this.getRandomNumber(0, maxAttackRoll);
            const defenceRoll = this.getRandomNumber(0, maxDefenceRoll);

            //attackRollMap.set(attackRoll, (attackRollMap.get(attackRoll) || 0) + 1);

            if (attackRoll > defenceRoll) {
                hits++;
            }
        }

        //const sortedArray = Array.from(attackRollMap.entries()).sort((a, b) => a[0] - b[0]);
        //console.log('Attack Roll Counts:',  sortedArray);

        return hits / trials;
    }

    acceptedOsmumtenFormula(attackRoll: number, defenceRoll: number): number {
        let hitChance;
        if (attackRoll > defenceRoll) {
            hitChance = 1 - ((defenceRoll + 2) * (2 * defenceRoll + 3)) / (6 * Math.pow(attackRoll + 1, 2));
        } else {
            hitChance = (6 * Math.pow(attackRoll + 1, 2) - (attackRoll + 2) * (2 * attackRoll + 3)) / (6 * (defenceRoll + 1) * (attackRoll + 1));
        }

        return hitChance;
    }

}

describe('hit chance test', () => {
    it('osmumten fang', () => {
        const instance = new OsmumtenFangFormulaTest();

        //Osmumtens in max melee
        const maxAttackRoll = 35164;

        const maxDefenceRoll = 11336;

        console.log("Simulated: " + instance.simulateOsmumten(maxAttackRoll, maxDefenceRoll));
        console.log("Accepted formula: " + instance.acceptedOsmumtenFormula(maxAttackRoll, maxDefenceRoll));
    });

    it('ghrazi rapier', () => {
        const instance = new OsmumtenFangFormulaTest();

        //ghrazi in max melee
        const maxAttackRoll = 33525;

        const maxDefenceRoll = 11336;

        console.log("Simulated: " + instance.simulate(maxAttackRoll, maxDefenceRoll));
        console.log("Accepted formula: " + instance.acceptedFormula(maxAttackRoll, maxDefenceRoll))
    });

});