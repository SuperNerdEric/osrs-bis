import { GearSet } from "./DataObjects/GearSets";
import { Player as SitePlayer } from "./DataObjects/Player";
import { Prayer as SitePrayer } from "./DataObjects/Prayer";
import { TargetMonster } from "./DataObjects/TargetMonster";
import { Raid } from "./DataObjects/Raid";
import { MonsterAttribute } from "../wiki-dps/src/enums/MonsterAttribute";
import { Prayer as WikiPrayer, PrayerMap } from "../wiki-dps/src/enums/Prayer";
import { availableEquipment, calculateEquipmentBonusesFromGear } from "../wiki-dps/src/lib/Equipment";
import { INITIAL_MONSTER_INPUTS, getMonsters } from "../wiki-dps/src/lib/Monsters";
import PlayerVsNPCCalc from "../wiki-dps/src/lib/PlayerVsNPCCalc";
import { BLOWPIPE_IDS, SECONDS_PER_TICK } from "../wiki-dps/src/lib/constants";
import { Monster } from "../wiki-dps/src/types/Monster";
import { EquipmentPiece, Player, PlayerSkills } from "../wiki-dps/src/types/Player";
import { spellByName } from "../wiki-dps/src/types/Spell";

/**
 * Combat numbers come from the RuneScape wiki DPS calculator
 * (https://github.com/weirdgloop/osrs-dps-calc, GPL-3.0). The license is in src/wiki-dps/LICENSE.
 */

export interface GearCalcRequest {
    names: string[];
    combatStyle: string;
    styleType: string;
    weaponStyle: string;
    spellName: string | null;
}

export interface GearCalcResult {
    dps: number;
    maxHit: number;
    hitChance: number;
    attackRoll: number;
    defenceRoll: number;
    averageDamage: number;
    attackInterval: number;
}

export interface SharedCalcContext {
    monster: Monster;
    skills: PlayerSkills;
    boosts: PlayerSkills;
    prayers: WikiPrayer[];
    buffs: Player["buffs"];
}

const BAD_VERSION = /(broken|empty|uncharged|inactive|locked|degraded)/i;
const VERSION_PREFERENCE = ["Charged", "Unpoisoned", "Normal", ""];

const equipmentByName = new Map<string, EquipmentPiece[]>();
for (const item of availableEquipment) {
    const key = item.name.toLowerCase();
    const list = equipmentByName.get(key);
    if (list) {
        list.push(item);
    } else {
        equipmentByName.set(key, [item]);
    }
}

const monstersByName = new Map<string, Omit<Monster, "inputs">[]>();
for (const monster of getMonsters()) {
    const key = monster.name.toLowerCase();
    const list = monstersByName.get(key);
    if (list) {
        list.push(monster);
    } else {
        monstersByName.set(key, [monster]);
    }
}

const prayerByName = new Map<string, WikiPrayer>();
for (const value of Object.values(WikiPrayer)) {
    if (typeof value === "number") {
        prayerByName.set(PrayerMap[value].name.toLowerCase(), value);
    }
}

export function findEquipment(name: string): EquipmentPiece {
    const matches = equipmentByName.get(name.toLowerCase());
    if (!matches || matches.length === 0) {
        throw new Error(`Wiki equipment not found: ${name}`);
    }
    const usable = matches.filter((item) => !BAD_VERSION.test(item.version || ""));
    const pool = usable.length > 0 ? usable : matches;
    for (const version of VERSION_PREFERENCE) {
        const found = pool.find((item) => (item.version || "") === version);
        if (found) {
            return found;
        }
    }
    return pool[0];
}

function emptyEquipment(): Player["equipment"] {
    return {
        head: null,
        cape: null,
        neck: null,
        ammo: null,
        weapon: null,
        body: null,
        shield: null,
        legs: null,
        hands: null,
        feet: null,
        ring: null,
    };
}

function parseSize(size: string): number {
    const parsed = parseInt(size, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function findWikiMonster(name: string, version: string): Omit<Monster, "inputs"> | undefined {
    const matches = monstersByName.get(name.toLowerCase());
    if (!matches || matches.length === 0) {
        return undefined;
    }
    if (matches.length === 1) {
        return matches[0];
    }
    const wanted = version.toLowerCase();
    return (
        matches.find((monster) => (monster.version || "").toLowerCase() === wanted) ||
        matches.find((monster) => wanted.length > 0 && (monster.version || "").toLowerCase().includes(wanted)) ||
        matches.find((monster) => !monster.version) ||
        matches[0]
    );
}

export function buildMonster(target: TargetMonster, invocationLevel: number): Monster {
    const variant = target.activeVariant;
    const wiki = findWikiMonster(target.name, variant?.variantName || "");
    const stats = target.defenceStats;
    const attributes = [...(wiki?.attributes || [])];
    const ensure = (enabled: boolean, attribute: MonsterAttribute) => {
        if (enabled && !attributes.includes(attribute)) {
            attributes.push(attribute);
        }
    };
    if (!wiki) {
        ensure(target.isDemon, MonsterAttribute.DEMON);
        ensure(target.isDraconic, MonsterAttribute.DRAGON);
        ensure(target.isFiery, MonsterAttribute.FIERY);
        ensure(target.isKalphite, MonsterAttribute.KALPHITE);
        ensure(target.isLeafy, MonsterAttribute.LEAFY);
        ensure(target.isUndead, MonsterAttribute.UNDEAD);
        ensure(target.isVampyre1, MonsterAttribute.VAMPYRE_1);
        ensure(target.isVampyre2, MonsterAttribute.VAMPYRE_2);
        ensure(target.isVampyre3, MonsterAttribute.VAMPYRE_3);
    }
    if (target.meleeImmune && !attributes.includes(MonsterAttribute.FLYING)) {
        attributes.push(MonsterAttribute.FLYING);
    }

    const weakness =
        wiki?.weakness ||
        (target.elementalWeakness
            ? {
                  element: target.elementalWeakness.type.toLowerCase() as "air" | "water" | "earth" | "fire",
                  severity: target.elementalWeakness.percent,
              }
            : null);

    const defensive = wiki
        ? { ...wiki.defensive }
        : {
              flat_armour: target.flatArmour,
              stab: stats.Stab || 0,
              slash: stats.Slash || 0,
              crush: stats.Crush || 0,
              magic: stats.Magic || 0,
              light: stats.Light ?? stats.Ranged ?? 0,
              standard: stats.Standard ?? stats.Ranged ?? 0,
              heavy: stats.Heavy ?? stats.Ranged ?? 0,
          };
    if (!wiki && target.flatArmour) {
        defensive.flat_armour = target.flatArmour;
    }
    if (target.magicResistance) {
        defensive.magic_resistance = target.magicResistance;
    }

    return {
        id: wiki?.id ?? -1,
        name: wiki?.name || target.name,
        version: wiki?.version || variant?.variantName || "",
        image: wiki?.image,
        size: wiki?.size || parseSize(target.size),
        speed: wiki?.speed || 4,
        style: wiki?.style || null,
        skills: {
            atk: wiki?.skills.atk ?? 0,
            def: target.currentDefenceLevel,
            hp: target.hitpoints,
            magic: wiki?.skills.magic ?? target.magicLevel,
            ranged: wiki?.skills.ranged ?? 0,
            str: wiki?.skills.str ?? 0,
        },
        offensive: wiki?.offensive || {
            atk: 0,
            magic: target.magicAccuracy,
            magic_str: 0,
            ranged: 0,
            ranged_str: 0,
            str: 0,
        },
        defensive,
        attributes,
        weakness,
        immunities: wiki?.immunities || { burn: null },
        is_slayer_monster: wiki?.is_slayer_monster || target.slayerMonster,
        meleeImmune: target.meleeImmune || undefined,
        immuneToAncientMagicks: target.immuneToAncientMagicks || undefined,
        inputs: {
            ...INITIAL_MONSTER_INPUTS,
            defenceReductions: { ...INITIAL_MONSTER_INPUTS.defenceReductions },
            monsterCurrentHp: target.currentHitpoints || target.hitpoints,
            toaInvocationLevel: target.raid === Raid.TombsOfAmascut ? invocationLevel : 0,
        },
    };
}

function zeroSkills(): PlayerSkills {
    return {
        atk: 0,
        def: 0,
        hp: 0,
        magic: 0,
        prayer: 0,
        ranged: 0,
        str: 0,
        mining: 0,
        herblore: 0,
    };
}

export function buildContext(target: TargetMonster, player: SitePlayer, invocationLevel: number): SharedCalcContext {
    const activePrayers = player.getActivePrayers();
    const zeal = activePrayers.includes(SitePrayer.Zeal);
    const prayers = activePrayers
        .filter((prayer) => !(zeal && prayer === SitePrayer.Piety))
        .map((prayer) => prayerByName.get(prayer.toLowerCase()))
        .filter((prayer): prayer is WikiPrayer => prayer !== undefined);

    return {
        monster: buildMonster(target, invocationLevel),
        skills: {
            ...zeroSkills(),
            atk: player.skills.attack.level,
            str: player.skills.strength.level,
            ranged: player.skills.ranged.level,
            magic: player.skills.magic.level,
            hp: 99,
            def: 99,
            prayer: 99,
            mining: 99,
            herblore: 99,
        },
        boosts: {
            ...zeroSkills(),
            atk: player.skills.attack.boost,
            str: player.skills.strength.boost,
            ranged: player.skills.ranged.boost,
            magic: player.skills.magic.boost,
        },
        prayers,
        buffs: {
            potions: [],
            onSlayerTask: player.onTask,
            inWilderness: false,
            forinthrySurge: false,
            soulreaperStacks: player.soulStacks,
            baAttackerLevel: 0,
            chinchompaDistance: 0,
            kandarinDiary: player.kandarinHardDiaryComplete,
            chargeSpell: false,
            markOfDarknessSpell: false,
            usingSunfireRunes: false,
            fragmentOfWind: player.elementalFragments.air,
            fragmentOfWater: player.elementalFragments.water,
            fragmentOfEarth: player.elementalFragments.earth,
            fragmentOfFire: player.elementalFragments.fire,
        },
    };
}

export function gearRequestFromSet(gearSet: GearSet): GearCalcRequest {
    return {
        names: Array.from(gearSet.items.values()).map((item) => item.name),
        combatStyle: gearSet.combatStyle,
        styleType: gearSet.styleType,
        weaponStyle: gearSet.weaponStyle,
        spellName: gearSet.spell?.name || null,
    };
}

function equip(request: GearCalcRequest): Player["equipment"] {
    const equipment = emptyEquipment();
    const pieces = request.names.map((name) => findEquipment(name));
    const weapon = pieces.find((piece) => piece.slot === "weapon");
    const dart = pieces.find((piece) => piece.slot === "ammo" && piece.name.toLowerCase().includes("dart"));
    const blowpipe = weapon && BLOWPIPE_IDS.includes(weapon.id) ? weapon : undefined;

    for (const piece of pieces) {
        if (blowpipe && piece === dart) {
            continue;
        }
        equipment[piece.slot] = piece;
    }

    if (blowpipe && dart) {
        equipment.weapon = {
            ...blowpipe,
            itemVars: {
                blowpipeDartId: dart.id,
                blowpipeDartName: dart.name,
            },
        };
    }

    return equipment;
}

export function evaluateGear(context: SharedCalcContext, request: GearCalcRequest): GearCalcResult {
    const spell = request.spellName ? spellByName(request.spellName) : null;
    const styleType = request.spellName ? "magic" : request.styleType.toLowerCase();
    const stance = request.spellName ? "Autocast" : request.weaponStyle;
    const player: Player = {
        name: "osrs-bis",
        style: {
            name: request.spellName ? "Spell" : request.combatStyle,
            type: styleType as Player["style"]["type"],
            stance: stance as Player["style"]["stance"],
        },
        skills: context.skills,
        boosts: context.boosts,
        equipment: equip(request),
        attackSpeed: 0,
        prayers: context.prayers,
        buffs: {
            ...context.buffs,
            markOfDarknessSpell: Boolean(spell?.name.includes("Demonbane")),
        },
        spell,
        bonuses: { str: 0, ranged_str: 0, magic_str: 0, prayer: 0 },
        offensive: { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 },
        defensive: { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 },
    };

    const bonuses = calculateEquipmentBonusesFromGear(player, context.monster);
    player.bonuses = bonuses.bonuses;
    player.offensive = bonuses.offensive;
    player.defensive = bonuses.defensive;
    player.attackSpeed = bonuses.attackSpeed;

    const calc = new PlayerVsNPCCalc(player, context.monster, {
        loadoutName: request.names.join(","),
        detailedOutput: false,
        disableMonsterScaling: true,
    });
    const distribution = calc.getDistribution();

    return {
        dps: calc.getDps(),
        maxHit: distribution.getMax(),
        hitChance: calc.getHitChance(),
        attackRoll: calc.getMaxAttackRoll(),
        defenceRoll: calc.getNPCDefenceRoll(),
        averageDamage: calc.getExpectedDamage(),
        attackInterval: calc.getExpectedAttackSpeed() * SECONDS_PER_TICK,
    };
}

export function evaluateGearBatch(context: SharedCalcContext, requests: GearCalcRequest[]): GearCalcResult[] {
    return requests.map((request) => {
        try {
            return evaluateGear(context, request);
        } catch (error) {
            console.error(error);
            return {
                dps: 0,
                maxHit: 0,
                hitChance: 0,
                attackRoll: 0,
                defenceRoll: 0,
                averageDamage: 0,
                attackInterval: 0,
            };
        }
    });
}

const EMPTY_RESULT: GearCalcResult = {
    dps: 0,
    maxHit: 0,
    hitChance: 0,
    attackRoll: 0,
    defenceRoll: 0,
    averageDamage: 0,
    attackInterval: 0,
};

export { EMPTY_RESULT };
