import { Tooltip } from "@mui/material";
import { Result } from "./DataObjects/Result";
import { TargetMonster } from "./DataObjects/TargetMonster";
import { monsters } from "./DataObjects/Monsters";
import {GearSet, gearSets, GearSetType} from "./DataObjects/GearSets";
import { DiscreteSliderMarks } from "./Slider";
import DefenceReduction from "./DefenceReduction";
import { devLog } from './utils';
import React, {useEffect, useState} from 'react';
import {Raid} from "./DataObjects/Raid";
import OnTaskCheck from "./OnTaskCheck";

const Table = {
    border: 1,
    padding: 25,
    th: {
        padding: '0 15px',
    },
    td: {
        padding: '0 15px',
    },
}

interface MainContentProps {
    target: string;
    invocationLevel: number;
    handleChange: (event: Event, newValue: number | number[]) => void;
    defenceReduction: number;
    handleDefenceReduction: (defenceReduction: number) => void;
    onTask: boolean;
    handleOnTask: (onTask: boolean) => void;
}

const MainContent: React.FC<MainContentProps> = ({
                                                     target,
                                                     invocationLevel,
                                                     handleChange,
                                                     defenceReduction,
                                                     handleDefenceReduction,
                                                     onTask,
                                                     handleOnTask
                                                 }) => {

    const [results, setResults] = useState<Result[]>([]);
    const isToaBoss: boolean = (monsters.get(target) as TargetMonster).raid === Raid.TombsOfAmascut;
    const [sortConfig, setSortConfig] = React.useState({key: 'dps' as keyof Result, direction: 'descending'});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const requestSort = (key: keyof Result) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    }

    React.useMemo(() => {
        //devLog(`Sorting ${sortConfig.key} ${sortConfig.direction}`);
        results.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        return results;
    }, [results, sortConfig]);

    useEffect(() => {
        const results: Result[] = [];

        const shownGearSets: GearSet[] = [];
        if((monsters.get(target) as TargetMonster).slayerMonster) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Slayer));
            shownGearSets.push(...slayerGearSets);
        }

        if((monsters.get(target) as TargetMonster).isKalphite) {
            const slayerGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.Kalphites));
            shownGearSets.push(...slayerGearSets);
        }

        const generalGearSets = gearSets.filter(gearSet => gearSet.types.includes(GearSetType.General));
        shownGearSets.push(...generalGearSets);


        shownGearSets.forEach(gearSet => {
            const result: Result = new Result(gearSet);
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
            devLog(result);
            results.push(result);
        })

        setResults(results);
    }, [target, invocationLevel, defenceReduction, onTask]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageSize = Math.max(25, Math.min(50, windowWidth / 20));


    const isSlayerMonster: boolean = (monsters.get(target) as TargetMonster).slayerMonster;

    return (
        <main className="App-main">
            <h2>{(monsters.get(target) as TargetMonster).name}</h2>
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
            <table style={Table}>
                <thead>
                <tr>
                    <th>Style</th>
                    <th>Gear</th>
                    <th onClick={() => requestSort('dps')}>DPS</th>
                    <th onClick={() => requestSort('maxHit')}>Max Hit</th>
                    <th onClick={() => requestSort('hitChance')}>Hit Chance</th>
                    {/*<th>Info</th>*/}
                </tr>

                {results.map(result => (
                    <tr>
                        <td>
                            {result.gearSet.combatStyle}
                        </td>
                        <td>
                            {
                                <Tooltip title={result.gearSet.weapon.name}>
                                    <a href={result.gearSet.weapon.wikiLink} target="_blank" rel="noreferrer">
                                        <img src={require(`${result.gearSet.weapon.imagePath}`)} style={{width: `${imageSize}px`, height: `${imageSize}px`}}
                                             alt={result.gearSet.weapon.name}/>
                                    </a>
                                </Tooltip>
                            }
                            {
                                result.gearSet.items.map(item => (
                                    <Tooltip title={item.name}>
                                        <a href={item.wikiLink} target="_blank" rel="noreferrer">
                                            <img src={require(`${item.imagePath}`)} style={{width: `${imageSize}px`, height: `${imageSize}px`}}
                                                 alt={item.name}/>
                                        </a>
                                    </Tooltip>
                                ))
                            }
                        </td>
                        <td>
                            {Math.round(result.dps * 1000) / 1000}
                        </td>
                        <td>{result.maxHit}</td>
                        <td>{Math.round(result.hitChance * 100 * 100) / 100}%</td>
                        {/*<td>
                            <ReasonPopover reasoning={result.reasoning} />
                        </td>*/}
                    </tr>
                ))}

                </thead>
                <tbody>
                </tbody>
            </table>
        </main>
    )
}

export default MainContent;
