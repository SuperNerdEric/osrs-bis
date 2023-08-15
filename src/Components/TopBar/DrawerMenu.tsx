import * as React from 'react';
import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, IconButton, Collapse } from '@mui/material';
import { Menu as MenuIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import { TargetMonster } from "../../DataObjects/TargetMonster";

type Section = {
    name: string;
    monsters: TargetMonster[];
};

const DrawerMenu = (props: { setTargetMonster: (targetMonster: TargetMonster) => void, sections: Section[] }) => {
    const [open, setOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSectionClick = (sectionName: string) => {
        setOpenSection(prevSection => prevSection !== sectionName ? sectionName : null);
    };

    const handleMonsterClick = (targetMonster: TargetMonster) => {
        props.setTargetMonster(targetMonster);
        setOpen(false);
    };

    return (
        <Box>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
                sx={{ color: 'white' }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                open={open}
                onClose={handleDrawerClose}
                PaperProps={{
                    style: {
                        backgroundColor: 'black',
                    }
                }}
            >
                <List>
                    {props.sections.map(section => (
                        <React.Fragment key={section.name}>
                            <ListItem button onClick={() => handleSectionClick(section.name)}>
                                <ListItemText primary={section.name} sx={{ color: 'white' }} />
                                {openSection === section.name ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
                            </ListItem>
                            <Collapse in={openSection === section.name} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {section.monsters.map(monster => (
                                        <ListItem button key={monster.name} onClick={() => handleMonsterClick(monster)}>
                                            <ListItemText inset primary={monster.name} sx={{ color: 'white' }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}

export default DrawerMenu;
