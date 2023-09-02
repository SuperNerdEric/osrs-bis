import {ItemName} from "../../../DataObjects/ItemName";
import {AbstractMultiplierStrategy} from "../AbstractMultiplierStrategy";
import {Slot} from "../../../DataObjects/Item";

export class LeafyMultiplierStrategy extends AbstractMultiplierStrategy {

    private static leafyEffectiveWeapons = [
        ItemName.LeafBladedBattleaxe,
        ItemName.LeafBladedSpear,
        ItemName.LeafBladedSword,
        ItemName.SlayersStaff, //todo magic dart
        ItemName.SlayersStaffE
    ];

    private static leafyEffectiveAmmo = [
        ItemName.BroadArrows,
        ItemName.BroadBolts,
        ItemName.AmethystBroadBolts,
    ];

    calculateMultiplier(): number {
        if (!this.result.targetMonster.isLeafy) {
            return 1;
        }

        const weapon = this.result.gearSet.getWeapon();
        const ammo = this.result.gearSet.getItemBySlot(Slot.Ammo);

        if (LeafyMultiplierStrategy.leafyEffectiveWeapons.includes(weapon.name) || LeafyMultiplierStrategy.leafyEffectiveAmmo.includes(<ItemName>ammo?.name)) {
            if (weapon.name === ItemName.LeafBladedBattleaxe) {
                return 1.175;
            }
            return 1;
        }

        return 0;
    }
}
