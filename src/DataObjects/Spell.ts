import {SpellName} from "./SpellName";

export class Spell {
    constructor(public name: SpellName, public maxHit: number, public wikiLink: string) {}
}

export class SpellBook {
    private static spellsMap = new Map<SpellName, Spell>();

   static initialize() {
        this.initializeStandardSpells();
        this.initializeArceuusSpells();
        this.initializeAncientSpells();
    }

    private static addSpell(name: SpellName, maxHit: number) {
       const wikiLink = "https://oldschool.runescape.wiki/w/" + name.toString().replace(" ", "_");
        const spell = new Spell(name, maxHit, wikiLink);
        this.spellsMap.set(name, spell);
    }

    public static getSpell(name: SpellName): Spell | undefined {
        return this.spellsMap.get(name);
    }

    private static initializeStandardSpells() {
        this.addSpell(SpellName.WindStrike, 2);
        this.addSpell(SpellName.WaterStrike, 4);
        this.addSpell(SpellName.EarthStrike, 6);
        this.addSpell(SpellName.FireStrike, 8);
        this.addSpell(SpellName.WindBolt, 9);
        this.addSpell(SpellName.WaterBolt, 10);
        this.addSpell(SpellName.EarthBolt, 11);
        this.addSpell(SpellName.FireBolt, 12);
        this.addSpell(SpellName.WindBlast, 13);
        this.addSpell(SpellName.WaterBlast, 14);
        this.addSpell(SpellName.CrumbleUndead, 15);
        this.addSpell(SpellName.EarthBlast, 15);
        this.addSpell(SpellName.FireBlast, 16);
        this.addSpell(SpellName.WindWave, 17);
        this.addSpell(SpellName.WaterWave, 18);
        this.addSpell(SpellName.EarthWave, 19);
        this.addSpell(SpellName.SaradominStrike, 20);
        this.addSpell(SpellName.ClawsOfGuthix, 20);
        this.addSpell(SpellName.FlamesOfZamorak, 20);
        this.addSpell(SpellName.FireWave, 20);
        this.addSpell(SpellName.WindSurge, 21);
        this.addSpell(SpellName.WaterSurge, 22);
        this.addSpell(SpellName.EarthSurge, 23);
        this.addSpell(SpellName.FireSurge, 24);
        this.addSpell(SpellName.IbanBlast, 25);
    }

    private static initializeArceuusSpells() {
        this.addSpell(SpellName.GhostlyGrasp, 12);
        this.addSpell(SpellName.SkeletalGrasp, 17);
        this.addSpell(SpellName.UndeadGrasp, 24);
        this.addSpell(SpellName.InferiorDemonbane, 16);
        this.addSpell(SpellName.SuperiorDemonbane, 23);
        this.addSpell(SpellName.DarkDemonbane, 30);
    }

    private static initializeAncientSpells() {
        this.addSpell(SpellName.SmokeRush, 13);
        this.addSpell(SpellName.ShadowRush, 14);
        this.addSpell(SpellName.BloodRush, 15);
        this.addSpell(SpellName.IceRush, 16);
        this.addSpell(SpellName.SmokeBurst, 17);
        this.addSpell(SpellName.ShadowBurst, 18);
        this.addSpell(SpellName.BloodBurst, 21);
        this.addSpell(SpellName.IceBurst, 22);
        this.addSpell(SpellName.SmokeBlitz, 23);
        this.addSpell(SpellName.ShadowBlitz, 24);
        this.addSpell(SpellName.BloodBlitz, 25);
        this.addSpell(SpellName.IceBlitz, 26);
        this.addSpell(SpellName.SmokeBarrage, 27);
        this.addSpell(SpellName.ShadowBarrage, 28);
        this.addSpell(SpellName.BloodBarrage, 29);
        this.addSpell(SpellName.IceBarrage, 30);
    }
}

SpellBook.initialize();