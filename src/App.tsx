import React from 'react';

import './App.css';
import {Button, createTheme, Menu, MenuItem, ThemeProvider, Tooltip} from "@mui/material";
import {Result} from "./DataObjects/Result";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {monsters} from "./DataObjects/Monsters";
import {gearSets} from "./DataObjects/GearSets";

function App() {
    const [targetMonster, setTargetMonster] = React.useState("Ba-Ba");
    const [sortConfig, setSortConfig] = React.useState({ key: 'dps' as keyof Result, direction:'ascending'});;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(Object.keys(Result));
    const theme = createTheme({
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: '#d8ccb4',
                        color: 'black',
                        fontSize: '22px',
                        border: '1px solid #dadde9',
                    },
                },
            },
        },
    });

    let results: Result[] = [];

    gearSets.forEach(gearSet => {
        let result: Result = new Result();
        result.gearSet = gearSet;
        console.log("GearSet: " + JSON.stringify(gearSet));
        result.targetMonster =  monsters.get(targetMonster) as TargetMonster;
        result.calculateDPS();
        console.log(result);
        results.push(result);
    })

    const requestSort = (key: keyof Result) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }



    React.useMemo(() => {
        console.log(`Sorting ${sortConfig.key} ${sortConfig.direction}`);
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
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Tombs of Amascut
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { handleClose(); setTargetMonster('Ba-Ba');}}>Ba-Ba</MenuItem>
                        <MenuItem onClick={() => { handleClose(); setTargetMonster('Akkha');}}>Akkha</MenuItem>
                        <MenuItem onClick={() => { handleClose(); setTargetMonster('Kephri');}}>Kephri</MenuItem>
                        <MenuItem onClick={() => { handleClose(); setTargetMonster('Zebak');}}>Zebak</MenuItem>
                        <MenuItem onClick={() => { handleClose(); setTargetMonster('Wardens P3');}}>Wardens P3</MenuItem>
                    </Menu>
                </div>
                <header className="App-header">
                    <h2>{targetMonster}</h2>
                    <img src={require(`${(monsters.get(targetMonster) as TargetMonster).imagePath}`)} width="auto" height="150" alt="logo"/>
                    <table style={Table}>
                        <caption>0 Invocation - {(monsters.get(targetMonster) as TargetMonster).defenceLevel} Defence</caption>
                        <thead>
                        <tr>
                            <th>Gear</th>
                            <th onClick={() => requestSort('dps')}>DPS</th>
                            <th onClick={() => requestSort('maxHit')}>Max Hit</th>
                            <th onClick={() => requestSort('accuracy')}>Accuracy</th>
                        </tr>

                        {results.map(result => (
                            <tr key={result.dps}>
                                <td>
                                    {
                                        result.gearSet.map(item => (
                                            <Tooltip title={item.name}>
                                                <a href={item.wikiLink} target="_blank">
                                                    <img src={require(`${item.imagePath}`)} width="50" height="50" alt="logo"/>
                                                </a>
                                            </Tooltip>
                                        ))
                                    }
                                </td>
                                <td>{Math.round(result.dps * 100) / 100}</td>
                                <td>{result.maxHit}</td>
                                <td>{Math.round(result.accuracy * 100 * 100) / 100}%</td>
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
