import {TargetMonster} from "./TargetMonster";
import {Item} from "./Item";
import {AttackStyle} from "./AttackStyle";

export class Result {
    dps: number = 0;
    maxHit: number = 0;
    hitChance: number = 0;
    gearSet: Item[] = [];
    targetMonster: TargetMonster = new TargetMonster();

    calculateDPS(invocationLevel: number) {
        const attackStyle = this.gearSet[0].style;
        if (attackStyle == AttackStyle.Stab || attackStyle == AttackStyle.Slash || attackStyle == AttackStyle.Crush) {
            this.calculateDPSMelee(invocationLevel, attackStyle, 99, 99, 26, 26, 1.23, 1.2);
        } else if (attackStyle == AttackStyle.Rapid) {
            this.calculateDPSRanged(invocationLevel, attackStyle, 99, 26, 1.23, 1.2);
        } else {
            this.calculateDPSMagic(invocationLevel, attackStyle, 99, 26, 1.25);
        }

    }

    private calculateDPSMelee(invocationLevel: number, attackStyle: AttackStyle, strengthLevel: number, attackLevel: number, strengthLevelBoost: number, attackLevelBoost: number, prayerStrengthMultiplier: number, prayerAttackMultiplier: number) {
        let effectiveStrengthLevel = Math.floor((strengthLevel + strengthLevelBoost) * prayerStrengthMultiplier);
        effectiveStrengthLevel += 3; //aggressive attack style
        effectiveStrengthLevel += 8;

        this.maxHit = this.calculateMaxHitMelee(effectiveStrengthLevel);

        let effectiveAttackLevel = Math.floor((attackLevel + attackLevelBoost) * prayerAttackMultiplier);
        effectiveAttackLevel += 8;

        let equipmentAttackBonus = 0;
        this.gearSet.forEach(item => {
            if (attackStyle == AttackStyle.Stab) {
                equipmentAttackBonus += item.stab;
            } else if (attackStyle == AttackStyle.Slash) {
                equipmentAttackBonus += item.slash;
            } else if (attackStyle == AttackStyle.Crush) {
                equipmentAttackBonus += item.crush;
            }
        });

        let attackRoll = effectiveAttackLevel * (equipmentAttackBonus + 64);
        let gearMultiplier = 1; //Todo slayer helm, salve

        if(this.gearSet[0].name === "Keris partisan of breaching" && this.targetMonster.attribute == "Kalphite") {
            gearMultiplier = 4 / 3;
        }

        attackRoll = Math.floor(attackRoll * gearMultiplier);

        let styleDefenceBonus = 0;
        if (attackStyle == AttackStyle.Stab) {
            styleDefenceBonus = this.targetMonster.stabDefence;
        } else if (attackStyle == AttackStyle.Slash) {
            styleDefenceBonus = this.targetMonster.slashDefence;
        } else if (attackStyle == AttackStyle.Crush) {
            styleDefenceBonus = this.targetMonster.crushDefence;
        }
        let defenceRoll = (this.targetMonster.defenceLevel + 9) * (styleDefenceBonus + 64);
        defenceRoll = defenceRoll + Math.floor(defenceRoll * Math.floor(invocationLevel / 5) * 2) / 100;


        if (attackRoll > defenceRoll) {
            this.hitChance = 1 - ((defenceRoll + 2) / (2 * (attackRoll + 1)));
        } else {
            this.hitChance = attackRoll / (2 * (defenceRoll + 1));
        }

        let damagePerHit = 0;
        if (this.gearSet[0].name === "Scythe of vitur") {
            //Do 3 hits
            let damagePerHit1 = (this.maxHit * this.hitChance) / 2; //1st is 100% damage
            let damagePerHit2 = (Math.floor(this.maxHit / 2) * this.hitChance) / 2; //2nd is 50% damage
            let damagePerHit3 = (Math.floor(this.maxHit / 4) * this.hitChance) / 2; //3rd is 25% damage
            damagePerHit = damagePerHit1 + damagePerHit2 + damagePerHit3;

            this.maxHit = Math.floor(this.maxHit * 1.75);
        } else if (this.gearSet[0].name === "Osmumten's fang") {

            // Original accuracy calculation before Jagex updated on October 31st, 2022
            // https://secure.runescape.com/m=news/a=97/tombs-of-amascut-drop-mechanics--osmumtens-fang?oldschool=1
            // reroll accuracy check
            // this.hitChance = this.hitChance + (this.hitChance * (1 - this.hitChance));

            // Two hitChances multiplied by each other. One is normal 1/2 ratio and second is 2/3 ratio
            // (x + 2) / ( 2 (y + 1)) * (2x + 3) / (3 * (y+1))
            if(attackRoll > defenceRoll) {
                this.hitChance = 1 - ((defenceRoll + 2) * (2 * defenceRoll + 3)) / (6 * Math.pow(attackRoll + 1, 2));
            } else {
                this.hitChance = (6 * Math.pow(attackRoll + 1, 2) - (attackRoll + 2) * (2 * attackRoll + 3)) / (6 * (defenceRoll + 1) * (attackRoll + 1));
            }

            //lower max hit without affecting dps
            damagePerHit = (this.maxHit * this.hitChance) / 2;
            this.maxHit = Math.floor(this.maxHit * 0.85);
        } else if(this.gearSet[0].name === "Keris partisan of breaching" && this.targetMonster.attribute == "Kalphite") {

            //Todo Is it 33% or 4/3?
            this.maxHit = Math.floor(this.maxHit * 133 / 100);
            damagePerHit = (this.maxHit * this.hitChance) / 2;

            let procMax = this.maxHit * 3;


            // 1/51 chance of dealing 3x damage
            let pseudoMaxHit = 50/51 * this.maxHit + (1/51 * this.maxHit * 3);
            damagePerHit = (pseudoMaxHit * this.hitChance) / 2;

            console.log("Expected keris partisan hit: " + damagePerHit);
        } else {
            damagePerHit = (this.maxHit * this.hitChance) / 2;
        }
        //console.log("Damage per hit: " + damagePerHit);
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

        let gearMultiplier = 1; //Todo: slayer helm, salve

        maxHit = Math.floor(maxHit * gearMultiplier);

        return maxHit;
    }

    private calculateDPSRanged(invocationLevel: number, attackStyle: AttackStyle, rangedLevel: number, rangedLevelBoost: number, prayerStrengthMultiplier: number, prayerAttackMultiplier: number) {
        let effectiveRangedStrength = Math.floor((rangedLevel + rangedLevelBoost) * prayerStrengthMultiplier);
        effectiveRangedStrength += 8;

        let equipmentRangedStrength = 0;
        this.gearSet.forEach(item => {
            equipmentRangedStrength += item.rangedStrength;
        })

        let gearMultiplier = 1; //Todo: slayer helm, salve
        let accuracyMultiplier = 1;
        if (this.gearSet[0].name === "Twisted bow") {
            let targetMagic = this.targetMonster.magicLevel;

            if (this.targetMonster.magicAccuracy > targetMagic) {
                targetMagic = this.targetMonster.magicAccuracy;
            }
            //console.log("Target magic: " + targetMagic);

            //accuracyMultiplier =  140 + (((10 * 3 * targetMagic)/10 - 10) / 100) - Math.pow(((3*targetMagic)/10 - 100), 2) / 100;
            //Todo Other calcs seems to round down here? Not sure if correct though
            accuracyMultiplier = 140 + Math.floor((3 * targetMagic - 10) / 100) - Math.floor(Math.pow(3 * targetMagic / 10 - 100, 2) / 100);
            if (accuracyMultiplier > 140) {
                accuracyMultiplier = 140;
            }


            accuracyMultiplier /= 100;

            //console.log("Twisted Bow Accuracy Multiplier: " + accuracyMultiplier);
            let damageMultiplier = 250 + (((10 * 3 * targetMagic) / 10 - 14) / 100) - Math.pow(((3 * targetMagic) / 10 - 140), 2) / 100;
            //Todo Other calcs seems to round down here? Not sure if correct though
            damageMultiplier = 250 + Math.floor((3 * targetMagic - 14) / 100) - Math.floor(Math.pow(3 * targetMagic / 10 - 140, 2) / 100)
            if (damageMultiplier > 250) {
                damageMultiplier = 250;
            }
            gearMultiplier = damageMultiplier / 100;
            //console.log("Twisted Bow Damage Multiplier: " + damageMultiplier);
        }

        this.maxHit = Math.floor(Math.floor(0.5 + (((effectiveRangedStrength) * (equipmentRangedStrength + 64)) / 640)) * gearMultiplier);

        let effectiveRangedAttack = Math.floor((rangedLevel + rangedLevelBoost) * prayerAttackMultiplier)
        effectiveRangedAttack += 8;

        let equipmentRangedAttack = 0;
        this.gearSet.forEach(item => {
            equipmentRangedAttack += item.ranged;
        })

        let attackRoll = Math.floor(Math.floor(effectiveRangedAttack * (equipmentRangedAttack + 64)) * accuracyMultiplier);

        let defenceRoll = (this.targetMonster.defenceLevel + 9) * (this.targetMonster.rangedDefence + 64);
        defenceRoll = defenceRoll + Math.floor(defenceRoll * Math.floor(invocationLevel / 5) * 2) / 100;

        if (attackRoll > defenceRoll) {
            this.hitChance = 1 - ((defenceRoll + 2) / (2 * (attackRoll + 1)));
        } else {
            this.hitChance = attackRoll / (2 * (defenceRoll + 1));
        }

        this.hitChance = this.hitChance;

        let damagePerHit = (this.maxHit * this.hitChance) / 2;

        let speedSeconds = this.gearSet[0].speedSeconds;
        if (attackStyle == AttackStyle.Rapid) {
            speedSeconds -= 0.6;
        }
        this.dps = damagePerHit / speedSeconds;
    }

    private calculateDPSMagic(invocationLevel: number, attackStyle: AttackStyle, magicLevel: number, magicLevelBoost: number, prayerAttackMultiplier: number) {
        let boostedMagicLevel = magicLevel + magicLevelBoost;

        //Calculate max hit
        //Todo Assuming powered staff right now, need to check

        let equipmentMagicStrength = 0;
        this.gearSet.forEach(item => {
            equipmentMagicStrength += item.mageStrength;
        });
        console.log("Magic strength: " + equipmentMagicStrength);

        if(this.gearSet[0].name == "Sanguinesti staff") {
            this.maxHit = Math.floor(boostedMagicLevel / 3) - 1;
            this.maxHit = Math.floor(this.maxHit * (1 + equipmentMagicStrength / 100));

            console.log("Sanguinesti Staff Max Hit: " + this.maxHit);
        } else if(this.gearSet[0].name == "Tumeken's shadow") {
            this.maxHit = Math.floor(boostedMagicLevel / 3) + 1;

            //Caps at 100% magic strength
            equipmentMagicStrength = Math.min(100, equipmentMagicStrength * 4); //inside toa
            //equipmentMagicStrength = Math.min(100, equipmentMagicStrength * 3); //Todo outside toa

            this.maxHit = Math.floor(this.maxHit * (1 + equipmentMagicStrength / 100));
        }

        let effectiveMagicLevel = Math.floor(boostedMagicLevel * prayerAttackMultiplier);

        if(attackStyle == AttackStyle.Magic) {
            //Todo this is "accurate" magic only
            //Why is this +2 when the wiki says +3?
            effectiveMagicLevel += 2;
        }

        effectiveMagicLevel += 9;

        let equipmentMagicAttack = 0;
        this.gearSet.forEach(item => {
            equipmentMagicAttack += item.magic;
        });
        if(this.gearSet[0].name == "Tumeken's shadow") {
            equipmentMagicAttack *= 4; //inside toa
            //equipmentMagicAttack *= 3; //Todo outside toa
        }

        let attackRoll = Math.floor(effectiveMagicLevel * (equipmentMagicAttack + 64));

        console.log("equipmentMagicAttack: " + equipmentMagicAttack);
        console.log("Magic attack roll: " + attackRoll);

        let defenceRoll = (9 + this.targetMonster.magicLevel) * (this.targetMonster.magicDefence + 64);
        defenceRoll = defenceRoll + Math.floor(defenceRoll * Math.floor(invocationLevel / 5) * 2) / 100;

        console.log("Magic defence roll: " + defenceRoll);

        if (attackRoll > defenceRoll) {
            this.hitChance = 1 - ((defenceRoll + 2) / (2 * (attackRoll + 1)));
        } else {
            this.hitChance = attackRoll / (2 * (defenceRoll + 1));
        }

        let damagePerHit = (this.maxHit * this.hitChance) / 2;
        this.dps = damagePerHit / this.gearSet[0].speedSeconds;

    }
}

