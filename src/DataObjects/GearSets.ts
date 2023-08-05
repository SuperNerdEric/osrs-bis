import {CombatStyle, Item, StyleType, Weapon, WeaponCategoryOptions, WeaponStyle} from "./Item";
import {items} from "./Items";
import {ItemName} from "./ItemName";

export enum GearSetType {
    General,
    Slayer,
    Kalphites
}

export interface GearSet {
    types: GearSetType[],
    weapon: Weapon,
    combatStyle: CombatStyle,
    styleType: StyleType;
    weaponStyle: WeaponStyle;
    items: Item[]
}

export const gearSets: GearSet[] = [];


export function createGearSet(gearSetTypes: GearSetType[], weaponName: ItemName, combatStyle: CombatStyle, otherItemNames: ItemName[]): GearSet {
    const weapon = items.get(weaponName);
    if (weapon instanceof Weapon) {
        let styleType: StyleType | undefined;
        let weaponStyle: WeaponStyle | undefined;

        // If the weapon category is present in WeaponCategoryOptions
        const weaponOptions = WeaponCategoryOptions[weapon.category];

        if (weaponOptions) {
            // Look for the selected CombatStyle in the weapon's options
            const matchingOption = weaponOptions.find(option => option.combatStyle === combatStyle);
            // If a match is found, get the corresponding StyleType
            if (matchingOption) {
                styleType = matchingOption.styleType;
                weaponStyle = matchingOption.weaponStyle;
            }
        }

        if (styleType && weaponStyle) {
            const gearSet: GearSet = {
                types: gearSetTypes,
                combatStyle: combatStyle,
                styleType: styleType,
                weapon: weapon,
                weaponStyle: weaponStyle,
                items: otherItemNames.map(name => items.get(name) as Item)
            };
            gearSets.push(gearSet);
            return gearSet;
        } else {
            throw new Error(`Invalid CombatStyle for the selected weapon.`);
        }
    } else {
        throw new Error(`Weapon not found: ${weaponName}`);
    }
}

createGearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.TorvaFullHelm,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);

createGearSet([GearSetType.General], ItemName.OsmumtensFang, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.NeitiznotFaceguard,
    ItemName.BandosChestplate,
    ItemName.BandosTassets,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfFury,
    ItemName.FireCape
]);

createGearSet([GearSetType.Slayer], ItemName.OsmumtensFang, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.SlayerHelmetI,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);

createGearSet([GearSetType.General], ItemName.GhraziRapier, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.TorvaFullHelm,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);

createGearSet([GearSetType.General], ItemName.ZamorakianHasta, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.TorvaFullHelm,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);

createGearSet([GearSetType.General], ItemName.ZamorakianHasta, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.NeitiznotFaceguard,
    ItemName.BandosChestplate,
    ItemName.BandosTassets,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfFury,
    ItemName.FireCape
]);

createGearSet([GearSetType.General], ItemName.ScytheOfVitur, CombatStyle.Chop, [
    ItemName.TorvaFullHelm,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);

createGearSet([GearSetType.General], ItemName.ScytheOfVitur, CombatStyle.Chop, [
    ItemName.NeitiznotFaceguard,
    ItemName.BandosChestplate,
    ItemName.BandosTassets,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfFury,
    ItemName.FireCape
]);

createGearSet([GearSetType.General], ItemName.ToxicBlowpipe, CombatStyle.Rapid, [
    ItemName.DragonDart,
    ItemName.MasoriMaskF,
    ItemName.MasoriBodyF,
    ItemName.MasoriChapsF,
    ItemName.ZaryteVambraces,
    ItemName.NecklaceOfAnguish,
    ItemName.AvasAssembler
]);

createGearSet([GearSetType.General], ItemName.ToxicBlowpipe, CombatStyle.Rapid, [
    ItemName.DragonDart,
    ItemName.ArmadylHelmet,
    ItemName.ArmadylChestplate,
    ItemName.ArmadylChainskirt,
    ItemName.ZaryteVambraces,
    ItemName.NecklaceOfAnguish,
    ItemName.AvasAssembler
]);

createGearSet([GearSetType.Slayer], ItemName.TwistedBow, CombatStyle.Rapid, [
    ItemName.DragonArrow,
    ItemName.SlayerHelmetI,
    ItemName.MasoriBodyF,
    ItemName.MasoriChapsF,
    ItemName.ZaryteVambraces,
    ItemName.NecklaceOfAnguish,
    ItemName.AvasAssembler
]);

createGearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [
    ItemName.DragonArrow,
    ItemName.MasoriMaskF,
    ItemName.MasoriBodyF,
    ItemName.MasoriChapsF,
    ItemName.ZaryteVambraces,
    ItemName.NecklaceOfAnguish,
    ItemName.AvasAssembler
]);

createGearSet([GearSetType.General], ItemName.TwistedBow, CombatStyle.Rapid, [
    ItemName.DragonArrow,
    ItemName.ArmadylHelmet,
    ItemName.ArmadylChestplate,
    ItemName.ArmadylChainskirt,
    ItemName.ZaryteVambraces,
    ItemName.NecklaceOfAnguish,
    ItemName.AvasAssembler
]);

createGearSet([GearSetType.Slayer], ItemName.TumekensShadow, CombatStyle.Accurate, [
    ItemName.SlayerHelmetI,
    ItemName.AncestralRobeTop,
    ItemName.AncestralRobeBottom,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

createGearSet([GearSetType.General], ItemName.TumekensShadow, CombatStyle.Accurate, [
    ItemName.AncestralHat,
    ItemName.AncestralRobeTop,
    ItemName.AncestralRobeBottom,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

createGearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
    ItemName.ElidinisWardF,
    ItemName.AncestralHat,
    ItemName.AncestralRobeTop,
    ItemName.AncestralRobeBottom,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

createGearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
    ItemName.BookOfTheDead,
    ItemName.AhrimsRobetop,
    ItemName.AhrimsRobeskirt,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

createGearSet([GearSetType.General], ItemName.SanguinestiStaff, CombatStyle.Accurate, [
    ItemName.ElidinisWardF,
    ItemName.AhrimsRobetop,
    ItemName.AhrimsRobeskirt,
    ItemName.TormentedBracelet,
    ItemName.OccultNecklace,
    ItemName.ImbuedZamorakCape
]);

createGearSet([GearSetType.Kalphites], ItemName.KerisPartisan, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.TorvaFullHelm,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);

createGearSet([GearSetType.Kalphites], ItemName.KerisPartisan, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.NeitiznotFaceguard,
    ItemName.BandosChestplate,
    ItemName.BandosTassets,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.FireCape
]);

createGearSet([GearSetType.Kalphites], ItemName.KerisPartisanOfBreaching, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.TorvaFullHelm,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);

createGearSet([GearSetType.Kalphites], ItemName.KerisPartisanOfBreaching, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.NeitiznotFaceguard,
    ItemName.BandosChestplate,
    ItemName.BandosTassets,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.FireCape
]);

createGearSet([GearSetType.Slayer], ItemName.KerisPartisanOfBreaching, CombatStyle.Lunge, [
    ItemName.AvernicDefender,
    ItemName.SlayerHelmetI,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);

createGearSet([GearSetType.Slayer], ItemName.KerisPartisanOfBreaching, CombatStyle.Pound, [
    ItemName.AvernicDefender,
    ItemName.SlayerHelmetI,
    ItemName.TorvaPlatebody,
    ItemName.TorvaPlatelegs,
    ItemName.FerociousGloves,
    ItemName.PrimordialBoots,
    ItemName.AmuletOfTorture,
    ItemName.InfernalCape
]);
