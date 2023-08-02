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
    new MonsterSection("Tombs of Amascut", ["Ba-Ba", "Akkha", "Kephri", "Zebak", "Wardens P3"]),
    new MonsterSection("God Wars Dungeon", ["Armadyl", "Bandos", "Saradomin", "Zamorak"]),
    new MonsterSection("Barrows", ["Ahrim", "Dharok", "Guthan", "Karil", "Torag", "Verac"])
];


