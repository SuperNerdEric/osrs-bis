import React, {useState} from 'react';

import '../App.css';
import {ThemeProvider, Tooltip} from "@mui/material";
import {getTheme} from "../theme";
import useUrlState from '@ahooksjs/use-url-state';
import {Route, Router} from 'react-router';
import {createBrowserHistory} from 'history';
import {devLog} from '../utils';
import TopBar from "./TopBar/TopBar";
import MainContent from "../MainContent";
import {TargetMonster} from "../DataObjects/TargetMonster";
import {Raid} from "../DataObjects/Raid";


const history = createBrowserHistory();

function App() {
    const [urlState, setUrlState] = useUrlState({
        target: "Ba-Ba",
        invocationLevel: 300,
        currentDefence: 80,
        onTask: "false"
    });
    const [onTask, setOnTask] = React.useState(urlState.onTask === "false");


    const handleChange = (event: Event, newValue: number | number[]) => {
        devLog("Set invocation level: " + newValue);
        setUrlState({invocationLevel: newValue});
    };

    const handleCurrentDefence = (currentDefence: number) => {
        devLog("Set current defence: " + currentDefence);
        setUrlState({currentDefence: currentDefence});
    };

    const handleOnTask = (checked: boolean) => {
        setOnTask(checked);
        setUrlState({onTask: String(checked)});
    };


    const theme = getTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <TopBar urlState={urlState} setUrlState={setUrlState} setTargetMonster={(targetMonster: TargetMonster) => {
                    setUrlState({
                        target: targetMonster.shortName || targetMonster.name,
                        invocationLevel: targetMonster.raid === Raid.TombsOfAmascut ? urlState.invocationLevel : undefined,
                        currentDefence: targetMonster.variants.get("default")!.defenceLevel,
                    });
                }}/>
                <MainContent
                    target={urlState.target}
                    invocationLevel={urlState.invocationLevel}
                    handleChange={handleChange}
                    currentDefence={urlState.currentDefence}
                    handleCurrentDefence={handleCurrentDefence}
                    onTask={onTask}
                    handleOnTask={handleOnTask}
                    setTargetMonster={(targetMonster: TargetMonster) => {
                        setUrlState({
                            target: targetMonster.shortName || targetMonster.name,
                            invocationLevel: targetMonster.raid === Raid.TombsOfAmascut ? urlState.invocationLevel : undefined,
                            currentDefence: targetMonster.variants.get("default")!.defenceLevel,
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