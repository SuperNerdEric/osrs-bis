import {ItemName} from "../ItemName";
import {CombatStyle, Slot} from "../Item";
import {GearSet, gearSets, GearSetType} from "../GearSets";
import * as _ from "lodash";

export function generateMageGearsets() {
    const mageBase = [
        [ItemName.AncestralHat, ItemName.AncestralRobeTop, ItemName.AncestralRobeBottom, ItemName.TormentedBracelet],
        [ItemName.AhrimsHood, ItemName.AhrimsRobetop, ItemName.AhrimsRobeskirt, ItemName.ZaryteVambraces],
        [ItemName.AhrimsRobetop, ItemName.AhrimsRobeskirt, ItemName.ZaryteVambraces],
        [ItemName.VoidMageHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves]
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
        {name: ItemName.TumekensShadow, styles: [CombatStyle.Accurate]},
        {name: ItemName.SanguinestiStaff, styles: [CombatStyle.Accurate]}
    ];

    mageBase.forEach(base => {
        weapons.forEach(weapon => {
            weapon.styles.forEach(style => {
                const gearSet = new GearSet([GearSetType.General]);
                gearSet.addItemByName(weapon.name);
                gearSet.setCombatStyle(style);

                base.forEach(itemName => gearSet.addItemByName(itemName));

                if (gearSet.getWeapon()?.slot === Slot.MainHand) {
                    const cloneWithElidinisWardF = _.cloneDeep(gearSet);
                    cloneWithElidinisWardF.addItemByName(ItemName.ElidinisWardF);
                    gearSets.push(cloneWithElidinisWardF);

                    const cloneWithBookOfTheDead = _.cloneDeep(gearSet);
                    cloneWithBookOfTheDead.addItemByName(ItemName.BookOfTheDead);
                    gearSets.push(cloneWithBookOfTheDead);
                } else {
                    gearSets.push(gearSet);
                }
            })
        });
    })
}