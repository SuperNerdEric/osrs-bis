import {TargetMonster} from "./TargetMonster";
import {StyleType, WeaponStyle} from "./Item";
import {Raid} from "./Raid";
import {Player} from "./Player";
import {devLog} from './../utils';
import {GearSet} from "./GearSets";
import {ItemName} from "./ItemName";

export class Result {
    dps: number = 0;
    maxHit: number = 0;
    averageDamagePerHit: number = 0;
    hitChance: number = 0;
    defenceReduction: number = 0;
    onTask: boolean = false;
    gearSet: GearSet;
    player: Player = new Player();
    targetMonster: TargetMonster = new TargetMonster();

    constructor(gearSet: GearSet) {
        this.gearSet = gearSet;
    }

    calculateDPS(invocationLevel: number) {
        const attackStyle = this.gearSet.styleType;

        const effectiveStrengthLevel = this.calculateEffectiveStrengthLevel(this.gearSet.styleType);
        const effectiveAttackLevel = this.calculateEffectiveAttackLevel(this.gearSet.styleType);

        const gearStrengthMultipliers = this.getGearStrengthMultipliers();
        this.maxHit = this.calculateMaxHit(effectiveStrengthLevel, gearStrengthMultipliers, this.gearSet.styleType);

        const gearAccuracyMultipliers = this.getGearAccuracyMultipliers();
        const attackRoll = this.calculateAttackRoll(effectiveAttackLevel, gearAccuracyMultipliers);
        const defenceRoll = this.calculateDefenceRoll(invocationLevel, attackStyle);

        this.hitChance = this.calculateHitChance(attackRoll, defenceRoll);
        this.averageDamagePerHit = this.calculateDamagePerHit();

        let weaponSpeed = this.gearSet.weapon.speedSeconds;
        if (this.gearSet.weaponStyle === WeaponStyle.Rapid) {
            weaponSpeed -= 0.6;
        }
        this.dps = this.calculateDps(weaponSpeed);

    }

    private calculateEffectiveStrengthLevel(attackStyle: StyleType) {
        let effectiveLevel = 0;

        switch (attackStyle) {
            case StyleType.Stab:
            case StyleType.Slash:
            case StyleType.Crush:
                effectiveLevel = Math.floor((this.player.strengthLevel + this.player.strengthLevelBoost) * 1.23) + 8;
                if (this.gearSet.weaponStyle == WeaponStyle.Aggressive) {
                    effectiveLevel += 3;
                }
                break;
            case StyleType.Ranged:
                effectiveLevel = Math.floor((this.player.rangedLevel + this.player.rangedLevelBoost) * 1.23) + 8;
                break;
            case StyleType.Magic:
                effectiveLevel = Math.floor((this.player.magicLevel + this.player.magicLevelBoost) * 1.25) + 8;
                break;
            default:
                throw new Error(`Unsupported attack style: ${attackStyle}`);
        }

        return effectiveLevel;
    }

    private calculateEffectiveAttackLevel(attackStyle: StyleType) {
        let effectiveLevel = 0;

        switch (attackStyle) {
            case StyleType.Stab:
            case StyleType.Slash:
            case StyleType.Crush:
                effectiveLevel = Math.floor((this.player.attackLevel + this.player.attackLevelBoost) * 1.2) + 8;
                break;
            case StyleType.Ranged:
                effectiveLevel = Math.floor((this.player.rangedLevel + this.player.rangedLevelBoost) * 1.2) + 8;
                break;
            case StyleType.Magic:
                effectiveLevel = Math.floor((this.player.magicLevel + this.player.magicLevelBoost) * 1.25) + 9;
                if (this.gearSet.weaponStyle == WeaponStyle.Accurate) {
                    effectiveLevel += 2;
                }
                break;
            default:
                throw new Error(`Unsupported attack style: ${attackStyle}`);
        }

        return effectiveLevel;
    }

    private getGearStrengthMultipliers(): number[] {
        const gearMultipliers: number[] = [1];
        if (this.gearSet.styleType == StyleType.Stab || this.gearSet.styleType == StyleType.Slash || this.gearSet.styleType == StyleType.Crush) {
            const slayerHelmetPresent = this.gearSet.items.some(item => item.name === ItemName.SlayerHelmetI);
            const salveAmuletPresent = this.gearSet.items.some(item => [ItemName.SalveAmulet, ItemName.SalveAmuletI].includes(item.name));
            const salveAmuletEPresent = this.gearSet.items.some(item => [ItemName.SalveAmuletE, ItemName.SalveAmuletEI].includes(item.name));

            if ((slayerHelmetPresent && this.onTask) || (salveAmuletPresent && this.targetMonster.isUndead)) {
                gearMultipliers[0] = 7 / 6;
            }

            if (salveAmuletEPresent && this.targetMonster.isUndead) {
                gearMultipliers[0] = 1.20;
            }
        } else if (this.gearSet.styleType == StyleType.Ranged) {
            const slayerHelmetPresent = this.gearSet.items.some(item => item.name === ItemName.SlayerHelmetI);
            if (slayerHelmetPresent && this.onTask) {
                gearMultipliers[0] = 1.15;
            }
            if (this.gearSet.weapon.name === ItemName.TwistedBow) {
                let targetMagic = Math.max(this.targetMonster.magicLevel, this.targetMonster.magicAccuracy);

                //The Magic level or accuracy caps at 250 outside the Chambers of Xeric, and 350 within.
                if (targetMagic > 350 && this.targetMonster.raid === Raid.ChambersOfXeric) {
                    targetMagic = 350;
                } else if (targetMagic > 250) {
                    targetMagic = 250;
                }
                let damageMultiplier = 250 + Math.floor((3 * targetMagic - 14) / 100) - Math.floor(Math.pow(3 * targetMagic / 10 - 140, 2) / 100)
                if (damageMultiplier > 250) {
                    damageMultiplier = 250;
                }
                const tbowModifier = damageMultiplier / 100;
                gearMultipliers.push(tbowModifier);
            }
        } else if (this.gearSet.styleType == StyleType.Magic) {
            const slayerHelmetPresent = this.gearSet.items.some(item => item.name === ItemName.SlayerHelmetI);
            if (slayerHelmetPresent && this.onTask) {
                gearMultipliers[0] = 1.15;
            }
        }


        return gearMultipliers;
    }

    private getGearAccuracyMultipliers(): number[] {
        const gearMultipliers: number[] = [1];
        if (this.gearSet.styleType == StyleType.Stab || this.gearSet.styleType == StyleType.Slash || this.gearSet.styleType == StyleType.Crush) {
            const slayerHelmetPresent = this.gearSet.items.some(item => item.name === ItemName.SlayerHelmetI);
            const salveAmuletPresent = this.gearSet.items.some(item => [ItemName.SalveAmulet, ItemName.SalveAmuletI].includes(item.name));
            const salveAmuletEPresent = this.gearSet.items.some(item => [ItemName.SalveAmuletE, ItemName.SalveAmuletEI].includes(item.name));

            if ((slayerHelmetPresent && this.onTask) || (salveAmuletPresent && this.targetMonster.isUndead)) {
                gearMultipliers[0] = 7 / 6;
            }

            if (salveAmuletEPresent && this.targetMonster.isUndead) {
                gearMultipliers[0] = 1.20;
            }

            if (this.gearSet.weapon.name === ItemName.KerisPartisanOfBreaching && this.targetMonster.isKalphite) {
                //Only breaching partisan gets accuracy bonus
                //https://archive.ph/6gN9c assuming accuracy is same as damage
                const kerisAccuracyMultiplier = 1.33;
                gearMultipliers.push(kerisAccuracyMultiplier);
            }
        } else if (this.gearSet.styleType == StyleType.Ranged) {
            const slayerHelmetPresent = this.gearSet.items.some(item => item.name === ItemName.SlayerHelmetI);
            if (slayerHelmetPresent && this.onTask) {
                gearMultipliers[0] = 1.15;
            }
            if (this.gearSet.weapon.name === ItemName.TwistedBow) {
                let targetMagic = Math.max(this.targetMonster.magicLevel, this.targetMonster.magicAccuracy);

                //The Magic level or accuracy caps at 250 outside the Chambers of Xeric, and 350 within.
                if (targetMagic > 350 && this.targetMonster.raid === Raid.ChambersOfXeric) {
                    targetMagic = 350;
                } else if (targetMagic > 250) {
                    targetMagic = 250;
                }

                let tbowAccuracyGearModifier = 140 + Math.floor((3 * targetMagic - 10) / 100) - Math.floor(Math.pow(3 * targetMagic / 10 - 100, 2) / 100);
                if (tbowAccuracyGearModifier > 140) {
                    tbowAccuracyGearModifier = 140;
                }

                tbowAccuracyGearModifier /= 100;
                gearMultipliers.push(tbowAccuracyGearModifier);
            }
        } else if (this.gearSet.styleType == StyleType.Magic) {
            const slayerHelmetPresent = this.gearSet.items.some(item => item.name === ItemName.SlayerHelmetI);
            if (slayerHelmetPresent && this.onTask) {
                gearMultipliers[0] = 1.15;
            }
        }


        return gearMultipliers;
    }

    private calculateMaxHit(effectiveLevel: number, gearMultipliers: number[], attackStyle: StyleType) {
        let maxHit: number;

        switch (attackStyle) {
            case StyleType.Stab:
            case StyleType.Slash:
            case StyleType.Crush:
                maxHit = Math.floor(0.5 + (effectiveLevel * (this.gearSet.styleStrength + 64)) / 640);
                break;
            case StyleType.Ranged:
                maxHit = Math.floor(0.5 + (effectiveLevel * (this.gearSet.styleStrength + 64)) / 640);
                break;
            case StyleType.Magic:
                //Todo make this effective level
                maxHit = Math.floor((this.player.magicLevel + this.player.magicLevelBoost) / 3) - 1;

                if (this.gearSet.weapon.name == ItemName.TumekensShadow) {
                    maxHit = Math.floor((this.player.magicLevel + this.player.magicLevelBoost) / 3) + 1;
                }
                maxHit = Math.floor(maxHit * (1 + this.gearSet.styleStrength / 100));
                break;
            default:
                throw new Error(`Unsupported attack style: ${attackStyle}`);
        }

        for (const gearMultiplier of gearMultipliers) {
            maxHit = Math.floor(maxHit * gearMultiplier);
        }

        return maxHit;
    }

    private calculateAttackRoll(effectiveAttackLevel: number, gearAccuracyMultipliers: number[]) {
        let attackRoll = effectiveAttackLevel * (this.gearSet.styleTypeBonus + 64);

        for (const gearMultiplier of gearAccuracyMultipliers) {
            attackRoll = Math.floor(attackRoll * gearMultiplier);
        }

        return attackRoll;
    }

    private calculateDefenceRoll(invocationLevel: number, attackStyle: StyleType): number {
        let baseDefence: number;
        switch (attackStyle) {
            case StyleType.Magic:
                baseDefence = 9 + this.targetMonster.magicLevel;
                break;
            default:
                baseDefence = this.targetMonster.defenceLevel - this.defenceReduction + 9;
                break;
        }

        const styleDefenceBonus = this.getStyleDefenceBonus(attackStyle);
        let defenceRoll = baseDefence * (styleDefenceBonus + 64);
        const invocationScaledDefenceRoll = defenceRoll + Math.floor(defenceRoll * Math.floor(invocationLevel / 5) * 2) / 100;
        if (invocationLevel > 0) {
            defenceRoll = invocationScaledDefenceRoll;
        }
        return defenceRoll;
    }

    private getStyleDefenceBonus(attackStyle: StyleType): number {
        switch (attackStyle) {
            case StyleType.Stab:
                return this.targetMonster.stabDefence;
            case StyleType.Slash:
                return this.targetMonster.slashDefence;
            case StyleType.Crush:
                return this.targetMonster.crushDefence;
            case StyleType.Magic:
                return this.targetMonster.magicDefence;
            case StyleType.Ranged:
                return this.targetMonster.rangedDefence;
            default:
                throw new Error(`Unsupported attack style: ${attackStyle}`);
        }
    }

    private calculateHitChance(attackRoll: number, defenceRoll: number) {

        let hitChance;
        if (attackRoll > defenceRoll) {
            hitChance = 1 - ((defenceRoll + 2) / (2 * (attackRoll + 1)));
        } else {
            hitChance = attackRoll / (2 * (defenceRoll + 1));
        }

        if (this.gearSet.weapon.name === ItemName.OsmumtensFang) {
            //https://archive.ph/km46w
            if (this.targetMonster.raid === Raid.TombsOfAmascut) {
                // Original accuracy calculation before Jagex updated on October 31st, 2022
                // https://secure.runescape.com/m=news/a=97/tombs-of-amascut-drop-mechanics--osmumtens-fang?oldschool=1
                hitChance = hitChance + (hitChance * (1 - hitChance));

            } else {
                // Two hitChances multiplied by each other. One is normal 1/2 ratio and second is 2/3 ratio
                // (x + 2) / ( 2 (y + 1)) * (2x + 3) / (3 * (y+1))

                //Outside ToA only the attack roll is rerolled
                if (attackRoll > defenceRoll) {
                    hitChance = 1 - ((defenceRoll + 2) * (2 * defenceRoll + 3)) / (6 * Math.pow(attackRoll + 1, 2));
                } else {
                    hitChance = (6 * Math.pow(attackRoll + 1, 2) - (attackRoll + 2) * (2 * attackRoll + 3)) / (6 * (defenceRoll + 1) * (attackRoll + 1));
                }
            }
        }
        return hitChance;
    }

    private calculateDamagePerHit() {
        let averageDamagePerHit;
        if (this.gearSet.weapon.name === ItemName.ScytheOfVitur) {

            //Do 3 hits
            const damagePerHit1 = (this.maxHit * this.hitChance) / 2; //1st is 100% damage
            const damagePerHit2 = (Math.floor(this.maxHit / 2) * this.hitChance) / 2; //2nd is 50% damage
            const damagePerHit3 = (Math.floor(this.maxHit / 4) * this.hitChance) / 2; //3rd is 25% damage

            averageDamagePerHit = damagePerHit1 + damagePerHit2 + damagePerHit3;

            this.maxHit = Math.floor(this.maxHit) + Math.floor(this.maxHit / 2) + Math.floor(this.maxHit / 4);
        } else if (this.gearSet.weapon.name === ItemName.OsmumtensFang) {
            //lower max hit without affecting dps
            averageDamagePerHit = this.calculateAverageDamagePerHit(this.maxHit, this.hitChance);

            const minHit = Math.floor(this.maxHit * 0.15);

            this.maxHit = this.maxHit - minHit;
        } else if (this.gearSet.weapon.name.includes("Keris partisan") && this.targetMonster.isKalphite) {

            //https://archive.ph/6gN9c
            const baseMaxHit = Math.floor(this.maxHit * 133 / 100);

            this.maxHit = baseMaxHit * 3;

            // 1/51 chance of dealing 3x damage
            // Which means our max hit isn't always the same, so we use an average
            const averageMaxHit = 50 / 51 * baseMaxHit + (1 / 51 * this.maxHit);
            averageDamagePerHit = this.calculateAverageDamagePerHit(averageMaxHit, this.hitChance);

            devLog("Expected keris partisan hit: " + this.averageDamagePerHit);
        } else {
            averageDamagePerHit = this.calculateAverageDamagePerHit(this.maxHit, this.hitChance);
        }
        return averageDamagePerHit;
    }

    private calculateAverageDamagePerHit(maxHit: number, hitChance: number) {
        return (maxHit * hitChance) / 2;
    }

    private calculateDps(weaponSpeed: number) {
        return this.averageDamagePerHit / weaponSpeed;
    }
}

