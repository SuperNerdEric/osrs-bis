import {TargetMonster} from "./TargetMonster";
import {Raid} from "./Raid";
import {StyleType} from "./Item";

export const monsters = new Map<string, TargetMonster>;

let monster = new TargetMonster();
monster.name = "Ba-Ba";
monster.raid = Raid.TombsOfAmascut;
monster.size = "5x5";
monster.imagePath = './Images/Monsters/Ba-Ba.png';
monster.currentHitpoints = 380;
monster.defenceLevel = 80;
//https://archive.ph/31H2d
monster.maxDefenceReduction = 20;
monster.magicLevel = 100;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 80,
    [StyleType.Slash]: 160,
    [StyleType.Crush]: 240,
    [StyleType.Magic]: 280,
    [StyleType.Ranged]: 200,
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Akkha";
monster.raid = Raid.TombsOfAmascut;
monster.size = "3x3";
monster.imagePath = './Images/Monsters/Akkha.png';
monster.currentHitpoints = 400;
monster.defenceLevel = 80;
monster.maxDefenceReduction = 20;
monster.magicLevel = 100;
monster.magicAccuracy = 115;
monster.defenceStats = {
    [StyleType.Stab]: 60,
    [StyleType.Slash]: 120,
    [StyleType.Crush]: 120,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 60,
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Akkha's Shadow";
monster.raid = Raid.TombsOfAmascut;
monster.size = "3x3";
monster.imagePath = './Images/Monsters/Akkhas_Shadow.png';
monster.currentHitpoints = 70;
monster.defenceLevel = 30;
monster.maxDefenceReduction = 20;
monster.magicLevel = 100;
monster.magicAccuracy = 115;
monster.defenceStats = {
    [StyleType.Stab]: 60,
    [StyleType.Slash]: 120,
    [StyleType.Crush]: 120,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 60,
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Kephri";
monster.raid = Raid.TombsOfAmascut;
monster.size = "5x5";
monster.isKalphite = true;
monster.imagePath = './Images/Monsters/Kephri.png';
monster.currentHitpoints = 80;
monster.defenceLevel = 80;
monster.maxDefenceReduction = 20;
monster.magicLevel = 125;
monster.magicAccuracy = 125;
monster.defenceStats = {
    [StyleType.Stab]: 60,
    [StyleType.Slash]: 300,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 300,
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Zebak";
monster.raid = Raid.TombsOfAmascut;
monster.size = "9x9";
monster.imagePath = './Images/Monsters/Zebak.png';
monster.currentHitpoints = 580;
monster.defenceLevel = 70;
monster.maxDefenceReduction = 20;
monster.magicLevel = 100;
monster.magicAccuracy = 215;
monster.defenceStats = {
    [StyleType.Stab]: 160,
    [StyleType.Slash]: 160,
    [StyleType.Crush]: 260,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 110,
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Obelisk";
monster.raid = Raid.TombsOfAmascut
monster.size = "3x3";
monster.imagePath = './Images/Monsters/Obelisk_(Tombs_of_Amascut,_phase_1).png';
monster.currentHitpoints = 260;
monster.defenceLevel = 100;
monster.maxDefenceReduction = 40;
monster.magicLevel = 100;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 70,
    [StyleType.Slash]: 70,
    [StyleType.Crush]: 70,
    [StyleType.Magic]: 50,
    [StyleType.Ranged]: 60
};
monsters.set(monster.name, monster);


monster = new TargetMonster();
monster.name = "Wardens P3";
monster.raid = Raid.TombsOfAmascut
monster.size = "5x5";
monster.imagePath = './Images/Monsters/Tumekens_Warden.png';
monster.currentHitpoints = 880;
monster.defenceLevel = 150;
monster.maxDefenceReduction = 30;
monster.magicLevel = 150;
monster.magicAccuracy = 230;
monster.defenceStats = {
    [StyleType.Stab]: 40,
    [StyleType.Slash]: 40,
    [StyleType.Crush]: 20,
    [StyleType.Magic]: 20,
    [StyleType.Ranged]: 20
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Kree'arra (Armadyl)";
monster.size = "5x5";
monster.slayerMonster = true;
monster.shortName = "Armadyl";
monster.imagePath = './Images/Monsters/Kreearra.png';
monster.currentHitpoints = 255;
monster.defenceLevel = 260;
monster.maxDefenceReduction = 260;
monster.magicLevel = 200;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 180,
    [StyleType.Slash]: 180,
    [StyleType.Crush]: 180,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 200
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "General Graardor (Bandos)";
monster.size = "4x4";
monster.shortName = "Bandos";
monster.imagePath = './Images/Monsters/General_Graardor.png';
monster.currentHitpoints = 255;
monster.defenceLevel = 250;
monster.maxDefenceReduction = 250;
monster.magicLevel = 80;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 90,
    [StyleType.Slash]: 90,
    [StyleType.Crush]: 90,
    [StyleType.Magic]: 298,
    [StyleType.Ranged]: 90
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Commander Zilyana (Saradomin)";
monster.shortName = "Saradomin";
monster.size = "2x2";
monster.imagePath = './Images/Monsters/Commander_Zilyana.png';
monster.currentHitpoints = 255;
monster.defenceLevel = 300;
monster.maxDefenceReduction = 300;
monster.magicLevel = 300;
monster.magicAccuracy = 200;
monster.defenceStats = {
    [StyleType.Stab]: 100,
    [StyleType.Slash]: 100,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 100,
    [StyleType.Ranged]: 100
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "K'ril Tsutsaroth (Zamorak)";
monster.size = "5x5";
monster.currentHitpoints = 255;
monster.slayerMonster = true;
monster.isDemon = true;
monster.shortName = "Zamorak";
monster.imagePath = './Images/Monsters/Kril_Tsutsaroth.png';
monster.defenceLevel = 270;
monster.maxDefenceReduction = 270;
monster.magicLevel = 200;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 80,
    [StyleType.Slash]: 80,
    [StyleType.Crush]: 80,
    [StyleType.Magic]: 130,
    [StyleType.Ranged]: 80
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Nex";
monster.size = "3x3";
monster.currentHitpoints = 3400;
monster.imagePath = './Images/Monsters/Nex.png';
monster.defenceLevel = 260;
monster.maxDefenceReduction = 10;
monster.magicLevel = 230;
monster.magicAccuracy = 100;
monster.defenceStats = {
    [StyleType.Stab]: 40,
    [StyleType.Slash]: 140,
    [StyleType.Crush]: 60,
    [StyleType.Magic]: 300,
    [StyleType.Ranged]: 190
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Ahrim the Blighted";
monster.size = "1x1";
monster.shortName = "Ahrim";
monster.imagePath = './Images/Monsters/Ahrim_the_Blighted.png';
monster.currentHitpoints = 100;
monster.defenceLevel = 100;
monster.maxDefenceReduction = 100;
monster.magicLevel = 100;
monster.magicAccuracy = 73;
monster.defenceStats = {
    [StyleType.Stab]: 103,
    [StyleType.Slash]: 85,
    [StyleType.Crush]: 117,
    [StyleType.Magic]: 73,
    [StyleType.Ranged]: 0
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Dharok the Wretched";
monster.size = "1x1";
monster.shortName = "Dharok";
monster.imagePath = './Images/Monsters/Dharok_the_Wretched.png';
monster.currentHitpoints = 100;
monster.defenceLevel = 100;
monster.maxDefenceReduction = 100;
monster.magicLevel = 1;
monster.magicAccuracy = -58;
monster.defenceStats = {
    [StyleType.Stab]: 252,
    [StyleType.Slash]: 250,
    [StyleType.Crush]: 244,
    [StyleType.Magic]: -11,
    [StyleType.Ranged]: 249
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Guthan the Infested";
monster.size = "1x1";
monster.shortName = "Guthan";
monster.imagePath = './Images/Monsters/Guthan_the_Infested.png';
monster.currentHitpoints = 100;
monster.defenceLevel = 100;
monster.maxDefenceReduction = 100;
monster.magicLevel = 1;
monster.magicAccuracy = -50;
monster.defenceStats = {
    [StyleType.Stab]: 259,
    [StyleType.Slash]: 257,
    [StyleType.Crush]: 241,
    [StyleType.Magic]: -11,
    [StyleType.Ranged]: 250
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Karil the Tainted";
monster.size = "1x1";
monster.shortName = "Karil";
monster.imagePath = './Images/Monsters/Karil_the_Tainted.png';
monster.currentHitpoints = 100;
monster.defenceLevel = 100;
monster.maxDefenceReduction = 100;
monster.magicLevel = 1;
monster.magicAccuracy = -26;
monster.defenceStats = {
    [StyleType.Stab]: 79,
    [StyleType.Slash]: 71,
    [StyleType.Crush]: 90,
    [StyleType.Magic]: 106,
    [StyleType.Ranged]: 100
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Torag the Corrupted";
monster.shortName = "Torag";
monster.size = "1x1";
monster.imagePath = './Images/Monsters/Torag_the_Corrupted.png';
monster.currentHitpoints = 100;
monster.defenceLevel = 100;
monster.maxDefenceReduction = 100;
monster.magicLevel = 1;
monster.magicAccuracy = -33;
monster.defenceStats = {
    [StyleType.Stab]: 221,
    [StyleType.Slash]: 235,
    [StyleType.Crush]: 222,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 221
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Verac the Defiled";
monster.shortName = "Verac";
monster.size = "1x1";
monster.imagePath = './Images/Monsters/Verac_the_Defiled.png';
monster.currentHitpoints = 100;
monster.defenceLevel = 100;
monster.maxDefenceReduction = 100;
monster.magicLevel = 1;
monster.magicAccuracy = -42;
monster.defenceStats = {
    [StyleType.Stab]: 227,
    [StyleType.Slash]: 230,
    [StyleType.Crush]: 221,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 225
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Corporeal Beast";
monster.shortName = "Corp";
monster.size = "5x5";
monster.imagePath = './Images/Monsters/Corporeal_Beast.png';
monster.currentHitpoints = 2000;
monster.defenceLevel = 310;
monster.maxDefenceReduction = 310;
monster.magicLevel = 350;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 25,
    [StyleType.Slash]: 200,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 150,
    [StyleType.Ranged]: 230
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "The Maiden of Sugadinti";
monster.shortName = "Maiden";
monster.size = "6x6";
monster.imagePath = './Images/Monsters/The_Maiden_of_Sugadinti.png';
monster.currentHitpoints = 3500;
monster.defenceLevel = 200;
monster.maxDefenceReduction = 200;
monster.magicLevel = 350;
monster.magicAccuracy = 300;
monster.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Pestilent Bloat";
monster.shortName = "Bloat";
monster.size = "5x5";
monster.isUndead = true;
monster.imagePath = './Images/Monsters/Pestilent_Bloat.png';
monster.currentHitpoints = 2000;
monster.defenceLevel = 100;
monster.maxDefenceReduction = 100;
monster.magicLevel = 150;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 40,
    [StyleType.Slash]: 20,
    [StyleType.Crush]: 40,
    [StyleType.Magic]: 600,
    [StyleType.Ranged]: 800
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Nylocas Vasilias";
monster.shortName = "Nylo";
monster.size = "4x4";
monster.imagePath = './Images/Monsters/Nylocas_Vasilias_(melee).png';
monster.currentHitpoints = 2500;
monster.defenceLevel = 50;
monster.maxDefenceReduction = 50;
monster.magicLevel = 50;
monster.magicAccuracy = 600;
monster.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Sotetseg";
monster.shortName = "Sote";
monster.size = "5x5";
monster.imagePath = './Images/Monsters/Sotetseg.png';
monster.currentHitpoints = 4000;
monster.defenceLevel = 200;
monster.maxDefenceReduction = 200;
monster.magicLevel = 250;
monster.magicAccuracy = -10;
monster.defenceStats = {
    [StyleType.Stab]: 70,
    [StyleType.Slash]: 70,
    [StyleType.Crush]: 70,
    [StyleType.Magic]: 30,
    [StyleType.Ranged]: 150
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Xarpus";
monster.size = "5x5";
monster.imagePath = './Images/Monsters/Xarpus.png';
monster.currentHitpoints = 5000;
monster.defenceLevel = 250;
monster.maxDefenceReduction = 250;
monster.magicLevel = 220;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 160
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Verzik Vitur P2";
monster.shortName = "Verzik P2";
monster.size = "3x3";
monster.imagePath = './Images/Monsters/Verzik_Vitur_(flying).png';
monster.currentHitpoints = 3250;
monster.defenceLevel = 200;
monster.maxDefenceReduction = 200;
monster.magicLevel = 400;
monster.magicAccuracy = 80;
monster.defenceStats = {
    [StyleType.Stab]: 100,
    [StyleType.Slash]: 60,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 70,
    [StyleType.Ranged]: 250
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Verzik Vitur P3";
monster.shortName = "Verzik P3";
monster.size = "7x7";
monster.imagePath = './Images/Monsters/Verzik_Vitur_(final_form).png';
monster.currentHitpoints = 3250;
monster.defenceLevel = 150;
monster.maxDefenceReduction = 150;
monster.magicLevel = 300;
monster.magicAccuracy = 80;
monster.defenceStats = {
    [StyleType.Stab]: 70,
    [StyleType.Slash]: 30,
    [StyleType.Crush]: 70,
    [StyleType.Magic]: 100,
    [StyleType.Ranged]: 230
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Tekton";
monster.raid = Raid.ChambersOfXeric;
monster.size = "4x4";
monster.imagePath = './Images/Monsters/Tekton.png';
monster.currentHitpoints = 300;
monster.defenceLevel = 205;
monster.maxDefenceReduction = 205;
monster.magicLevel = 205;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 155,
    [StyleType.Slash]: 165,
    [StyleType.Crush]: 105,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vanguard (Magic)";
monster.raid = Raid.ChambersOfXeric;
monster.size = "3x3";
monster.imagePath = './Images/Monsters/Vanguard_(magic).png';
monster.currentHitpoints = 180;
monster.defenceLevel = 160;
monster.maxDefenceReduction = 160;
monster.magicLevel = 150;
monster.magicAccuracy = 40;
monster.defenceStats = {
    [StyleType.Stab]: 315,
    [StyleType.Slash]: 340,
    [StyleType.Crush]: 400,
    [StyleType.Magic]: 110,
    [StyleType.Ranged]: 50
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vanguard (Melee)";
monster.raid = Raid.ChambersOfXeric;
monster.imagePath = './Images/Monsters/Vanguard_(melee).png';
monster.size = "3x3";
monster.currentHitpoints = 180;
monster.defenceLevel = 160;
monster.maxDefenceReduction = 160;
monster.magicLevel = 150;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 150,
    [StyleType.Slash]: 150,
    [StyleType.Crush]: 150,
    [StyleType.Magic]: 20,
    [StyleType.Ranged]: 400
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vanguard (Ranged)";
monster.raid = Raid.ChambersOfXeric;
monster.imagePath = './Images/Monsters/Vanguard_(ranged).png';
monster.size = "3x3";
monster.currentHitpoints = 180;
monster.defenceLevel = 160;
monster.maxDefenceReduction = 160;
monster.magicLevel = 150;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 55,
    [StyleType.Slash]: 60,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 400,
    [StyleType.Ranged]: 300
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vespula";
monster.raid = Raid.ChambersOfXeric;
monster.size = "5x5";
monster.imagePath = './Images/Monsters/Vespula.png';
monster.currentHitpoints = 200;
monster.defenceLevel = 88;
monster.maxDefenceReduction = 88;
monster.magicLevel = 88;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 70,
    [StyleType.Ranged]: 60
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Vasa Nistirio";
monster.size = "5x5";
monster.shortName = "Vasa";
monster.raid = Raid.ChambersOfXeric;
monster.imagePath = './Images/Monsters/Vasa_Nistirio.png';
monster.currentHitpoints = 300;
monster.defenceLevel = 175;
monster.maxDefenceReduction = 175;
monster.magicLevel = 230;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 170,
    [StyleType.Slash]: 190,
    [StyleType.Crush]: 50,
    [StyleType.Magic]: 400,
    [StyleType.Ranged]: 60
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Muttadile (Small)";
monster.raid = Raid.ChambersOfXeric;
monster.imagePath = './Images/Monsters/Muttadile.png';
monster.size = "3x3";
monster.currentHitpoints = 250;
monster.defenceLevel = 138;
monster.maxDefenceReduction = 138;
monster.magicLevel = 1;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: -5,
    [StyleType.Slash]: 72,
    [StyleType.Crush]: 50,
    [StyleType.Magic]: 60,
    [StyleType.Ranged]: 0
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Muttadile (Large)";
monster.raid = Raid.ChambersOfXeric;
monster.size = "5x5";
monster.imagePath = './Images/Monsters/Muttadile.png';
monster.currentHitpoints = 250;
monster.defenceLevel = 220;
monster.maxDefenceReduction = 220;
monster.magicLevel = 250;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: -5,
    [StyleType.Slash]: -5,
    [StyleType.Crush]: 82,
    [StyleType.Magic]: 60,
    [StyleType.Ranged]: 75
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Great Olm (Head)";
monster.shortName = "Olm (Head)";
monster.size = "5x5";
monster.isDraconic = true;
monster.raid = Raid.ChambersOfXeric;
monster.imagePath = './Images/Monsters/Great_Olm.png';
monster.currentHitpoints = 800;
monster.defenceLevel = 150;
monster.maxDefenceReduction = 150;
monster.magicLevel = 250;
monster.magicAccuracy = 60;
monster.defenceStats = {
    [StyleType.Stab]: 200,
    [StyleType.Slash]: 200,
    [StyleType.Crush]: 200,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 50
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Great Olm (Left Claw)";
monster.shortName = "Olm (Left Claw)";
monster.size = "5x5";
monster.isDraconic = true;
monster.raid = Raid.ChambersOfXeric;
monster.imagePath = './Images/Monsters/Great_Olm.png';
monster.currentHitpoints = 600;
monster.defenceLevel = 175;
monster.maxDefenceReduction = 175;
monster.magicLevel = 175;
monster.magicAccuracy = 60;
monster.defenceStats = {
    [StyleType.Stab]: 50,
    [StyleType.Slash]: 50,
    [StyleType.Crush]: 50,
    [StyleType.Magic]: 200,
    [StyleType.Ranged]: 200
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Great Olm (Right Claw)";
monster.shortName = "Olm (Right Claw)";
monster.size = "5x5";
monster.isDraconic = true;
monster.raid = Raid.ChambersOfXeric;
monster.imagePath = './Images/Monsters/Great_Olm.png';
monster.currentHitpoints = 600;
monster.defenceLevel = 175;
monster.maxDefenceReduction = 175;
monster.magicLevel = 87;
monster.magicAccuracy = 60;
monster.defenceStats = {
    [StyleType.Stab]: 200,
    [StyleType.Slash]: 200,
    [StyleType.Crush]: 200,
    [StyleType.Magic]: 50,
    [StyleType.Ranged]: 200
};
monsters.set(monster.shortName, monster);


monster = new TargetMonster();
monster.name = "Undead Combat Dummy";
monster.raid = Raid.None;
monster.imagePath = './Images/Monsters/Great_Olm.png';
monster.currentHitpoints = 9999;
monster.defenceLevel = 1;
monster.maxDefenceReduction = 1;
monster.magicLevel = 1;
monster.magicAccuracy = 999;
monster.defenceStats = {
    [StyleType.Stab]: 0,
    [StyleType.Slash]: 0,
    [StyleType.Crush]: 0,
    [StyleType.Magic]: 0,
    [StyleType.Ranged]: 0
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Kalphite Queen";
monster.shortName = "KQ";
monster.size = "5x5";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.isKalphite = true;
monster.imagePath = './Images/Monsters/Kalphite_Queen.png';
monster.currentHitpoints = 255;
monster.defenceLevel = 300;
monster.maxDefenceReduction = 300;
monster.magicLevel = 150;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 50,
    [StyleType.Slash]: 50,
    [StyleType.Crush]: 10,
    [StyleType.Magic]: 100,
    [StyleType.Ranged]: 100
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Kalphite Queen (P2)";
monster.shortName = "KQ (P2)";
monster.size = "5x5";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.isKalphite = true;
monster.imagePath = './Images/Monsters/Kalphite_Queen_2nd_form.png';
monster.currentHitpoints = 255;
monster.defenceLevel = 300;
monster.maxDefenceReduction = 300;
monster.magicLevel = 150;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 100,
    [StyleType.Slash]: 100,
    [StyleType.Crush]: 100,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 10
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "The Whisperer";
monster.shortName = "Whisperer";
monster.size = "3x3";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.imagePath = './Images/Monsters/The_Whisperer.png';
monster.currentHitpoints = 900;
monster.defenceLevel = 250;
monster.maxDefenceReduction = 250;
monster.magicLevel = 180;
monster.magicAccuracy = 190;
monster.defenceStats = {
    [StyleType.Stab]: 180,
    [StyleType.Slash]: 300,
    [StyleType.Crush]: 220,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 300
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Vardorvis";
monster.shortName = "Vardorvis";
monster.size = "2x2";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.imagePath = './Images/Monsters/Vardorvis.png';
monster.currentHitpoints = 700;
monster.defenceLevel = 215;
monster.maxDefenceReduction = 215;
monster.magicLevel = 215;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 215,
    [StyleType.Slash]: 65,
    [StyleType.Crush]: 85,
    [StyleType.Magic]: 580,
    [StyleType.Ranged]: 580
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "The Leviathan";
monster.shortName = "Leviathan";
monster.size = "7x7";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.imagePath = './Images/Monsters/The_Leviathan.png';
monster.currentHitpoints = 900;
monster.defenceLevel = 250;
monster.maxDefenceReduction = 250;
monster.magicLevel = 160;
monster.magicAccuracy = 160;
monster.defenceStats = {
    [StyleType.Stab]: 260,
    [StyleType.Slash]: 190,
    [StyleType.Crush]: 230,
    [StyleType.Magic]: 280,
    [StyleType.Ranged]: 50
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Duke Sucellus";
monster.shortName = "Duke Sucellus";
monster.size = "7x7";
monster.isDemon = true;
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.imagePath = './Images/Monsters/Duke_Sucellus.png';
monster.currentHitpoints = 440;
monster.defenceLevel = 275;
monster.maxDefenceReduction = 275;
monster.magicLevel = 310;
monster.magicAccuracy = 150;
monster.defenceStats = {
    [StyleType.Stab]: 255,
    [StyleType.Slash]: 65,
    [StyleType.Crush]: 190,
    [StyleType.Magic]: 440,
    [StyleType.Ranged]: 320
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Vorkath";
monster.size = "7x7";
monster.isDraconic = true;
monster.isUndead = true;
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.imagePath = './Images/Monsters/Vorkath.png';
monster.currentHitpoints = 750;
monster.defenceLevel = 214;
monster.maxDefenceReduction = 214;
monster.magicLevel = 150;
monster.magicAccuracy = 150;
monster.defenceStats = {
    [StyleType.Stab]: 26,
    [StyleType.Slash]: 108,
    [StyleType.Crush]: 108,
    [StyleType.Magic]: 240,
    [StyleType.Ranged]: 26
};
monsters.set(monster.name, monster);

monster = new TargetMonster();
monster.name = "Dagannoth Rex";
monster.shortName = "Rex";
monster.size = "3x3";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.imagePath = './Images/Monsters/Dagannoth_Rex.png';
monster.currentHitpoints = 255;
monster.defenceLevel = 255;
monster.maxDefenceReduction = 255;
monster.magicLevel = 0;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 255,
    [StyleType.Slash]: 255,
    [StyleType.Crush]: 255,
    [StyleType.Magic]: 10,
    [StyleType.Ranged]: 255
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Dagannoth Prime";
monster.shortName = "Prime";
monster.size = "3x3";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.imagePath = './Images/Monsters/Dagannoth_Prime.png';
monster.currentHitpoints = 255;
monster.defenceLevel = 255;
monster.maxDefenceReduction = 255;
monster.magicLevel = 255;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 255,
    [StyleType.Slash]: 255,
    [StyleType.Crush]: 255,
    [StyleType.Magic]: 255,
    [StyleType.Ranged]: 10
};
monsters.set(monster.shortName, monster);

monster = new TargetMonster();
monster.name = "Dagannoth Supreme";
monster.shortName = "Supreme";
monster.size = "3x3";
monster.raid = Raid.None;
monster.slayerMonster = true;
monster.imagePath = './Images/Monsters/Dagannoth_Supreme.png';
monster.currentHitpoints = 255;
monster.defenceLevel = 128;
monster.maxDefenceReduction = 128;
monster.magicLevel = 255;
monster.magicAccuracy = 0;
monster.defenceStats = {
    [StyleType.Stab]: 10,
    [StyleType.Slash]: 10,
    [StyleType.Crush]: 10,
    [StyleType.Magic]: 255,
    [StyleType.Ranged]: 550
};
monsters.set(monster.shortName, monster);