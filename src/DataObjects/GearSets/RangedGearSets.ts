import {ItemName} from "../ItemName";
import {CombatStyle} from "../Item";
import {GearSet, gearSets, GearSetType} from "../GearSets";

export function generateRangedGearSets(){
    const rangedBase = [
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
            if(ring) {
                const newSet = [...base];
                newSet.push(ring);
                rangedBase.push(newSet);
            }
        })
    })

    rangedBase.forEach(base => {
        new GearSet([GearSetType.General], ItemName.ToxicBlowpipe, CombatStyle.Rapid, [...base, ItemName.DragonDart]);
        new GearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [...base, ItemName.DragonArrow]);
    })
}