import React from 'react';
import {Hidden, Grid, Box, AppBar, Toolbar} from "@mui/material";
import {TargetMonster} from "./DataObjects/TargetMonster";
import {TopBarItem} from "./TopBarItem";
import DrawerMenu from "./DrawerMenu";
import {GitHub} from "./GitHub";

interface Section {
    name: string,
    monsters: TargetMonster[],
}

interface TopBarProps {
    sections: Section[],
    setUrlState: (state: any) => void,
}

const TopBar: React.FC<TopBarProps> = ({sections, setUrlState}) => {
    return (
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
                    <Box display={{xs: 'none', sm: 'block'}}>
                        <Grid container spacing={2}>
                            {sections.map((section, index) => (
                                <Grid item key={index}>
                                    <TopBarItem setTargetMonster={(targetMonster: TargetMonster) => {
                                        setUrlState({
                                            target: targetMonster.shortName || targetMonster.name,
                                            invocationLevel: undefined,
                                            defenceReduction: undefined,
                                        });
                                    }} monsterList={section.monsters} sectionName={section.name}/>
                                </Grid>
                            ))}
                            <GitHub/>
                        </Grid>
                    </Box>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
