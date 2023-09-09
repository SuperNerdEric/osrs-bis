import {ItemName} from "../Calculator/DataObjects/ItemName";
import {CombatStyle, Slot} from "../Calculator/DataObjects/Item";
import {GearSet, gearSets, GearSetType} from "../Calculator/DataObjects/GearSets";
import * as _ from "lodash";
import {SpellName} from "../Calculator/DataObjects/SpellName";

export function generateMageGearsets() {
    const mageBase = [
        [ItemName.AncestralHat, ItemName.AncestralRobeTop, ItemName.AncestralRobeBottom, ItemName.TormentedBracelet],
        [ItemName.AncestralRobeTop, ItemName.AncestralRobeBottom, ItemName.TormentedBracelet],
        [ItemName.AhrimsHood, ItemName.AhrimsRobetop, ItemName.AhrimsRobeskirt, ItemName.TormentedBracelet],
        [ItemName.AhrimsRobetop, ItemName.AhrimsRobeskirt, ItemName.TormentedBracelet],
        [ItemName.VoidMageHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves],
        [ItemName.VirtusMask, ItemName.VirtusRobeTop, ItemName.VirtusRobeBottom, ItemName.TormentedBracelet]

    ]

    mageBase.forEach(base => {
        base.push(ItemName.OccultNecklace);
        base.push(ItemName.ImbuedZamorakCape);
    })

    mageBase.forEach(base => {
        const mageRings = [null, ItemName.MagusRing];
        mageRings.forEach(ring => {
            if (ring) {
                const newSet = [...base];
                newSet.push(ring);
                mageBase.push(newSet);
            }
        })
    })

    mageBase.forEach(base => {
        const mageBoots = [null, ItemName.EternalBoots];
        mageBoots.forEach(boots => {
            if (boots) {
                const newSet = [...base];
                newSet.push(boots);
                mageBase.push(newSet);
            }
        })
    })

    const weapons = [
        {name: ItemName.TumekensShadow, styles: [CombatStyle.Accurate], isPowered: true},
        {name: ItemName.SanguinestiStaff, styles: [CombatStyle.Accurate], isPowered: true},
        {name: ItemName.HarmonisedNightmareStaff, styles: [CombatStyle.Accurate], isPowered: false},
        {name: ItemName.KodaiWand, styles: [CombatStyle.Accurate], isPowered: false}
    ];

    const spells = [
        {name: SpellName.WaterSurge, requiredOffhand: ItemName.TomeOfWater},
        {name: SpellName.FireSurge, requiredOffhand: ItemName.TomeOfFire},
        {name: SpellName.IceBarrage, requiredOffhand: null}
    ];


    const offhands = [
        ItemName.ElidinisWardF,
        ItemName.BookOfTheDead,
        ItemName.TomeOfFire,
        ItemName.TomeOfWater,
        null
    ];

    mageBase.forEach(base => {
        weapons.forEach(weapon => {
            weapon.styles.forEach(style => {
                if (weapon.isPowered) {
                    const gearSet = new GearSet([GearSetType.General]);
                    gearSet.addItemByName(weapon.name);
                    gearSet.setCombatStyle(style);
                    base.forEach(itemName => gearSet.addItemByName(itemName));

                    if (gearSet.getWeapon()?.slot === Slot.MainHand) {
                        offhands.forEach(offhand => {
                            if (offhand) {
                                const offhandClone = _.cloneDeep(gearSet);
                                offhandClone.addItemByName(offhand);
                                gearSets.push(offhandClone);
                            }
                        });
                    } else {
                        gearSets.push(gearSet);
                    }
                } else {
                    spells.forEach(spell => {
                        const spellGearSet = new GearSet([GearSetType.General]);
                        spellGearSet.addItemByName(weapon.name);
                        spellGearSet.setCombatStyle(CombatStyle.Spell);
                        spellGearSet.setSpellByName(spell.name);
                        base.forEach(itemName => spellGearSet.addItemByName(itemName));

                        if (spellGearSet.getWeapon()?.slot === Slot.MainHand) {
                            offhands.forEach(offhand => {
                                if (offhand) {
                                    const offhandClone = _.cloneDeep(spellGearSet);
                                    offhandClone.addItemByName(offhand);
                                    gearSets.push(offhandClone);
                                }
                            });
                        } else {
                            gearSets.push(spellGearSet);
                        }
                    });
                }
            });
        });
    });
}