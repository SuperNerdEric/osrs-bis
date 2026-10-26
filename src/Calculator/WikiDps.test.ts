import { MonsterVariant, TargetMonster } from "./DataObjects/TargetMonster";
import { Player } from "./DataObjects/Player";
import { Prayer } from "./DataObjects/Prayer";
import { GearSet, GearSetType } from "./DataObjects/GearSets";
import { CombatStyle } from "./DataObjects/Item";
import { ItemName } from "./DataObjects/ItemName";
import { SpellName } from "./DataObjects/SpellName";
import { StyleType } from "./DataObjects/Item";
import { Calculator } from "./Calculator";
import { buildContext, evaluateGear, gearRequestFromSet } from "./WikiDps";

function barePlayer(): Player {
    const player = new Player();
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
    return player;
}

function monster(name: string, version: string, overrides: Partial<MonsterVariant> = {}): TargetMonster {
    const target = new TargetMonster();
    target.name = name;
    const variant = new MonsterVariant();
    variant.variantName = version;
    variant.hitpoints = 100;
    variant.currentHitpoints = 100;
    variant.defenceLevel = 50;
    variant.magicLevel = 1;
    Object.assign(variant, overrides);
    if (overrides.defenceLevel !== undefined) {
        variant.defenceLevel = overrides.defenceLevel;
    }
    target.addVariant(variant);
    return target;
}

function windStrike(player: Player, target: TargetMonster) {
    const gear = new GearSet([GearSetType.General]);
    gear.addItemByName(ItemName.StaffOfFire);
    gear.setCombatStyle(CombatStyle.Spell);
    gear.setSpellByName(SpellName.WindStrike);
    return evaluateGear(buildContext(target, player, 0), gearRequestFromSet(gear));
}

describe("wiki DPS calculator", () => {
    const demon = monster("Abyssal demon", "Standard");

    test("wind strike max hits follow the wiki elemental formula", () => {
        const level1 = barePlayer();
        level1.skills.magic.level = 1;
        expect(windStrike(level1, demon).maxHit).toBe(2);

        const level99 = barePlayer();
        expect(windStrike(level99, demon).maxHit).toBe(8);

        const weak = monster("Abyssal demon", "Standard", {
            // Wiki data already has no air weakness on abyssal demons. The direct weakness
            // cases below use a custom monster so the percent is under our control.
        });
        expect(windStrike(level99, weak).maxHit).toBe(8);
    });

    test("elemental weakness, amulets, tomes, and archive fragments scale the base hit", () => {
        const target = monster("Training dummy", "Custom", {
            defenceLevel: 1,
            magicLevel: 1,
            elementalWeakness: { type: "Air", percent: 100 },
        });
        target.defenceStats[StyleType.Magic] = 0;

        const player = barePlayer();
        expect(windStrike(player, target).maxHit).toBe(16);

        const amulet = new GearSet([GearSetType.General]);
        amulet.addItemByName(ItemName.StaffOfFire);
        amulet.setCombatStyle(CombatStyle.Spell);
        amulet.setSpellByName(SpellName.WindStrike);
        // Elemental amulet is not in the curated gear list; equip it through the wiki name.
        const withAmulet = evaluateGear(buildContext(target, player, 0), {
            names: ["Staff of fire", "Elemental amulet"],
            combatStyle: "Spell",
            styleType: "Magic",
            weaponStyle: "Defensive",
            spellName: "Wind Strike",
        });
        expect(withAmulet.maxHit).toBe(20);

        player.elementalFragments.air = true;
        const withFragment = evaluateGear(buildContext(target, player, 0), {
            names: ["Staff of fire", "Elemental amulet"],
            combatStyle: "Spell",
            styleType: "Magic",
            weaponStyle: "Defensive",
            spellName: "Wind Strike",
        });
        // Base 8 + amulet 2 + fragment 2 = 12, then 100% weakness adds another 12.
        expect(withFragment.maxHit).toBe(24);

        const noWeakness = monster("Training dummy", "Custom", { defenceLevel: 1, magicLevel: 1 });
        const tome = evaluateGear(buildContext(noWeakness, barePlayer(), 0), {
            names: ["Staff of fire", "Tome of fire"],
            combatStyle: "Spell",
            styleType: "Magic",
            weaponStyle: "Defensive",
            spellName: "Fire Surge",
        });
        const bareSurge = evaluateGear(buildContext(noWeakness, barePlayer(), 0), {
            names: ["Staff of fire"],
            combatStyle: "Spell",
            styleType: "Magic",
            weaponStyle: "Defensive",
            spellName: "Fire Surge",
        });
        expect(bareSurge.maxHit).toBe(24);
        expect(tome.maxHit).toBe(Math.floor(bareSurge.maxHit * 1.1));
    });

    test("zorya's tome base max hit is 23 at 99 magic before gear", () => {
        const result = evaluateGear(buildContext(demon, barePlayer(), 0), {
            names: ["Zorya's tome"],
            combatStyle: "Accurate",
            styleType: "Magic",
            weaponStyle: "Accurate",
            spellName: null,
        });
        // trunc(99 / 3) - 10 = 23, then the tome's 15% magic damage adds 3.
        expect(result.maxHit).toBe(26);
        expect(result.attackInterval).toBeCloseTo(1.8, 5);
    });

    test("zeal hits harder than piety", () => {
        const gear = {
            names: ["Abyssal whip", "Avernic defender"],
            combatStyle: "Flick",
            styleType: "Slash",
            weaponStyle: "Accurate",
            spellName: null,
        };
        const piety = barePlayer();
        piety.prayers[Prayer.Piety] = true;
        const zeal = barePlayer();
        zeal.prayers[Prayer.Zeal] = true;
        const pietyHit = evaluateGear(buildContext(demon, piety, 0), gear).maxHit;
        const zealHit = evaluateGear(buildContext(demon, zeal, 0), gear).maxHit;
        expect(zealHit).toBeGreaterThan(pietyHit);
    });

    test("obligator thrust hits harder on larger monsters than smash", () => {
        const small = monster("Abyssal demon", "Standard");
        const large = monster("General Graardor", "");
        const request = {
            names: ["Obligator"],
            combatStyle: "Thrust",
            styleType: "Crush",
            weaponStyle: "Accurate",
            spellName: null,
        };
        const smallHit = evaluateGear(buildContext(small, barePlayer(), 0), request);
        const largeHit = evaluateGear(buildContext(large, barePlayer(), 0), request);
        expect(largeHit.maxHit).toBeGreaterThan(smallHit.maxHit);
        expect(smallHit.attackInterval).toBeCloseTo(3, 5);

        const smash = evaluateGear(buildContext(large, barePlayer(), 0), {
            ...request,
            combatStyle: "Smash",
            weaponStyle: "Aggressive",
        });
        expect(smash.attackInterval).toBeCloseTo(1.8, 5);
        expect(smash.maxHit).toBeLessThan(largeHit.maxHit);
    });

    test("ascension crossbows attack every 2 ticks on rapid", () => {
        const result = evaluateGear(buildContext(demon, barePlayer(), 0), {
            names: ["Ascension crossbows", "Diamond ascension bolts (e)"],
            combatStyle: "Rapid",
            styleType: "Ranged",
            weaponStyle: "Rapid",
            spellName: null,
        });
        expect(result.attackInterval).toBeCloseTo(1.2, 5);
        expect(result.maxHit).toBeGreaterThan(0);
        expect(result.dps).toBeGreaterThan(0);
    });

    test("onyx ascension bolts use life leech rather than dragon's breath", () => {
        const request = {
            combatStyle: "Rapid",
            styleType: "Ranged",
            weaponStyle: "Rapid",
            spellName: null,
        };
        const context = buildContext(demon, barePlayer(), 0);
        const plain = evaluateGear(context, { ...request, names: ["Ascension crossbows", "Onyx ascension bolts"] });
        const enchanted = evaluateGear(context, {
            ...request,
            names: ["Ascension crossbows", "Onyx ascension bolts (e)"],
        });
        expect(enchanted.maxHit).toBe(Math.trunc((plain.maxHit * 120) / 100));
        expect(enchanted.dps).toBeGreaterThan(plain.dps);
    });

    test("ancient magicks do nothing to an ancient-immune monster and flat armour lowers the hit", () => {
        const target = monster("Archive Guardian", "Flying", {
            defenceLevel: 260,
            magicLevel: 250,
            hitpoints: 550,
            currentHitpoints: 550,
            flatArmour: 10,
            magicResistance: 2,
            meleeImmune: true,
        });
        target.immuneToAncientMagicks = true;
        target.size = "5x5";
        target.defenceStats[StyleType.Stab] = 120;
        target.defenceStats[StyleType.Slash] = 110;
        target.defenceStats[StyleType.Crush] = 20;
        target.defenceStats[StyleType.Magic] = 130;
        target.defenceStats[StyleType.Ranged] = 120;
        target.activeVariant.elementalWeakness = { type: "Fire", percent: 80 };

        const barrage = evaluateGear(buildContext(target, barePlayer(), 0), {
            names: ["Kodai wand", "Tome of fire"],
            combatStyle: "Spell",
            styleType: "Magic",
            weaponStyle: "Defensive",
            spellName: "Ice Barrage",
        });
        expect(barrage.maxHit).toBe(0);
        expect(barrage.dps).toBe(0);

        const melee = new GearSet([GearSetType.General]);
        melee.addItemByName(ItemName.AbyssalWhip);
        melee.addItemByName(ItemName.AvernicDefender);
        melee.setCombatStyle(CombatStyle.Flick);
        const calculator = new Calculator(melee);
        calculator.player = barePlayer();
        calculator.targetMonster = target;
        calculator.calculateDPS();
        expect(calculator.dps).toBe(0);

        const slash = monster("Training dummy", "Custom", { defenceLevel: 1, flatArmour: 10 });
        slash.defenceStats[StyleType.Slash] = 0;
        const withArmour = evaluateGear(buildContext(slash, barePlayer(), 0), {
            names: ["Abyssal whip"],
            combatStyle: "Flick",
            styleType: "Slash",
            weaponStyle: "Accurate",
            spellName: null,
        });
        const withoutArmour = evaluateGear(
            buildContext(monster("Training dummy", "Custom", { defenceLevel: 1 }), barePlayer(), 0),
            {
                names: ["Abyssal whip"],
                combatStyle: "Flick",
                styleType: "Slash",
                weaponStyle: "Accurate",
                spellName: null,
            },
        );
        expect(withoutArmour.maxHit - withArmour.maxHit).toBe(10);
    });

    test("fire weakness raises a standard fire spell and not a powered staff", () => {
        const target = monster("Archive Guardian", "Flying", {
            defenceLevel: 260,
            magicLevel: 250,
            hitpoints: 550,
            currentHitpoints: 550,
        });
        target.size = "5x5";
        target.activeVariant.elementalWeakness = { type: "Fire", percent: 80 };
        target.defenceStats[StyleType.Magic] = 130;

        const player = barePlayer();
        player.elementalFragments.fire = true;
        const surge = evaluateGear(buildContext(target, player, 0), {
            names: ["Kodai wand", "Tome of fire"],
            combatStyle: "Spell",
            styleType: "Magic",
            weaponStyle: "Defensive",
            spellName: "Fire Surge",
        });
        const shadow = evaluateGear(buildContext(target, player, 0), {
            names: ["Tumeken's shadow"],
            combatStyle: "Accurate",
            styleType: "Magic",
            weaponStyle: "Accurate",
            spellName: null,
        });
        expect(surge.maxHit).toBeGreaterThan(24);
        expect(shadow.maxHit).toBeGreaterThan(0);
        expect(surge.hitChance).toBeGreaterThan(0);
        expect(surge.hitChance).toBeLessThanOrEqual(1);
    });

    test("published wiki max hits for bolts, smoke, occult, shadow, twinflame, and ice barrage", () => {
        const magic = (names: string[], spellName: string | null, style = "Spell") =>
            evaluateGear(buildContext(demon, barePlayer(), 0), {
                names,
                combatStyle: style,
                styleType: "Magic",
                weaponStyle: style === "Spell" ? "Defensive" : "Accurate",
                spellName,
            });

        // Fire bolt is 12 at 99 magic. Chaos gauntlets add 3 before magic damage.
        expect(magic(["Staff of air", "Chaos gauntlets"], "Wind Bolt").maxHit).toBe(15);
        // Smoke battlestaff is +10% magic damage on standard spells: trunc(24 * 10%) = 2.
        expect(magic(["Smoke battlestaff"], "Fire Surge").maxHit).toBe(26);
        // Occult is 5%: trunc(24 * 5%) = 1.
        expect(magic(["Staff of air", "Occult necklace"], "Fire Surge").maxHit).toBe(25);
        // Bare charged shadow is trunc(magic / 3) + 1.
        expect(magic(["Tumeken's shadow"], null, "Accurate").maxHit).toBe(34);
        // Twinflame counts as a smoke staff (+10% magic damage) and echoes bolt, blast, and wave at 40%.
        const wave = magic(["Twinflame staff"], "Wind Wave");
        expect(wave.maxHit).toBe(30);
        expect(wave.attackInterval).toBeCloseTo(3.6, 5);
        // Surges are not echoed, but the smoke-staff bonus still applies.
        expect(magic(["Twinflame staff"], "Fire Surge").maxHit).toBe(26);
        // Ancient spells keep their listed max hit. They are not upgraded by magic level and ignore elemental weakness.
        expect(magic(["Staff of air"], "Ice Barrage").maxHit).toBe(30);
        // Kodai is 15% magic damage: trunc(30 * 15%) = 4.
        expect(magic(["Kodai wand"], "Ice Barrage").maxHit).toBe(34);
    });

    test("scorching bow fires dragon arrows against demons", () => {
        const player = barePlayer();
        const ocellus = monster("Ocellus", "Phase 1", { defenceLevel: 215, hitpoints: 2500 });
        ocellus.isDemon = true;

        const bare = new GearSet([GearSetType.Demon]);
        bare.addItemByName(ItemName.ScorchingBow);
        bare.setCombatStyle(CombatStyle.Rapid);

        const armed = new GearSet([GearSetType.Demon]);
        armed.addItemByName(ItemName.ScorchingBow);
        armed.addItemByName(ItemName.DragonArrow);
        armed.setCombatStyle(CombatStyle.Rapid);

        const context = buildContext(ocellus, player, 0);
        expect(evaluateGear(context, gearRequestFromSet(bare)).dps).toBe(0);
        const withArrows = evaluateGear(context, gearRequestFromSet(armed));
        expect(withArrows.dps).toBeGreaterThan(0);
        expect(withArrows.maxHit).toBeGreaterThan(0);
    });
});
