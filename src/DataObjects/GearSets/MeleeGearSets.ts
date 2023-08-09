import {ItemName} from "../ItemName";
import {CombatStyle} from "../Item";
import {GearSet, gearSets, GearSetType} from "../GearSets";

export function generateMeleeGearSets(){
    const combine = (base: ItemName[][], additional: (ItemName | null)[]): ItemName[][] =>
        base.flatMap(set =>
            additional.map(item => item ? [...set, item] : set)
        );

    let meleeBase: ItemName[][] = [
        [ItemName.InquisitorsGreatHelm, ItemName.InquisitorsHauberk, ItemName.InquisitorsPlateskirt, ItemName.FerociousGloves, ItemName.PrimordialBoots],
        [ItemName.TorvaFullHelm, ItemName.TorvaPlatebody, ItemName.TorvaPlatelegs, ItemName.FerociousGloves, ItemName.PrimordialBoots],
        [ItemName.NeitiznotFaceguard, ItemName.BandosChestplate, ItemName.BandosTassets, ItemName.FerociousGloves, ItemName.PrimordialBoots],
        [ItemName.VoidMeleeHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves, ItemName.PrimordialBoots],
    ];

    const meleeRings = [null, ItemName.BerserkerRingI, ItemName.UltorRing, ItemName.BellatorRing];
    const meleeCapes = [ItemName.FireCape, ItemName.InfernalCape];
    const meleeAmulets = [ItemName.AmuletOfTorture, ItemName.AmuletOfFury];

    meleeBase = combine(meleeBase, meleeRings);
    meleeBase = combine(meleeBase, meleeCapes);
    meleeBase = combine(meleeBase, meleeAmulets);

    meleeBase.forEach(base => {
        new GearSet([GearSetType.General], ItemName.ScytheOfVitur, CombatStyle.Chop, base);
        new GearSet([GearSetType.General], ItemName.ScytheOfVitur, CombatStyle.Jab, base);
        new GearSet([GearSetType.General], ItemName.SoulreaperAxe, CombatStyle.Hack, base);
        new GearSet([GearSetType.General], ItemName.SoulreaperAxe, CombatStyle.Smash, base);
        new GearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Slash, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.General], ItemName.GhraziRapier, CombatStyle.Stab, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.General], ItemName.ZamorakianHasta, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);

        new GearSet([GearSetType.General], ItemName.AbyssalBludgeon, CombatStyle.Pound, base);
        new GearSet([GearSetType.General], ItemName.InquisitorsMace, CombatStyle.Pound, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.General], ItemName.InquisitorsMace, CombatStyle.Pummel, [...base, ItemName.AvernicDefender]);

        new GearSet([GearSetType.Kalphites], ItemName.KerisPartisan, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.Kalphites], ItemName.KerisPartisan, CombatStyle.Pound, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.Kalphites], ItemName.KerisPartisanOfBreaching, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.Kalphites], ItemName.KerisPartisanOfBreaching, CombatStyle.Pound, [...base, ItemName.AvernicDefender]);

        new GearSet([GearSetType.Demon], ItemName.Arclight, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.Demon], ItemName.Arclight, CombatStyle.Slash, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.Draconic], ItemName.DragonHunterLance, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.Draconic], ItemName.DragonHunterLance, CombatStyle.Swipe, [...base, ItemName.AvernicDefender]);
    })
}