import {randomInt} from 'mathjs';

export class ScytheDPSTest {

    getRandomNumber(min: number, max: number): number {
        // The randomInt function from mathjs generates a random integer between min (inclusive) and max (exclusive).
        // To make it inclusive for max, we simply add 1 to max before passing it.
        return randomInt(min, max + 1);
    }

    simulateScythe(maxHit: number, maxAttackRoll: number, maxDefenceRoll: number, trials = 100_000_000) {
        let totalDamage = 0;  // total accumulated damage over all trials

        for (let i = 0; i < trials; i++) {
            let damageThisTrial = 0;  // damage for this specific trial

            const attackRoll1 = this.getRandomNumber(0, maxAttackRoll);
            const defenceRoll1 = this.getRandomNumber(0, maxDefenceRoll);

            if (attackRoll1 > defenceRoll1) {
                const hit1 = this.getRandomNumber(0, maxHit);
                damageThisTrial += hit1;
            }

            const attackRoll2 = this.getRandomNumber(0, maxAttackRoll);
            const defenceRoll2 = this.getRandomNumber(0, maxDefenceRoll);
            if (attackRoll2 > defenceRoll1) {
                const hit2 = Math.floor(this.getRandomNumber(0, maxHit) / 2);
                damageThisTrial += hit2;
            }

            const attackRoll3 = this.getRandomNumber(0, maxAttackRoll);
            const defenceRoll3 = this.getRandomNumber(0, maxDefenceRoll);
            if (attackRoll3 > defenceRoll1) {
                const hit3 = Math.floor(this.getRandomNumber(0, maxHit) / 4);
                damageThisTrial += hit3;
            }

            totalDamage += damageThisTrial;
        }

        const averageDamagePerTrial = totalDamage / trials;
        const averageDamagePerSecond = averageDamagePerTrial / 3;

        return averageDamagePerSecond;
    }

}

describe('dps test', () => {
    it('scythe', () => {
        const instance = new ScytheDPSTest();

        //Scythe in max melee
        const maxAttackRoll = 31439;

        const maxDefenceRoll = 9156;
        const maxHit = 47;

        console.log("Simulated: " + instance.simulateScythe(maxHit, maxAttackRoll, maxDefenceRoll));
    });

});