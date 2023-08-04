import {TargetMonster} from './TargetMonster';
import {Player} from './Player';
import {AttackStyle} from "./AttackStyle";

export class TbowTest {
    maxHitMethod1: number = 0;
    maxHitMethod2: number = 0;
    maxHitMethod3: number = 0;
    player: Player = new Player();

    calculateMaxHitRanged(equipmentRangedStrength: number, invocationLevel: number, attackStyle: AttackStyle, rangedLevel: number, rangedLevelBoost: number, prayerStrengthMultiplier: number) {
        let effectiveRangedStrength = Math.floor((rangedLevel + rangedLevelBoost) * prayerStrengthMultiplier);
        effectiveRangedStrength += 8;

        const slayerMod = 1.15;
        const tbowMod = 2.15; //Twisted Bow assuming 250 max magic target

        const baseMaxHit = Math.floor(0.5 + (((effectiveRangedStrength) * (equipmentRangedStrength + 64)) / 640));
        console.log("Base max hit: " + baseMaxHit);
        this.maxHitMethod1 = Math.floor(Math.floor(baseMaxHit * slayerMod) * tbowMod);
        this.maxHitMethod2 = Math.floor(Math.floor(0.5 + (((effectiveRangedStrength) * (equipmentRangedStrength + 64)) / 640)) * 2.47);
        this.maxHitMethod3 = Math.floor(Math.floor(baseMaxHit * tbowMod) * slayerMod);
    }
}


describe('calculateMaxHitRanged test', () => {
    it('should find a case where method 1 and method 2 differ', () => {
        const instance = new TbowTest();

        let equipmentRangedStrength;
        let maxHitMethod1, maxHitMethod2;

        for(let i = 27; i <= 95; i++) {
            equipmentRangedStrength = i;

            instance.calculateMaxHitRanged(equipmentRangedStrength,0, AttackStyle.Rapid, 99, 13, 1.23);

            maxHitMethod1 = instance.maxHitMethod1;
            maxHitMethod2 = instance.maxHitMethod2;

            if(maxHitMethod1 !== maxHitMethod2) {
                console.log("Equipment ranged strength: " + equipmentRangedStrength);
                console.log(maxHitMethod1);
                console.log(maxHitMethod2);
                expect(maxHitMethod1).not.toEqual(maxHitMethod2);
                break;
            }
        }
    });

    //This shows that the order of multiplying modifiers matters. Slayer has to come before Twisted Bow
    it('should find a case where method 1 and method 3 differ', () => {
        const instance = new TbowTest();

        let equipmentRangedStrength;
        let maxHitMethod1, maxHitMethod3;

        for(let i = 27; i <= 95; i++) {
            equipmentRangedStrength = i;

            instance.calculateMaxHitRanged(equipmentRangedStrength,0, AttackStyle.Rapid, 99, 13, 1.23);

            maxHitMethod1 = instance.maxHitMethod1;
            maxHitMethod3 = instance.maxHitMethod3;

            if(maxHitMethod1 !== maxHitMethod3) {
                console.log("Equipment ranged strength: " + equipmentRangedStrength);
                console.log(maxHitMethod1);
                console.log(maxHitMethod3);
                expect(maxHitMethod1).not.toEqual(maxHitMethod3);
                break;
            }
        }
    });
});