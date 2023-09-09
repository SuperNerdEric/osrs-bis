import {Calculator} from "../../Calculator";
import {
    amuletOfAvariceAddend,
    eliteVoidMageAddend,
    salveAmuletAddend,
    smokeBattleStaffAddend,
    virtusAddend
} from "./index";

export function getGearDamageTotalAdditive(calculator: Calculator): number {
    return salveAmuletAddend(calculator)
        + amuletOfAvariceAddend(calculator)
        + eliteVoidMageAddend(calculator)
        + smokeBattleStaffAddend(calculator)
        + virtusAddend(calculator);
}
