import {ItemName} from "../../../DataObjects/ItemName";
import {Calculator} from "../../../Calculator";

const EliteVoidMageSet = [
    ItemName.VoidMageHelm,
    ItemName.EliteVoidTop,
    ItemName.EliteVoidRobe,
    ItemName.VoidKnightGloves,
];

const EliteVoidMageBonus = 2.5;

//Happens after Tumeken's even though it shows up on the stat sheet https://archive.ph/mw2LB https://archive.ph/CtG0m
export function eliteVoidMageAddend(calculator: Calculator): number {
    if (EliteVoidMageSet.every(item => calculator.gearSet.hasItemByName(item))) {
        return EliteVoidMageBonus;
    }

    return 0;
}
