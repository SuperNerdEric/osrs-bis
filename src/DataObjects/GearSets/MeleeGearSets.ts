import {ItemName} from "../ItemName";
import {CombatStyle} from "../Item";
import {GearSet, gearSets, GearSetType} from "../GearSets";

export function generateMeleeGearSets(){
    const meleeBase = [
        [ItemName.TorvaFullHelm, ItemName.TorvaPlatebody, ItemName.TorvaPlatelegs, ItemName.FerociousGloves, ItemName.InfernalCape, ItemName.AmuletOfTorture],
        [ItemName.TorvaFullHelm, ItemName.TorvaPlatebody, ItemName.TorvaPlatelegs, ItemName.FerociousGloves, ItemName.InfernalCape, ItemName.AmuletOfTorture, ItemName.UltorRing],
        [ItemName.TorvaFullHelm, ItemName.TorvaPlatebody, ItemName.TorvaPlatelegs, ItemName.FerociousGloves, ItemName.InfernalCape, ItemName.AmuletOfTorture, ItemName.BellatorRing],
        [ItemName.NeitiznotFaceguard, ItemName.BandosChestplate, ItemName.BandosTassets, ItemName.FerociousGloves, ItemName.FireCape, ItemName.AmuletOfFury],
        [ItemName.NeitiznotFaceguard, ItemName.BandosChestplate, ItemName.BandosTassets, ItemName.FerociousGloves, ItemName.FireCape, ItemName.AmuletOfFury, ItemName.BerserkerRingI],
        [ItemName.VoidMeleeHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves, ItemName.InfernalCape, ItemName.AmuletOfTorture, ItemName.UltorRing],
        [ItemName.VoidMeleeHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves, ItemName.InfernalCape, ItemName.AmuletOfTorture, ItemName.BellatorRing]
    ]

    meleeBase.forEach(base => {
        base.push(ItemName.PrimordialBoots);
    })

    meleeBase.forEach(base => {
        new GearSet([GearSetType.General], ItemName.ScytheOfVitur, CombatStyle.Chop, base);
        //new GearSet([GearSetType.General], ItemName.ScytheOfVitur, CombatStyle.Jab, base);
        new GearSet([GearSetType.General], ItemName.SoulreaperAxe, CombatStyle.Hack, base);
        //new GearSet([GearSetType.General], ItemName.SoulreaperAxe, CombatStyle.Smash, base);
        new GearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        //new GearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Slash, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.General], ItemName.GhraziRapier, CombatStyle.Stab, [...base, ItemName.AvernicDefender]);
        //new GearSet([GearSetType.General], ItemName.ZamorakianHasta, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);


        new GearSet([GearSetType.Kalphites], ItemName.KerisPartisan, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.Kalphites], ItemName.KerisPartisanOfBreaching, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);

        new GearSet([GearSetType.Demon], ItemName.Arclight, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        //new GearSet([GearSetType.Demon], ItemName.Arclight, CombatStyle.Slash, [...base, ItemName.AvernicDefender]);
        new GearSet([GearSetType.Draconic], ItemName.DragonHunterLance, CombatStyle.Lunge, [...base, ItemName.AvernicDefender]);
        //new GearSet([GearSetType.Draconic], ItemName.DragonHunterLance, CombatStyle.Swipe, [...base, ItemName.AvernicDefender]);
    })
}