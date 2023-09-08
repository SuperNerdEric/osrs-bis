import {MultiplierType} from "./MultiplierType";
import {Calculator} from "../Calculator";
import {
    arclightMultiplier,
    corporealBeastMultiplier,
    crystalEquipmentMultiplier,
    dragonHunterCrossbowMultiplier,
    dragonHunterLanceMultiplier,
    iceDemonMultiplier,
    inquisitorsMultiplier,
    kerisMultiplier,
    leafyMultiplier,
    salveAmuletMultiplier,
    slayerHelmetMultiplier,
    tomeOfFireMultiplier,
    tomeOfWaterMultiplier,
    twistedBowMultiplier,
} from "./index";
import {smokeBattlestaffMultiplier} from "./Items/SmokeBattlestaffMultiplier";

export function getGearDamageMultipliers(calculator: Calculator): number[] {
    const slayerMultiplier = slayerHelmetMultiplier(calculator);
    const salveMultiplier = salveAmuletMultiplier(calculator);
    const dhcbDmgMultiplier = dragonHunterCrossbowMultiplier(calculator, MultiplierType.Damage);

    const gearMultipliers = [
        crystalEquipmentMultiplier(calculator, MultiplierType.Damage),
        Math.max(
            sumMultipliers(
                dhcbDmgMultiplier,
                slayerMultiplier
            ),
            salveMultiplier * dhcbDmgMultiplier),
        kerisMultiplier(calculator, MultiplierType.Damage),
        twistedBowMultiplier(calculator, MultiplierType.Damage),
        arclightMultiplier(calculator),
        dragonHunterLanceMultiplier(calculator),
        inquisitorsMultiplier(calculator),
        leafyMultiplier(calculator),
        iceDemonMultiplier(calculator),
        tomeOfFireMultiplier(calculator),
        tomeOfWaterMultiplier(calculator),
        corporealBeastMultiplier(calculator),
    ];

    return gearMultipliers;
}

export function getGearAccuracyMultipliers(calculator: Calculator): number[] {
    const slayerMultiplier = slayerHelmetMultiplier(calculator);
    const salveMultiplier = salveAmuletMultiplier(calculator);

    const gearMultipliers = [
        crystalEquipmentMultiplier(calculator, MultiplierType.Accuracy),
        smokeBattlestaffMultiplier(calculator),
        Math.max(slayerMultiplier, salveMultiplier),
        kerisMultiplier(calculator, MultiplierType.Accuracy),
        twistedBowMultiplier(calculator, MultiplierType.Accuracy),
        arclightMultiplier(calculator),
        dragonHunterLanceMultiplier(calculator),
        dragonHunterCrossbowMultiplier(calculator, MultiplierType.Accuracy),
        inquisitorsMultiplier(calculator),
        tomeOfWaterMultiplier(calculator),
    ];

    return gearMultipliers;
}

function sumMultipliers(...multipliers: number[]): number {
    return multipliers.reduce((sum, multiplier) => sum + (multiplier - 1), 1);
}