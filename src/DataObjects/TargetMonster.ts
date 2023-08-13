import {StyleType} from "./Item";
import {Raid} from "./Raid";

export class TargetMonster {
    name: string = "";
    shortName: string = "";
    size: string = "1x1";
    raid: Raid = Raid.None;
    slayerMonster: boolean = false;
    isKalphite: boolean = false;
    isUndead: boolean = false;
    isDemon: boolean = false;
    isDraconic: boolean = false;
    isFiery: boolean = false;
    imagePath: string = "";
    currentHitpoints: number = 0;
    defenceLevel: number = 0;
    maxDefenceReduction: number = 0;
    magicLevel: number = 0;
    magicAccuracy: number = 0;
    defenceStats: MonsterDefenceStats = {
        [StyleType.Stab]: 0,
        [StyleType.Slash]: 0,
        [StyleType.Crush]: 0,
        [StyleType.Magic]: 0,
        [StyleType.Ranged]: 0,
    };

}

interface MonsterDefenceStats {
    [StyleType.Stab]: number;
    [StyleType.Slash]: number;
    [StyleType.Crush]: number;
    [StyleType.Magic]: number;
    [StyleType.Ranged]: number;
}