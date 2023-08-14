import {Tooltip} from "@mui/material";
import {Calculator} from "./Calculator/Calculator";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {monsters} from "./DataObjects/Monsters";
import {GearSet, gearSets, GearSetType} from "./DataObjects/GearSets";
import {DiscreteSliderMarks} from "./Slider";
import DefenceReduction from "./DefenceReduction";
import React, {useEffect, useState} from 'react';
import {Raid} from "./DataObjects/Raid";
import OnTaskCheck from "./OnTaskCheck";
import {GearTable} from "./Table";
import {ColumnDef} from "@tanstack/react-table";
import MonsterSearch from "./MonsterSearch";

interface MainContentProps {
    target: string;
    invocationLevel: number;
    handleChange: (event: Event, newValue: number | number[]) => void;
    defenceReduction: number;
    handleDefenceReduction: (defenceReduction: number) => void;
    onTask: boolean;
    handleOnTask: (onTask: boolean) => void;
    setTargetMonster: (monster: TargetMonster) => void;
}

const MainContent: React.FC<MainContentProps> = ({
                                                     target,
                                                     invocationLevel,
                                                     handleChange,
                                                     defenceReduction,
                                                     handleDefenceReduction,
                                                     onTask,
                                                     handleOnTask,
                                                     setTargetMonster
                                                 }) => {

    const [results, setResults] = useState<Calculator[]>([]);
    const isToaBoss: boolean = (monsters.get(target) as TargetMonster).raid === Raid.TombsOfAmascut;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    const handleMonsterSelect = (monster: TargetMonster) => {
        setTargetMonster(monster);
    };

    useEffect(() => {
        const results: Calculator[] = [];

        const shownGearSets: GearSet[] = [];

        if ((monsters.get(target) as TargetMonster).isKalphite) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Kalphites));
            shownGearSets.push(...slayerGearSets);
        }

        if ((monsters.get(target) as TargetMonster).isDemon) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Demon));
            shownGearSets.push(...slayerGearSets);
        }

        if ((monsters.get(target) as TargetMonster).isDraconic) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Draconic));
            shownGearSets.push(...slayerGearSets);
        }

        if ((monsters.get(target) as TargetMonster).isUndead) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Undead));
            shownGearSets.push(...slayerGearSets);
        }

        if ((monsters.get(target) as TargetMonster).slayerMonster && onTask) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Slayer));
            shownGearSets.push(...slayerGearSets);
        }

        const generalGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.General));
        shownGearSets.push(...generalGearSets);


        shownGearSets.forEach(gearSet => {
            gearSet.setRaid((monsters.get(target) as TargetMonster).raid);
            const result: Calculator = new Calculator(gearSet);
            result.targetMonster = monsters.get(target) as TargetMonster;
            result.defenceReduction = defenceReduction;
            result.onTask = onTask;
            if (isToaBoss) {
                result.player.attackLevelBoost = 26;
                result.player.strengthLevelBoost = 26;
                result.player.rangedLevelBoost = 26;
                result.player.magicLevelBoost = 26;
                result.calculateDPS(invocationLevel);
            } else {
                result.player.attackLevelBoost = 19;
                result.player.strengthLevelBoost = 19;
                result.player.rangedLevelBoost = 13;
                result.player.magicLevelBoost = 13; //saturated heart
                result.calculateDPS(0);
            }
            results.push(result);
        })

        setResults(results);
    }, [target, invocationLevel, defenceReduction, onTask]);


    const columns = React.useMemo<ColumnDef<Calculator>[]>(
        () => [
            {
                header: () => <span>Style</span>,
                accessorKey: 'combatStyle',
                id: 'combatStyle',
                accessorFn: row => row.gearSet.combatStyle,
                cell: info => info.getValue(),
            },
            {
                header: () => <span>Gear</span>,
                accessorKey: 'gear',
                accessorFn: row => {
                    return (
                        <div>
                            {
                                <Tooltip title={row.gearSet.weapon.name}>
                                    <a href={row.gearSet.weapon.wikiLink} target="_blank" rel="noreferrer">
                                        <img src={require(`${row.gearSet.weapon.imagePath}`)}
                                             style={{width: `${imageSize}px`, height: `${imageSize}px`}}
                                             alt={row.gearSet.weapon.name}/>
                                    </a>
                                </Tooltip>
                            }
                            {
                                row.gearSet.items.map(item => (
                                    <Tooltip title={item.name}>
                                        <a href={item.wikiLink} target="_blank" rel="noreferrer">
                                            <img src={require(`${item.imagePath}`)}
                                                 style={{width: `${imageSize}px`, height: `${imageSize}px`}}
                                                 alt={item.name}/>
                                        </a>
                                    </Tooltip>
                                ))
                            }
                        </div>
                    )
                },
                id: 'gear',
                cell: info => info.getValue(),
            },
            {
                header: () => <span>DPS</span>,
                accessorKey: 'dps',
                accessorFn: row => (Math.round(row.dps * 1000) / 1000),
                id: 'dps',
                cell: info => info.getValue(),
            },
            {
                header: () => <span>Max Hit</span>,
                accessorKey: 'maxHit',
                accessorFn: row => row.maxHit,
                id: 'maxHit',
                cell: info => info.getValue(),
            },
            {
                header: () => <span>Hit Chance</span>,
                accessorKey: 'hitChance',
                accessorFn: row => `${Math.round(row.hitChance * 100 * 100) / 100}%`,
                id: 'hitChance',
                cell: info => info.getValue(),
            },
        ],
        []
    )


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageSize = Math.max(20, Math.min(50, windowWidth / 20));


    const isSlayerMonster: boolean = (monsters.get(target) as TargetMonster).slayerMonster;

    return (
        <main className="App-main">
            <h2 className="monsterName">{(monsters.get(target) as TargetMonster).name}</h2>
            <div className="monsterSearch">
                <MonsterSearch onSelect={handleMonsterSelect} />
            </div>
            <img src={require(`${(monsters.get(target) as TargetMonster).imagePath}`)} width="auto"
                 height="150" alt={target}/>
            {
                isToaBoss &&
                <DiscreteSliderMarks defaultValue={invocationLevel} handleChange={handleChange}/>
            }
            <caption>
                {isToaBoss && `${invocationLevel} Invocation   `}
            </caption>
            <DefenceReduction bossName={target}
                              defenceLevel={(monsters.get(target) as TargetMonster).defenceLevel}
                              maxReduction={(monsters.get(target) as TargetMonster).maxDefenceReduction}
                              handleChange={handleDefenceReduction}/>
            {isSlayerMonster && <OnTaskCheck onTask={onTask} handleOnTask={handleOnTask}/>}
            <GearTable data={results} columns={columns}/>
        </main>
    )
}

export default MainContent;
