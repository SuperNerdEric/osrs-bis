import {Tooltip} from "@mui/material";
import {Calculator} from "./Calculator/Calculator";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {monsters} from "./DataObjects/Monsters";
import {GearSet, gearSets, GearSetType} from "./DataObjects/GearSets";
import {DiscreteSliderMarks} from "./Slider";
import DefenceReduction from "./DefenceReduction";
import React, {useEffect, useRef, useState} from 'react';
import {Raid} from "./DataObjects/Raid";
import OnTaskCheck from "./OnTaskCheck";
import {VariableSizeGrid} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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

    const [results, setResults] = useState<Calculator[]>([]);
    const isToaBoss: boolean = (monsters.get(target) as TargetMonster).raid === Raid.TombsOfAmascut;
    const [sortConfig, setSortConfig] = React.useState({key: 'dps' as keyof Calculator, direction: 'descending'});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const requestSort = (key: keyof Calculator) => {
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
        const results: Calculator[] = [];

        console.log("Gearsets length: " + gearSets.length);

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

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageSize = Math.max(20, Math.min(50, windowWidth / 20));
    const columnWidthPercentages = [0.15, 0.45, 0.15, 0.10, 0.15];

    const gridRef = useRef<VariableSizeGrid>(null);

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
            <div className="myGrid">
                <AutoSizer>
                    {({height, width}: { height: number; width: number }) => {
                        return (
                            <VariableSizeGrid
                                ref={gridRef}
                                columnCount={5}
                                columnWidth={(index) => columnWidthPercentages[index] * width - 5}
                                height={height}
                                rowCount={results.length}
                                rowHeight={(index) => 80}
                                width={width}
                            >
                                {({columnIndex, rowIndex, style}) => {
                                    const result = results[rowIndex];

                                    const cellStyle = {...style, border: '1px solid white', display: 'flex', justifyContent: "center", alignItems: "center"};
                                    switch (columnIndex) {
                                        case 0: // Combat style column
                                            return <div style={cellStyle}>{result.gearSet.combatStyle}</div>;
                                        case 1: // Gear column
                                            return (
                                                <div style={cellStyle}>
                                                    <Tooltip title={result.gearSet.weapon.name}>
                                                        <a href={result.gearSet.weapon.wikiLink} target="_blank" rel="noreferrer">
                                                            <img src={require(`${result.gearSet.weapon.imagePath}`)} style={{width: `${imageSize}px`, height: `${imageSize}px`}} alt={result.gearSet.weapon.name}/>
                                                        </a>
                                                    </Tooltip>
                                                    {result.gearSet.items.map(item => (
                                                        <Tooltip title={item.name}>
                                                            <a href={item.wikiLink} target="_blank" rel="noreferrer">
                                                                <img src={require(`${item.imagePath}`)} style={{width: `${imageSize}px`, height: `${imageSize}px`}} alt={item.name}/>
                                                            </a>
                                                        </Tooltip>
                                                    ))}
                                                </div>
                                            );
                                            break;
                                        case 2: // DPS column
                                            return (
                                                <div style={cellStyle}>
                                                    {Math.round(result.dps * 1000) / 1000}
                                                </div>
                                            );
                                        case 3: // Max Hit column
                                            return <div style={cellStyle}>{result.maxHit}</div>;
                                        case 4: // Hit Chance column
                                            return (
                                                <div style={cellStyle}>
                                                    {Math.round(result.hitChance * 100 * 100) / 100}%
                                                </div>
                                            );
                                        default:
                                            return null;
                                    }
                                }}
                            </VariableSizeGrid>
                        );
                    }}
                </AutoSizer>
            </div>
            {/*            <table style={Table}>
                <thead>
                <tr>
                    <th>Style</th>
                    <th>Gear</th>
                    <th onClick={() => requestSort('dps')}>DPS</th>
                    <th onClick={() => requestSort('maxHit')}>Max Hit</th>
                    <th onClick={() => requestSort('hitChance')}>Hit Chance</th>
                    <th>Info</th>
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
                    </tr>
                ))}

                </thead>
                <tbody>
                </tbody>
            </table>*/}
        </main>
    )
}

export default MainContent;
