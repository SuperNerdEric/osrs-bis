import {TargetMonster} from "../DataObjects/TargetMonster";
import {StyleType, WeaponStyle} from "../DataObjects/Item";
import {Player} from "../DataObjects/Player";
import {GearSet} from "../DataObjects/GearSets";
import {ItemName} from "../DataObjects/ItemName";
import {
    DefaultStrategy,
    KerisPartisanStrategy,
    OsmumtensFangStrategy,
    ScytheOfViturStrategy
} from "./DamagePerHitStrategies";
import {DefaultHitChanceStrategy, OsmumtensFangHitChanceStrategy} from "./HitChanceStrategies";
import {KerisMultiplierStrategy,} from "./MultiplierStrategies/KerisMultiplierStrategy";
import {SlayerHelmetMultiplierStrategy} from "./MultiplierStrategies/SlayerHelmetMultiplierStrategy";
import {SalveAmuletMultiplierStrategy} from "./MultiplierStrategies/SalveAmuletMultiplierStrategy";
import {
    TwistedBowAccuracyMultiplierStrategy,
    TwistedBowStrengthMultiplierStrategy
} from "./MultiplierStrategies/TwistedBowMultiplierStrategy";
import {VoidKnightMultiplierStrategy} from "./MultiplierStrategies/VoidKnightMultiplierStrategy";
import {MultiplierType} from "./MultiplierStrategies/AbstractMultiplierStrategy";
import {SoulreaperMultiplierStrategy} from "./MultiplierStrategies/SoulreaperMultiplierStrategy";

export class Calculator {
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
        let effectiveLevel;

        if (attackStyle === StyleType.Stab || attackStyle === StyleType.Slash || attackStyle === StyleType.Crush) {
            const soulReaperMultiplier = new SoulreaperMultiplierStrategy(this).calculateMultiplier();

            effectiveLevel = Math.floor((this.player.strengthLevel + this.player.strengthLevelBoost) * (1.23 + soulReaperMultiplier)) + 8;
            if (this.gearSet.weaponStyle === WeaponStyle.Aggressive) {
                effectiveLevel += 3;
            }
        } else if (attackStyle === StyleType.Ranged) {
            effectiveLevel = Math.floor((this.player.rangedLevel + this.player.rangedLevelBoost) * 1.23) + 8;
        } else {
            effectiveLevel = Math.floor((this.player.magicLevel + this.player.magicLevelBoost) * 1.25) + 8;
        }

        //According to sources void boosts effective strength level, not our max hit
        const voidMultiplier = new VoidKnightMultiplierStrategy(this).calculateMultiplier(MultiplierType.Damage);
        effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);

        return effectiveLevel;
    }

    private calculateEffectiveAttackLevel(attackStyle: StyleType) {
        let effectiveLevel;

        //According to sources void boosts effective attack level, not our attack roll
        const voidMultiplier = new VoidKnightMultiplierStrategy(this).calculateMultiplier(MultiplierType.Accuracy);

        if (attackStyle === StyleType.Stab || attackStyle === StyleType.Slash || attackStyle === StyleType.Crush) {
            effectiveLevel = Math.floor((this.player.attackLevel + this.player.attackLevelBoost) * 1.2) + 8;
            effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);
        } else if (attackStyle === StyleType.Ranged) {
            effectiveLevel = Math.floor((this.player.rangedLevel + this.player.rangedLevelBoost) * 1.2) + 8;
            effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);
        } else {
            effectiveLevel = Math.floor((this.player.magicLevel + this.player.magicLevelBoost) * 1.25);
            effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);

            if (this.gearSet.weaponStyle === WeaponStyle.Accurate) {
                effectiveLevel += 2;
            }

            effectiveLevel += 9;
        }

        return effectiveLevel;
    }

    private getGearStrengthMultipliers(): number[] {
        const slayerMultiplier = new SlayerHelmetMultiplierStrategy(this).calculateMultiplier();
        const salveMultiplier = new SalveAmuletMultiplierStrategy(this).calculateMultiplier();

        const gearMultipliers = [
            Math.max(slayerMultiplier, salveMultiplier),
            new TwistedBowStrengthMultiplierStrategy(this).calculateMultiplier()
        ];

        return gearMultipliers;
    }

    private getGearAccuracyMultipliers(): number[] {
        const slayerMultiplier = new SlayerHelmetMultiplierStrategy(this).calculateMultiplier();
        const salveMultiplier = new SalveAmuletMultiplierStrategy(this).calculateMultiplier();

        const gearMultipliers = [
            Math.max(slayerMultiplier, salveMultiplier),
            new KerisMultiplierStrategy(this).calculateMultiplier(),
            new TwistedBowAccuracyMultiplierStrategy(this).calculateMultiplier()
        ];

        return gearMultipliers;
    }

    private calculateMaxHit(effectiveLevel: number, gearMultipliers: number[], attackStyle: StyleType): number {
        let maxHit: number;

        if ([StyleType.Stab, StyleType.Slash, StyleType.Crush, StyleType.Ranged].includes(attackStyle)) {
            maxHit = Math.floor(0.5 + (effectiveLevel * (this.gearSet.styleStrength + 64)) / 640);
        } else {
            maxHit = Math.floor((this.player.magicLevel + this.player.magicLevelBoost) / 3) - 1;

            if (this.gearSet.weapon.name == ItemName.TumekensShadow) {
                maxHit += 2;
            }
            maxHit = Math.floor(maxHit * (1 + this.gearSet.styleStrength / 100));
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
        if (attackStyle === StyleType.Magic) {
            baseDefence = 9 + this.targetMonster.magicLevel;
        } else {
            baseDefence = this.targetMonster.defenceLevel - this.defenceReduction + 9;
        }

        const styleDefenceBonus = this.targetMonster.defenceStats[attackStyle];
        let defenceRoll = baseDefence * (styleDefenceBonus + 64);
        const invocationScaledDefenceRoll = defenceRoll + Math.floor(defenceRoll * Math.floor(invocationLevel / 5) * 2) / 100;
        if (invocationLevel > 0) {
            defenceRoll = invocationScaledDefenceRoll;
        }
        return defenceRoll;
    }

    private calculateHitChance(attackRoll: number, defenceRoll: number) {
        let strategy;
        if (this.gearSet.weapon.name === ItemName.OsmumtensFang) {
            strategy = new OsmumtensFangHitChanceStrategy(this);
        } else {
            strategy = new DefaultHitChanceStrategy(this);
        }
        return strategy.calculate(attackRoll, defenceRoll);
    }

    private calculateDamagePerHit() {
        let strategy;
        if (this.gearSet.weapon.name === ItemName.ScytheOfVitur) {
            strategy = new ScytheOfViturStrategy(this);
        } else if (this.gearSet.weapon.name === ItemName.OsmumtensFang) {
            strategy = new OsmumtensFangStrategy(this);
        } else if (this.gearSet.weapon.name.includes("Keris partisan")) {
            strategy = new KerisPartisanStrategy(this);
        } else {
            strategy = new DefaultStrategy(this);
        }
        return strategy.calculate();
    }

    calculateAverageDamagePerHit(maxHit: number, hitChance: number) {
        return (maxHit * hitChance) / 2;
    }

    private calculateDps(weaponSpeed: number) {
        return this.averageDamagePerHit / weaponSpeed;
    }
}
