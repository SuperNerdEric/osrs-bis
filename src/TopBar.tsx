import React from 'react';
import {Hidden, Grid, Box, AppBar, Toolbar} from "@mui/material";
import {TargetMonster} from "./DataObjects/TargetMonster";
import TopBarItem from "./TopBarItem";
import DrawerMenu from "./DrawerMenu";
import {GitHub} from "./GitHub";
import {sections} from "./DataObjects/MonsterSections";
import {Raid} from "./DataObjects/Raid";

interface TopBarProps {
    urlState: any,
    setUrlState: (state: any) => void,
}

const TopBar: React.FC<TopBarProps> = ({urlState, setUrlState}) => {
    return (
        <header>
            <AppBar position="static" style={{background: '#000'}}>
                <Toolbar style={{paddingLeft: 24, paddingRight: 10}}>
                    <Hidden smUp>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <DrawerMenu sections={sections} setTargetMonster={(targetMonster: TargetMonster) => {
                                setUrlState({
                                    target: targetMonster.shortName || targetMonster.name,
                                    invocationLevel: targetMonster.raid === Raid.TombsOfAmascut ? urlState.invocationLevel : undefined,
                                    defenceReduction: urlState.defenceReduction,
                                });
                            }}/>
                            <div>
                                <GitHub/>
                            </div>
                        </div>
                    </Hidden>
                    <Hidden smDown>
                        <Box display={{xs: 'none', sm: 'block'}} width="100%" height="100%">
                            <div style={{display: 'flex'}}>
                                <Grid container spacing={2} style={{flexGrow: 1}}>
                                    {sections.map((section, index) => (
                                        <Grid item key={index}>
                                            <TopBarItem setTargetMonster={(targetMonster: TargetMonster) => {
                                                setUrlState({
                                                    target: targetMonster.shortName || targetMonster.name,
                                                    invocationLevel: targetMonster.raid === Raid.TombsOfAmascut ? urlState.invocationLevel : undefined,
                                                    defenceReduction: urlState.defenceReduction,
                                                });
                                            }} monsterList={section.monsters} sectionName={section.name}/>
                                        </Grid>
                                    ))}
                                </Grid>
                                <div>
                                    <GitHub/>
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