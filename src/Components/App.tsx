import React, {useEffect, useState} from 'react';

import '../App.css';
import {ThemeProvider, Tooltip} from "@mui/material";
import {getTheme} from "../theme";
import useUrlState from '@ahooksjs/use-url-state';
import {Route, Router} from 'react-router';
import {createBrowserHistory} from 'history';
import {devLog} from '../utils';
import TopBar from "./TopBar/TopBar";
import MainContent from "../MainContent";
import {TargetMonster} from "../Calculator/DataObjects/TargetMonster";
import {Raid} from "../Calculator/DataObjects/Raid";
import {loadMonstersFromFile, monsters} from "../Calculator/Data/loadMonsters";
import {UrlStateType} from "../UrlStateType";
import * as _ from "lodash";


const history = createBrowserHistory();

function App() {
    const [urlState, setUrlState] = useUrlState({
        target: "Ba-Ba",
        invocationLevel: 300,
        currentDefence: 80,
        currentHitpoints: 380,
        onTask: "false",
        version: "default",
    });
    const [onTask, setOnTask] = React.useState(urlState.onTask === "false");
    const [loading, setLoading] = useState(true);
    const [targetMonster, setTargetMonster] = useState<TargetMonster | null>(null);


    useEffect(() => {
        loadMonstersFromFile();
        let monsterName = urlState.target;
        if (!monsterName) {
            monsterName = "Ba-Ba";
        }
        const monster = monsters.get(monsterName);
        if (monster) {
            setTargetMonster(monster);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const originalMonster = monsters.get(urlState.target);
        if (originalMonster) {
            const clonedMonster: TargetMonster = _.cloneDeep(originalMonster);
            if (urlState.version) {
                clonedMonster.setActiveVariant(urlState.version);
            }
            monsters.set(urlState.target, clonedMonster);
            setTargetMonster(clonedMonster);
        }
    }, [urlState.currentDefence, urlState.currentHitpoints, urlState.version]);


    const handleSetInvocation = (newValue: number) => {
        devLog("Set invocation level: " + newValue);
        updateUrlState({invocationLevel: newValue});
    };

    const handleOnTask = (checked: boolean) => {
        setOnTask(checked);
        updateUrlState({onTask: String(checked)});
    };

    const theme = getTheme();

    if (loading) {
        return <div>Loading...</div>;
    }

    const updateUrlState = (newState: Partial<UrlStateType>) => {
        console.log("New state: " + JSON.stringify(newState));
        const shouldUpdate = Object.keys(newState).some(key => newState[key as keyof UrlStateType] !== urlState[key as keyof UrlStateType]);

        if (shouldUpdate) {
            console.log("Updating url with: ", newState);
            setUrlState(prevState => ({...prevState, ...newState}));
        }
    };

    const handleSetTargetMonster = (targetMonster: TargetMonster) => {
        updateUrlState({
            target: targetMonster.title,
            invocationLevel: targetMonster.raid === Raid.TombsOfAmascut ? urlState.invocationLevel : undefined,
            currentDefence: targetMonster.currentDefenceLevel,
            currentHitpoints: targetMonster.currentHitpoints,
            version: targetMonster.activeVariant.variantName,
        });
        monsters.set(targetMonster.title, targetMonster);
        setTargetMonster(targetMonster);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <TopBar urlState={urlState} setTargetMonster={handleSetTargetMonster}/>
                {!loading && targetMonster && (
                    <MainContent
                        targetMonster={targetMonster}
                        setTargetMonster={handleSetTargetMonster}
                        invocationLevel={urlState.invocationLevel}
                        handleSetInvocationLevel={handleSetInvocation}
                        onTask={onTask}
                        handleOnTask={handleOnTask}
                    />
                )}

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