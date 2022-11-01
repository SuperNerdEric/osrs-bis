import React from 'react';

import './App.css';
import {ThemeProvider, Tooltip} from "@mui/material";
import {Result} from "./DataObjects/Result";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {monsters} from "./DataObjects/Monsters";
import {gearSets} from "./DataObjects/GearSets";
import {DiscreteSliderMarks} from "./Slider";
import {TopBarItem} from "./TopBarItem";
import {getTheme} from "./theme";
import {Raid} from "./DataObjects/Raid";
import useUrlState from '@ahooksjs/use-url-state';
import {Route, Router} from 'react-router';
import {createBrowserHistory} from 'history';
import {gwdMonsters, toaMonsters} from "./DataObjects/ToaMonsters";
import {GitHub} from "./GitHub";
import InfoIcon from "@mui/icons-material/Info";

const history = createBrowserHistory();

function App() {
    const handleChange = (event: Event, newValue: number | number[]) => {
        console.log("Set invocation level: " + newValue);
        setUrlState({ invocationLevel: newValue });
    };

    const [urlState, setUrlState] = useUrlState({ target: "Ba-Ba", invocationLevel: 300 });
    const [sortConfig, setSortConfig] = React.useState({key: 'dps' as keyof Result, direction: 'descending'});

    console.log(Object.keys(Result));
    const theme = getTheme();

    const isToaBoss: boolean = (monsters.get(urlState.target) as TargetMonster).raid === Raid.TombsOfAmascut;

    let results: Result[] = [];

    gearSets.forEach(gearSet => {
        let result: Result = new Result();
        result.gearSet = gearSet;
        result.targetMonster = monsters.get(urlState.target) as TargetMonster;
        if (isToaBoss) {
            result.player.attackLevelBoost = 26;
            result.player.strengthLevelBoost = 26;
            result.player.rangedLevelBoost = 26;
            result.player.magicLevelBoost = 26;
            result.calculateDPS(urlState.invocationLevel);
        } else {
            result.player.attackLevelBoost = 19;
            result.player.strengthLevelBoost = 19;
            result.player.rangedLevelBoost = 13;
            result.player.magicLevelBoost = 10; //imbued heart
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
                    <TopBarItem setTargetMonster={(targetMonster: TargetMonster) => {
                        setUrlState({target: targetMonster.name});
                    }} monsterList={toaMonsters} sectionName={"Tombs of Amascut"}/>
                    <TopBarItem setTargetMonster={(targetMonster: TargetMonster) => {
                        setUrlState({
                            target: targetMonster.shortName || targetMonster.name,
                            invocationLevel: undefined
                        });
                    }} monsterList={gwdMonsters} sectionName={"God Wars Dungeon"}/>
                </div>
                <GitHub/>
                <header className="App-header">
                    <h2>{(monsters.get(urlState.target) as TargetMonster).name}</h2>
                    <img src={require(`${(monsters.get(urlState.target) as TargetMonster).imagePath}`)} width="auto"
                         height="150" alt="logo"/>
                    {
                        isToaBoss &&
                        <DiscreteSliderMarks defaultValue={urlState.invocationLevel} handleChange={handleChange}/>
                    }
                    <table style={Table}>
                        <caption>
                            {isToaBoss && `${urlState.invocationLevel} Invocation - `}
                            {(monsters.get(urlState.target) as TargetMonster).defenceLevel} Defence
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
                                <td>
                                    {Math.round(result.dps * 1000) / 1000}

                                    {/*Debug only, for now....*/}
                                    {/*
                                        &nbsp;
                                        <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>{result.reasoning}</div>}>
                                            <InfoIcon/>
                                        </Tooltip>
                                    */}
                                </td>
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

export default () => {
    return (
        <Router history={history}>
            <Route component={App} />
        </Router>
    );
};



const Table = {
    border: 1,
    padding: 15,
}