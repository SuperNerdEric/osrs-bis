import {StyleType} from "../src/DataObjects/Item";
import {MonsterVariant, TargetMonster} from "../src/DataObjects/TargetMonster";
import {Raid} from "../src/DataObjects/Raid";
import monstersData from "./wiki_monster_data.json";
import * as fs from "fs";

function extractFirstImageUrl(imageField: string): string {
    if (imageField) {
        let filename = imageField;
        filename = filename.replace("[[File:", "");
        filename = filename.replace("]]", "");
        filename = filename.split("|")[0];
        filename = filename.trim().replace(/ /g, '_');
        return `https://oldschool.runescape.wiki/images/${encodeURIComponent(filename)}`;
    }
    return ''; // Default to an empty string if no match is found
}

export function createVariantFromJson(entry: any, versionKey: string, smwname?: string): MonsterVariant {
    const monsters = new Map<string, TargetMonster>;
    const variant = new MonsterVariant();

    if (smwname) {
        variant.variantName = smwname;
    } else {
        variant.variantName = versionKey;
    }

    variant.imagePath = extractFirstImageUrl(entry.image);
    variant.hitpoints = parseInt(entry.hitpoints, 10);
    variant.currentHitpoints = parseInt(entry.hitpoints, 10);

    variant.defenceLevel = parseInt(entry.def, 10);
    if (entry.name === "Sotetseg") {
        variant.maxDefenceReduction = 100;
    } else if (entry.name === "Verzik Vitur") {
        variant.maxDefenceReduction = 0;
    } else if (entry.name === "Nex") {
        variant.maxDefenceReduction = 10;
    } else if (["Ba-Ba", "Akkha", "Akkha's Shadow", "Kephri", "Zebak"].includes(entry.name)) {
        variant.maxDefenceReduction = 20;
    } else if (entry.name === "Obelisk") {
        variant.maxDefenceReduction = 40;
    } else if (["Tumeken's Warden", "Elidinis' Warden"].includes(entry.name)) {
        variant.maxDefenceReduction = 30;
    } else if (["Phosani's Nightmare", "The Nightmare"].includes(entry.name)) {
        variant.maxDefenceReduction = 30;
    } else {
        variant.maxDefenceReduction = parseInt(entry.def, 10);
    }
    variant.magicLevel = parseInt(entry.mage, 10);
    variant.magicAccuracy = parseInt(entry.amagic, 10);
    variant.defenceStats = {
        [StyleType.Stab]: parseInt(entry.dstab, 10),
        [StyleType.Slash]: parseInt(entry.dslash, 10),
        [StyleType.Crush]: parseInt(entry.dcrush, 10),
        [StyleType.Magic]: parseInt(entry.dmagic, 10),
        [StyleType.Ranged]: parseInt(entry.drange, 10)
    };

    return variant;
}

export function processJsonAndAddToMonsters() {
    const monsters = new Map<string, TargetMonster>;

    const data: any[] = monstersData;

    const monsterByName: { [key: string]: TargetMonster } = {};

    for (const monsterEntry of data) {
        const versions = Object.keys(monsterEntry.data);

        if (monsterEntry.data[versions[0]].def === "") {
            console.log("Skipping " + monsterEntry.data[versions[0]].name);
            continue;
        }

        let monster: TargetMonster;
        const monsterName = monsterEntry.title;

        if (!monsterByName[monsterName]) {
            monster = new TargetMonster();
            monsterByName[monsterName] = monster;
        } else {
            // Otherwise, get the existing monster from the map
            monster = monsterByName[monsterName];
        }

        for (const versionKey of versions) {
            const versionData = monsterEntry.data[versionKey];

            if (versionData.def === "") {
                console.log("Skipping " + monsterEntry.data[versions[0]].name);
                continue;
            }

            const variant = createVariantFromJson(versionData, versionKey, versionData.smwname);

            //Get the first monster name
            if (!monster.name) {
                monster.name = versionData.name;
            }
            monster.size = `${versionData.size}x${versionData.size}`;
            if (versionData.attributes) {
                const attributesLowercase = versionData.attributes.toLowerCase();

                monster.isDraconic = attributesLowercase.includes("dragon");
                monster.isFiery = attributesLowercase.includes("fiery");
                monster.isUndead = attributesLowercase.includes("undead");
                monster.isKalphite = attributesLowercase.includes("kalphite");
                monster.isDemon = attributesLowercase.includes("demon");
                monster.isLeafy = attributesLowercase.includes("leafy");
                if (attributesLowercase.includes("xerician")) {
                    monster.raid = Raid.ChambersOfXeric;
                }
            }

            if (["Ba-Ba", "Akkha", "Akkha's Shadow", "Kephri", "Zebak", "Obelisk", "Tumeken's Warden"].includes(monster.name)) {
                monster.raid = Raid.TombsOfAmascut;
            }
            monster.slayerMonster = versionData.cat;
            if (monster.slayerMonster) {
                monster.slayerCategory = versionData.cat;
            }

            monster.addVariant(variant);

            if (["Normal", "Post-Quest", "Damaged"].includes(versionKey)) {
                monster.setActiveVariant(versionKey);
            }

            if (["Normal mode"].includes(versionData.smwname)) {
                monster.setActiveVariant(versionData.smwname);
            }

            if (monster.name === "Verzik Vitur" && versionData.smwname === "Normal mode, Phase 2") {
                monster.setActiveVariant(versionData.smwname);
            }

            if (monsterEntry.title === "Kraken") {
                monster.setActiveVariant("Kraken");
            }

            if (monsterEntry.title === "Cave kraken") {
                monster.setActiveVariant("Cave kraken");
            }
        }

        for (const monsterName in monsterByName) {
            monsters.set(monsterName, monsterByName[monsterName]);
        }

        const serializedMonsters: any = {};
        monsters.forEach((value, key) => {
            serializedMonsters[key] = value.serialize();
        });

        fs.writeFileSync('./cleaned_monsters.json', JSON.stringify(serializedMonsters, null, 4));
    }
}

processJsonAndAddToMonsters();