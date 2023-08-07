import {Calculator} from './Calculator';
import {TargetMonster} from '../DataObjects/TargetMonster';
import {Player} from '../DataObjects/Player';
import {GearSet, GearSetType} from "../DataObjects/GearSets";
import {monsters} from "../DataObjects/Monsters";
import {CombatStyle} from "../DataObjects/Item";
import {ItemName} from '../DataObjects/ItemName';
import {Raid} from "../DataObjects/Raid";

describe('Calculator class', () => {
    let result: Calculator;

    beforeEach(() => {
        // @ts-ignore
        result = new Calculator();
        result.player = new Player();
        result.player.attackLevelBoost = 19;
        result.player.strengthLevelBoost = 19;
        result.player.rangedLevelBoost = 13;
        result.player.magicLevelBoost = 10; //imbued heart
        result.targetMonster = monsters.get("Armadyl") as TargetMonster;
    });

    describe('with Osmumtens fang in ToA melee gear set', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.TorvaFullHelm,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("Ba-Ba") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(300);
            expect(result.dps).toBeCloseTo(7.833);  //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(300);
            expect(result.maxHit).toBe(48);  //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(300);
            expect(result.hitChance).toBeCloseTo(0.8393);  //Matches fruitdeeps
        });
    });

    describe('with melee gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.SlayerHelmetI,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.onTask = false;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(3.214);
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(46); //Tested in game
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.3572);
        });
    });

    describe('with melee gear set including Slayer helmet (i) and onTask is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.SlayerHelmetI,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.onTask = true;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(4.375);
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(54); //Tested in game
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.4167);
        });
    });

    describe('with ranged gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [
                ItemName.DragonArrow,
                ItemName.SlayerHelmetI,
                ItemName.MasoriBodyF,
                ItemName.MasoriChapsF,
                ItemName.ZaryteVambraces,
                ItemName.NecklaceOfAnguish,
                ItemName.AvasAssembler
            ]);
            result.onTask = false;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(3.625); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(68); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.3198); //Matches fruitdeeps
        });
    });

    describe('with ranged gear set including Slayer helmet (i) and onTask is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [
                ItemName.DragonArrow,
                ItemName.SlayerHelmetI,
                ItemName.MasoriBodyF,
                ItemName.MasoriChapsF,
                ItemName.ZaryteVambraces,
                ItemName.NecklaceOfAnguish,
                ItemName.AvasAssembler
            ]);
            result.onTask = true;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(4.782); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(78); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.3678); //Matches fruitdeeps
        });
    });

    describe('tbow slayer dummy test', () => {
        beforeEach(() => {
            result.targetMonster = monsters.get("Undead Combat Dummy") as TargetMonster;
            result.onTask = true;
        });

        test('should calculate maxHit correctly', () => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [
                ItemName.BronzeArrow,
                ItemName.SlayerHelmetI,
                ItemName.MasoriBodyF
            ]);
            result.targetMonster = monsters.get("Undead Combat Dummy") as TargetMonster;
            result.calculateDPS(0);
            expect(result.maxHit).toBe(53); //Tested in game
        });
    });

    describe('with mage gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
                ItemName.ElidinisWardF,
                ItemName.SlayerHelmetI,
                ItemName.AncestralRobeTop,
                ItemName.AncestralRobeBottom,
                ItemName.TormentedBracelet,
                ItemName.OccultNecklace,
                ItemName.ImbuedZamorakCape
            ]);
            result.onTask = false;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(2.625); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(44); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.2864); //Matches fruitdeeps
        });
    });

    describe('with mage gear set including Slayer helmet (i) and onTask is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
                ItemName.ElidinisWardF,
                ItemName.SlayerHelmetI,
                ItemName.AncestralRobeTop,
                ItemName.AncestralRobeBottom,
                ItemName.TormentedBracelet,
                ItemName.OccultNecklace,
                ItemName.ImbuedZamorakCape
            ]);
            result.onTask = true;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(3.431); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(50); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.3293); //Matches fruitdeeps
        });
    });

    describe('with Tumekens shadow mage gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TumekensShadow, CombatStyle.Accurate, [
                ItemName.SlayerHelmetI,
                ItemName.AncestralRobeTop,
                ItemName.AncestralRobeBottom,
                ItemName.TormentedBracelet,
                ItemName.OccultNecklace,
                ItemName.ImbuedZamorakCape
            ]);
            result.onTask = false;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(6.024); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(60); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.6024); //Matches fruitdeeps
        });
    });

    describe('with Tumekens shadow mage gear set including Slayer helmet (i) and onTask is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TumekensShadow, CombatStyle.Accurate, [
                ItemName.SlayerHelmetI,
                ItemName.AncestralRobeTop,
                ItemName.AncestralRobeBottom,
                ItemName.TormentedBracelet,
                ItemName.OccultNecklace,
                ItemName.ImbuedZamorakCape
            ]);
            result.onTask = true;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(7.524); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(69); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.6524); //Matches fruitdeeps
        });
    });

    describe('with Tumekens shadow in ToA mage gear set', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TumekensShadow, CombatStyle.Accurate, [
                ItemName.AncestralHat,
                ItemName.AncestralRobeTop,
                ItemName.AncestralRobeBottom,
                ItemName.TormentedBracelet,
                ItemName.OccultNecklace,
                ItemName.ImbuedZamorakCape,
            ], Raid.TombsOfAmascut);
            result.targetMonster = monsters.get("Zebak") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(300);
            expect(result.dps).toBeCloseTo(7.776); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(300);
            expect(result.maxHit).toBe(71); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(300);
            expect(result.hitChance).toBeCloseTo(0.6571); //Matches fruitdeeps
        });
    });

    describe('with Tumekens shadow against Verzik', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TumekensShadow, CombatStyle.Accurate, [
                ItemName.AncestralHat,
                ItemName.AncestralRobeTop,
                ItemName.AncestralRobeBottom,
                ItemName.TormentedBracelet,
                ItemName.OccultNecklace,
                ItemName.ImbuedZamorakCape,
            ]);
            result.targetMonster = monsters.get("Verzik P2") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(6.378); //Matches Bitterkoekje
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(62); //Matches fruitdeeps and Bitterkoekje
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.6172); //Matches Bitterkoekje
        });
    });

    describe('with Twisted bow in CoX', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [
                ItemName.DragonArrow,
                ItemName.MasoriMaskF,
                ItemName.MasoriBodyF,
                ItemName.MasoriChapsF,
                ItemName.ZaryteVambraces,
                ItemName.NecklaceOfAnguish,
                ItemName.AvasAssembler
            ]);
            result.targetMonster = monsters.get("Olm (Head)") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(10.557); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(77); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.8226); //Matches fruitdeeps
        });
    });

    describe('with Scythe on large monster', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.ScytheOfVitur, CombatStyle.Chop, [
                ItemName.TorvaFullHelm,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("Bloat") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(11.534); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(81); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.8544); //Matches fruitdeeps
        });
    });

    describe('with Keris partisan on kalphite', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.KerisPartisan, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.TorvaFullHelm,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("KQ") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(4.760); //Higher than fruitdeeps because their max hit is too low for proc
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(165); //Tested in game hitting 55 without proc and then 165 with proc
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.3997); //Matches fruitdeeps
        });
    });

    describe('with Keris partisan of breaching on kalphite', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.KerisPartisanOfBreaching, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.TorvaFullHelm,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("KQ") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(6.308); //Higher than fruitdeeps because their max hit is too low for proc
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(165); //Tested in game hitting 55 without proc and then 165 with proc
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.5309); //Matches fruitdeeps
        });
    });

    describe('with Keris partisan of breaching on kalphite slayer task', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.KerisPartisanOfBreaching, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.SlayerHelmetI,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("KQ") as TargetMonster;
            result.onTask = true;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(7.883); //Higher than fruitdeeps because their max hit is too low for proc
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(183); //Tripled fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.5979); //Matches fruitdeeps
        });
    });

    describe('with Keris partisan of breaching on kalphite slayer task on pound combat style', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.Slayer], ItemName.KerisPartisanOfBreaching, CombatStyle.Pound, [
                ItemName.AvernicDefender,
                ItemName.SlayerHelmetI,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("KQ") as TargetMonster;
            result.onTask = true;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(9.695); //Higher than fruitdeeps because their max hit is too low for proc
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(183); //Tripled fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.7348); //Matches fruitdeeps
        });
    });

    describe('with melee gear set including Salve amulet and undead is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.GhraziRapier, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.TorvaFullHelm,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.SalveAmulet,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("Bloat") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(10.207); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(58); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.8447); //Matches fruitdeeps
        });
    });

    describe('with melee gear set including Salve amulet (e) and undead is true', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.GhraziRapier, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.TorvaFullHelm,
                ItemName.TorvaPlatebody,
                ItemName.TorvaPlatelegs,
                ItemName.FerociousGloves,
                ItemName.PrimordialBoots,
                ItemName.SalveAmuletE,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("Bloat") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(10.613); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(60); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.8490); //Matches fruitdeeps
        });
    });

    describe('with melee void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.GhraziRapier, CombatStyle.Lunge, [
                ItemName.AvernicDefender,
                ItemName.VoidMeleeHelm,
                ItemName.VoidKnightTop,
                ItemName.VoidKnightRobe,
                ItemName.VoidKnightGloves,
                ItemName.PrimordialBoots,
                ItemName.AmuletOfTorture,
                ItemName.InfernalCape
            ]);
            result.targetMonster = monsters.get("Bloat") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(8.510); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(49); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.8336); //Matches fruitdeeps
        });
    });

    describe('with ranged void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [
                ItemName.DragonArrow,
                ItemName.VoidRangerHelm,
                ItemName.VoidKnightTop,
                ItemName.VoidKnightRobe,
                ItemName.VoidKnightGloves,
                ItemName.NecklaceOfAnguish,
                ItemName.AvasAssembler
            ]);
            result.targetMonster = monsters.get("Bloat") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(1.532); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(62); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.1482); //Matches fruitdeeps
        });
    });

    describe('with ranged elite void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [
                ItemName.DragonArrow,
                ItemName.VoidRangerHelm,
                ItemName.EliteVoidTop,
                ItemName.EliteVoidRobe,
                ItemName.VoidKnightGloves,
                ItemName.NecklaceOfAnguish,
                ItemName.AvasAssembler
            ]);
            result.targetMonster = monsters.get("Bloat") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(1.532); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(62); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.1482); //Matches fruitdeeps
        });
    });

    describe('with mage void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
                ItemName.VoidMageHelm,
                ItemName.VoidKnightTop,
                ItemName.VoidKnightRobe,
                ItemName.VoidKnightGloves,
                ItemName.OccultNecklace,
                ItemName.ImbuedZamorakCape
            ]);
            result.targetMonster = monsters.get("Bloat") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(0.928); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(39); //Matches fruitdeeps
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.1143); //Matches fruitdeeps
        });
    });

    describe('with elite mage void', () => {
        beforeEach(() => {
            result.gearSet = new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
                ItemName.VoidMageHelm,
                ItemName.EliteVoidTop,
                ItemName.EliteVoidRobe,
                ItemName.VoidKnightGloves,
                ItemName.OccultNecklace,
                ItemName.ImbuedZamorakCape
            ]);
            result.targetMonster = monsters.get("Bloat") as TargetMonster;
        });

        test('should calculate DPS correctly', () => {
            result.calculateDPS(0);
            expect(result.dps).toBeCloseTo(0.9522); //Matches fruitdeeps
        });

        test('should calculate maxHit correctly', () => {
            result.calculateDPS(0);
            expect(result.maxHit).toBe(40); //Matches Bitterkoekje and tested in game
        });

        test('should calculate hitChance correctly', () => {
            result.calculateDPS(0);
            expect(result.hitChance).toBeCloseTo(0.1143); //Matches fruitdeeps
        });
    });
});
