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
    const dhcbMultiplier = dragonHunterCrossbowMultiplier(calculator, MultiplierType.Damage);

    const slayerSalveMultiplier = [];
    if (slayerMultiplier > salveMultiplier) {
        slayerSalveMultiplier.push(sumMultipliers(dhcbMultiplier, slayerMultiplier));
    } else {
        slayerSalveMultiplier.push(salveMultiplier, dhcbMultiplier);
    }

    return [
        crystalEquipmentMultiplier(calculator, MultiplierType.Damage),
        ...slayerSalveMultiplier,
        kerisMultiplier(calculator, MultiplierType.Damage),
        twistedBowMultiplier(calculator, MultiplierType.Damage),
        arclightMultiplier(calculator),
        dragonHunterLanceMultiplier(calculator),
        inquisitorsMultiplier(calculator),
        leafyMultiplier(calculator),
        iceDemonMultiplier(calculator),
        tomeOfFireMultiplier(calculator),
        tomeOfWaterMultiplier(calculator),
        corporealBeastMultiplier(calculator)
    ];
}

export function getGearAccuracyMultipliers(calculator: Calculator): number[] {
    const slayerMultiplier = slayerHelmetMultiplier(calculator);
    const salveMultiplier = salveAmuletMultiplier(calculator);
    const dhcbMultiplier = dragonHunterCrossbowMultiplier(calculator, MultiplierType.Accuracy);

    const slayerSalveMultiplier = [];
    if (slayerMultiplier > salveMultiplier) {
        slayerSalveMultiplier.push(sumMultipliers(dhcbMultiplier, slayerMultiplier));
    } else {
        slayerSalveMultiplier.push(salveMultiplier, dhcbMultiplier);
    }

    const gearMultipliers = [
        crystalEquipmentMultiplier(calculator, MultiplierType.Accuracy),
        smokeBattlestaffMultiplier(calculator),
        ...slayerSalveMultiplier,
        kerisMultiplier(calculator, MultiplierType.Accuracy),
        twistedBowMultiplier(calculator, MultiplierType.Accuracy),
        arclightMultiplier(calculator),
        dragonHunterLanceMultiplier(calculator),
        inquisitorsMultiplier(calculator),
        tomeOfWaterMultiplier(calculator),
    ];

    return gearMultipliers;
}

function sumMultipliers(...multipliers: number[]): number {
    return multipliers.reduce((sum, multiplier) => sum + (multiplier - 1), 1);
}