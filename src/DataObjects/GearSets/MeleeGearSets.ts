import {ItemName} from "../ItemName";
import {CombatStyle, Slot} from "../Item";
import {GearSet, gearSets, GearSetType} from "../GearSets";
import {items} from "../Items";

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

    const meleeRings = [null, ItemName.BerserkerRingI, ItemName.WarriorRingI, ItemName.UltorRing, ItemName.BellatorRing];
    const meleeOffhands = [ItemName.DragonDefender, ItemName.AvernicDefender];
    const meleeCapes = [ItemName.FireCape, ItemName.InfernalCape];
    const meleeAmulets = [ItemName.AmuletOfTorture, ItemName.AmuletOfFury];

    meleeBase = combine(meleeBase, meleeRings);
    meleeBase = combine(meleeBase, meleeCapes);
    meleeBase = combine(meleeBase, meleeAmulets);

    const weaponsWithStyles: { name: ItemName, styles: CombatStyle[], gearSetType: GearSetType }[] = [
        { name: ItemName.ScytheOfVitur, styles: [CombatStyle.Reap, CombatStyle.Chop, CombatStyle.Jab], gearSetType: GearSetType.General },
        { name: ItemName.SoulreaperAxe, styles: [CombatStyle.Hack, CombatStyle.Smash], gearSetType: GearSetType.General },
        { name: ItemName.OsmumtensFang, styles: [CombatStyle.Lunge, CombatStyle.Slash], gearSetType: GearSetType.General },
        { name: ItemName.GhraziRapier, styles: [CombatStyle.Stab], gearSetType: GearSetType.General },
        { name: ItemName.ZamorakianSpear, styles: [CombatStyle.Lunge], gearSetType: GearSetType.General },
        { name: ItemName.ZamorakianHasta, styles: [CombatStyle.Lunge], gearSetType: GearSetType.General },
        { name: ItemName.AbyssalBludgeon, styles: [CombatStyle.Pound], gearSetType: GearSetType.General },
        { name: ItemName.InquisitorsMace, styles: [CombatStyle.Pound, CombatStyle.Pummel], gearSetType: GearSetType.General },
        { name: ItemName.AbyssalTentacle, styles: [CombatStyle.Flick, CombatStyle.Lash], gearSetType: GearSetType.General },
        { name: ItemName.AbyssalWhip, styles: [CombatStyle.Flick, CombatStyle.Lash], gearSetType: GearSetType.General },
        { name: ItemName.BladeOfSaeldor, styles: [CombatStyle.Chop, CombatStyle.Slash, CombatStyle.Lunge], gearSetType: GearSetType.General },
        { name: ItemName.DragonScimitar, styles: [CombatStyle.Chop, CombatStyle.Slash, CombatStyle.Lunge], gearSetType: GearSetType.General },
        { name: ItemName.SaradominSword, styles: [CombatStyle.Chop, CombatStyle.Slash, CombatStyle.Smash], gearSetType: GearSetType.General },
        { name: ItemName.LeafBladedSpear, styles: [CombatStyle.Lunge, CombatStyle.Swipe, CombatStyle.Pound], gearSetType: GearSetType.Leafy },
        { name: ItemName.LeafBladedSword, styles: [CombatStyle.Stab, CombatStyle.Lunge, CombatStyle.Slash], gearSetType: GearSetType.Leafy },
        { name: ItemName.LeafBladedBattleaxe, styles: [CombatStyle.Chop, CombatStyle.Hack, CombatStyle.Smash], gearSetType: GearSetType.Leafy },
        { name: ItemName.KerisPartisan, styles: [CombatStyle.Lunge, CombatStyle.Pound], gearSetType: GearSetType.Kalphites },
        { name: ItemName.KerisPartisanOfBreaching, styles: [CombatStyle.Lunge, CombatStyle.Pound], gearSetType: GearSetType.Kalphites },
        { name: ItemName.Arclight, styles: [CombatStyle.Lunge, CombatStyle.Slash], gearSetType: GearSetType.Demon },
        { name: ItemName.DragonHunterLance, styles: [CombatStyle.Lunge, CombatStyle.Swipe], gearSetType: GearSetType.Draconic },
    ];

    meleeBase.forEach(base => {
        weaponsWithStyles.forEach(weaponEntry => {
            weaponEntry.styles.forEach(style => {
                let gearSet: GearSet;
                if (weaponEntry && items.get(weaponEntry.name)!.slot === Slot.MainHand) {
                    meleeOffhands.forEach(offhand => {
                        gearSet = new GearSet([weaponEntry.gearSetType]);
                        gearSet.addItemByName(offhand);
                        gearSet.addItemByName(weaponEntry.name);
                        gearSet.setCombatStyle(style);
                        base.forEach(itemName => gearSet.addItemByName(itemName));
                        gearSets.push(gearSet);
                    })
                } else {
                    gearSet = new GearSet([weaponEntry.gearSetType]);
                    gearSet.addItemByName(weaponEntry.name);
                    gearSet.setCombatStyle(style);
                    base.forEach(itemName => gearSet.addItemByName(itemName));
                    gearSets.push(gearSet);
                }
            });
        });
    });
}