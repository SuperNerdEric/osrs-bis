import React, {useState} from 'react';

import './App.css';
import {ThemeProvider, Tooltip} from "@mui/material";
import {Calculator} from "./Calculator/Calculator";
import {getTheme} from "./theme";
import useUrlState from '@ahooksjs/use-url-state';
import {Route, Router} from 'react-router';
import {createBrowserHistory} from 'history';
import {devLog} from './utils';
import TopBar from "./TopBar";
import MainContent from "./MainContent";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {Raid} from "./DataObjects/Raid";


const history = createBrowserHistory();

function App() {
    const [defenceReduction, setDefenceReduction] = React.useState(0);
    const [onTask, setOnTask] = React.useState(false);

    const handleChange = (event: Event, newValue: number | number[]) => {
        devLog("Set invocation level: " + newValue);
        setUrlState({invocationLevel: newValue});
    };

    const handleDefenceReduction = (defenceReduction: number) => {
        devLog("Set defence reduction: " + defenceReduction);
        setDefenceReduction(defenceReduction);
        setUrlState({defenceReduction: defenceReduction});
    };

    const handleOnTask = (event: any) => {
        devLog("Set on task: " + event.target.checked);
        setOnTask(event.target.checked);
        setUrlState({onTask: String(event.target.checked)});
    };

    const [urlState, setUrlState] = useUrlState({
        target: "Ba-Ba",
        invocationLevel: 300,
        defenceReduction: 0,
        onTask: "false"
    });

    const theme = getTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <TopBar urlState={urlState} setUrlState={setUrlState}/>
                <MainContent
                    target={urlState.target}
                    invocationLevel={urlState.invocationLevel}
                    handleChange={handleChange}
                    defenceReduction={defenceReduction}
                    handleDefenceReduction={handleDefenceReduction}
                    onTask={onTask}
                    handleOnTask={handleOnTask}

                    setTargetMonster={(targetMonster: TargetMonster) => {
                        setUrlState({
                            target: targetMonster.shortName || targetMonster.name,
                            invocationLevel: targetMonster.raid === Raid.TombsOfAmascut ? urlState.invocationLevel : undefined,
                            defenceReduction: urlState.defenceReduction,
                        });
                    }}/>
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