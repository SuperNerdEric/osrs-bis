import {ItemName} from "../../DataObjects/ItemName";
import {AbstractMultiplierStrategy} from "./AbstractMultiplierStrategy";
import {StyleType} from "../../DataObjects/Item";

export class InquisitorsMultiplierStrategy extends AbstractMultiplierStrategy {
    calculateMultiplier(): number {
        if (this.result.gearSet.styleType !== StyleType.Crush) {
            return 1;
        }

        const inquisitorsPieces = [
            ItemName.InquisitorsGreatHelm,
            ItemName.InquisitorsHauberk,
            ItemName.InquisitorsPlateskirt
        ];

        const allPiecesEquipped = inquisitorsPieces.every(piece => {
            return this.result.gearSet.hasItemByName(piece);
        });

        if (allPiecesEquipped) {
            return 1.025;
        }

        const equippedPieces = inquisitorsPieces.filter(piece => {
            return this.result.gearSet.hasItemByName(piece);
        });

        return 1 + (equippedPieces.length * 0.005);
    }
}
