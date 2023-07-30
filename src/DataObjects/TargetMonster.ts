import {Raid} from "./Raid";

export class TargetMonster {
    name: string = "";
    shortName: string = "";
    raid: Raid = Raid.None;
    attribute: string = "";
    imagePath: string = "";
    defenceLevel: number = 0;
    maxDefenceReduction: number = 0;
    magicLevel: number = 0;
    magicAccuracy: number = 0;
    stabDefence: number = 0;
    slashDefence: number = 0;
    crushDefence: number = 0;
    magicDefence: number = 0;
    rangedDefence: number = 0;
}