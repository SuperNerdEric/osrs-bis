import { ItemName } from "../Calculator/DataObjects/ItemName";
import { CombatStyle, Slot } from "../Calculator/DataObjects/Item";
import { GearSet, gearSets, GearSetType } from "../Calculator/DataObjects/GearSets";

export function generateRangedGearSets() {
    const rangedBase = [
        [ItemName.CrystalHelm, ItemName.CrystalBody, ItemName.CrystalLegs, ItemName.ZaryteVambraces],
        [ItemName.MasoriMaskF, ItemName.MasoriBodyF, ItemName.MasoriChapsF, ItemName.ZaryteVambraces],
        [ItemName.ArmadylHelmet, ItemName.ArmadylChestplate, ItemName.ArmadylChainskirt, ItemName.ZaryteVambraces],
        [ItemName.VoidRangerHelm, ItemName.EliteVoidTop, ItemName.EliteVoidRobe, ItemName.VoidKnightGloves],
    ];

    rangedBase.forEach((base) => {
        base.push(ItemName.NecklaceOfAnguish);
        base.push(ItemName.AvasAssembler);
    });

    rangedBase.forEach((base) => {
        const rangedRings = [null, ItemName.VenatorRing];
        rangedRings.forEach((ring) => {
            if (ring) {
                const newSet = [...base];
                newSet.push(ring);
                rangedBase.push(newSet);
            }
        });
    });

    rangedBase.forEach((base) => {
        const rangedBoots = [null, ItemName.PegasianBoots, ItemName.AvernicTreadsMax];
        rangedBoots.forEach((boots) => {
            if (boots) {
                const newSet = [...base];
                newSet.push(boots);
                rangedBase.push(newSet);
            }
        });
    });

    const replaceItem = (sets: ItemName[][], from: ItemName, choices: ItemName[]): ItemName[][] =>
        sets.flatMap((set) => choices.map((choice) => set.map((item) => (item === from ? choice : item))));

    const expandedRanged = replaceItem(
        replaceItem(rangedBase, ItemName.AvasAssembler, [ItemName.AvasAssembler, ItemName.DizanasQuiver]),
        ItemName.NecklaceOfAnguish,
        [ItemName.NecklaceOfAnguish, ItemName.NecklaceOfRupture],
    );
    rangedBase.length = 0;
    rangedBase.push(...expandedRanged);

    const weaponsWithAmmo = [
        {
            name: ItemName.ToxicBlowpipe,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.DragonDart],
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.ToxicBlowpipe,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.AmethystDart],
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.TwistedBow,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.DragonArrow, ItemName.SeekingDragonArrow],
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.AscensionCrossbows,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.DiamondAscensionBoltsE, ItemName.OnyxAscensionBoltsE, ItemName.AscensionBolts],
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.ArmadylCrossbow,
            styles: [CombatStyle.Rapid],
            ammos: [ItemName.RubyDragonBoltsE, ItemName.DiamondDragonBoltsE, ItemName.AmethystBroadBolts],
            offhand: ItemName.TwistedBuckler,
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.ZaryteCrossbow,
            styles: [CombatStyle.Rapid],
            ammos: [
                ItemName.RubyDragonBoltsE,
                ItemName.DiamondDragonBoltsE,
                ItemName.OnyxDragonBoltsE,
                ItemName.AmethystBroadBolts,
            ],
            offhand: ItemName.TwistedBuckler,
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.DragonHunterCrossbow,
            styles: [CombatStyle.Rapid],
            ammos: [
                ItemName.RubyDragonBoltsE,
                ItemName.DiamondDragonBoltsE,
                ItemName.OnyxDragonBoltsE,
                ItemName.AmethystBroadBolts,
            ],
            offhand: ItemName.TwistedBuckler,
            gearSetType: GearSetType.General,
        },
    ];

    const weaponsWithoutAmmo = [
        {
            name: ItemName.BowOfFaerdhinen,
            styles: [CombatStyle.Accurate, CombatStyle.Rapid],
            gearSetType: GearSetType.General,
        },
        {
            name: ItemName.ScorchingBow,
            styles: [CombatStyle.Rapid],
            gearSetType: GearSetType.Demon,
        },
    ];

    rangedBase.forEach((base) => {
        weaponsWithAmmo.forEach((weaponEntry) => {
            weaponEntry.styles.forEach((style) => {
                weaponEntry.ammos.forEach((ammo) => {
                    const gearSet = new GearSet([weaponEntry.gearSetType]);
                    gearSet.addItemByName(weaponEntry.name);
                    gearSet.setCombatStyle(style);

                    const weapon = gearSet.getWeapon();
                    if (weapon && weapon.slot === Slot.MainHand) {
                        gearSet.addItemByName(ItemName.TwistedBuckler);
                    }

                    base.forEach((itemName) => gearSet.addItemByName(itemName));
                    gearSet.addItemByName(ammo);
                    gearSets.push(gearSet);
                });
            });
        });

        weaponsWithoutAmmo.forEach((weaponEntry) => {
            weaponEntry.styles.forEach((style) => {
                const gearSet = new GearSet([weaponEntry.gearSetType]);
                gearSet.addItemByName(weaponEntry.name);
                gearSet.setCombatStyle(style);

                base.forEach((itemName) => gearSet.addItemByName(itemName));
                gearSets.push(gearSet);
            });
        });
    });
}
