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
import {ItemName} from "../../DataObjects/ItemName";
import {CombatClass, Slot} from "../../DataObjects/Item";
import {vampyreMultiplier} from "./Items/VampyreMultiplier";

export function getGearDamageMultipliers(calculator: Calculator): number[] {
    const dhcbMultiplier = dragonHunterCrossbowMultiplier(calculator, MultiplierType.Damage);

    const chosenMultiplierSource = determineMultiplierSource(calculator);
    const multiplierMapping = {
        [MultiplierSource.Slayer]: () => [sumMultipliers(dhcbMultiplier, slayerHelmetMultiplier(calculator))],
        [MultiplierSource.Salve]: () => [salveAmuletMultiplier(calculator, MultiplierType.Damage), dhcbMultiplier],
        [MultiplierSource.Avarice]: () => [amuletOfAvariceMultiplier(calculator, MultiplierType.Damage), dhcbMultiplier]
    };

    return [
        crystalEquipmentMultiplier(calculator, MultiplierType.Damage),
        ...multiplierMapping[chosenMultiplierSource](),
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
        vampyreMultiplier(calculator, MultiplierType.Damage),
        corporealBeastMultiplier(calculator)
    ];
}

export function getGearAccuracyMultipliers(calculator: Calculator): number[] {
    const dhcbMultiplier = dragonHunterCrossbowMultiplier(calculator, MultiplierType.Accuracy);

    const chosenMultiplierSource = determineMultiplierSource(calculator);
    const multiplierMapping = {
        [MultiplierSource.Slayer]: () => [sumMultipliers(dhcbMultiplier, slayerHelmetMultiplier(calculator))],
        [MultiplierSource.Salve]: () => [salveAmuletMultiplier(calculator, MultiplierType.Accuracy), dhcbMultiplier],
        [MultiplierSource.Avarice]: () => [amuletOfAvariceMultiplier(calculator, MultiplierType.Accuracy), dhcbMultiplier]
    };

    const gearMultipliers = [
        crystalEquipmentMultiplier(calculator, MultiplierType.Accuracy),
        smokeBattlestaffMultiplier(calculator),
        ...multiplierMapping[chosenMultiplierSource](),
        obsidianEquipmentMultiplier(calculator),
        kerisMultiplier(calculator, MultiplierType.Accuracy),
        twistedBowMultiplier(calculator, MultiplierType.Accuracy),
        arclightMultiplier(calculator),
        dragonHunterLanceMultiplier(calculator),
        inquisitorsMultiplier(calculator),
        tomeOfWaterMultiplier(calculator),
        vampyreMultiplier(calculator, MultiplierType.Accuracy),
    ];

    return gearMultipliers;
}

function sumMultipliers(...multipliers: number[]): number {
    return multipliers.reduce((sum, multiplier) => sum + (multiplier - 1), 1);
}

enum MultiplierSource {
    Slayer,
    Salve,
    Avarice
}

function determineMultiplierSource(calculator: Calculator): MultiplierSource {
    const isUndead = calculator.targetMonster.isUndead;
    const salveAmulets = [ItemName.SalveAmulet, ItemName.SalveAmuletE, ItemName.SalveAmuletI, ItemName.SalveAmuletEI];

    const isFightingRevenant = calculator.targetMonster.name.includes("Revenant");
    const isWearingAvarice = calculator.gearSet.hasItemByName(ItemName.AmuletOfAvarice);

    const neck = calculator.gearSet.getItemBySlot(Slot.Neck)?.name;

    if (isFightingRevenant && isWearingAvarice) {
        return MultiplierSource.Avarice;
    } else if (isUndead && neck && salveAmulets.includes(neck)) {
        if (neck === ItemName.SalveAmuletI || neck === ItemName.SalveAmuletEI || calculator.gearSet.combatClass === CombatClass.Melee) {
            return MultiplierSource.Salve;
        }
    }

    return MultiplierSource.Slayer;
}
