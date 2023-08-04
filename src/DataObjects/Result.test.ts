import { Result } from './Result';
import { TargetMonster } from './TargetMonster';
import { Player } from './Player';
import {createGearSet} from "./GearSets";
import {monsters} from "./Monsters";

describe('Result class', () => {
    let result: Result;

    beforeEach(() => {
        result = new Result();
        result.player = new Player();
        result.player.attackLevelBoost = 19;
        result.player.strengthLevelBoost = 19;
        result.player.rangedLevelBoost = 13;
        result.player.magicLevelBoost = 10; //imbued heart
        result.targetMonster = monsters.get("Armadyl") as TargetMonster;
    });

    describe('with melee gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = createGearSet(["Osmumten's fang", "Avernic defender", "Slayer helmet (i)", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
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
            result.gearSet = createGearSet(["Osmumten's fang", "Avernic defender", "Slayer helmet (i)", "Torva platebody", "Torva platelegs", "Ferocious gloves", "Primordial boots", "Amulet of torture", "Infernal cape"]);
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
            result.gearSet = createGearSet(["Twisted bow", "Dragon arrow", "Slayer helmet (i)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
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
            result.gearSet = createGearSet(["Twisted bow", "Dragon arrow", "Slayer helmet (i)", "Masori body (f)", "Masori chaps (f)", "Zaryte vambraces", "Necklace of anguish", "Ava's assembler"]);
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
            result.gearSet = createGearSet(["Twisted bow", "Bronze arrow", "Slayer helmet (i)", "Masori body (f)"]); //31 Ranged strength found with Tbow.test.ts
            result.targetMonster = monsters.get("Undead Combat Dummy") as TargetMonster;
            result.calculateDPS(0);
            expect(result.maxHit).toBe(53); //Tested in game
        });
    });

    describe('with mage gear set including Slayer helmet (i) and onTask is false', () => {
        beforeEach(() => {
            result.gearSet = createGearSet(["Sanguinesti staff", "Elidinis' ward (f)", "Slayer helmet (i)", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"])
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
            result.gearSet = createGearSet(["Sanguinesti staff", "Elidinis' ward (f)", "Slayer helmet (i)", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"])
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
            result.gearSet = createGearSet(["Tumeken's shadow", "Slayer helmet (i)", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"])
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
            result.gearSet = createGearSet(["Tumeken's shadow", "Slayer helmet (i)", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"])
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
            result.gearSet = createGearSet(["Tumeken's shadow", "Ancestral hat", "Ancestral robe top", "Ancestral robe bottom", "Tormented bracelet", "Occult necklace", "Imbued zamorak cape"])
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

});

