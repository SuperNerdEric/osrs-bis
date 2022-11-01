import {TargetMonster} from "./TargetMonster";
import {Item} from "./Item";
import {AttackStyle} from "./AttackStyle";
import {Raid} from "./Raid";
import {Player} from "./Player";

export class Result {
    dps: number = 0;
    maxHit: number = 0;
    hitChance: number = 0;
    gearSet: Item[] = [];
    player: Player = new Player();
    targetMonster: TargetMonster = new TargetMonster();
    /*
        A list of steps that were used to calculate the DPS
     */
    reasoning: string[] = [];

    private addReason(reason: string) {
        this.reasoning.push(reason + "\n");
    }

    calculateDPS(invocationLevel: number) {
        const attackStyle = this.gearSet[0].style;
        if (attackStyle == AttackStyle.Stab || attackStyle == AttackStyle.Slash || attackStyle == AttackStyle.Crush) {
            this.calculateDPSMelee(invocationLevel, attackStyle, this.player.strengthLevel, this.player.attackLevel, this.player.strengthLevelBoost, this.player.attackLevelBoost, 1.23, 1.2);
        } else if (attackStyle == AttackStyle.Rapid) {
            this.addReason("Using ranged dps");
            this.calculateDPSRanged(invocationLevel, attackStyle, this.player.rangedLevel, this.player.rangedLevelBoost, 1.23, 1.2);
        } else {
            this.addReason("Using magic dps");
            this.calculateDPSMagic(invocationLevel, attackStyle, this.player.magicLevel, this.player.magicLevelBoost, 1.25);
        }

    }

    private calculateDPSMelee(invocationLevel: number, attackStyle: AttackStyle, strengthLevel: number, attackLevel: number, strengthLevelBoost: number, attackLevelBoost: number, prayerStrengthMultiplier: number, prayerAttackMultiplier: number) {
        let effectiveStrengthLevel = Math.floor((strengthLevel + strengthLevelBoost) * prayerStrengthMultiplier);
        this.addReason("Effective strength level:");
        this.addReason(`• Math.floor(${strengthLevel}+${strengthLevelBoost}) * ${prayerStrengthMultiplier} = ${effectiveStrengthLevel}`);
        this.addReason("• Add 3 for aggressive attack style: " + effectiveStrengthLevel + " + 3 = " + Number(effectiveStrengthLevel+3));
        effectiveStrengthLevel += 3; //aggressive attack style
        this.addReason("• Add 8: " + effectiveStrengthLevel + " + 8 = " + Number(effectiveStrengthLevel+8));
        effectiveStrengthLevel += 8;

        this.addReason("");
        this.maxHit = this.calculateMaxHitMelee(effectiveStrengthLevel);

        let effectiveAttackLevel = Math.floor((attackLevel + attackLevelBoost) * prayerAttackMultiplier);
        this.addReason("");
        this.addReason("Effective attack level:");
        this.addReason(`• Math.floor(${attackLevel}+${attackLevelBoost}) * ${prayerAttackMultiplier} = ${effectiveAttackLevel}`);
        effectiveAttackLevel += 8;
        this.addReason("• Add 8: " + effectiveAttackLevel + " + 8 = " + Number(effectiveAttackLevel+8));

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

        this.addReason("");
        this.addReason("Equipment bonus for attack style " + attackStyle + ":");
        this.addReason("• " + equipmentAttackBonus);

        this.addReason("");
        this.addReason("Attack roll:");
        let attackRoll = effectiveAttackLevel * (equipmentAttackBonus + 64);
        this.addReason("• " + effectiveAttackLevel + " * (" + equipmentAttackBonus + " + 64) = " + attackRoll);
        let gearMultiplier = 1; //Todo slayer helm, salve
        this.addReason("");
        this.addReason("Gear multiplier:");

        if (this.gearSet[0].name === "Keris partisan of breaching" && this.targetMonster.attribute == "Kalphite") {
            this.addReason(" - Keris partisan of breaching");
            //Todo Is it 33% or 4/3?
            gearMultiplier = 1.33;
        }
        this.addReason("• " + gearMultiplier);

        this.addReason("");
        this.addReason("Attack roll:");
        attackRoll = Math.floor(attackRoll * gearMultiplier);
        this.addReason(`• Math.floor(${attackRoll} * ${gearMultiplier}) = ${attackRoll}`);

        let styleDefenceBonus = 0;
        if (attackStyle == AttackStyle.Stab) {
            styleDefenceBonus = this.targetMonster.stabDefence;
        } else if (attackStyle == AttackStyle.Slash) {
            styleDefenceBonus = this.targetMonster.slashDefence;
        } else if (attackStyle == AttackStyle.Crush) {
            styleDefenceBonus = this.targetMonster.crushDefence;
        }

        this.addReason("");
        this.addReason("Target defence for attack style " + attackStyle + ":");
        this.addReason("• " + styleDefenceBonus);

        this.addReason("");
        this.addReason("Target defence level: ");
        this.addReason("• " + this.targetMonster.defenceLevel);

        this.addReason("");
        this.addReason("Defence roll:");
        let defenceRoll = (this.targetMonster.defenceLevel + 9) * (styleDefenceBonus + 64);
        this.addReason(`• (${this.targetMonster.defenceLevel} + 9) * (${styleDefenceBonus} + 64) = ${defenceRoll}`);

        let invocationScaledDefenceRoll = defenceRoll + Math.floor(defenceRoll * Math.floor(invocationLevel / 5) * 2) / 100;
        if(invocationLevel > 0){
            this.addReason("");
            this.addReason("Invocation scaling:");
            this.addReason(`• ${defenceRoll} + Math.floor(${defenceRoll} * Math.floor(${invocationLevel} / 5) * 2) / 100 = ${invocationScaledDefenceRoll}`);
            defenceRoll = invocationScaledDefenceRoll;
        }

        this.addReason("");
        this.addReason("Hit chance:");
        if (attackRoll > defenceRoll) {
            this.hitChance = 1 - ((defenceRoll + 2) / (2 * (attackRoll + 1)));
            this.addReason(`• 1 - ((${defenceRoll} + 2) / (2 * (${attackRoll} + 1))) = ${this.hitChance}`);
        } else {
            this.hitChance = attackRoll / (2 * (defenceRoll + 1));
            this.addReason(`• ${attackRoll} / (2 * (${defenceRoll} + 1)) = ${this.hitChance}`);
        }

        let damagePerHit = 0;
        if (this.gearSet[0].name === "Scythe of vitur") {
            this.addReason("");
            this.addReason("Scythe of vitur:");

            //Do 3 hits
            let damagePerHit1 = (this.maxHit * this.hitChance) / 2; //1st is 100% damage
            let damagePerHit2 = (Math.floor(this.maxHit / 2) * this.hitChance) / 2; //2nd is 50% damage
            let damagePerHit3 = (Math.floor(this.maxHit / 4) * this.hitChance) / 2; //3rd is 25% damage
            this.addReason(`• (${this.maxHit} * ${this.hitChance}) / 2 = ${damagePerHit1}`);
            this.addReason(`• (Math.floor(${this.maxHit} / 2) * ${this.hitChance}) / 2 = ${damagePerHit2}`);
            this.addReason(`•  (Math.floor(${this.maxHit} / 4) * ${this.hitChance}) / 2 = ${damagePerHit3}`);

            damagePerHit = damagePerHit1 + damagePerHit2 + damagePerHit3;

            this.addReason("");
            this.addReason("Damage per hit:");
            this.addReason(`• ${damagePerHit1} + ${damagePerHit2} + ${damagePerHit3} = ${damagePerHit}`);

            this.addReason("");
            this.addReason("Scythe max hit:");
            this.addReason(`•  Math.floor(${this.maxHit}) + Math.floor(${this.maxHit} / 2) + Math.floor(${this.maxHit} / 4) = ${Math.floor(this.maxHit * 1.75)}`);
            this.maxHit = Math.floor(this.maxHit) + Math.floor(this.maxHit / 2) + Math.floor(this.maxHit / 4);

        } else if (this.gearSet[0].name === "Osmumten's fang") {
            this.addReason("");
            this.addReason("Osmumten's fang does 2 accuracy rolls which increases hit chance:");

            //https://archive.ph/km46w
            if (this.targetMonster.raid === Raid.TombsOfAmascut) {
                // Original accuracy calculation before Jagex updated on October 31st, 2022
                // https://secure.runescape.com/m=news/a=97/tombs-of-amascut-drop-mechanics--osmumtens-fang?oldschool=1
                this.addReason(`• Inside ToA both the attack roll and defence roll are rerolled`);
                this.addReason(`•  ${this.hitChance} + (${this.hitChance} * (1 - ${this.hitChance})) = ${this.hitChance + (this.hitChance * (1 - this.hitChance))}`);
                this.hitChance = this.hitChance + (this.hitChance * (1 - this.hitChance));

            } else {
                // Two hitChances multiplied by each other. One is normal 1/2 ratio and second is 2/3 ratio
                // (x + 2) / ( 2 (y + 1)) * (2x + 3) / (3 * (y+1))

                this.addReason(`• Outside ToA only the attack roll is rerolled`);
                if (attackRoll > defenceRoll) {
                    this.hitChance = 1 - ((defenceRoll + 2) * (2 * defenceRoll + 3)) / (6 * Math.pow(attackRoll + 1, 2));
                    this.addReason(`•  1 - ((${defenceRoll} + 2) * (2 * ${defenceRoll} + 3)) / (6 * Math.pow(${attackRoll} + 1, 2)) = ${this.hitChance}`);
                } else {
                    this.hitChance = (6 * Math.pow(attackRoll + 1, 2) - (attackRoll + 2) * (2 * attackRoll + 3)) / (6 * (defenceRoll + 1) * (attackRoll + 1));
                    this.addReason(`•  (6 * Math.pow(${attackRoll} + 1, 2) - (${attackRoll} + 2) * (2 * ${attackRoll} + 3)) / (6 * (${defenceRoll} + 1) * (${attackRoll} + 1)) = ${this.hitChance}`);
                }
            }

            //lower max hit without affecting dps
            damagePerHit = (this.maxHit * this.hitChance) / 2;

            this.addReason("");
            this.addReason("Damage per hit:");
            this.addReason(`• (${this.maxHit} * ${this.hitChance}) / 2 = ${damagePerHit}`);

            this.addReason("");
            this.addReason("Osmumten's fang max hit (does not affect DPS as min hit is also raised):");
            this.addReason(`• Math.floor(${this.maxHit} * 0.85) = ${Math.floor(this.maxHit * 0.85)}`);
            this.maxHit = Math.floor(this.maxHit * 0.85);
        } else if (this.gearSet[0].name === "Keris partisan of breaching" && this.targetMonster.attribute == "Kalphite") {

            //Todo Is it 33% or 4/3?
            this.maxHit = Math.floor(this.maxHit * 133 / 100);
            damagePerHit = (this.maxHit * this.hitChance) / 2;

            let procMax = this.maxHit * 3;


            // 1/51 chance of dealing 3x damage
            let pseudoMaxHit = 50 / 51 * this.maxHit + (1 / 51 * this.maxHit * 3);
            damagePerHit = (pseudoMaxHit * this.hitChance) / 2;

            console.log("Expected keris partisan hit: " + damagePerHit);
        } else {
            this.addReason("");
            this.addReason("Damage per hit:");
            damagePerHit = (this.maxHit * this.hitChance) / 2;
            this.addReason(`• (${this.maxHit} * ${this.hitChance}) / 2 = ${damagePerHit}`);
        }
        this.addReason("");
        this.addReason("DPS:");
        this.dps = damagePerHit / this.gearSet[0].speedSeconds;
        this.addReason(`• ${damagePerHit} / ${this.gearSet[0].speedSeconds} second swing timer = ${this.dps}`);

    }

    private calculateMaxHitMelee(effectiveStrengthLevel: number): number {
        let equipmentMeleeStrength = 0;

        this.gearSet.forEach(item => {
            equipmentMeleeStrength += item.strength;
        })

        this.addReason("Equipment melee strength:");
        this.addReason("• " + equipmentMeleeStrength);
        this.addReason("");

        this.addReason("Max hit:");
        let maxHit = effectiveStrengthLevel * (equipmentMeleeStrength + 64);
        this.addReason("• " + effectiveStrengthLevel + " * (" + equipmentMeleeStrength + "+" + "64) = " + maxHit);
        this.addReason("• " + maxHit + " + 320 = " + Number(maxHit + 320));
        maxHit += 320;
        this.addReason("• Math.floor(" + maxHit + "/640) = " + Math.floor(Number(maxHit / 640)));
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

            //The Magic level or accuracy caps at 250 outside the Chambers of Xeric, and 350 within.
            if (targetMagic > 350 && this.targetMonster.raid === Raid.ChambersOfXeric) {
                targetMagic = 350;
            } else if (targetMagic > 250) {
                targetMagic = 250;
            }


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

        if (this.gearSet[0].name == "Sanguinesti staff") {
            this.maxHit = Math.floor(boostedMagicLevel / 3) - 1;
            this.maxHit = Math.floor(this.maxHit * (1 + equipmentMagicStrength / 100));

            console.log("Sanguinesti Staff Max Hit: " + this.maxHit);
        } else if (this.gearSet[0].name == "Tumeken's shadow") {
            this.maxHit = Math.floor(boostedMagicLevel / 3) + 1;

            //Caps at 100% magic strength
            if (this.targetMonster.raid === Raid.TombsOfAmascut) {
                equipmentMagicStrength = Math.min(100, equipmentMagicStrength * 4); //inside toa
            } else {
                equipmentMagicStrength = Math.min(100, equipmentMagicStrength * 3);
            }

            this.maxHit = Math.floor(this.maxHit * (1 + equipmentMagicStrength / 100));
        }

        let effectiveMagicLevel = Math.floor(boostedMagicLevel * prayerAttackMultiplier);

        if (attackStyle == AttackStyle.Magic) {
            //Todo this is "accurate" magic only
            //Why is this +2 when the wiki says +3?
            effectiveMagicLevel += 2;
        }

        effectiveMagicLevel += 9;

        let equipmentMagicAttack = 0;
        this.gearSet.forEach(item => {
            equipmentMagicAttack += item.magic;
        });
        if (this.gearSet[0].name == "Tumeken's shadow") {
            if (this.targetMonster.raid === Raid.TombsOfAmascut) {
                equipmentMagicAttack *= 4; //inside toa
            } else {
                equipmentMagicAttack *= 3;
            }
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

