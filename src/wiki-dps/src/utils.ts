import { EquipmentCategory } from './enums/EquipmentCategory';
import { PlayerCombatStyle } from './types/PlayerCombatStyle';

export enum FeatureStatus {
  /**
   * The feature is fully implemented and is expected to give accurate and comprehensive results.
   */
  IMPLEMENTED,

  /**
   * The feature is partially but not wholly implemented, and may or may not be accurate.
   * Example: a special attack that has an increased max hit, and applies damage over time, where only the increased max hit is implemented.
   */
  PARTIALLY_IMPLEMENTED,

  /**
   * The feature is known to exist, but has not been implemented.
   * Example: A new weapon has been implemented with a unique effect and is selectable in the UI, but it is not yet implemented in the calculator. */
  UNIMPLEMENTED,

  /**
   * The feature does not apply to the given conditions.
   * Example: Querying whether the special attack of a weapon has been implemented, but the weapon does not have a special attack.
   */
  NOT_APPLICABLE,
}


export function isDefined<T>(id: T | undefined | null): id is T {
  return id !== undefined && id !== null;
}

export const keys = <T extends object>(o: T): (keyof T)[] => Object.keys(o) as (keyof T)[];

export const getCombatStylesForCategory = (style: EquipmentCategory): PlayerCombatStyle[] => {
  let ret: PlayerCombatStyle[] = [];
  switch (style) {
    case EquipmentCategory.TWO_HANDED_SWORD:
      ret = [
        { name: 'Chop', type: 'slash', stance: 'Accurate' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Smash', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.BANNER:
      ret = [
        { name: 'Lunge', type: 'stab', stance: 'Accurate' },
        { name: 'Swipe', type: 'slash', stance: 'Aggressive' },
        { name: 'Pound', type: 'crush', stance: 'Controlled' },
        { name: 'Block', type: 'stab', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.BLADED_STAFF:
      ret = [
        { name: 'Jab', type: 'stab', stance: 'Accurate' },
        { name: 'Swipe', type: 'slash', stance: 'Aggressive' },
        { name: 'Fend', type: 'crush', stance: 'Defensive' },
        { name: 'Spell', type: 'magic', stance: 'Defensive Autocast' },
        { name: 'Spell', type: 'magic', stance: 'Autocast' },
      ];
      break;
    case EquipmentCategory.BLASTER:
      // TODO?
      return [];
    case EquipmentCategory.BOW:
    case EquipmentCategory.CROSSBOW:
    case EquipmentCategory.THROWN:
      ret = [
        { name: 'Accurate', type: 'ranged', stance: 'Accurate' },
        { name: 'Rapid', type: 'ranged', stance: 'Rapid' },
        { name: 'Longrange', type: 'ranged', stance: 'Longrange' },
      ];
      break;
    case EquipmentCategory.GUN:
      ret = [
        // {name: 'Aim and Fire', type: '', stance: ''},
        { name: 'Kick', type: 'crush', stance: 'Aggressive' },
      ];
      break;
    case EquipmentCategory.BULWARK:
      ret = [
        { name: 'Pummel', type: 'crush', stance: 'Accurate' },
        { name: 'Block', type: null, stance: null },
      ];
      break;
    case EquipmentCategory.MULTI_MELEE:
      ret = [
        { name: 'Poke', type: 'stab', stance: 'Accurate' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Pound', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.PARTISAN:
      ret = [
        { name: 'Stab', type: 'stab', stance: 'Accurate' },
        { name: 'Lunge', type: 'stab', stance: 'Aggressive' },
        { name: 'Pound', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'stab', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.PICKAXE:
      ret = [
        { name: 'Spike', type: 'stab', stance: 'Accurate' },
        { name: 'Impale', type: 'stab', stance: 'Aggressive' },
        { name: 'Smash', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'stab', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.POLEARM:
      ret = [
        { name: 'Jab', type: 'stab', stance: 'Controlled' },
        { name: 'Swipe', type: 'slash', stance: 'Aggressive' },
        { name: 'Fend', type: 'stab', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.POWERED_STAFF:
    case EquipmentCategory.POWERED_WAND:
      ret = [
        { name: 'Accurate', type: 'magic', stance: 'Accurate' },
        { name: 'Accurate', type: 'magic', stance: 'Accurate' },
        { name: 'Longrange', type: 'magic', stance: 'Longrange' },
      ];
      break;
    case EquipmentCategory.SALAMANDER:
      ret = [
        { name: 'Scorch', type: 'slash', stance: 'Aggressive' },
        { name: 'Flare', type: 'ranged', stance: 'Rapid' },
        { name: 'Blaze', type: 'magic', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.CHINCHOMPA:
      ret = [
        { name: 'Short fuse', type: 'ranged', stance: 'Accurate' },
        { name: 'Medium fuse', type: 'ranged', stance: 'Rapid' },
        { name: 'Long fuse', type: 'ranged', stance: 'Longrange' },
      ];
      break;
    case EquipmentCategory.CLAW:
      ret = [
        { name: 'Chop', type: 'slash', stance: 'Accurate' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Lunge', type: 'stab', stance: 'Controlled' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.BLUDGEON:
      ret = [
        { name: 'Pound', type: 'crush', stance: 'Aggressive' },
        { name: 'Pummel', type: 'crush', stance: 'Aggressive' },
        { name: 'Smash', type: 'crush', stance: 'Aggressive' },
      ];
      break;
    case EquipmentCategory.BLUNT:
      ret = [
        { name: 'Pound', type: 'crush', stance: 'Accurate' },
        { name: 'Pummel', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'crush', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.POLESTAFF:
      ret = [
        { name: 'Bash', type: 'crush', stance: 'Accurate' },
        { name: 'Pound', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'crush', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.SPIKED:
      ret = [
        { name: 'Pound', type: 'crush', stance: 'Accurate' },
        { name: 'Pummel', type: 'crush', stance: 'Aggressive' },
        { name: 'Spike', type: 'stab', stance: 'Controlled' },
        { name: 'Block', type: 'crush', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.STAFF:
      ret = [
        { name: 'Bash', type: 'crush', stance: 'Accurate' },
        { name: 'Pound', type: 'crush', stance: 'Aggressive' },
        { name: 'Focus', type: 'crush', stance: 'Defensive' },
        { name: 'Spell', type: 'magic', stance: 'Defensive Autocast' },
        { name: 'Spell', type: 'magic', stance: 'Autocast' },
      ];
      break;
    case EquipmentCategory.AXE:
      ret = [
        { name: 'Chop', type: 'slash', stance: 'Accurate' },
        { name: 'Hack', type: 'slash', stance: 'Aggressive' },
        { name: 'Smash', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.NONE:
    case EquipmentCategory.UNARMED:
      ret = [
        { name: 'Punch', type: 'crush', stance: 'Accurate' },
        { name: 'Kick', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'crush', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.SCYTHE:
      ret = [
        { name: 'Reap', type: 'slash', stance: 'Accurate' },
        { name: 'Chop', type: 'slash', stance: 'Aggressive' },
        { name: 'Jab', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.SLASH_SWORD:
      ret = [
        { name: 'Chop', type: 'slash', stance: 'Accurate' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Lunge', type: 'stab', stance: 'Controlled' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.SPEAR:
      ret = [
        { name: 'Lunge', type: 'stab', stance: 'Controlled' },
        { name: 'Swipe', type: 'slash', stance: 'Controlled' },
        { name: 'Pound', type: 'crush', stance: 'Controlled' },
        { name: 'Block', type: 'stab', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.STAB_SWORD:
      ret = [
        { name: 'Stab', type: 'stab', stance: 'Accurate' },
        { name: 'Lunge', type: 'stab', stance: 'Aggressive' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Block', type: 'stab', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.WHIP:
      ret = [
        { name: 'Flick', type: 'slash', stance: 'Accurate' },
        { name: 'Lash', type: 'slash', stance: 'Controlled' },
        { name: 'Deflect', type: 'slash', stance: 'Defensive' },
      ];
      break;
    case EquipmentCategory.FLAIL:
      ret = [
        { name: 'Chop', type: 'slash', stance: 'Accurate' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
      break;
    default:
      ret = [];
      break;
  }

  // Add a psuedo combat style here for manual casting
  ret.push(
    { name: 'Spell', type: 'magic', stance: 'Manual Cast' },
  );
  return ret;
};

