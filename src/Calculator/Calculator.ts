import {TargetMonster} from "../DataObjects/TargetMonster";
import {Slot, StyleType, WeaponStyle} from "../DataObjects/Item";
import {Player} from "../DataObjects/Player";
import {GearSet} from "../DataObjects/GearSets";
import {ItemName} from "../DataObjects/ItemName";
import {
    BoltEnchantedStrategy,
    DamagePerHitStrategy,
    DefaultStrategy,
    KerisPartisanStrategy,
    OsmumtensFangStrategy,
    ScytheOfViturStrategy
} from "./DamagePerHitStrategies";
import {
    DefaultHitChanceStrategy,
    DiamondBoltHitChanceStrategy,
    OsmumtensFangHitChanceStrategy
} from "./HitChanceStrategies";
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
import {ArclightMultiplierStrategy} from "./MultiplierStrategies/ArclightMultiplierStrategy";
import {DragonHunterLanceMultiplierStrategy} from "./MultiplierStrategies/DragonHunterLanceMultiplierStrategy";
import {InquisitorsMultiplierStrategy} from "./MultiplierStrategies/InquisitorsMultiplierStrategy";
import {CorporealBeastMultiplierStrategy} from "./MultiplierStrategies/CorporealBeastMultiplierStrategy";
import {DragonHunterCrossbowMultiplierStrategy} from "./MultiplierStrategies/DragonHunterCrossbowMultiplierStrategy";

export class Calculator {
    dps: number = 0;
    maxHit: number = 0;
    averageDamagePerHit: number = 0;
    baseHitChance: number = 0;
    hitChance: number = 0;
    defenceReduction: number = 0;
    gearSet: GearSet;
    player: Player = new Player();
    targetMonster: TargetMonster = new TargetMonster();

    constructor(gearSet: GearSet) {
        this.gearSet = gearSet;
    }

    calculateDPS(invocationLevel: number = 0) {
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

        const prayerBoostMelee = this.player.prayers.piety ? 1.23 : 1;
        const prayerBoostRanged = this.player.prayers.rigour ? 1.23 : 1;
        const prayerBoostMage = this.player.prayers.augury ? 1.25 : 1;

        if (attackStyle === StyleType.Stab || attackStyle === StyleType.Slash || attackStyle === StyleType.Crush) {
            const soulReaperMultiplier = new SoulreaperMultiplierStrategy(this).calculateMultiplier();

            effectiveLevel = Math.floor((this.player.skills.strength.level + this.player.skills.strength.boost) * (prayerBoostMelee + soulReaperMultiplier)) + 8;
            if (this.gearSet.weaponStyle === WeaponStyle.Aggressive) {
                effectiveLevel += 3;
            } else if (this.gearSet.weaponStyle === WeaponStyle.Controlled) {
                effectiveLevel += 1;
            }
        } else if (attackStyle === StyleType.Ranged) {
            effectiveLevel = Math.floor((this.player.skills.ranged.level + this.player.skills.ranged.boost) * prayerBoostRanged) + 8;
            if (this.gearSet.weaponStyle === WeaponStyle.Accurate) {
                effectiveLevel += 3;
            }
        } else {
            effectiveLevel = Math.floor((this.player.skills.magic.level + this.player.skills.magic.boost) * prayerBoostMage) + 8;
        }


        //According to sources void boosts effective strength level, not our max hit
        const voidMultiplier = new VoidKnightMultiplierStrategy(this).calculateMultiplier(MultiplierType.Damage);
        effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);

        return effectiveLevel;
    }

    private calculateEffectiveAttackLevel(attackStyle: StyleType) {
        let effectiveLevel;

        const prayerBoostMelee = this.player.prayers.piety ? 1.2 : 1;
        const prayerBoostRanged = this.player.prayers.rigour ? 1.2 : 1;
        const prayerBoostMage = this.player.prayers.augury ? 1.25 : 1;

        // According to sources void boosts effective attack level, not our attack roll
        const voidMultiplier = new VoidKnightMultiplierStrategy(this).calculateMultiplier(MultiplierType.Accuracy);

        if (attackStyle === StyleType.Stab || attackStyle === StyleType.Slash || attackStyle === StyleType.Crush) {
            effectiveLevel = Math.floor((this.player.skills.attack.level + this.player.skills.attack.boost) * prayerBoostMelee);
            if (this.gearSet.weaponStyle === WeaponStyle.Accurate) {
                effectiveLevel += 3;
            } else if (this.gearSet.weaponStyle === WeaponStyle.Controlled) {
                effectiveLevel += 1;
            }
            effectiveLevel += 8;
            effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);
        } else if (attackStyle === StyleType.Ranged) {
            effectiveLevel = Math.floor((this.player.skills.ranged.level + this.player.skills.ranged.boost) * prayerBoostRanged) + 8;
            if (this.gearSet.weaponStyle === WeaponStyle.Accurate) {
                effectiveLevel += 3;
            }
            effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);
        } else {
            effectiveLevel = Math.floor((this.player.skills.magic.level + this.player.skills.magic.boost) * prayerBoostMage);
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
        const arcLightMultiplier = new ArclightMultiplierStrategy(this).calculateMultiplier();
        const dragonHunterLanceMultiplier = new DragonHunterLanceMultiplierStrategy(this).calculateMultiplier();
        const dragonHunterCrossbowMultiplier = new DragonHunterCrossbowMultiplierStrategy(this).calculateMultiplier(MultiplierType.Damage);
        const inquisitorsMultiplier = new InquisitorsMultiplierStrategy(this).calculateMultiplier();
        const corporealBeastMultiplier = new CorporealBeastMultiplierStrategy(this).calculateMultiplier();

        const gearMultipliers = [
            Math.max(slayerMultiplier, salveMultiplier),
            new TwistedBowStrengthMultiplierStrategy(this).calculateMultiplier(),
            arcLightMultiplier,
            dragonHunterLanceMultiplier,
            dragonHunterCrossbowMultiplier,
            inquisitorsMultiplier,
            corporealBeastMultiplier,
        ];

        return gearMultipliers;
    }

    private getGearAccuracyMultipliers(): number[] {
        const slayerMultiplier = new SlayerHelmetMultiplierStrategy(this).calculateMultiplier();
        const salveMultiplier = new SalveAmuletMultiplierStrategy(this).calculateMultiplier();
        const arcLightMultiplier = new ArclightMultiplierStrategy(this).calculateMultiplier();
        const dragonHunterLanceMultiplier = new DragonHunterLanceMultiplierStrategy(this).calculateMultiplier();
        const dragonHunterCrossbowMultiplier = new DragonHunterCrossbowMultiplierStrategy(this).calculateMultiplier(MultiplierType.Accuracy);
        const inquisitorsMultiplier = new InquisitorsMultiplierStrategy(this).calculateMultiplier();

        const gearMultipliers = [
            Math.max(slayerMultiplier, salveMultiplier),
            new KerisMultiplierStrategy(this).calculateMultiplier(),
            new TwistedBowAccuracyMultiplierStrategy(this).calculateMultiplier(),
            arcLightMultiplier,
            dragonHunterLanceMultiplier,
            dragonHunterCrossbowMultiplier,
            inquisitorsMultiplier,
        ];

        return gearMultipliers;
    }

    private calculateMaxHit(effectiveLevel: number, gearMultipliers: number[], attackStyle: StyleType): number {
        let maxHit: number;

        if ([StyleType.Stab, StyleType.Slash, StyleType.Crush, StyleType.Ranged].includes(attackStyle)) {
            maxHit = Math.floor(0.5 + (effectiveLevel * (this.gearSet.styleStrength + 64)) / 640);
        } else {
            maxHit = Math.floor((this.player.skills.magic.level + this.player.skills.magic.boost) / 3) - 1;

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
            if (this.targetMonster.name === "Verzik Vitur P2" || this.targetMonster.name === "Verzik Vitur P3") {
                baseDefence = 9 + this.targetMonster.defenceLevel;
            } else {
                baseDefence = 9 + this.targetMonster.magicLevel;
            }
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
        const bolt = this.gearSet.items.find(item => item.slot === Slot.Ammo && item.name.includes('bolt'));
        if (this.gearSet.weapon.name === ItemName.OsmumtensFang) {
            strategy = new OsmumtensFangHitChanceStrategy(this);
        } else if (bolt) {
            strategy = new DiamondBoltHitChanceStrategy(this);
        } else {
            strategy = new DefaultHitChanceStrategy(this);
        }
        return strategy.calculate(attackRoll, defenceRoll);
    }

    private calculateDamagePerHit() {
        let strategy: DamagePerHitStrategy;
        const bolt = this.gearSet.items.find(item => item.slot === Slot.Ammo && item.name.includes('bolt'));
        if (this.gearSet.weapon.name === ItemName.ScytheOfVitur) {
            strategy = new ScytheOfViturStrategy(this);
        } else if (this.gearSet.weapon.name === ItemName.OsmumtensFang) {
            strategy = new OsmumtensFangStrategy(this);
        } else if (this.gearSet.weapon.name.includes("Keris partisan")) {
            strategy = new KerisPartisanStrategy(this);
        } else if (bolt) {
            strategy = new BoltEnchantedStrategy(this);
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
