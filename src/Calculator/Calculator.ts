import { TargetMonster } from "./DataObjects/TargetMonster";
import { CombatClass, rangedAttackType, RangedAttackType, StyleType, WeaponStyle } from "./DataObjects/Item";
import { Player } from "./DataObjects/Player";
import { GearSet } from "./DataObjects/GearSets";
import { MultiplierType } from "./Modifiers/Multiplicative/MultiplierType";
import { v4 as uuidv4 } from "uuid";
import { DamageProbability } from "./DamageDistributionStrategies/DamageProbability";
import { elementalWeaknessMaxHitBonus, getMagicMaxHit } from "./MagicMaxHit";
import { soulreaperMultiplier, voidKnightMultiplier } from "./Modifiers/Multiplicative";
import { defenceBasedMagicDefMonsters } from "./DefenceBasedMagicDefMonsters";
import { buildContext, evaluateGear, gearRequestFromSet } from "./WikiDps";

export class Calculator {
    dps: number = 0;
    baseMaxHit: number = 0;
    maxHit: number = 0;
    procRate: number = 0;
    attackRoll: number = 0;
    defenceRoll: number = 0;
    damageDistribution: DamageProbability[] = [];
    averageDamagePerHit: number = 0;
    hitChance: number = 0;
    attackInterval: number = 0;
    gearSet: GearSet;
    player: Player = new Player();
    targetMonster: TargetMonster = new TargetMonster();
    id: string;

    constructor(gearSet: GearSet, id?: string) {
        this.gearSet = gearSet;
        this.id = id || uuidv4();
    }

    calculateDPS(invocationLevel: number = 0) {
        const result = evaluateGear(
            buildContext(this.targetMonster, this.player, invocationLevel),
            gearRequestFromSet(this.gearSet),
        );
        this.dps = result.dps;
        this.maxHit = result.maxHit;
        this.hitChance = result.hitChance;
        this.attackRoll = result.attackRoll;
        this.defenceRoll = result.defenceRoll;
        this.averageDamagePerHit = result.averageDamage;
        this.attackInterval = result.attackInterval;
    }

    private calculateEffectiveStrengthLevel(combatClass: CombatClass) {
        let effectiveLevel;

        const prayerModifiers = this.player.getPrayerModifiers();

        if (combatClass === CombatClass.Melee) {
            const soulReaperMultiplier = soulreaperMultiplier(this);

            effectiveLevel =
                Math.floor(
                    (this.player.skills.strength.level + this.player.skills.strength.boost) *
                        (prayerModifiers.strength + soulReaperMultiplier),
                ) + 8;
            if (this.gearSet.weaponStyle === WeaponStyle.Aggressive) {
                effectiveLevel += 3;
            } else if (this.gearSet.weaponStyle === WeaponStyle.Controlled) {
                effectiveLevel += 1;
            }
        } else if (combatClass === CombatClass.Ranged) {
            effectiveLevel =
                Math.floor(
                    (this.player.skills.ranged.level + this.player.skills.ranged.boost) *
                        prayerModifiers.rangedStrength,
                ) + 8;
            if (this.gearSet.weaponStyle === WeaponStyle.Accurate) {
                effectiveLevel += 3;
            }
        } else {
            effectiveLevel =
                Math.floor((this.player.skills.magic.level + this.player.skills.magic.boost) * prayerModifiers.magic) +
                8;
        }

        //According to sources void boosts effective strength level, not our max hit
        const voidMultiplier = voidKnightMultiplier(this, MultiplierType.Damage);
        effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);

        return effectiveLevel;
    }

    private calculateEffectiveAttackLevel(combatClass: CombatClass) {
        let effectiveLevel;

        const prayerModifiers = this.player.getPrayerModifiers();

        // According to sources void boosts effective attack level, not our attack roll
        const voidMultiplier = voidKnightMultiplier(this, MultiplierType.Accuracy);

        if (combatClass === CombatClass.Melee) {
            effectiveLevel = Math.floor(
                (this.player.skills.attack.level + this.player.skills.attack.boost) * prayerModifiers.attack,
            );
            if (this.gearSet.weaponStyle === WeaponStyle.Accurate) {
                effectiveLevel += 3;
            } else if (this.gearSet.weaponStyle === WeaponStyle.Controlled) {
                effectiveLevel += 1;
            }
            effectiveLevel += 8;
            effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);
        } else if (combatClass === CombatClass.Ranged) {
            effectiveLevel =
                Math.floor(
                    (this.player.skills.ranged.level + this.player.skills.ranged.boost) *
                        prayerModifiers.rangedAccuracy,
                ) + 8;
            if (this.gearSet.weaponStyle === WeaponStyle.Accurate) {
                effectiveLevel += 3;
            }
            effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);
        } else {
            effectiveLevel = Math.floor(
                (this.player.skills.magic.level + this.player.skills.magic.boost) * prayerModifiers.magic,
            );
            effectiveLevel = Math.floor(effectiveLevel * voidMultiplier);
            if (this.gearSet.weaponStyle === WeaponStyle.Accurate && !this.gearSet.spell) {
                effectiveLevel += 2;
            }
            effectiveLevel += 9;
        }

        return effectiveLevel;
    }

    private calculateMaxHit(effectiveLevel: number, gearDamageMultipliers: number[], combatClass: CombatClass): number {
        let maxHit: number;

        if ([CombatClass.Melee, CombatClass.Ranged].includes(combatClass)) {
            maxHit = Math.floor(0.5 + (effectiveLevel * (this.gearSet.styleStrength + 64)) / 640);
        } else {
            maxHit = getMagicMaxHit(this);
        }

        for (const gearMultiplier of gearDamageMultipliers) {
            maxHit = Math.floor(maxHit * gearMultiplier);
        }

        if (combatClass === CombatClass.Magic) {
            maxHit += elementalWeaknessMaxHitBonus(this);
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
        let baseDefence = 9;

        if (attackStyle !== StyleType.Magic || defenceBasedMagicDefMonsters.includes(this.targetMonster.title)) {
            baseDefence += this.targetMonster.currentDefenceLevel;
        } else {
            baseDefence += this.targetMonster.magicLevel;
        }

        const defenceBonus = this.defenceBonus(attackStyle);
        let defenceRoll = baseDefence * (defenceBonus + 64);

        if (invocationLevel > 0) {
            // For every 5 raid levels, it increases by 2%
            const multiplier = 1 + (invocationLevel / 5) * 0.02;
            defenceRoll = Math.floor(defenceRoll * multiplier);
        }
        return defenceRoll;
    }

    private defenceBonus(attackStyle: StyleType): number {
        const stats = this.targetMonster.defenceStats;
        if (attackStyle === StyleType.Ranged) {
            const type = rangedAttackType(this.gearSet.getWeapon());
            if (type === RangedAttackType.Light && stats.Light != null) {
                return stats.Light;
            }
            if (type === RangedAttackType.Standard && stats.Standard != null) {
                return stats.Standard;
            }
            if (type === RangedAttackType.Heavy && stats.Heavy != null) {
                return stats.Heavy;
            }
        }
        return stats[attackStyle];
    }

    private calculateDps(averageDamagePerHit: number, weaponSpeed: number) {
        return averageDamagePerHit / weaponSpeed;
    }
}
