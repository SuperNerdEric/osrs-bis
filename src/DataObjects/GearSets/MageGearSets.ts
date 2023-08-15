import {ItemName} from "../ItemName";
import {CombatStyle} from "../Item";
import {GearSet, GearSetType} from "../GearSets";

export function generateMageGearsets(){
    const rangedBase = [
        [ItemName.AncestralHat, ItemName.AncestralRobeTop, ItemName.AncestralRobeBottom, ItemName.TormentedBracelet],
        [ItemName.AhrimsHood, ItemName.AhrimsRobetop, ItemName.AhrimsRobeskirt, ItemName.ZaryteVambraces],
        [ItemName.AhrimsRobetop, ItemName.AhrimsRobeskirt, ItemName.ZaryteVambraces],
        [ItemName.VoidMageHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves]
    ]

    rangedBase.forEach(base => {
        base.push(ItemName.OccultNecklace);
        base.push(ItemName.ImbuedZamorakCape);
    })

    rangedBase.forEach(base => {
        const rangedRings = [null, ItemName.MagusRing];
        rangedRings.forEach(ring => {
            if(ring) {
                const newSet = [...base];
                newSet.push(ring);
                rangedBase.push(newSet);
            }
        })
    })

    rangedBase.forEach(base => {
        const rangedBoots = [null, ItemName.EternalBoots];
        rangedBoots.forEach(boots => {
            if(boots) {
                const newSet = [...base];
                newSet.push(boots);
                rangedBase.push(newSet);
            }
        })
    })

    rangedBase.forEach(base => {
        new GearSet([GearSetType.General], ItemName.TumekensShadow, CombatStyle.Accurate, base);
        new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [...base, ItemName.ElidinisWardF]);
        new GearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [...base, ItemName.BookOfTheDead]);
    })

}