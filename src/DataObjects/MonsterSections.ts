import {TargetMonster} from "./TargetMonster";
import {monsters} from "./Monsters";


export class MonsterSection {
    name: string;
    monsters: TargetMonster[];

    constructor(name: string, monsterNames: string[]) {
        this.name = name;
        this.monsters = monsterNames.map(monsterName => monsters.get(monsterName) as TargetMonster);
    }
}

export const sections = [
    new MonsterSection("Chambers of Xeric", ["Tekton", "Vanguard (Magic)", "Vanguard (Melee)", "Vanguard (Ranged)", "Vespula", "Vasa", "Muttadile (Small)", "Muttadile (Large)", "Olm (Right Claw)", "Olm (Left Claw)", "Olm (Head)"]),
    new MonsterSection("Theatre of Blood", ["Maiden", "Bloat", "Nylo", "Sote", "Xarpus", "Verzik P2", "Verzik P3"]),
    new MonsterSection("Tombs of Amascut", ["Ba-Ba", "Akkha", "Akkha's Shadow", "Kephri", "Zebak", "Wardens P3"]),
    new MonsterSection("Forgotten Four", ["Whisperer", "Vardorvis", "Leviathan", "Duke Sucellus"]),
    new MonsterSection("God Wars Dungeon", ["Armadyl", "Bandos", "Saradomin", "Zamorak", "Nex"]),
    new MonsterSection("Dagannoth Kings", ["Rex", "Prime", "Supreme"]),
    new MonsterSection("Barrows", ["Ahrim", "Dharok", "Guthan", "Karil", "Torag", "Verac"]),
    new MonsterSection("Other Bosses", ["Corp", "KQ", "KQ (P2)", "Vorkath"])
];


