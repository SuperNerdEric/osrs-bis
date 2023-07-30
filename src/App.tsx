import React, {useState} from 'react';

import './App.css';
import {Hidden, ThemeProvider, Tooltip} from "@mui/material";
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
import DefenceReduction from "./DefenceReduction";
import {
    AppBar,
    Toolbar,
    Grid,
    Box,
} from '@mui/material';
import DrawerMenu from "./DrawerMenu";
import { devLog } from './utils';


const history = createBrowserHistory();

function App() {
    const [defenceReduction, setDefenceReduction] = React.useState(0);

    const handleChange = (event: Event, newValue: number | number[]) => {
        devLog("Set invocation level: " + newValue);
        setUrlState({invocationLevel: newValue});
    };

    const handleDefenceReduction = (defenceReduction: number) => {
        devLog("Set defence reduction: " + defenceReduction);
        setDefenceReduction(defenceReduction);
        setUrlState({defenceReduction: defenceReduction});
    };

    const [urlState, setUrlState] = useUrlState({target: "Ba-Ba", invocationLevel: 300, defenceReduction: 0});
    const [sortConfig, setSortConfig] = React.useState({key: 'dps' as keyof Result, direction: 'descending'});

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const [open, setOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    devLog(Object.keys(Result));
    const theme = getTheme();

    const isToaBoss: boolean = (monsters.get(urlState.target) as TargetMonster).raid === Raid.TombsOfAmascut;

    const results: Result[] = [];

    gearSets.forEach(gearSet => {
        const result: Result = new Result();
        result.gearSet = gearSet;
        result.targetMonster = monsters.get(urlState.target) as TargetMonster;
        result.defenceReduction = defenceReduction;
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
        devLog(result);
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


    devLog(monsters.get("Ba-Ba"));

    const sections = [
        {
            name: 'Tombs of Amascut',
            monsters: toaMonsters
        },
        {
            name: 'God Wars Dungeon',
            monsters: gwdMonsters,
        },
        // add more sections here
    ];

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <AppBar position="static" style={{background: '#000'}}>
                    <Toolbar>
                        <Hidden smUp>
                            <DrawerMenu sections={sections} setTargetMonster={(targetMonster: TargetMonster) => {
                                setUrlState({
                                    target: targetMonster.shortName || targetMonster.name,
                                    invocationLevel: undefined,
                                    defenceReduction: undefined,
                                });
                            }}/>
                        </Hidden>
                        <Hidden smDown>
                            <Box display={{ xs: 'none', sm: 'block' }}>
                                <Grid container spacing={2}>
                                    <Grid item sm={5}>
                                        <TopBarItem setTargetMonster={(targetMonster: TargetMonster) => {
                                            setUrlState({target: targetMonster.name});
                                        }} monsterList={toaMonsters} sectionName={"Tombs of Amascut"}/>
                                    </Grid>
                                    <Grid item sm={5}>
                                        <TopBarItem setTargetMonster={(targetMonster: TargetMonster) => {
                                            setUrlState({
                                                target: targetMonster.shortName || targetMonster.name,
                                                invocationLevel: undefined,
                                                defenceReduction: undefined,
                                            });
                                        }} monsterList={gwdMonsters} sectionName={"God Wars Dungeon"}/>
                                    </Grid>
                                    <Grid item sm={2}>
                                        <GitHub/>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Hidden>
                    </Toolbar>
                </AppBar>
                <GitHub/>
                <header className="App-header">
                    <h2>{(monsters.get(urlState.target) as TargetMonster).name}</h2>
                    <img src={require(`${(monsters.get(urlState.target) as TargetMonster).imagePath}`)} width="auto"
                         height="150" alt="logo"/>
                    {
                        isToaBoss &&
                        <DiscreteSliderMarks defaultValue={urlState.invocationLevel} handleChange={handleChange}/>
                    }
                    <caption>
                        {isToaBoss && `${urlState.invocationLevel} Invocation   `}
                    </caption>
                    <DefenceReduction bossName={urlState.target}
                                      defenceLevel={(monsters.get(urlState.target) as TargetMonster).defenceLevel}
                                      maxReduction={(monsters.get(urlState.target) as TargetMonster).maxDefenceReduction}
                                      handleChange={handleDefenceReduction}/>
                    <table style={Table}>
                        <thead>
                        <tr>
                            <th>Gear</th>
                            <th onClick={() => requestSort('dps')}>DPS</th>
                            <th onClick={() => requestSort('maxHit')}>Max Hit</th>
                            <th onClick={() => requestSort('hitChance')}>Hit Chance</th>
                            {/*<th>Info</th>*/}
                        </tr>

                        {results.map(result => (
                            <tr>
                                <td>
                                    {
                                        result.gearSet.map(item => (
                                            <Tooltip title={item.name}>
                                                <a href={item.wikiLink} target="_blank" rel="noreferrer">
                                                    <img src={require(`${item.imagePath}`)} width="50" height="50"
                                                         alt="logo"/>
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
                </header>
            </div>
        </ThemeProvider>
    );
}

const MainApp = () => {
    return (
        <Router history={history}>
            <Route component={App}/>
        </Router>
    );
};

export default MainApp;


const Table = {
    border: 1,
    padding: 15,
}