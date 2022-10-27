import {AttackStyle} from "./AttackStyle";

export enum Slot {
    MainHand,
    OffHand,
    Ammo,
    Helm,
    Chest,
    Legs,
    Gloves,
    Boots,
    Neck,
    Cape,
    Ring
}

export class Item {
    name: string = "";
    style: AttackStyle = AttackStyle.Stab;
    imagePath: string = "";
    wikiLink: string = "";
    slot: Slot = Slot.MainHand;
    speedSeconds: number = 0;
    stab: number = 0;
    slash: number = 0;
    crush: number = 0;
    magic: number = 0;
    ranged: number = 0;
    strength: number = 0;
    rangedStrength: number = 0;
    mageStrength: number = 0;
}