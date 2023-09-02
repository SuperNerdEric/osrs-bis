import {SlayerHelmetMultiplierStrategy} from "./SlayerHelmetMultiplierStrategy";
import {SalveAmuletMultiplierStrategy} from "./SalveAmuletMultiplierStrategy";
import {ArclightMultiplierStrategy} from "./ArclightMultiplierStrategy";
import {DragonHunterLanceMultiplierStrategy} from "./DragonHunterLanceMultiplierStrategy";
import {DragonHunterCrossbowMultiplierStrategy} from "./DragonHunterCrossbowMultiplierStrategy";
import {MultiplierType} from "./AbstractMultiplierStrategy";
import {InquisitorsMultiplierStrategy} from "./InquisitorsMultiplierStrategy";
import {CrystalEquipmentMultiplierStrategy} from "./CrystalEquipmentMultiplierStrategy";
import {CorporealBeastMultiplierStrategy} from "./Monsters/CorporealBeastMultiplierStrategy";
import {LeafyMultiplierStrategy} from "./Monsters/LeafyMultiplierStrategy";
import {TomeOfFireMultiplierStrategy} from "./TomeOfFireMultiplierStrategy";
import {IceDemonMultiplierStrategy} from "./Monsters/IceDemonMultiplierStrategy";
import {
    TwistedBowAccuracyMultiplierStrategy,
    TwistedBowStrengthMultiplierStrategy
} from "./TwistedBowMultiplierStrategy";
import {Calculator} from "../Calculator";
import {KerisMultiplierStrategy} from "./KerisMultiplierStrategy";

export function getGearDamageMultipliers(calculator: Calculator): number[] {
    const slayerMultiplier = new SlayerHelmetMultiplierStrategy(calculator).calculateMultiplier();
    const salveMultiplier = new SalveAmuletMultiplierStrategy(calculator).calculateMultiplier();
    const arcLightMultiplier = new ArclightMultiplierStrategy(calculator).calculateMultiplier();
    const dragonHunterLanceMultiplier = new DragonHunterLanceMultiplierStrategy(calculator).calculateMultiplier();
    const dragonHunterCrossbowMultiplier = new DragonHunterCrossbowMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Damage);
    const inquisitorsMultiplier = new InquisitorsMultiplierStrategy(calculator).calculateMultiplier();
    const crystalEquipmentMultiplier = new CrystalEquipmentMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Damage);
    const corporealBeastMultiplier = new CorporealBeastMultiplierStrategy(calculator).calculateMultiplier();
    const leafyMultiplier = new LeafyMultiplierStrategy(calculator).calculateMultiplier();
    const tomeOfFireMultiplier = new TomeOfFireMultiplierStrategy(calculator).calculateMultiplier();
    const iceDemonMultiplier = new IceDemonMultiplierStrategy(calculator).calculateMultiplier();

    const gearMultipliers = [
        Math.max(slayerMultiplier, salveMultiplier),
        new TwistedBowStrengthMultiplierStrategy(calculator).calculateMultiplier(),
        arcLightMultiplier,
        dragonHunterLanceMultiplier,
        dragonHunterCrossbowMultiplier,
        inquisitorsMultiplier,
        crystalEquipmentMultiplier,
        corporealBeastMultiplier,
        leafyMultiplier,
        iceDemonMultiplier,
        tomeOfFireMultiplier
    ];

    return gearMultipliers;
}

export function getGearAccuracyMultipliers(calculator: Calculator): number[] {
    const slayerMultiplier = new SlayerHelmetMultiplierStrategy(calculator).calculateMultiplier();
    const salveMultiplier = new SalveAmuletMultiplierStrategy(calculator).calculateMultiplier();
    const arcLightMultiplier = new ArclightMultiplierStrategy(calculator).calculateMultiplier();
    const dragonHunterLanceMultiplier = new DragonHunterLanceMultiplierStrategy(calculator).calculateMultiplier();
    const dragonHunterCrossbowMultiplier = new DragonHunterCrossbowMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Accuracy);
    const inquisitorsMultiplier = new InquisitorsMultiplierStrategy(calculator).calculateMultiplier();
    const crystalEquipmentMultiplier = new CrystalEquipmentMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Accuracy);

    const gearMultipliers = [
        Math.max(slayerMultiplier, salveMultiplier),
        new KerisMultiplierStrategy(calculator).calculateMultiplier(),
        new TwistedBowAccuracyMultiplierStrategy(calculator).calculateMultiplier(),
        arcLightMultiplier,
        dragonHunterLanceMultiplier,
        dragonHunterCrossbowMultiplier,
        inquisitorsMultiplier,
        crystalEquipmentMultiplier
    ];

    return gearMultipliers;
}
