import React from 'react';
import {Hidden, Grid, Box, AppBar, Toolbar, Stack} from "@mui/material";
import {TargetMonster} from "../../Calculator/DataObjects/TargetMonster";
import TopBarItem from "./TopBarItem";
import DrawerMenu from "./DrawerMenu";
import {GitHub} from "./GitHub";
import {getSections} from "../../MonsterSections";

import MonsterSearch from "../MonsterSearch";

interface TopBarProps {
    urlState: any,
    setTargetMonster: (monster: TargetMonster) => void;
}

const TopBar: React.FC<TopBarProps> = ({setTargetMonster}) => {
    return (
        <header>
            <AppBar position="static" style={{background: '#000'}}>
                <Toolbar style={{paddingLeft: 24, paddingRight: 10}}>
                    <Hidden smUp>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <DrawerMenu
                                sections={getSections()}
                                setTargetMonster={setTargetMonster}
                            />
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
                                            <TopBarItem
                                                setTargetMonster={setTargetMonster}
                                                monsterList={section.monsters}
                                                sectionName={section.name}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <div style={{ marginTop: '0px' }}>
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