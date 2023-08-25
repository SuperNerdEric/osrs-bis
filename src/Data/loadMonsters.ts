import cleanedData from "./cleaned_monsters.json";
import {MonsterVariant, TargetMonster} from "../DataObjects/TargetMonster";

export const monsters = new Map<string, TargetMonster>;

export function loadMonstersFromFile() {
    for (const monsterName in cleanedData) {
        // @ts-ignore
        const monsterData = cleanedData[monsterName];
        const monster = new TargetMonster();

        monster.title = monsterName;
        monster.name = monsterData.name;
        monster.shortName = monsterData.shortName;
        monster.size = monsterData.size;
        monster.raid = monsterData.raid;
        monster.slayerMonster = monsterData.slayerMonster;
        monster.slayerCategory = monsterData.slayerCategory;
        monster.isKalphite = monsterData.isKalphite;
        monster.isUndead = monsterData.isUndead;
        monster.isDemon = monsterData.isDemon;
        monster.isDraconic = monsterData.isDraconic;
        monster.isFiery = monsterData.isFiery;

        monsterData.variants.forEach((variantData: any[]) => {
            const variant = new MonsterVariant();
            variant.variantName = variantData[0];
            const variantDetails = variantData[1];
            Object.assign(variant, variantDetails);
            monster.addVariant(variant);
        });

        monster.setActiveVariant(monsterData._activeVariant.variantName)

        monsters.set(monster.title, monster);
    }
}
