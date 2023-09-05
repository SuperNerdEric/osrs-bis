import {Calculator} from './Calculator';
import {MonsterVariant, TargetMonster} from '../DataObjects/TargetMonster';
import {Player} from '../DataObjects/Player';
import {GearSet, GearSetType} from "../DataObjects/GearSets";
import {CombatStyle, StyleType} from "../DataObjects/Item";
import {ItemName} from '../DataObjects/ItemName';
import {Raid} from "../DataObjects/Raid";
import {loadMonstersFromFile, monsters} from "../Data/loadMonsters";
import {SpellName} from "../DataObjects/SpellName";

describe('Calculator class', () => {
    let result: Calculator;

    beforeAll(() => {
        loadMonstersFromFile();
    })
    beforeEach(() => {
        // @ts-ignore
        result = new Calculator();
        result.player = new Player();
        result.player.skills.attack.boost = 19;
        result.player.skills.strength.boost = 19;
        result.player.skills.ranged.boost = 13;
        result.player.skills.magic.boost = 10; //imbued heart
        result.targetMonster = monsters.get("Kree'arra") as TargetMonster;
    });

    describe('with Osmumtens fang in ToA melee gear set', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.OsmumtensFang)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Ba-Ba") as TargetMonster;
            result.calculateDPS(300);
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.833);  //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(48);  //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8393);  //Matches fruitdeeps
        });
    });

    describe('with Osmumtens fang against Pestilent Bloat', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.OsmumtensFang)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(9.010);  //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(48);  //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.9653);  //Matches fruitdeeps
        });
    });

    describe('with melee gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.OsmumtensFang)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.player.onTask = false;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(3.214);
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(46); //Tested in game
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3572);
        });
    });

    describe('with melee gear set including Slayer helmet (i) and onTask is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.OsmumtensFang)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(4.375);
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(54); //Tested in game
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.4167);
        });
    });

    describe('with ranged gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TwistedBow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DragonArrow)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.player.onTask = false;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(3.625); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(68); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3198); //Matches fruitdeeps
        });
    });

    describe('with ranged gear set including Slayer helmet (i) and onTask is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TwistedBow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DragonArrow)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(4.782); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(78); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3678); //Matches fruitdeeps
        });
    });

    describe('tbow slayer dummy test', () => {
        beforeEach(() => {
            const monster = new TargetMonster();
            monster.name = "Undead Combat Dummy";
            monster.raid = Raid.None;
            const variant = new MonsterVariant();
            variant.imagePath = './Images/Monsters/Undead_combat_dummy.png';
            monster.isUndead = true;
            variant.currentHitpoints = 9999;
            variant.defenceLevel = 1;
            variant.maxDefenceReduction = 1;
            variant.magicLevel = 1;
            variant.magicAccuracy = 999;
            variant.defenceStats = {
                [StyleType.Stab]: 0,
                [StyleType.Slash]: 0,
                [StyleType.Crush]: 0,
                [StyleType.Magic]: 0,
                [StyleType.Ranged]: 0
            };
            monster.addVariant(variant);
            monsters.set(monster.name, monster);

            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TwistedBow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.BronzeArrow)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.MasoriBodyF);

            result.targetMonster = monsters.get("Undead Combat Dummy") as TargetMonster;
            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(53); //Tested in game
        });
    });

    describe('with mage gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.SanguinestiStaff)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.ElidinisWardF)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.AncestralRobeTop)
                .addItemByName(ItemName.AncestralRobeBottom)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape);

            result.player.onTask = false;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.625); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(44); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.2864); //Matches fruitdeeps
        });
    });

    describe('with mage gear set including Slayer helmet (i) and onTask is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.SanguinestiStaff)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.ElidinisWardF)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.AncestralRobeTop)
                .addItemByName(ItemName.AncestralRobeBottom)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape);

            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(3.431); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(50); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3293); //Matches fruitdeeps
        });
    });

    describe('with Tumekens shadow mage gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TumekensShadow)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.AncestralRobeTop)
                .addItemByName(ItemName.AncestralRobeBottom)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape);

            result.player.onTask = false;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(6.024); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(60); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.6024); //Matches fruitdeeps
        });
    });

    describe('with Tumekens shadow mage gear set including Slayer helmet (i) and onTask is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TumekensShadow)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.AncestralRobeTop)
                .addItemByName(ItemName.AncestralRobeBottom)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape);

            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.524); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(69); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.6524); //Matches fruitdeeps
        });
    });

    describe('with Tumekens shadow in ToA mage gear set', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], Raid.TombsOfAmascut)
                .addItemByName(ItemName.TumekensShadow)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.AncestralHat)
                .addItemByName(ItemName.AncestralRobeTop)
                .addItemByName(ItemName.AncestralRobeBottom)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape);

            result.targetMonster = monsters.get("Zebak") as TargetMonster;
            result.calculateDPS(300);
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.776); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(71); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.6571); //Matches fruitdeeps
        });
    });

    describe('with Tumekens shadow against Verzik', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TumekensShadow)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.AncestralHat)
                .addItemByName(ItemName.AncestralRobeTop)
                .addItemByName(ItemName.AncestralRobeBottom)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape)
                .addItemByName(ItemName.MagusRing);

            result.targetMonster = monsters.get("Verzik Vitur") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(8.7566); //Matches fruitdeeps and Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(64); //Matches fruitdeeps and Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8209); //Matches fruitdeeps and Bitterkoekje
        });
    });

    describe('with Twisted bow in CoX', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TwistedBow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DragonArrow)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.targetMonster = monsters.get("Great Olm") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(10.557); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(77); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8226); //Matches fruitdeeps
        });
    });

    describe('with Scythe on large monster', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ScytheOfVitur)
                .setCombatStyle(CombatStyle.Chop)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(11.534); //Matches fruitdeeps and Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(81); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8544); //Matches fruitdeeps and Bitterkoekje
        });
    });

    describe('with Scythe on medium monster', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ScytheOfVitur)
                .setCombatStyle(CombatStyle.Chop)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape)
                .addItemByName(ItemName.BellatorRing);

            result.targetMonster = monsters.get("Vardorvis") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.059); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(73); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.5802); //Matches Bitterkoekje
        });
    });

    describe('with Scythe on small monster', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ScytheOfVitur)
                .setCombatStyle(CombatStyle.Chop)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape)
                .addItemByName(ItemName.BellatorRing);

            result.targetMonster = monsters.get("Karil the Tainted") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(6.42); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(49); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.7862); //Matches Bitterkoekje
        });
    });


    describe('with Keris partisan on kalphite', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.KerisPartisan)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Kalphite Queen") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(4.760); //Higher than fruitdeeps because their max hit is too low for proc
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(165); //Tested in game hitting 55 without proc and then 165 with proc
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3997); //Matches fruitdeeps
        });
    });

    describe('with Keris partisan of breaching on kalphite', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.KerisPartisanOfBreaching)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Kalphite Queen") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(6.308); //Higher than fruitdeeps because their max hit is too low for proc
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(165); //Tested in game hitting 55 without proc and then 165 with proc
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.5309); //Matches fruitdeeps
        });
    });

    describe('with Keris partisan of breaching on kalphite slayer task', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.KerisPartisanOfBreaching)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Kalphite Queen") as TargetMonster;
            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.883); //Higher than fruitdeeps because their max hit is too low for proc
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(183); //Tripled fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.5979); //Matches fruitdeeps
        });
    });

    describe('with Keris partisan of breaching on kalphite slayer task on pound combat style', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.Slayer])
                .addItemByName(ItemName.KerisPartisanOfBreaching)
                .setCombatStyle(CombatStyle.Pound)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Kalphite Queen") as TargetMonster;
            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(9.695); //Higher than fruitdeeps because their max hit is too low for proc
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(183); //Tripled fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.7348); //Matches fruitdeeps
        });
    });

    describe('with melee gear set including Salve amulet and undead is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.GhraziRapier)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.SalveAmulet)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(10.207); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(58); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8447); //Matches fruitdeeps
        });
    });

    describe('with melee gear set including Salve amulet (e) and undead is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.GhraziRapier)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.SalveAmuletE)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(10.613); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(60); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8490); //Matches fruitdeeps
        });
    });

    describe('with melee void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.GhraziRapier)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.VoidMeleeHelm)
                .addItemByName(ItemName.VoidKnightTop)
                .addItemByName(ItemName.VoidKnightRobe)
                .addItemByName(ItemName.VoidKnightGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(8.510); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(49); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8336); //Matches fruitdeeps
        });
    });

    describe('with ranged void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TwistedBow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DragonArrow)
                .addItemByName(ItemName.VoidRangerHelm)
                .addItemByName(ItemName.VoidKnightTop)
                .addItemByName(ItemName.VoidKnightRobe)
                .addItemByName(ItemName.VoidKnightGloves)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(1.532); //Matches fruitdeeps and Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(62); //Matches fruitdeeps and Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.1482); //Matches fruitdeeps and Bitterkoekje
        });
    });

    describe('with ranged elite void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TwistedBow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DragonArrow)
                .addItemByName(ItemName.VoidRangerHelm)
                .addItemByName(ItemName.EliteVoidTop)
                .addItemByName(ItemName.EliteVoidRobe)
                .addItemByName(ItemName.VoidKnightGloves)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(1.532); //Matches fruitdeeps and Bitterkoekje
            // this is the same as regular void because it only boosts gear strength % and
            // 2.5% is so small in some cases it's not even an extra max hit
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(62); //Matches fruitdeeps and Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.1482); //Matches fruitdeeps and Bitterkoekje
        });
    });

    describe('with mage void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.SanguinestiStaff)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.VoidMageHelm)
                .addItemByName(ItemName.VoidKnightTop)
                .addItemByName(ItemName.VoidKnightRobe)
                .addItemByName(ItemName.VoidKnightGloves)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(0.928); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(39); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.1143); //Matches fruitdeeps
        });
    });

    describe('with elite mage void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.SanguinestiStaff)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.VoidMageHelm)
                .addItemByName(ItemName.EliteVoidTop)
                .addItemByName(ItemName.EliteVoidRobe)
                .addItemByName(ItemName.VoidKnightGloves)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape);

            result.targetMonster = monsters.get("Pestilent Bloat") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(0.9522); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(40); //Matches Bitterkoekje and tested in game
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.1143); //Matches fruitdeeps
        });
    });

    describe('with arclight against demon', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.Demon])
                .addItemByName(ItemName.Arclight)
                .setCombatStyle(CombatStyle.Slash)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);
            result.targetMonster = monsters.get("K'ril Tsutsaroth") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(6.159); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(56); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.5279); //Matches Bitterkoekje
        });
    });

    describe('with arclight and slayer helmet against demon on task', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.Demon])
                .addItemByName(ItemName.Arclight)
                .setCombatStyle(CombatStyle.Slash)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            result.targetMonster = monsters.get("K'ril Tsutsaroth") as TargetMonster;
            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.567); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(61); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.5954); //Matches Bitterkoekje
        });
    });

    describe('with dragon hunter lance against dragon', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.DragonHunterLance)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape);

            const monster = monsters.get("Great Olm") as TargetMonster;
            monster.setActiveVariant("Left claw");
            result.targetMonster = monster
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(8.519); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(56); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.7302); //Matches Bitterkoekje
        });
    });

    describe('with dragon hunter lance and salve against undead dragon', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.DragonHunterLance)
                .setCombatStyle(CombatStyle.Lunge)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.SalveAmuletEI)
                .addItemByName(ItemName.InfernalCape)
                .addItemByName(ItemName.UltorRing);

            result.targetMonster = monsters.get("Vorkath") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(10.892); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(68); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.7688); //Matches Bitterkoekje
        });
    });

    describe('with dragon hunter crossbow and salve against undead dragon', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.DragonHunterCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DiamondDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.SalveAmuletEI)
                .addItemByName(ItemName.AvasAssembler);

            result.targetMonster = monsters.get("Vorkath") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(10.199); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(80); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8410); //Matches Bitterkoekje
        });
    });

    describe('with inquisitors against Kalphite Queen', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.InquisitorsMace)
                .setCombatStyle(CombatStyle.Pummel)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.InquisitorsGreatHelm)
                .addItemByName(ItemName.InquisitorsHauberk)
                .addItemByName(ItemName.InquisitorsPlateskirt)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape)
                .addItemByName(ItemName.UltorRing);

            result.targetMonster = monsters.get("Kalphite Queen") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(8.107); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(55); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.7076); //Matches Bitterkoekje
        });
    });


    describe('with 2 piece inquisitors against Kalphite Queen', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.InquisitorsMace)
                .setCombatStyle(CombatStyle.Pummel)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.InquisitorsHauberk)
                .addItemByName(ItemName.InquisitorsPlateskirt)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape)
                .addItemByName(ItemName.UltorRing);

            result.targetMonster = monsters.get("Kalphite Queen") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.948); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(55); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.6936); //Matches Bitterkoekje
        });
    });

    describe('with inquisitors stab against Kalphite Queen', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.InquisitorsMace)
                .setCombatStyle(CombatStyle.Spike)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.InquisitorsGreatHelm)
                .addItemByName(ItemName.InquisitorsHauberk)
                .addItemByName(ItemName.InquisitorsPlateskirt)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape)
                .addItemByName(ItemName.UltorRing);

            result.targetMonster = monsters.get("Kalphite Queen") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(4.114); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(53); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3726); //Matches Bitterkoekje
        });
    });

    describe('with armadyl crossbow on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ArmadylCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DragonBolts)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.535); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(48); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3169); //Matches Bitterkoekje
        });
    });

    describe('with armadyl crossbow on accurate', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ArmadylCrossbow)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.DragonBolts)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.202); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(49); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3236); //Matches Bitterkoekje
        });
    });

    describe('with armadyl crossbow with Diamond Dragon Bolts (e) on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ArmadylCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DiamondDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(3.265); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(55); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3169); //Matches Bitterkoekje
        });
    });

    describe('with armadyl crossbow with Diamond Dragon Bolts (e) on accurate', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ArmadylCrossbow)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.DiamondDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.816); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(56); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3236); //Matches Bitterkoekje
        });
    });

    describe('with armadyl crossbow with Ruby Dragon Bolts (e) on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ArmadylCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.RubyDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(3.490); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(51); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3169); //Matches Bitterkoekje
        });
    });

    describe('with armadyl crossbow with Onyx Dragon Bolts (e) on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ArmadylCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.OnyxDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.593); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(57); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3169); //Matches Bitterkoekje
        });
    });

    describe('with zaryte crossbow with Onyx Dragon Bolts (e) on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ZaryteCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.OnyxDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.68); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(63); //Tested in game
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3269); //Matches Bitterkoekje
        });
    });

    describe('with zaryte crossbow with Diamond Dragon Bolts (e) on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ZaryteCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DiamondDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler);

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(3.427); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(60); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3269) //Matches Bitterkoekje
        });
    });

    describe('with bowfa on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.BowOfFaerdhinen)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.CrystalHelm)
                .addItemByName(ItemName.CrystalBody)
                .addItemByName(ItemName.CrystalLegs)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler)
                .addItemByName(ItemName.VenatorRing);
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(3.98); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(47); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.407); //Matches Bitterkoekje
        });
    });

    describe('with bowfa and slayer helmet on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.BowOfFaerdhinen)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.CrystalBody)
                .addItemByName(ItemName.CrystalLegs)
                .addItemByName(ItemName.AvasAssembler)
            result.player.skills.ranged.boost = 0;
            result.player.onTask = true;

            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.945732477); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(44); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.3214); //Matches Bitterkoekje
        });
    });

    describe('with blowpipe on rapid', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ToxicBlowpipe)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DragonDart)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler)
                .addItemByName(ItemName.VenatorRing);
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.931); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(31); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.2269); //Matches Bitterkoekje
        });
    });

    describe('with blowpipe on accurate', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ToxicBlowpipe)
                .setCombatStyle(CombatStyle.Accurate)
                .addItemByName(ItemName.DragonDart)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler)
                .addItemByName(ItemName.VenatorRing);
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(2.06); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(32); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.2317); //Matches Bitterkoekje
        });
    });

    describe('against ice demon with tbow', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TwistedBow)
                .setCombatStyle(CombatStyle.Rapid   )
                .addItemByName(ItemName.DragonArrow)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler)
                .addItemByName(ItemName.VenatorRing);
            result.targetMonster = monsters.get("Ice demon") as TargetMonster;
            result.player.skills.ranged.boost = 21; //Overload
            result.calculateDPS();
        });

        //Bitterkoekje has 0.35 multiplier for some reason
        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(3.715); //Matches Bitterkoekje if you set multiplier to 0.333334 instead of 0.35
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(32); //Matches Bitterkoekje if you set multiplier to 0.333334 instead of 0.35
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.6966); //Matches Bitterkoekje
        });
    });

    describe('against ice demon with fire surge', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.HarmonisedNightmareStaff)
                .setCombatStyle(CombatStyle.Spell)
                .addItemByName(ItemName.TomeOfFire)
                .addItemByName(ItemName.AncestralHat)
                .addItemByName(ItemName.AncestralRobeTop)
                .addItemByName(ItemName.AncestralRobeBottom)
                .addItemByName(ItemName.EternalBoots)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape)
                .addItemByName(ItemName.MagusRing)
                .setSpellByName(SpellName.FireSurge);
            result.targetMonster = monsters.get("Ice demon") as TargetMonster;
            result.player.skills.magic.boost = 21; //Overload
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(10.589); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(73); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.6963); //Matches Bitterkoekje
        });
    });

    describe('virtus ancient magicks against Dagannoth Rex', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.KodaiWand)
                .setCombatStyle(CombatStyle.Spell)
                .addItemByName(ItemName.ElidinisWardF)
                .addItemByName(ItemName.VirtusMask)
                .addItemByName(ItemName.VirtusRobeTop)
                .addItemByName(ItemName.VirtusRobeBottom)
                .addItemByName(ItemName.EternalBoots)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape)
                .addItemByName(ItemName.MagusRing)
                .setSpellByName(SpellName.IceBarrage);
            result.targetMonster = monsters.get("Dagannoth Rex") as TargetMonster;
            result.player.skills.magic.boost = 13; //Saturated heart
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.429); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(45); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.9906); //Matches Bitterkoekje
        });
    });

    describe('harmonised ancient magicks against Dagannoth Rex', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.HarmonisedNightmareStaff)
                .setCombatStyle(CombatStyle.Spell)
                .addItemByName(ItemName.BookOfTheDead)
                .addItemByName(ItemName.VirtusMask)
                .addItemByName(ItemName.VirtusRobeTop)
                .addItemByName(ItemName.VirtusRobeBottom)
                .addItemByName(ItemName.EternalBoots)
                .addItemByName(ItemName.TormentedBracelet)
                .addItemByName(ItemName.OccultNecklace)
                .addItemByName(ItemName.ImbuedZamorakCape)
                .addItemByName(ItemName.MagusRing)
                .setSpellByName(SpellName.IceBarrage);
            result.targetMonster = monsters.get("Dagannoth Rex") as TargetMonster;
            result.player.skills.magic.boost = 13; //Saturated heart
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(7.092); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(43); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.9896); //Matches Bitterkoekje
        });
    });

    describe('arclight against Duke Sucellus', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.Arclight)
                .setCombatStyle(CombatStyle.Slash)
                .addItemByName(ItemName.AvernicDefender)
                .addItemByName(ItemName.TorvaFullHelm)
                .addItemByName(ItemName.TorvaPlatebody)
                .addItemByName(ItemName.TorvaPlatelegs)
                .addItemByName(ItemName.PrimordialBoots)
                .addItemByName(ItemName.FerociousGloves)
                .addItemByName(ItemName.AmuletOfTorture)
                .addItemByName(ItemName.InfernalCape)
                .addItemByName(ItemName.BellatorRing)
            result.targetMonster = monsters.get("Duke Sucellus") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(5.993); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(51); //Matches Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.564  ); //Matches Bitterkoekje
        });
    });

    describe('with ruby dragon bolts (e) against Zulrah', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ZaryteCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.RubyDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler)
            result.targetMonster = monsters.get("Zulrah") as TargetMonster;
            result.targetMonster.setActiveVariant("Tanzanite")
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(6.9254); //Matches manual redistribution
            expect(result.dps).toBeCloseTo(6.9147); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(50);
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.7870); //Matches Bitterkoekje
        });
    });

    describe('with twisted bow against Zulrah', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.TwistedBow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.DragonArrow)
                .addItemByName(ItemName.SlayerHelmetI)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler)
                .addItemByName(ItemName.VenatorRing)
            result.targetMonster = monsters.get("Zulrah") as TargetMonster;
            result.targetMonster.setActiveVariant("Tanzanite");

            result.player.onTask = true;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(9.6875); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(50);
        });

        test('should calculate hitChance correctly', () => {
            expect(result.hitChance).toBeCloseTo(0.8398); //Matches Bitterkoekje
        });
    });

    describe('with ruby dragon bolts (e) against Tekton', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General])
                .addItemByName(ItemName.ZaryteCrossbow)
                .setCombatStyle(CombatStyle.Rapid)
                .addItemByName(ItemName.RubyDragonBoltsE)
                .addItemByName(ItemName.TwistedBuckler)
                .addItemByName(ItemName.MasoriMaskF)
                .addItemByName(ItemName.MasoriBodyF)
                .addItemByName(ItemName.MasoriChapsF)
                .addItemByName(ItemName.ZaryteVambraces)
                .addItemByName(ItemName.PegasianBoots)
                .addItemByName(ItemName.NecklaceOfAnguish)
                .addItemByName(ItemName.AvasAssembler)
            result.targetMonster = monsters.get("Tekton") as TargetMonster;
            result.calculateDPS();
        });

        test('should calculate DPS correctly', () => {
            expect(result.dps).toBeCloseTo(0);
        });

        test('should calculate maxHit correctly', () => {
            expect(result.maxHit).toBe(0);
        });
    });
});

