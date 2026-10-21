import { ItemName } from "../Calculator/DataObjects/ItemName";
import { CombatStyle, Slot } from "../Calculator/DataObjects/Item";
import { GearSet, gearSets, GearSetType } from "../Calculator/DataObjects/GearSets";
import * as _ from "lodash";
import { SpellName } from "../Calculator/DataObjects/SpellName";

export function generateMageGearsets() {
    const mageBase = [
        [ItemName.AncestralHat, ItemName.AncestralRobeTop, ItemName.AncestralRobeBottom, ItemName.TormentedBracelet],
        [ItemName.AncestralRobeTop, ItemName.AncestralRobeBottom, ItemName.TormentedBracelet],
        [ItemName.AhrimsHood, ItemName.AhrimsRobetop, ItemName.AhrimsRobeskirt, ItemName.TormentedBracelet],
        [ItemName.AhrimsRobetop, ItemName.AhrimsRobeskirt, ItemName.TormentedBracelet],
        [ItemName.VoidMageHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves],
        [ItemName.VirtusMask, ItemName.VirtusRobeTop, ItemName.VirtusRobeBottom, ItemName.TormentedBracelet],
    ];

    mageBase.push(
        ...mageBase
            .filter((base) => base.includes(ItemName.TormentedBracelet))
            .map((base) =>
                base.map((item) => (item === ItemName.TormentedBracelet ? ItemName.ConflictionGauntlets : item)),
            ),
    );

    mageBase.forEach((base) => {
        base.push(ItemName.OccultNecklace);
        base.push(ItemName.ImbuedZamorakCape);
    });

    mageBase.forEach((base) => {
        const mageRings = [null, ItemName.MagusRing];
        mageRings.forEach((ring) => {
            if (ring) {
                const newSet = [...base];
                newSet.push(ring);
                mageBase.push(newSet);
            }
        });
    });

    mageBase.forEach((base) => {
        const mageBoots = [null, ItemName.EternalBoots, ItemName.AvernicTreadsMax];
        mageBoots.forEach((boots) => {
            if (boots) {
                const newSet = [...base];
                newSet.push(boots);
                mageBase.push(newSet);
            }
        });
    });

    const weapons = [
        {
            name: ItemName.TumekensShadow,
            styles: [CombatStyle.Accurate],
            isPowered: true,
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.SanguinestiStaff,
            styles: [CombatStyle.Accurate],
            isPowered: true,
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.HarmonisedNightmareStaff,
            styles: [CombatStyle.Accurate],
            isPowered: false,
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.KodaiWand,
            styles: [CombatStyle.Accurate],
            isPowered: false,
            gearSetType: GearSetType.General,
        },
        { name: ItemName.EyeOfAyak, styles: [CombatStyle.Accurate], isPowered: true, gearSetType: GearSetType.General },
        {
            name: ItemName.ZoryasTome,
            styles: [CombatStyle.Accurate],
            isPowered: true,
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.TwinflameStaff,
            styles: [CombatStyle.Accurate],
            isPowered: false,
            gearSetType: GearSetType.General,
        },
        { name: ItemName.PurgingStaff, styles: [CombatStyle.Spell], isPowered: false, gearSetType: GearSetType.Demon },
    ];

    const surgeSpells = [
        { name: SpellName.WindSurge },
        { name: SpellName.WaterSurge },
        { name: SpellName.EarthSurge },
        { name: SpellName.FireSurge },
        { name: SpellName.IceBarrage },
    ];
    const waveSpells = [
        { name: SpellName.WindWave },
        { name: SpellName.WaterWave },
        { name: SpellName.EarthWave },
        { name: SpellName.FireWave },
    ];
    const demonbaneSpells = [{ name: SpellName.DarkDemonbane }, { name: SpellName.SuperiorDemonbane }];

    const offhands = [
        ItemName.ElidinisWardF,
        ItemName.BookOfTheDead,
        ItemName.TomeOfFire,
        ItemName.TomeOfWater,
        ItemName.TomeOfEarth,
        null,
    ];

    mageBase.forEach((base) => {
        weapons.forEach((weapon) => {
            const gearSetType = weapon.gearSetType || GearSetType.General;
            const spellsForWeapon =
                weapon.name === ItemName.PurgingStaff
                    ? demonbaneSpells
                    : weapon.name === ItemName.TwinflameStaff
                      ? [...waveSpells, ...surgeSpells]
                      : surgeSpells;

            weapon.styles.forEach((style) => {
                if (weapon.isPowered) {
                    const gearSet = new GearSet([gearSetType]);
                    gearSet.addItemByName(weapon.name);
                    gearSet.setCombatStyle(style);
                    base.forEach((itemName) => gearSet.addItemByName(itemName));

                    if (gearSet.getWeapon()?.slot === Slot.MainHand) {
                        offhands.forEach((offhand) => {
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
                    spellsForWeapon.forEach((spell) => {
                        const spellGearSet = new GearSet([gearSetType]);
                        spellGearSet.addItemByName(weapon.name);
                        spellGearSet.setCombatStyle(CombatStyle.Spell);
                        spellGearSet.setSpellByName(spell.name);
                        base.forEach((itemName) => spellGearSet.addItemByName(itemName));

                        if (spellGearSet.getWeapon()?.slot === Slot.MainHand) {
                            offhands.forEach((offhand) => {
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
