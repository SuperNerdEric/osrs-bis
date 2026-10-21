const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "vendor", "osrs-dps-calc");
const dest = path.join(root, "src", "wiki-dps");
const srcRoot = path.join(dest, "src");

function copyFile(from, to) {
    fs.mkdirSync(path.dirname(to), {recursive: true});
    fs.copyFileSync(from, to);
}

function walk(dir, out) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const from = path.join(dir, entry.name);
        const to = path.join(out, entry.name);
        if (entry.isDirectory()) {
            walk(from, to);
        } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".json") || entry.name === "LICENSE") {
            copyFile(from, to);
        }
    }
}

fs.rmSync(dest, {recursive: true, force: true});
walk(path.join(source, "src"), srcRoot);
copyFile(path.join(source, "cdn", "json", "equipment.json"), path.join(dest, "cdn", "json", "equipment.json"));
copyFile(path.join(source, "cdn", "json", "monsters.json"), path.join(dest, "cdn", "json", "monsters.json"));
copyFile(path.join(source, "cdn", "json", "spells.json"), path.join(dest, "cdn", "json", "spells.json"));
copyFile(path.join(source, "LICENSE"), path.join(dest, "LICENSE"));

function rewriteImports(filePath, content) {
    return content.replace(/from (['"])(@\/[^'"]+)\1/g, (match, quote, spec) => {
        const target = path.join(srcRoot, spec.slice(2));
        let rel = path.relative(path.dirname(filePath), target).replace(/\\/g, "/");
        if (!rel.startsWith(".")) {
            rel = `./${rel}`;
        }
        return `from ${quote}${rel}${quote}`;
    });
}

function walkRewrite(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const filePath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkRewrite(filePath);
        } else if (entry.name.endsWith(".ts")) {
            let content = fs.readFileSync(filePath, "utf8");
            content = rewriteImports(filePath, content);
            fs.writeFileSync(filePath, content);
        }
    }
}

walkRewrite(srcRoot);

const prayerPath = path.join(srcRoot, "enums", "Prayer.ts");
let prayer = fs.readFileSync(prayerPath, "utf8");
prayer = prayer.replace(/^import .*(png|next\/image).*\n/gm, "");
prayer = prayer.replace(/image: StaticImageData/g, "image: string");
prayer = prayer.replace(/image: [A-Z][A-Za-z0-9]*,/g, "image: '',");
if (!prayer.includes("ZEAL = 21")) {
    prayer = prayer.replace("MYSTIC_VIGOUR = 20,\n}", "MYSTIC_VIGOUR = 20,\n  ZEAL = 21,\n}");
}
const zealEntry = `
  [Prayer.ZEAL]: {
    renderOrder: 21,
    name: 'Zeal',
    image: '',
    drainRate: 40,
    combatStyle: 'melee',
    factorAccuracy: [125, 100],
    factorStrength: [128, 100],
    factorDefence: [125, 100],
  },
`;
if (!prayer.includes("[Prayer.ZEAL]")) {
    prayer = prayer.replace("};\n\nexport const SortedPrayers", `${zealEntry}};\n\nexport const SortedPrayers`);
    prayer = prayer.replace(
        "Prayer.PIETY, Prayer.RIGOUR, Prayer.AUGURY,",
        "Prayer.PIETY, Prayer.ZEAL, Prayer.RIGOUR, Prayer.AUGURY,"
    );
}
fs.writeFileSync(prayerPath, prayer);

const utilsSource = fs.readFileSync(path.join(source, "src", "utils.ts"), "utf8");
const featureStart = utilsSource.indexOf("export enum FeatureStatus");
const featureEnd = utilsSource.indexOf("export const classNames");
const isDefined = "export function isDefined<T>(id: T | undefined | null): id is T {\n  return id !== undefined && id !== null;\n}\n";
const keys = "export const keys = <T extends object>(o: T): (keyof T)[] => Object.keys(o) as (keyof T)[];\n";
const stylesStart = utilsSource.indexOf("export const getCombatStylesForCategory");
const styles = utilsSource.slice(stylesStart);
const utils = `import { EquipmentCategory } from './enums/EquipmentCategory';
import { PlayerCombatStyle } from './types/PlayerCombatStyle';

${utilsSource.slice(featureStart, featureEnd)}
${isDefined}
${keys}
${styles}
`;
fs.writeFileSync(path.join(srcRoot, "utils.ts"), utils);

const equipmentPath = path.join(dest, "cdn", "json", "equipment.json");
const equipment = JSON.parse(fs.readFileSync(equipmentPath, "utf8"));
const usedIds = new Set(equipment.map((item) => item.id));

function addItem(item) {
    if (equipment.some((existing) => existing.name === item.name && existing.version === item.version)) {
        return;
    }
    if (usedIds.has(item.id)) {
        throw new Error(`Item id collision for ${item.name}: ${item.id}`);
    }
    usedIds.add(item.id);
    equipment.push(item);
}

function piece(partial) {
    return {
        weight: partial.weight ?? 0,
        version: partial.version ?? "",
        image: partial.image,
        speed: partial.speed ?? 0,
        category: partial.category ?? "",
        isTwoHanded: partial.isTwoHanded ?? false,
        bonuses: partial.bonuses,
        offensive: partial.offensive,
        defensive: partial.defensive,
        ...partial,
    };
}

addItem(piece({
    name: "Obligator",
    id: 34715,
    version: "Charged",
    weight: 4.989,
    slot: "weapon",
    image: "Obligator.png",
    speed: 5,
    category: "Blunt",
    isTwoHanded: true,
    bonuses: {str: 40, ranged_str: 0, magic_str: 0, prayer: 3},
    offensive: {stab: 22, slash: -8, crush: 120, magic: 0, ranged: 0},
    defensive: {stab: 0, slash: 16, crush: 0, magic: 3, ranged: 8},
}));

addItem(piece({
    name: "Zorya's tome",
    id: 34727,
    version: "Charged",
    weight: 5,
    slot: "weapon",
    image: "Zorya's tome.png",
    speed: 3,
    category: "Powered Staff",
    isTwoHanded: true,
    bonuses: {str: 0, ranged_str: 0, magic_str: 150, prayer: 2},
    offensive: {stab: 0, slash: 0, crush: 0, magic: 45, ranged: 0},
    defensive: {stab: 1, slash: 5, crush: 5, magic: 10, ranged: 0},
}));

addItem(piece({
    name: "Ascension crossbows",
    id: 34681,
    weight: 6,
    slot: "weapon",
    image: "Ascension crossbows.png",
    speed: 3,
    category: "Crossbow",
    isTwoHanded: true,
    bonuses: {str: 0, ranged_str: 0, magic_str: 0, prayer: 0},
    offensive: {stab: 0, slash: 0, crush: 0, magic: 3, ranged: 34},
    defensive: {stab: -7, slash: -5, crush: 0, magic: 10, ranged: 0},
}));

addItem(piece({
    name: "Rondache",
    id: 34740,
    weight: 3,
    slot: "shield",
    image: "Rondache.png",
    category: "",
    bonuses: {str: 8, ranged_str: 0, magic_str: 0, prayer: 0},
    offensive: {stab: 0, slash: 0, crush: 0, magic: -5, ranged: -8},
    defensive: {stab: 35, slash: 41, crush: 38, magic: -6, ranged: 55},
}));

function bolt(name, id, image, rangedStrength) {
    addItem(piece({
        name,
        id,
        slot: "ammo",
        image,
        category: "",
        bonuses: {str: 0, ranged_str: rangedStrength, magic_str: 0, prayer: 0},
        offensive: {stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0},
        defensive: {stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0},
    }));
}

bolt("Ascension bolts", 34684, "Ascension bolts 5.png", 53);
bolt("Diamond ascension bolts", 34690, "Diamond ascension bolts 5.png", 58);
bolt("Diamond ascension bolts (e)", 34691, "Diamond ascension bolts (e) 5.png", 58);
bolt("Onyx ascension bolts", 34702, "Onyx ascension bolts 5.png", 58);
bolt("Onyx ascension bolts (e)", 34703, "Onyx ascension bolts (e) 5.png", 58);

fs.writeFileSync(equipmentPath, JSON.stringify(equipment));
console.log("Vendored wiki DPS calculator into src/wiki-dps");
