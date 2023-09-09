import {MultiplierType} from "./MultiplierType";
import {Calculator} from "../../Calculator";
import {
    amuletOfAvariceMultiplier,
    arclightMultiplier,
    berserkerNecklaceMultiplier,
    corporealBeastMultiplier,
    crystalEquipmentMultiplier,
    dragonHunterCrossbowMultiplier,
    dragonHunterLanceMultiplier,
    iceDemonMultiplier,
    inquisitorsMultiplier,
    kerisMultiplier,
    leafyMultiplier,
    obsidianEquipmentMultiplier,
    salveAmuletMultiplier,
    slayerHelmetMultiplier,
    smokeBattlestaffMultiplier,
    tomeOfFireMultiplier,
    tomeOfWaterMultiplier,
    twistedBowMultiplier,
} from "./index";

export function getGearDamageMultipliers(calculator: Calculator): number[] {
    const slayerMultiplier = slayerHelmetMultiplier(calculator);
    const salveMultiplier = salveAmuletMultiplier(calculator, MultiplierType.Damage);
    const avariceMultiplier = amuletOfAvariceMultiplier(calculator, MultiplierType.Damage);
    const dhcbMultiplier = dragonHunterCrossbowMultiplier(calculator, MultiplierType.Damage);

    const slayerSalveMultiplier = [];
    if (slayerMultiplier > salveMultiplier && slayerMultiplier > avariceMultiplier) {
        slayerSalveMultiplier.push(sumMultipliers(dhcbMultiplier, slayerMultiplier));
    } else {
        slayerSalveMultiplier.push(salveMultiplier, avariceMultiplier, dhcbMultiplier);
    }

    return [
        crystalEquipmentMultiplier(calculator, MultiplierType.Damage),
        ...slayerSalveMultiplier,
        obsidianEquipmentMultiplier(calculator),
        berserkerNecklaceMultiplier(calculator),
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
    const salveMultiplier = salveAmuletMultiplier(calculator, MultiplierType.Accuracy);
    const avariceMultiplier = amuletOfAvariceMultiplier(calculator, MultiplierType.Accuracy);
    const dhcbMultiplier = dragonHunterCrossbowMultiplier(calculator, MultiplierType.Accuracy);

    const slayerSalveMultiplier = [];
    if (slayerMultiplier > salveMultiplier && slayerMultiplier > avariceMultiplier) {
        slayerSalveMultiplier.push(sumMultipliers(dhcbMultiplier, slayerMultiplier));
    } else {
        slayerSalveMultiplier.push(salveMultiplier, avariceMultiplier, dhcbMultiplier);
    }

    const gearMultipliers = [
        crystalEquipmentMultiplier(calculator, MultiplierType.Accuracy),
        smokeBattlestaffMultiplier(calculator),
        ...slayerSalveMultiplier,
        obsidianEquipmentMultiplier(calculator),
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