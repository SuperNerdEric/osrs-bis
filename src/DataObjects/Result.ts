import {TargetMonster} from "./TargetMonster";
import {Item} from "./Item";
import {AttackStyle} from "./AttackStyle";

export class Result {
    dps: number = 0;
    maxHit: number = 0;
    accuracy: number = 0;
    gearSet: Item[] = [];
    targetMonster: TargetMonster = new TargetMonster();

    calculateDPS() {
        const attackStyle = this.gearSet[0].style;
        if(attackStyle == AttackStyle.Stab || attackStyle == AttackStyle.Slash || attackStyle == AttackStyle.Crush) {
            this.calculateDPSMelee(attackStyle, 99, 99,26, 26,1.23, 1.2);
        }

    }

    private calculateDPSMelee(attackStyle: AttackStyle, strengthLevel: number, attackLevel: number, strengthLevelBoost: number, attackLevelBoost: number, prayerStrengthMultiplier: number, prayerAttackMultiplier: number) {
        let effectiveStrengthLevel =  Math.floor((strengthLevel + strengthLevelBoost) * prayerStrengthMultiplier);
        effectiveStrengthLevel += 3; //aggressive attack style
        effectiveStrengthLevel += 8;

        this.maxHit = this.calculateMaxHitMelee(effectiveStrengthLevel);

        let effectiveAttackLevel =  Math.floor((attackLevel + attackLevelBoost) * prayerAttackMultiplier);
        effectiveAttackLevel += 8;

        let equipmentAttackBonus = 0;
        this.gearSet.forEach(item => {
            if(attackStyle == AttackStyle.Stab) {
                equipmentAttackBonus += item.stab;
            } else if(attackStyle == AttackStyle.Slash) {
                equipmentAttackBonus += item.slash;
            } else if(attackStyle == AttackStyle.Crush) {
                equipmentAttackBonus += item.crush;
            }
        })

        let attackRoll = effectiveAttackLevel * (equipmentAttackBonus + 64);
        let gearMultiplier = 1; //slayer helm, salve

        attackRoll = Math.floor(attackRoll * gearMultiplier);

        let styleDefenceBonus = 0;
        if(attackStyle == AttackStyle.Stab) {
            styleDefenceBonus = this.targetMonster.stabDefence;
        } else if(attackStyle == AttackStyle.Slash) {
            styleDefenceBonus = this.targetMonster.slashDefence;
        } else if(attackStyle == AttackStyle.Crush) {
            styleDefenceBonus = this.targetMonster.crushDefence;
        }
        let defenseRoll = (this.targetMonster.defenceLevel + 9) * (styleDefenceBonus + 64);

        if(attackRoll > defenseRoll) {
            this.accuracy = 1 - ((defenseRoll + 2) / (2 * (attackRoll + 1)));
        } else {
            this.accuracy = attackRoll / (2 * (defenseRoll + 1));
        }

        let damagePerHit = 0;
        if(this.gearSet[0].name === "Scythe of vitur"){
            //Include 3 hits in accuracy

            //Do 3 hits
            let damagePerHit1 = (this.maxHit * this.accuracy) / 2; //1st is 100% damage
            let damagePerHit2 = (Math.floor(this.maxHit / 2) * this.accuracy) / 2; //2nd is 50% damage
            let damagePerHit3 = (Math.floor(this.maxHit / 4) * this.accuracy) / 2; //3rd is 25% damage
            damagePerHit = damagePerHit1 + damagePerHit2 + damagePerHit3;

            this.maxHit = Math.floor(this.maxHit * 1.75);
        } else if(this.gearSet[0].name === "Osmumten's fang"){
            //reroll accuracy check
            this.accuracy = this.accuracy + (this.accuracy * (1 - this.accuracy));

            //lower max hit without affecting dps
            damagePerHit = (this.maxHit * this.accuracy) / 2;
            this.maxHit = Math.floor(this.maxHit * 0.85);
        } else {
            damagePerHit = (this.maxHit * this.accuracy) / 2;
        }
        console.log("Damage per hit: " + damagePerHit);
        this.dps = damagePerHit / this.gearSet[0].speedSeconds;

    }

    private calculateMaxHitMelee(effectiveStrengthLevel: number): number {
        let equipmentMeleeStrength = 0;

        this.gearSet.forEach(item => {
            equipmentMeleeStrength += item.strength;
        })

        let maxHit = effectiveStrengthLevel * (equipmentMeleeStrength + 64);
        maxHit += 320;
        maxHit = Math.floor(maxHit / 640);

        let gearMultiplier = 1; //slayer helm, salve

        maxHit = Math.floor(maxHit * gearMultiplier);

        return maxHit;
    }
}

