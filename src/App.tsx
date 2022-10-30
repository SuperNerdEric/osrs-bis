import React from 'react';

import './App.css';
import {ThemeProvider, Tooltip} from "@mui/material";
import {Result} from "./DataObjects/Result";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {monsters} from "./DataObjects/Monsters";
import {gearSets} from "./DataObjects/GearSets";
import {DiscreteSliderMarks} from "./Slider";
import {TopBar} from "./TopBar";
import {getTheme} from "./theme";
import {Raid} from "./DataObjects/Raid";

function App() {
    const [invocationLevel, setInvocationLevel] = React.useState(300);

    const handleChange = (event: Event, newValue: number | number[]) => {
        console.log("Set invocation level: " + newValue);
        setInvocationLevel(newValue as number);
    };

    const [targetMonster, setTargetMonster] = React.useState("Ba-Ba");
    const [sortConfig, setSortConfig] = React.useState({key: 'dps' as keyof Result, direction: 'descending'});

    console.log(Object.keys(Result));
    const theme = getTheme();

    const toaList = ["Ba-Ba","Akkha","Kephri","Zebak","Wardens P3"];
    const gwdList = ["Kree'arra (Armadyl)","General Graardor (Bandos)","Commander Zilyana (Saradomin)","K'ril Tsutsaroth (Zamorak)"];

    const isToaBoss: boolean = (monsters.get(targetMonster) as TargetMonster).raid === Raid.TombsOfAmascut;

    let results: Result[] = [];

    gearSets.forEach(gearSet => {
        let result: Result = new Result();
        result.gearSet = gearSet;
        result.targetMonster = monsters.get(targetMonster) as TargetMonster;
        if(isToaBoss){
            result.calculateDPS(invocationLevel);
        } else {
            result.calculateDPS(0);
        }
        console.log(result);
        results.push(result);
    })

    const requestSort = (key: keyof Result) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    }


    React.useMemo(() => {
        //console.log(`Sorting ${sortConfig.key} ${sortConfig.direction}`);
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


    console.log(monsters.get("Ba-Ba"));

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className='rowC'>
                <TopBar setTargetMonster={(targetMonster: string) => {
                    setTargetMonster(targetMonster);
                }} monsterList={toaList} sectionName={"Tombs of Amascut"}/>
                <TopBar setTargetMonster={(targetMonster: string) => {
                    setTargetMonster(targetMonster);
                }} monsterList={gwdList} sectionName={"God Wars Dungeon"}/>
                </div>
                <header className="App-header">
                    <h2>{targetMonster}</h2>
                    <img src={require(`${(monsters.get(targetMonster) as TargetMonster).imagePath}`)} width="auto"
                         height="150" alt="logo"/>
                    {
                        isToaBoss && <DiscreteSliderMarks handleChange={handleChange}/>
                    }
                    <table style={Table}>
                        <caption>
                            {isToaBoss && `${invocationLevel} Invocation - `}
                            {(monsters.get(targetMonster) as TargetMonster).defenceLevel} Defence
                        </caption>
                        <thead>
                        <tr>
                            <th>Gear</th>
                            <th onClick={() => requestSort('dps')}>DPS</th>
                            <th onClick={() => requestSort('maxHit')}>Max Hit</th>
                            <th onClick={() => requestSort('hitChance')}>Hit Chance</th>
                        </tr>

                        {results.map(result => (
                            <tr>
                                <td>
                                    {
                                        result.gearSet.map(item => (
                                            <Tooltip title={item.name}>
                                                <a href={item.wikiLink} target="_blank">
                                                    <img src={require(`${item.imagePath}`)} width="50" height="50"
                                                         alt="logo"/>
                                                </a>
                                            </Tooltip>
                                        ))
                                    }
                                </td>
                                <td>{Math.round(result.dps * 100) / 100}</td>
                                <td>{result.maxHit}</td>
                                <td>{Math.round(result.hitChance * 100 * 100) / 100}%</td>
                            </tr>
                        ))}

                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </header>
            </div>
        </ThemeProvider>
    );
}

export default App;


const Table = {
    border: 1,
    padding: 15,
}

