import {MonsterVariant, TargetMonster} from "./TargetMonster";
import {Raid} from "./Raid";
import {StyleType} from "./Item";

export const monsters = new Map<string, TargetMonster>;

let monster = new TargetMonster();
monster.name = "Ba-Ba";
monster.raid = Raid.TombsOfAmascut;
monster.size = "5x5";
let variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Ba-Ba.png';
variant.currentHitpoints = 380;
variant.defenceLevel = 80;
//https://archive.ph/31H2d
variant.maxDefenceReduction = 20;
variant.magicLevel = 100;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 80,
    [StyleType.Slash]: 160,
    [StyleType.Crush]: 240,
    [StyleType.Magic]: 280,
    [StyleType.Ranged]: 200,
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Akkha";
monster.raid = Raid.TombsOfAmascut;
monster.size = "3x3";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Akkha.png';
variant.currentHitpoints = 400;
variant.defenceLevel = 80;
variant.maxDefenceReduction = 20;
variant.magicLevel = 100;
variant.magicAccuracy = 115;
variant.defenceStats = {
    [StyleType.Stab]: 60,
    [StyleType.Slash]: 120,
    [StyleType.Crush]: 120,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 60,
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Akkha's Shadow";
monster.raid = Raid.TombsOfAmascut;
monster.size = "3x3";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Akkhas_Shadow.png';
variant.currentHitpoints = 70;
variant.defenceLevel = 30;
variant.maxDefenceReduction = 20;
variant.magicLevel = 100;
variant.magicAccuracy = 115;
variant.defenceStats = {
    [StyleType.Stab]: 60,
    [StyleType.Slash]: 120,
    [StyleType.Crush]: 120,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 60,
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Kephri";
monster.raid = Raid.TombsOfAmascut;
monster.size = "5x5";
monster.isKalphite = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Kephri.png';
variant.currentHitpoints = 80;
variant.defenceLevel = 80;
variant.maxDefenceReduction = 20;
variant.magicLevel = 125;
variant.magicAccuracy = 125;
variant.defenceStats = {
    [StyleType.Stab]: 60,
    [StyleType.Slash]: 300,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 300,
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Zebak";
monster.raid = Raid.TombsOfAmascut;
monster.size = "9x9";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Zebak.png';
variant.currentHitpoints = 580;
variant.defenceLevel = 70;
variant.maxDefenceReduction = 20;
variant.magicLevel = 100;
variant.magicAccuracy = 215;
variant.defenceStats = {
    [StyleType.Stab]: 160,
    [StyleType.Slash]: 160,
    [StyleType.Crush]: 260,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 110,
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Obelisk";
monster.raid = Raid.TombsOfAmascut
monster.size = "3x3";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Obelisk_(Tombs_of_Amascut,_phase_1).png';
variant.currentHitpoints = 260;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 40;
variant.magicLevel = 100;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 70,
    [StyleType.Slash]: 70,
    [StyleType.Crush]: 70,
    [StyleType.Magic]: 50,
    [StyleType.Ranged]: 60
};
monster.addVariant(variant);
monsters.set(monster.name, monster);


monster = new TargetMonster();
monster.name = "Wardens P3";
monster.raid = Raid.TombsOfAmascut
monster.size = "5x5";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Tumekens_Warden.png';
variant.currentHitpoints = 880;
variant.defenceLevel = 150;
variant.maxDefenceReduction = 30;
variant.magicLevel = 150;
variant.magicAccuracy = 230;
variant.defenceStats = {
    [StyleType.Stab]: 40,
    [StyleType.Slash]: 40,
    [StyleType.Crush]: 20,
    [StyleType.Magic]: 20,
    [StyleType.Ranged]: 20
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Kree'arra (Armadyl)";
monster.size = "5x5";
monster.slayerMonster = true;
monster.shortName = "Armadyl";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Kreearra.png';
variant.currentHitpoints = 255;
variant.defenceLevel = 260;
variant.maxDefenceReduction = 260;
variant.magicLevel = 200;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 180,
    [StyleType.Slash]: 180,
    [StyleType.Crush]: 180,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 200
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "General Graardor (Bandos)";
monster.size = "4x4";
monster.shortName = "Bandos";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/General_Graardor.png';
variant.currentHitpoints = 255;
variant.defenceLevel = 250;
variant.maxDefenceReduction = 250;
variant.magicLevel = 80;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 90,
    [StyleType.Slash]: 90,
    [StyleType.Crush]: 90,
    [StyleType.Magic]: 298,
    [StyleType.Ranged]: 90
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Commander Zilyana (Saradomin)";
monster.shortName = "Saradomin";
monster.size = "2x2";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Commander_Zilyana.png';
variant.currentHitpoints = 255;
variant.defenceLevel = 300;
variant.maxDefenceReduction = 300;
variant.magicLevel = 300;
variant.magicAccuracy = 200;
variant.defenceStats = {
    [StyleType.Stab]: 100,
    [StyleType.Slash]: 100,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 100,
    [StyleType.Ranged]: 100
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "K'ril Tsutsaroth (Zamorak)";
monster.size = "5x5";
variant = new MonsterVariant();
variant.currentHitpoints = 255;
monster.slayerMonster = true;
monster.isDemon = true;
monster.shortName = "Zamorak";
variant.imagePath = './Images/Monsters/Kril_Tsutsaroth.png';
variant.defenceLevel = 270;
variant.maxDefenceReduction = 270;
variant.magicLevel = 200;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 80,
    [StyleType.Slash]: 80,
    [StyleType.Crush]: 80,
    [StyleType.Magic]: 130,
    [StyleType.Ranged]: 80
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Nex";
monster.size = "3x3";
variant = new MonsterVariant();
variant.currentHitpoints = 3400;
variant.imagePath = './Images/Monsters/Nex.png';
variant.defenceLevel = 260;
variant.maxDefenceReduction = 10;
variant.magicLevel = 230;
variant.magicAccuracy = 100;
variant.defenceStats = {
    [StyleType.Stab]: 40,
    [StyleType.Slash]: 140,
    [StyleType.Crush]: 60,
    [StyleType.Magic]: 300,
    [StyleType.Ranged]: 190
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Ahrim the Blighted";
monster.size = "1x1";
monster.shortName = "Ahrim";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Ahrim_the_Blighted.png';
variant.currentHitpoints = 100;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 100;
variant.magicLevel = 100;
variant.magicAccuracy = 73;
variant.defenceStats = {
    [StyleType.Stab]: 103,
    [StyleType.Slash]: 85,
    [StyleType.Crush]: 117,
    [StyleType.Magic]: 73,
    [StyleType.Ranged]: 0
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Dharok the Wretched";
monster.size = "1x1";
monster.shortName = "Dharok";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Dharok_the_Wretched.png';
variant.currentHitpoints = 100;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 100;
variant.magicLevel = 1;
variant.magicAccuracy = -58;
variant.defenceStats = {
    [StyleType.Stab]: 252,
    [StyleType.Slash]: 250,
    [StyleType.Crush]: 244,
    [StyleType.Magic]: -11,
    [StyleType.Ranged]: 249
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Guthan the Infested";
monster.size = "1x1";
monster.shortName = "Guthan";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Guthan_the_Infested.png';
variant.currentHitpoints = 100;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 100;
variant.magicLevel = 1;
variant.magicAccuracy = -50;
variant.defenceStats = {
    [StyleType.Stab]: 259,
    [StyleType.Slash]: 257,
    [StyleType.Crush]: 241,
    [StyleType.Magic]: -11,
    [StyleType.Ranged]: 250
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Karil the Tainted";
monster.size = "1x1";
monster.shortName = "Karil";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Karil_the_Tainted.png';
variant.currentHitpoints = 100;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 100;
variant.magicLevel = 1;
variant.magicAccuracy = -26;
variant.defenceStats = {
    [StyleType.Stab]: 79,
    [StyleType.Slash]: 71,
    [StyleType.Crush]: 90,
    [StyleType.Magic]: 106,
    [StyleType.Ranged]: 100
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Torag the Corrupted";
monster.shortName = "Torag";
monster.size = "1x1";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Torag_the_Corrupted.png';
variant.currentHitpoints = 100;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 100;
variant.magicLevel = 1;
variant.magicAccuracy = -33;
variant.defenceStats = {
    [StyleType.Stab]: 221,
    [StyleType.Slash]: 235,
    [StyleType.Crush]: 222,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 221
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Verac the Defiled";
monster.shortName = "Verac";
monster.size = "1x1";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Verac_the_Defiled.png';
variant.currentHitpoints = 100;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 100;
variant.magicLevel = 1;
variant.magicAccuracy = -42;
variant.defenceStats = {
    [StyleType.Stab]: 227,
    [StyleType.Slash]: 230,
    [StyleType.Crush]: 221,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 225
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Corporeal Beast";
monster.shortName = "Corp";
monster.size = "5x5";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Corporeal_Beast.png';
variant.currentHitpoints = 2000;
variant.defenceLevel = 310;
variant.maxDefenceReduction = 310;
variant.magicLevel = 350;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 25,
    [StyleType.Slash]: 200,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 150,
    [StyleType.Ranged]: 230
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "The Maiden of Sugadinti";
monster.shortName = "Maiden";
monster.size = "6x6";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/The_Maiden_of_Sugadinti.png';
variant.currentHitpoints = 3500;
variant.defenceLevel = 200;
variant.maxDefenceReduction = 200;
variant.magicLevel = 350;
variant.magicAccuracy = 300;
variant.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Pestilent Bloat";
monster.shortName = "Bloat";
monster.size = "5x5";
monster.isUndead = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Pestilent_Bloat.png';
variant.currentHitpoints = 2000;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 100;
variant.magicLevel = 150;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 40,
    [StyleType.Slash]: 20,
    [StyleType.Crush]: 40,
    [StyleType.Magic]: 600,
    [StyleType.Ranged]: 800
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Nylocas Vasilias";
monster.shortName = "Nylo";
monster.size = "4x4";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Nylocas_Vasilias_(melee).png';
variant.currentHitpoints = 2500;
variant.defenceLevel = 50;
variant.maxDefenceReduction = 50;
variant.magicLevel = 50;
variant.magicAccuracy = 600;
variant.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Sotetseg";
monster.shortName = "Sote";
monster.size = "5x5";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Sotetseg.png';
variant.currentHitpoints = 4000;
variant.defenceLevel = 200;
variant.maxDefenceReduction = 100;
variant.magicLevel = 250;
variant.magicAccuracy = -10;
variant.defenceStats = {
    [StyleType.Stab]: 70,
    [StyleType.Slash]: 70,
    [StyleType.Crush]: 70,
    [StyleType.Magic]: 30,
    [StyleType.Ranged]: 150
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Xarpus";
monster.size = "5x5";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Xarpus.png';
variant.currentHitpoints = 5000;
variant.defenceLevel = 250;
variant.maxDefenceReduction = 250;
variant.magicLevel = 220;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 160
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Verzik Vitur P2";
monster.shortName = "Verzik P2";
monster.size = "3x3";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Verzik_Vitur_(flying).png';
variant.currentHitpoints = 3250;
variant.defenceLevel = 200;
variant.maxDefenceReduction = 0;
variant.magicLevel = 400;
variant.magicAccuracy = 80;
variant.defenceStats = {
    [StyleType.Stab]: 100,
    [StyleType.Slash]: 60,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 70,
    [StyleType.Ranged]: 250
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Verzik Vitur P3";
monster.shortName = "Verzik P3";
monster.size = "7x7";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Verzik_Vitur_(final_form).png';
variant.currentHitpoints = 3250;
variant.defenceLevel = 150;
variant.maxDefenceReduction = 0;
variant.magicLevel = 300;
variant.magicAccuracy = 80;
variant.defenceStats = {
    [StyleType.Stab]: 70,
    [StyleType.Slash]: 30,
    [StyleType.Crush]: 70,
    [StyleType.Magic]: 100,
    [StyleType.Ranged]: 230
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Tekton";
monster.raid = Raid.ChambersOfXeric;
monster.size = "4x4";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Tekton.png';
variant.currentHitpoints = 300;
variant.defenceLevel = 205;
variant.maxDefenceReduction = 205;
variant.magicLevel = 205;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 155,
    [StyleType.Slash]: 165,
    [StyleType.Crush]: 105,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vanguard (Magic)";
monster.raid = Raid.ChambersOfXeric;
monster.size = "3x3";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Vanguard_(magic).png';
variant.currentHitpoints = 180;
variant.defenceLevel = 160;
variant.maxDefenceReduction = 160;
variant.magicLevel = 150;
variant.magicAccuracy = 40;
variant.defenceStats = {
    [StyleType.Stab]: 315,
    [StyleType.Slash]: 340,
    [StyleType.Crush]: 400,
    [StyleType.Magic]: 110,
    [StyleType.Ranged]: 50
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vanguard (Melee)";
monster.raid = Raid.ChambersOfXeric;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Vanguard_(melee).png';
monster.size = "3x3";
variant.currentHitpoints = 180;
variant.defenceLevel = 160;
variant.maxDefenceReduction = 160;
variant.magicLevel = 150;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 150,
    [StyleType.Slash]: 150,
    [StyleType.Crush]: 150,
    [StyleType.Magic]: 20,
    [StyleType.Ranged]: 400
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vanguard (Ranged)";
monster.raid = Raid.ChambersOfXeric;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Vanguard_(ranged).png';
monster.size = "3x3";
variant.currentHitpoints = 180;
variant.defenceLevel = 160;
variant.maxDefenceReduction = 160;
variant.magicLevel = 150;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 55,
    [StyleType.Slash]: 60,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 400,
    [StyleType.Ranged]: 300
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vespula";
monster.raid = Raid.ChambersOfXeric;
monster.size = "5x5";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Vespula.png';
variant.currentHitpoints = 200;
variant.defenceLevel = 88;
variant.maxDefenceReduction = 88;
variant.magicLevel = 88;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 70,
    [StyleType.Ranged]: 60
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vasa Nistirio";
monster.size = "5x5";
monster.shortName = "Vasa";
monster.raid = Raid.ChambersOfXeric;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Vasa_Nistirio.png';
variant.currentHitpoints = 300;
variant.defenceLevel = 175;
variant.maxDefenceReduction = 175;
variant.magicLevel = 230;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 170,
    [StyleType.Slash]: 190,
    [StyleType.Crush]: 50,
    [StyleType.Magic]: 400,
    [StyleType.Ranged]: 60
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Muttadile (Small)";
monster.raid = Raid.ChambersOfXeric;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Muttadile.png';
monster.size = "3x3";
variant.currentHitpoints = 250;
variant.defenceLevel = 138;
variant.maxDefenceReduction = 138;
variant.magicLevel = 1;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: -5,
    [StyleType.Slash]: 72,
    [StyleType.Crush]: 50,
    [StyleType.Magic]: 60,
    [StyleType.Ranged]: 0
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Muttadile (Large)";
monster.raid = Raid.ChambersOfXeric;
monster.size = "5x5";
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Muttadile.png';
variant.currentHitpoints = 250;
variant.defenceLevel = 220;
variant.maxDefenceReduction = 220;
variant.magicLevel = 250;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: -5,
    [StyleType.Slash]: -5,
    [StyleType.Crush]: 82,
    [StyleType.Magic]: 60,
    [StyleType.Ranged]: 75
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Great Olm (Head)";
monster.shortName = "Olm (Head)";
monster.size = "5x5";
monster.isDraconic = true;
monster.raid = Raid.ChambersOfXeric;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Great_Olm.png';
variant.currentHitpoints = 800;
variant.defenceLevel = 150;
variant.maxDefenceReduction = 150;
variant.magicLevel = 250;
variant.magicAccuracy = 60;
variant.defenceStats = {
    [StyleType.Stab]: 200,
    [StyleType.Slash]: 200,
    [StyleType.Crush]: 200,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 50
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Great Olm (Left Claw)";
monster.shortName = "Olm (Left Claw)";
monster.size = "5x5";
monster.isDraconic = true;
monster.raid = Raid.ChambersOfXeric;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Great_Olm.png';
variant.currentHitpoints = 600;
variant.defenceLevel = 175;
variant.maxDefenceReduction = 175;
variant.magicLevel = 175;
variant.magicAccuracy = 60;
variant.defenceStats = {
    [StyleType.Stab]: 50,
    [StyleType.Slash]: 50,
    [StyleType.Crush]: 50,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 200
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Great Olm (Right Claw)";
monster.shortName = "Olm (Right Claw)";
monster.size = "5x5";
monster.isDraconic = true;
monster.raid = Raid.ChambersOfXeric;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Great_Olm.png';
variant.currentHitpoints = 600;
variant.defenceLevel = 175;
variant.maxDefenceReduction = 175;
variant.magicLevel = 87;
variant.magicAccuracy = 60;
variant.defenceStats = {
    [StyleType.Stab]: 200,
    [StyleType.Slash]: 200,
    [StyleType.Crush]: 200,
    [StyleType.Magic]: 50,
    [StyleType.Ranged]: 200
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);


monster = new TargetMonster();
monster.name = "Undead Combat Dummy";
monster.raid = Raid.None;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Undead_combat_dummy.png';
monster.isUndead = true;
variant.currentHitpoints = 9999;
variant.defenceLevel = 1;
variant.maxDefenceReduction = 1;
variant.magicLevel = 1;
variant.magicAccuracy = 999;
variant.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Kalphite Queen";
monster.shortName = "KQ";
monster.size = "5x5";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.isKalphite = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Kalphite_Queen.png';
variant.currentHitpoints = 255;
variant.defenceLevel = 300;
variant.maxDefenceReduction = 300;
variant.magicLevel = 150;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 50,
    [StyleType.Slash]: 50,
    [StyleType.Crush]: 10,
    [StyleType.Magic]: 100,
    [StyleType.Ranged]: 100
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Kalphite Queen (P2)";
monster.shortName = "KQ (P2)";
monster.size = "5x5";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.isKalphite = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Kalphite_Queen_2nd_form.png';
variant.currentHitpoints = 255;
variant.defenceLevel = 300;
variant.maxDefenceReduction = 300;
variant.magicLevel = 150;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 100,
    [StyleType.Slash]: 100,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 10
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "The Whisperer";
monster.shortName = "Whisperer";
monster.size = "3x3";
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/The_Whisperer.png';
variant.currentHitpoints = 900;
variant.defenceLevel = 250;
variant.maxDefenceReduction = 250;
variant.magicLevel = 180;
variant.magicAccuracy = 190;
variant.defenceStats = {
    [StyleType.Stab]: 180,
    [StyleType.Slash]: 300,
    [StyleType.Crush]: 220,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 300
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Vardorvis";
monster.shortName = "Vardorvis";
monster.size = "2x2";
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Vardorvis.png';
variant.currentHitpoints = 700;
variant.defenceLevel = 215;
variant.maxDefenceReduction = 215;
variant.magicLevel = 215;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 215,
    [StyleType.Slash]: 65,
    [StyleType.Crush]: 85,
    [StyleType.Magic]: 580,
    [StyleType.Ranged]: 580
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "The Leviathan";
monster.shortName = "Leviathan";
monster.size = "7x7";
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/The_Leviathan.png';
variant.currentHitpoints = 900;
variant.defenceLevel = 250;
variant.maxDefenceReduction = 250;
variant.magicLevel = 160;
variant.magicAccuracy = 160;
variant.defenceStats = {
    [StyleType.Stab]: 260,
    [StyleType.Slash]: 190,
    [StyleType.Crush]: 230,
    [StyleType.Magic]: 280,
    [StyleType.Ranged]: 50
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Duke Sucellus";
monster.shortName = "Duke Sucellus";
monster.size = "7x7";
monster.isDemon = true;
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Duke_Sucellus.png';
variant.currentHitpoints = 440;
variant.defenceLevel = 275;
variant.maxDefenceReduction = 275;
variant.magicLevel = 310;
variant.magicAccuracy = 150;
variant.defenceStats = {
    [StyleType.Stab]: 255,
    [StyleType.Slash]: 65,
    [StyleType.Crush]: 190,
    [StyleType.Magic]: 440,
    [StyleType.Ranged]: 320
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Vorkath";
monster.size = "7x7";
monster.isDraconic = true;
monster.isUndead = true;
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Vorkath.png';
variant.currentHitpoints = 750;
variant.defenceLevel = 214;
variant.maxDefenceReduction = 214;
variant.magicLevel = 150;
variant.magicAccuracy = 150;
variant.defenceStats = {
    [StyleType.Stab]: 26,
    [StyleType.Slash]: 108,
    [StyleType.Crush]: 108,
    [StyleType.Magic]: 240,
    [StyleType.Ranged]: 26
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Dagannoth Rex";
monster.shortName = "Rex";
monster.size = "3x3";
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Dagannoth_Rex.png';
variant.currentHitpoints = 255;
variant.defenceLevel = 255;
variant.maxDefenceReduction = 255;
variant.magicLevel = 0;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 255,
    [StyleType.Slash]: 255,
    [StyleType.Crush]: 255,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 255
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Dagannoth Prime";
monster.shortName = "Prime";
monster.size = "3x3";
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Dagannoth_Prime.png';
variant.currentHitpoints = 255;
variant.defenceLevel = 255;
variant.maxDefenceReduction = 255;
variant.magicLevel = 255;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 255,
    [StyleType.Slash]: 255,
    [StyleType.Crush]: 255,
    [StyleType.Magic]: 255,
    [StyleType.Ranged]: 10
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Dagannoth Supreme";
monster.shortName = "Supreme";
monster.size = "3x3";
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Dagannoth_Supreme.png';
variant.currentHitpoints = 255;
variant.defenceLevel = 128;
variant.maxDefenceReduction = 128;
variant.magicLevel = 255;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 10,
    [StyleType.Slash]: 10,
    [StyleType.Crush]: 10,
    [StyleType.Magic]: 255,
    [StyleType.Ranged]: 550
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Alchemical Hydra";
monster.shortName = "Hydra";
monster.size = "6x6";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.isDraconic = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Alchemical_Hydra.png';
variant.currentHitpoints = 1100;
variant.defenceLevel = 100;
variant.maxDefenceReduction = 100;
variant.magicLevel = 260;
variant.magicAccuracy = 45;
variant.defenceStats = {
    [StyleType.Stab]: 75,
    [StyleType.Slash]: 150,
    [StyleType.Crush]: 150,
    [StyleType.Magic]: 150,
    [StyleType.Ranged]: 45
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Mutated Bloodveld";
monster.size = "2x2";
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Mutated_Bloodveld.png';
variant.currentHitpoints = 170;
variant.defenceLevel = 30;
variant.maxDefenceReduction = 30;
variant.magicLevel = 1;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "TzTok-Jad";
monster.shortName = "Jad";
monster.size = "5x5";
monster.raid = Raid.None;
monster.slayerMonster = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/TzTok-Jad.png';
variant.currentHitpoints = 250;
variant.defenceLevel = 480;
variant.maxDefenceReduction = 480;
variant.magicLevel = 480;
variant.magicAccuracy = 60;
variant.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Blue Dragon";
monster.size = "4x4";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.isDraconic = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/Blue_dragon.png';
variant.currentHitpoints = 105;
variant.defenceLevel = 95;
variant.maxDefenceReduction = 95;
variant.magicLevel = 1;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 50,
    [StyleType.Slash]: 70,
    [StyleType.Crush]: 70,
    [StyleType.Magic]: 60,
    [StyleType.Ranged]: 50
};
monster.addVariant(variant);
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "King Black Dragon";
monster.shortName = "KBD";
monster.size = "5x5";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.isDraconic = true;
variant = new MonsterVariant();
variant.imagePath = './Images/Monsters/King_Black_Dragon.png';
variant.currentHitpoints = 240;
variant.defenceLevel = 240;
variant.maxDefenceReduction = 240;
variant.magicLevel = 240;
variant.magicAccuracy = 0;
variant.defenceStats = {
    [StyleType.Stab]: 70,
    [StyleType.Slash]: 90,
    [StyleType.Crush]: 90,
    [StyleType.Magic]: 80,
    [StyleType.Ranged]: 70
};
monster.addVariant(variant);
monsters.set(monster.shortName, monster);