import {StyleType} from "./Item";
import {Raid} from "./Raid";

export class TargetMonster {
    name: string = "";
    shortName: string = "";
    raid: Raid = Raid.None;
    slayerMonster: boolean = false;
    isKalphite: boolean = false;
    isUndead: boolean = false;
    imagePath: string = "";
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