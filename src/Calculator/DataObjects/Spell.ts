import {SpellName} from "./SpellName";


export enum SpellBookType {
    Standard,
    Arceuus,
    Ancient
}

export class Spell {
    constructor(public spellbook: SpellBookType, public name: SpellName, public maxHit: number, public wikiLink: string) {
    }
}

export class SpellBook {
    private spellsMap = new Map<SpellName, Spell>();
    private readonly type: SpellBookType;

    constructor(type: SpellBookType) {
        this.type = type;
    }

    addSpell(name: SpellName, maxHit: number) {
        const wikiLink = "https://oldschool.runescape.wiki/w/" + name.toString().replace(" ", "_");
        const spell = new Spell(this.type, name, maxHit, wikiLink);
        this.spellsMap.set(name, spell);
    }

    public getSpell(name: SpellName): Spell | undefined {
        return this.spellsMap.get(name);
    }
}

export const standardSpellbook = new SpellBook(SpellBookType.Standard);
standardSpellbook.addSpell(SpellName.WindStrike, 2);
standardSpellbook.addSpell(SpellName.WaterStrike, 4);
standardSpellbook.addSpell(SpellName.EarthStrike, 6);
standardSpellbook.addSpell(SpellName.FireStrike, 8);
standardSpellbook.addSpell(SpellName.WindBolt, 9);
standardSpellbook.addSpell(SpellName.WaterBolt, 10);
standardSpellbook.addSpell(SpellName.EarthBolt, 11);
standardSpellbook.addSpell(SpellName.FireBolt, 12);
standardSpellbook.addSpell(SpellName.WindBlast, 13);
standardSpellbook.addSpell(SpellName.WaterBlast, 14);
standardSpellbook.addSpell(SpellName.CrumbleUndead, 15);
standardSpellbook.addSpell(SpellName.EarthBlast, 15);
standardSpellbook.addSpell(SpellName.FireBlast, 16);
standardSpellbook.addSpell(SpellName.WindWave, 17);
standardSpellbook.addSpell(SpellName.WaterWave, 18);
standardSpellbook.addSpell(SpellName.EarthWave, 19);
standardSpellbook.addSpell(SpellName.SaradominStrike, 20);
standardSpellbook.addSpell(SpellName.ClawsOfGuthix, 20);
standardSpellbook.addSpell(SpellName.FlamesOfZamorak, 20);
standardSpellbook.addSpell(SpellName.FireWave, 20);
standardSpellbook.addSpell(SpellName.WindSurge, 21);
standardSpellbook.addSpell(SpellName.WaterSurge, 22);
standardSpellbook.addSpell(SpellName.EarthSurge, 23);
standardSpellbook.addSpell(SpellName.FireSurge, 24);
standardSpellbook.addSpell(SpellName.IbanBlast, 25);
standardSpellbook.addSpell(SpellName.MagicDart, 0);

export const arceuusSpellbook = new SpellBook(SpellBookType.Arceuus);
arceuusSpellbook.addSpell(SpellName.GhostlyGrasp, 12);
arceuusSpellbook.addSpell(SpellName.SkeletalGrasp, 17);
arceuusSpellbook.addSpell(SpellName.UndeadGrasp, 24);
arceuusSpellbook.addSpell(SpellName.InferiorDemonbane, 16);
arceuusSpellbook.addSpell(SpellName.SuperiorDemonbane, 23);
arceuusSpellbook.addSpell(SpellName.DarkDemonbane, 30);

export const ancientSpellbook = new SpellBook(SpellBookType.Ancient);
ancientSpellbook.addSpell(SpellName.SmokeRush, 13);
ancientSpellbook.addSpell(SpellName.ShadowRush, 14);
ancientSpellbook.addSpell(SpellName.BloodRush, 15);
ancientSpellbook.addSpell(SpellName.IceRush, 16);
ancientSpellbook.addSpell(SpellName.SmokeBurst, 17);
ancientSpellbook.addSpell(SpellName.ShadowBurst, 18);
ancientSpellbook.addSpell(SpellName.BloodBurst, 21);
ancientSpellbook.addSpell(SpellName.IceBurst, 22);
ancientSpellbook.addSpell(SpellName.SmokeBlitz, 23);
ancientSpellbook.addSpell(SpellName.ShadowBlitz, 24);
ancientSpellbook.addSpell(SpellName.BloodBlitz, 25);
ancientSpellbook.addSpell(SpellName.IceBlitz, 26);
ancientSpellbook.addSpell(SpellName.SmokeBarrage, 27);
ancientSpellbook.addSpell(SpellName.ShadowBarrage, 28);
ancientSpellbook.addSpell(SpellName.BloodBarrage, 29);
ancientSpellbook.addSpell(SpellName.IceBarrage, 30);

export const spellBookMapping = {
    [SpellBookType.Standard]: standardSpellbook,
    [SpellBookType.Arceuus]: arceuusSpellbook,
    [SpellBookType.Ancient]: ancientSpellbook
};
