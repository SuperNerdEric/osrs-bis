import {Calculator} from "../../Calculator";
import {ItemName} from "../../DataObjects/ItemName";
import {StyleType} from "../../DataObjects/Item";

export function inquisitorsMultiplier(calculator: Calculator): number {
    if (calculator.gearSet.styleType !== StyleType.Crush) {
        return 1;
    }

    const inquisitorsPieces = [
        ItemName.InquisitorsGreatHelm,
        ItemName.InquisitorsHauberk,
        ItemName.InquisitorsPlateskirt
    ];

    const allPiecesEquipped = inquisitorsPieces.every(piece => {
        return calculator.gearSet.hasItemByName(piece);
    });

    if (allPiecesEquipped) {
        return 1.025;
    }

    const equippedPieces = inquisitorsPieces.filter(piece => {
        return calculator.gearSet.hasItemByName(piece);
    });

    return 1 + (equippedPieces.length * 0.005);
}
