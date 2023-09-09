import {Calculator} from "../../../Calculator";
import {ItemName} from "../../../DataObjects/ItemName";
import {Slot} from "../../../DataObjects/Item";

export function leafyMultiplier(calculator: Calculator): number {
    const leafyEffectiveWeapons = [
        ItemName.LeafBladedBattleaxe,
        ItemName.LeafBladedSpear,
        ItemName.LeafBladedSword,
        ItemName.SlayersStaff,
        ItemName.SlayersStaffE
    ];

    const leafyEffectiveAmmo = [
        ItemName.BroadArrows,
        ItemName.BroadBolts,
        ItemName.AmethystBroadBolts,
    ];

    if (!calculator.targetMonster.isLeafy) {
        return 1;
    }

    const weapon = calculator.gearSet.getWeapon();
    const ammo = calculator.gearSet.getItemBySlot(Slot.Ammo);

    if (leafyEffectiveWeapons.includes(weapon.name) || leafyEffectiveAmmo.includes(<ItemName>ammo?.name)) {
        if (weapon.name === ItemName.LeafBladedBattleaxe) {
            return 1.175;
        }
        return 1;
    }

    return 0;
}
