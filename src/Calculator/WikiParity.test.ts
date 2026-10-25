import { GearSet, gearSets } from "./DataObjects/GearSets";
import { Weapon } from "./DataObjects/Item";
import { Player as SitePlayer } from "./DataObjects/Player";
import { Prayer } from "./DataObjects/Prayer";
import { loadMonstersFromFile, monsters } from "./Data/loadMonsters";
import { getSections } from "../MonsterSections";
import {
    buildContext,
    evaluateGear,
    findEquipment,
    gearRequestFromSet,
    GearCalcRequest,
    SharedCalcContext,
} from "./WikiDps";
import { calculateEquipmentBonusesFromGear } from "../wiki-dps/src/lib/Equipment";
import { getMonsters, INITIAL_MONSTER_INPUTS } from "../wiki-dps/src/lib/Monsters";
import PlayerVsNPCCalc from "../wiki-dps/src/lib/PlayerVsNPCCalc";
import { BLOWPIPE_IDS } from "../wiki-dps/src/lib/constants";
import { Monster } from "../wiki-dps/src/types/Monster";
import { Player } from "../wiki-dps/src/types/Player";
import { spellByName } from "../wiki-dps/src/types/Spell";

loadMonstersFromFile();

function barePlayer(): SitePlayer {
    const player = new SitePlayer();
    player.skills.attack.boost = 0;
    player.skills.strength.boost = 0;
    player.skills.ranged.boost = 0;
    player.skills.magic.boost = 0;
    player.prayers = {
        ...player.prayers,
        [Prayer.Zeal]: false,
        [Prayer.Piety]: false,
        [Prayer.Rigour]: false,
        [Prayer.Augury]: false,
    };
    player.elementalFragments = { air: false, water: false, earth: false, fire: false };
    player.onTask = false;
    return player;
}

function oneSetPerWeapon(): Map<string, GearSet> {
    const chosen = new Map<string, GearSet>();
    for (const gearSet of gearSets) {
        const weapon = Array.from(gearSet.items.values()).find((item) => item instanceof Weapon);
        if (weapon && !chosen.has(weapon.name)) {
            chosen.set(weapon.name, gearSet);
        }
    }
    return chosen;
}

const wikiByName = new Map<string, Omit<Monster, "inputs">[]>();
for (const monster of getMonsters()) {
    const key = monster.name.toLowerCase();
    const list = wikiByName.get(key);
    if (list) {
        list.push(monster);
    } else {
        wikiByName.set(key, [monster]);
    }
}

function findWikiMonster(name: string, version: string): Omit<Monster, "inputs"> | undefined {
    const matches = wikiByName.get(name.toLowerCase());
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

function wikiMonster(raw: Omit<Monster, "inputs">): Monster {
    return {
        ...raw,
        skills: { ...raw.skills },
        offensive: { ...raw.offensive },
        defensive: { ...raw.defensive },
        attributes: [...raw.attributes],
        inputs: {
            ...INITIAL_MONSTER_INPUTS,
            defenceReductions: { ...INITIAL_MONSTER_INPUTS.defenceReductions },
            monsterCurrentHp: raw.skills.hp,
            toaInvocationLevel: 0,
        },
    };
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

function directResult(monster: Monster, context: SharedCalcContext, request: GearCalcRequest) {
    const spell = request.spellName ? spellByName(request.spellName) : null;
    const styleType = request.spellName ? "magic" : request.styleType.toLowerCase();
    const stance = request.spellName ? "Autocast" : request.weaponStyle;
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
            itemVars: { blowpipeDartId: dart.id, blowpipeDartName: dart.name },
        };
    }

    const player: Player = {
        name: "wiki",
        style: {
            name: request.spellName ? "Spell" : request.combatStyle,
            type: styleType as Player["style"]["type"],
            stance: stance as Player["style"]["stance"],
        },
        skills: context.skills,
        boosts: context.boosts,
        equipment,
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
    const bonuses = calculateEquipmentBonusesFromGear(player, monster);
    player.bonuses = bonuses.bonuses;
    player.offensive = bonuses.offensive;
    player.defensive = bonuses.defensive;
    player.attackSpeed = bonuses.attackSpeed;

    const calc = new PlayerVsNPCCalc(player, monster, {
        loadoutName: request.names.join(","),
        detailedOutput: false,
        disableMonsterScaling: true,
    });
    return {
        dps: calc.getDps(),
        maxHit: calc.getDistribution().getMax(),
        hitChance: calc.getHitChance(),
    };
}

function same(left: number, right: number): boolean {
    return left === right || (Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) < 1e-9);
}

describe("wiki DPS parity", () => {
    jest.setTimeout(600000);

    test("each weapon matches the wiki calculator on every homepage boss", () => {
        const weapons = oneSetPerWeapon();
        const player = barePlayer();
        const failures: string[] = [];
        let compared = 0;

        for (const section of getSections()) {
            for (const target of section.monsters) {
                const monster = target || monsters.get(section.name);
                if (!monster) {
                    failures.push(`${section.name} is missing a boss`);
                    continue;
                }
                const original = monster.activeVariant.variantName;
                try {
                    for (const variantName of Array.from(monster.variants.keys())) {
                        monster.setActiveVariant(variantName);
                        monster.currentDefenceLevel = monster.defenceLevel;
                        monster.currentHitpoints = monster.hitpoints;
                        const context = buildContext(monster, player, 0);
                        const raw = findWikiMonster(monster.name, variantName);
                        const comparable =
                            raw !== undefined &&
                            raw.skills.hp === monster.hitpoints &&
                            raw.skills.def === monster.defenceLevel;
                        if (!comparable || !raw) {
                            continue;
                        }
                        const wiki = wikiMonster(raw);
                        for (const [weapon, gearSet] of Array.from(weapons.entries())) {
                            const request = gearRequestFromSet(gearSet);
                            const site = evaluateGear(context, request);
                            const wikiResult = directResult(wiki, context, request);
                            compared += 1;
                            if (
                                !Number.isFinite(site.dps) ||
                                !same(site.dps, wikiResult.dps) ||
                                !same(site.maxHit, wikiResult.maxHit) ||
                                !same(site.hitChance, wikiResult.hitChance)
                            ) {
                                failures.push(
                                    `${weapon} | ${monster.name} | ${variantName} | site ${site.dps.toFixed(4)}/${site.maxHit}/${site.hitChance.toFixed(4)} wiki ${wikiResult.dps.toFixed(4)}/${wikiResult.maxHit}/${wikiResult.hitChance.toFixed(4)}`,
                                );
                            }
                        }
                    }
                } finally {
                    monster.setActiveVariant(original);
                    monster.currentDefenceLevel = monster.defenceLevel;
                    monster.currentHitpoints = monster.hitpoints;
                }
            }
        }

        expect(weapons.size).toBeGreaterThan(20);
        expect(compared).toBeGreaterThan(500);
        if (failures.length > 0) {
            throw new Error(`${failures.length} mismatches\n${failures.slice(0, 50).join("\n")}`);
        }
    });
});
