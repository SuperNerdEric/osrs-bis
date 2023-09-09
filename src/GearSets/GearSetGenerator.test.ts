import {gearSets} from "../Calculator/DataObjects/GearSets";
import {generateMeleeGearSets} from "./MeleeGearSets";

describe('GearSetGenerator class', () => {
    test('should generate gearsets', () => {
        generateMeleeGearSets();
        console.log(gearSets.length);
    });
});

