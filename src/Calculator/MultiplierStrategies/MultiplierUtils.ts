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
import {ZukMultiplierStrategy} from "./Monsters/ZukMultiplierStrategy";

export function getGearDamageMultipliers(calculator: Calculator): number[] {
    const slayerMultiplier = new SlayerHelmetMultiplierStrategy(calculator).calculateMultiplier();
    const salveMultiplier = new SalveAmuletMultiplierStrategy(calculator).calculateMultiplier();

    const gearMultipliers = [
        new CrystalEquipmentMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Damage),
        Math.max(slayerMultiplier, salveMultiplier),
        new KerisMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Damage),
        new TwistedBowStrengthMultiplierStrategy(calculator).calculateMultiplier(),
        new ArclightMultiplierStrategy(calculator).calculateMultiplier(),
        new DragonHunterLanceMultiplierStrategy(calculator).calculateMultiplier(),
        new DragonHunterCrossbowMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Damage),
        new InquisitorsMultiplierStrategy(calculator).calculateMultiplier(),
        new LeafyMultiplierStrategy(calculator).calculateMultiplier(),
        new ZukMultiplierStrategy(calculator).calculateMultiplier(),
        new IceDemonMultiplierStrategy(calculator).calculateMultiplier(),
        new TomeOfFireMultiplierStrategy(calculator).calculateMultiplier(),
        new CorporealBeastMultiplierStrategy(calculator).calculateMultiplier(),
    ];

    return gearMultipliers;
}

export function getGearAccuracyMultipliers(calculator: Calculator): number[] {
    const slayerMultiplier = new SlayerHelmetMultiplierStrategy(calculator).calculateMultiplier();
    const salveMultiplier = new SalveAmuletMultiplierStrategy(calculator).calculateMultiplier();

    const gearMultipliers = [
        new CrystalEquipmentMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Accuracy),
        Math.max(slayerMultiplier, salveMultiplier),
        new KerisMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Accuracy),
        new TwistedBowAccuracyMultiplierStrategy(calculator).calculateMultiplier(),
        new ArclightMultiplierStrategy(calculator).calculateMultiplier(),
        new DragonHunterLanceMultiplierStrategy(calculator).calculateMultiplier(),
        new DragonHunterCrossbowMultiplierStrategy(calculator).calculateMultiplier(MultiplierType.Accuracy),
        new InquisitorsMultiplierStrategy(calculator).calculateMultiplier(),
    ];

    return gearMultipliers;
}
