import { monsters } from "../Data/loadMonsters";
import {TargetMonster} from "./TargetMonster";


export class MonsterSection {
    name: string;
    monsters: TargetMonster[];

    constructor(name: string, monsterNames: string[]) {
        this.name = name;
        this.monsters = monsterNames.map(monsterName => monsters.get(monsterName) as TargetMonster);
    }
}

export function getSections(): MonsterSection[] {
    return [
        new MonsterSection("Chambers of Xeric", ["Tekton", "Ice demon", "Vanguard", "Vespula", "Vasa Nistirio", "Muttadile", "Great Olm"]),
        new MonsterSection("Theatre of Blood", ["The Maiden of Sugadinti", "Pestilent Bloat", "Nylocas Vasilias", "Sotetseg", "Xarpus", "Verzik Vitur"]),
        new MonsterSection("Tombs of Amascut", ["Ba-Ba", "Akkha", "Akkha's Shadow", "Kephri", "Zebak", "Obelisk", "Tumeken's Warden"]),
        new MonsterSection("Forgotten Four", ["The Whisperer", "Vardorvis", "The Leviathan", "Duke Sucellus"]),
        new MonsterSection("God Wars Dungeon", ["Kree'arra", "General Graardor", "Commander Zilyana", "K'ril Tsutsaroth", "Nex"]),
        new MonsterSection("Dagannoth Kings", ["Dagannoth Rex", "Dagannoth Prime", "Dagannoth Supreme"]),
        new MonsterSection("Barrows", ["Ahrim the Blighted", "Dharok the Wretched", "Guthan the Infested", "Karil the Tainted", "Torag the Corrupted", "Verac the Defiled"]),
        new MonsterSection("Other Bosses", ["Corporeal Beast", "King Black Dragon", "Kalphite Queen", "Vorkath", "Zulrah"])
    ];
}