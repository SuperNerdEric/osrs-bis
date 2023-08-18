import React from 'react';
import {Hidden, Grid, Box, AppBar, Toolbar, Stack} from "@mui/material";
import {TargetMonster} from "../../DataObjects/TargetMonster";
import TopBarItem from "./TopBarItem";
import DrawerMenu from "./DrawerMenu";
import {GitHub} from "./GitHub";
import {getSections} from "../../DataObjects/MonsterSections";
import {Raid} from "../../DataObjects/Raid";
import MonsterSearch from "../MonsterSearch";

interface TopBarProps {
    urlState: any,
    setUrlState: (state: any) => void,
    setTargetMonster: (monster: TargetMonster) => void;
}

const TopBar: React.FC<TopBarProps> = ({urlState, setUrlState, setTargetMonster}) => {
    return (
        <header>
            <AppBar position="static" style={{background: '#000'}}>
                <Toolbar style={{paddingLeft: 24, paddingRight: 10}}>
                    <Hidden smUp>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <DrawerMenu sections={getSections()} setTargetMonster={(targetMonster: TargetMonster) => {
                                setUrlState({
                                    target: targetMonster.shortName || targetMonster.name,
                                    invocationLevel: targetMonster.raid === Raid.TombsOfAmascut ? urlState.invocationLevel : undefined,
                                });
                            }}/>
                            <div>
                                <Stack direction="row" alignItems="center" gap={4}>
                                    <div className="monsterSearch">
                                        <MonsterSearch onSelect={setTargetMonster} />
                                    </div>
                                    <GitHub/>
                                </Stack>
                            </div>
                        </div>
                    </Hidden>
                    <Hidden smDown>
                        <Box display={{ xs: 'none', sm: 'block' }} width="100%" height="100%" position="relative">
                            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                <Grid container spacing={2} style={{ flexGrow: 1 }}>
                                    {getSections().map((section, index) => (
                                        <Grid item key={index}>
                                            <TopBarItem setTargetMonster={(targetMonster: TargetMonster) => {
                                                setUrlState({
                                                    target: targetMonster.shortName || targetMonster.name,
                                                    invocationLevel: targetMonster.raid === Raid.TombsOfAmascut ? urlState.invocationLevel : undefined,
                                                });
                                            }} monsterList={section.monsters} sectionName={section.name}/>
                                        </Grid>
                                    ))}
                                </Grid>
                                <div style={{ marginTop: '5px' }}>
                                    <Stack direction="row" alignItems="center" gap={4}>
                                        <div className="monsterSearch">
                                            <MonsterSearch onSelect={setTargetMonster} />
                                        </div>
                                        <GitHub/>
                                    </Stack>
                                </div>
                            </div>

                        </Box>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </header>
    );
};

export default TopBar;