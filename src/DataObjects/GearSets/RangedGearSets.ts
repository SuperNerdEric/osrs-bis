import {ItemName} from "../ItemName";
import {CombatStyle, Slot} from "../Item";
import {GearSet, gearSets, GearSetType} from "../GearSets";
import * as _ from "lodash";

export function generateRangedGearSets() {
    const rangedBase = [
        [ItemName.CrystalHelm, ItemName.CrystalBody, ItemName.CrystalLegs, ItemName.ZaryteVambraces],
        [ItemName.MasoriMaskF, ItemName.MasoriBodyF, ItemName.MasoriChapsF, ItemName.ZaryteVambraces],
        [ItemName.ArmadylHelmet, ItemName.ArmadylChestplate, ItemName.ArmadylChainskirt, ItemName.ZaryteVambraces],
        [ItemName.VoidRangerHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves]
    ]

    rangedBase.forEach(base => {
        base.push(ItemName.NecklaceOfAnguish);
        base.push(ItemName.AvasAssembler);
    })

    rangedBase.forEach(base => {
        const rangedRings = [null, ItemName.VenatorRing];
        rangedRings.forEach(ring => {
            if (ring) {
                const newSet = [...base];
                newSet.push(ring);
                rangedBase.push(newSet);
            }
        })
    })

    rangedBase.forEach(base => {
        const rangedBoots = [null, ItemName.PegasianBoots];
        rangedBoots.forEach(boots => {
            if (boots) {
                const newSet = [...base];
                newSet.push(boots);
                rangedBase.push(newSet);
            }
        })
    })

    const weaponsWithAmmo = [
        {
            name: ItemName.ToxicBlowpipe,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.DragonDart],
            gearSetType: GearSetType.General
        },
        {
            name: ItemName.ToxicBlowpipe,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.AmethystDart],
            gearSetType: GearSetType.General
        },
        {
            name: ItemName.TwistedBow,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.DragonArrow],
            gearSetType: GearSetType.General
        },
        {
            name: ItemName.ArmadylCrossbow,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.RubyDragonBoltsE, ItemName.DiamondDragonBoltsE],
            offhand: ItemName.TwistedBuckler,
            gearSetType: GearSetType.General
        },
        {
            name: ItemName.ZaryteCrossbow,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.RubyDragonBoltsE, ItemName.DiamondDragonBoltsE, ItemName.OnyxDragonBoltsE],
            offhand: ItemName.TwistedBuckler,
            gearSetType: GearSetType.General
        },
        {
            name: ItemName.DragonHunterCrossbow,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.RubyDragonBoltsE, ItemName.DiamondDragonBoltsE, ItemName.OnyxDragonBoltsE],
            offhand: ItemName.TwistedBuckler,
            gearSetType: GearSetType.General
        }
    ];

    const weaponsWithoutAmmo = [
        {
            name: ItemName.BowOfFaerdhinen,
            styles: [CombatStyle.Accurate, CombatStyle.Rapid],
            gearSetType: GearSetType.General
        }
    ];

    rangedBase.forEach(base => {
        weaponsWithAmmo.forEach(weaponEntry => {
            weaponEntry.styles.forEach(style => {
                weaponEntry.ammos.forEach(ammo => {
                    const gearSet = new GearSet([weaponEntry.gearSetType]);
                    gearSet.addItemByName(weaponEntry.name);
                    gearSet.setCombatStyle(style);

                    const weapon = gearSet.getWeapon();
                    if (weapon && weapon.slot === Slot.MainHand) {
                        gearSet.addItemByName(ItemName.TwistedBuckler);
                    }

                    base.forEach(itemName => gearSet.addItemByName(itemName));
                    gearSet.addItemByName(ammo);
                    gearSets.push(gearSet);
                })
            });
        });

        weaponsWithoutAmmo.forEach(weaponEntry => {
            weaponEntry.styles.forEach(style => {
                const gearSet = new GearSet([weaponEntry.gearSetType]);
                gearSet.addItemByName(weaponEntry.name);
                gearSet.setCombatStyle(style);

                base.forEach(itemName => gearSet.addItemByName(itemName));
                gearSets.push(gearSet);
            });
        });
    });

}

