import { GearSet, GearSetType } from "../Calculator/DataObjects/GearSets";
import { Slot } from "../Calculator/DataObjects/Item";
import { ItemName } from "../Calculator/DataObjects/ItemName";
import { gearSetMatchesFilters } from "./Table";

type FilterMode = "include" | "exclude";

function selections(partial: Partial<Record<Slot, string[]>> = {}): Record<Slot, string[]> {
    const selected = {} as Record<Slot, string[]>;
    for (const slot of Object.values(Slot)) {
        if (typeof slot === "number") {
            selected[slot] = partial[slot] || [];
        }
    }
    return selected;
}

function modes(partial: Partial<Record<Slot, FilterMode>> = {}): Record<Slot, FilterMode> {
    const selected = {} as Record<Slot, FilterMode>;
    for (const slot of Object.values(Slot)) {
        if (typeof slot === "number") {
            selected[slot] = partial[slot] || "include";
        }
    }
    return selected;
}

function setWith(names: string[]): GearSet {
    const gearSet = new GearSet([GearSetType.General]);
    names.forEach((name) => gearSet.addItemByName(name));
    return gearSet;
}

describe("weapon slot filter", () => {
    const whipAvernic = setWith([ItemName.AbyssalWhip, ItemName.AvernicDefender]);
    const whipDragon = setWith([ItemName.AbyssalWhip, ItemName.DragonDefender]);
    const scythe = setWith([ItemName.ScytheOfVitur]);
    const twistedBow = setWith([ItemName.TwistedBow]);

    test("a two-handed weapon selected with an offhand still shows, and one-handed setups keep the offhand", () => {
        const selected = selections({
            [Slot.MainHand]: [ItemName.AbyssalWhip, ItemName.ScytheOfVitur],
            [Slot.OffHand]: [ItemName.AvernicDefender],
        });
        const filterModes = modes();

        expect(gearSetMatchesFilters(whipAvernic, selected, filterModes)).toBe(true);
        expect(gearSetMatchesFilters(whipDragon, selected, filterModes)).toBe(false);
        expect(gearSetMatchesFilters(scythe, selected, filterModes)).toBe(true);
        expect(gearSetMatchesFilters(twistedBow, selected, filterModes)).toBe(false);
    });

    test("the weapon list matches either a one-handed or two-handed weapon", () => {
        const selected = selections({
            [Slot.MainHand]: [ItemName.ScytheOfVitur],
        });

        expect(gearSetMatchesFilters(scythe, selected, modes())).toBe(true);
        expect(gearSetMatchesFilters(whipAvernic, selected, modes())).toBe(false);
    });

    test("excluding a two-handed weapon hides it without hiding other weapons", () => {
        const selected = selections({
            [Slot.MainHand]: [ItemName.ScytheOfVitur],
        });
        const filterModes = modes({ [Slot.MainHand]: "exclude" });

        expect(gearSetMatchesFilters(scythe, selected, filterModes)).toBe(false);
        expect(gearSetMatchesFilters(whipAvernic, selected, filterModes)).toBe(true);
        expect(gearSetMatchesFilters(twistedBow, selected, filterModes)).toBe(true);
    });
});
