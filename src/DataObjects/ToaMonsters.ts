import {TargetMonster} from "./TargetMonster";
import {monsters} from "./Monsters";

export const toaMonsters: TargetMonster[] = [];

toaMonsters.push(monsters.get("Ba-Ba") as TargetMonster);
toaMonsters.push(monsters.get("Akkha") as TargetMonster);
toaMonsters.push(monsters.get("Kephri") as TargetMonster);
toaMonsters.push(monsters.get("Zebak") as TargetMonster);
toaMonsters.push(monsters.get("Wardens P3") as TargetMonster);

export const gwdMonsters: TargetMonster[] = [];

gwdMonsters.push(monsters.get("Armadyl") as TargetMonster);
gwdMonsters.push(monsters.get("Bandos") as TargetMonster);
gwdMonsters.push(monsters.get("Saradomin") as TargetMonster);
gwdMonsters.push(monsters.get("Zamorak") as TargetMonster);