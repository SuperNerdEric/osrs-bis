import {ItemName} from "../DataObjects/ItemName";

export function getBoltActivationRate(boltName: ItemName, hasKandarinHeadgear: boolean): number {
    const baseRates: { [key in ItemName]?: number } = {
        [ItemName.OpalBoltsE]: 5,
        [ItemName.OpalDragonBoltsE]: 5,
        [ItemName.PearlBoltsE]: 6,
        [ItemName.PearlDragonBoltsE]: 6,
        [ItemName.EmeraldBoltsE]: 55,
        [ItemName.EmeraldDragonBoltsE]: 55,
        [ItemName.RubyBoltsE]: 6,
        [ItemName.RubyDragonBoltsE]: 6,
        [ItemName.DiamondBoltsE]: 10,
        [ItemName.DiamondDragonBoltsE]: 10,
        [ItemName.DragonstoneBoltsE]: 6,
        [ItemName.DragonstoneDragonBoltsE]: 6,
        [ItemName.OnyxBoltsE]: 11,
        [ItemName.OnyxDragonBoltsE]: 11
    };

    const kandarinRates: { [key in ItemName]?: number } = {
        [ItemName.OpalBoltsE]: 5.5,
        [ItemName.OpalDragonBoltsE]: 5.5,
        [ItemName.PearlBoltsE]: 6.6,
        [ItemName.PearlDragonBoltsE]: 6.6,
        [ItemName.EmeraldBoltsE]: 60.5,
        [ItemName.EmeraldDragonBoltsE]: 60.5,
        [ItemName.RubyBoltsE]: 6.6,
        [ItemName.RubyDragonBoltsE]: 6.6,
        [ItemName.DiamondBoltsE]: 11,
        [ItemName.DiamondDragonBoltsE]: 11,
        [ItemName.DragonstoneBoltsE]: 6.6,
        [ItemName.DragonstoneDragonBoltsE]: 6.6,
        [ItemName.OnyxBoltsE]: 12.1,
        [ItemName.OnyxDragonBoltsE]: 12.1
    };

    return hasKandarinHeadgear ? (kandarinRates[boltName] || 0) : (baseRates[boltName] || 0);
}