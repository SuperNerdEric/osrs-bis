import React, {useEffect, useState} from 'react';
import {Collapse, Checkbox, FormControlLabel, Grid, Stack, Tooltip, TextField, InputLabel} from '@mui/material';

import PietyIcon from '../../Images/Prayers/Piety.png';
import RigourIcon from '../../Images/Prayers/Rigour.png';
import AuguryIcon from '../../Images/Prayers/Augury.png';
import slayerIcon from "../../Images/Skills/Slayer_icon.png";
import diaryIcon from "../../Images/Achievement_Diaries.png";
import soulreaperIcon from "../../Images/Soulreaper_axe.png";
import {Player} from "../../Calculator/DataObjects/Player";
import {TargetMonster} from "../../Calculator/DataObjects/TargetMonster";
import SkillsPanel from "./Skills";
import Boosts from "./Boosts";
import Prayers from "./Prayers";
import usePotionLogic from "../../hooks/usePotionLogic";
import {Prayer} from "../../Calculator/DataObjects/Prayer";

interface ConfigurationPanelProps {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
    targetMonster: TargetMonster;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
                                                                   player,
                                                                   setPlayer,
                                                                   targetMonster,
                                                               }) => {
    const [isOpen, setIsOpen] = useState(false);

    const {potionStates, handlePotionChange} = usePotionLogic(player, setPlayer, targetMonster.raid);

    const handlePrayerChange = (prayer: Prayer, isChecked: boolean) => {
        setPlayer(prevPlayer => {
            const newPlayer = new Player();
            Object.assign(newPlayer, prevPlayer);
            newPlayer.prayers[prayer] = isChecked;
            return newPlayer;
        });
    };

    useEffect(() => {
        if (!targetMonster.slayerMonster) {

            setPlayer(prevPlayer => {
                const newPlayer = new Player();
                Object.assign(newPlayer, prevPlayer);
                newPlayer.onTask = false;
                return newPlayer;
            });
        }
    }, [targetMonster.slayerMonster]);

    const handlePlayerUpdate = (skillName: SkillName, newValue: number) => {
        setPlayer(prevPlayer => {
            const newPlayer = new Player();
            Object.assign(newPlayer, prevPlayer);
            newPlayer.skills = {
                ...prevPlayer.skills,
                [skillName]: {
                    ...prevPlayer.skills[skillName],
                    level: newValue
                }
            };
            return newPlayer;
        });
    };

    type SkillName = keyof Player['skills'];

    return (
        <div style={{maxWidth: '1000px', margin: '0 auto'}}>
            <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)}>
                <hr style={{flex: 1, borderTop: '2px solid black'}}/>
                <span style={{
                    ...sharedStyle,
                    margin: '0 15px',
                    padding: '2px 15px',
                    borderRadius: '15px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    userSelect: 'none'
                }}>
                    {isOpen ? 'Hide Configuration' : 'Show Configuration'}
                </span>
                <hr style={{flex: 1, borderTop: '2px solid black'}}/>
            </div>

            <Collapse in={isOpen} style={{paddingTop: '20px'}}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <SkillsPanel player={player} handlePlayerUpdate={handlePlayerUpdate}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Boosts
                            potionStates={potionStates}
                            handlePotionChange={handlePotionChange}
                            targetMonster={targetMonster}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Prayers
                            prayersData={prayersData}
                            player={player}
                            handlePrayerChange={handlePrayerChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                {targetMonster.slayerMonster && (
                                    <Stack direction="row" alignItems="center" gap={2}>
                                        <img src={slayerIcon} alt="Slayer Task" style={iconSize}/>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={player.onTask}
                                                    onChange={(e) => {
                                                        setPlayer(prevPlayer => {
                                                            const newPlayer = new Player();
                                                            Object.assign(newPlayer, prevPlayer);
                                                            newPlayer.onTask = e.target.checked;
                                                            return newPlayer;
                                                        });
                                                    }}
                                                    name="On Task"
                                                />
                                            }
                                            label="On Task"
                                        />
                                    </Stack>
                                )}
                                <Tooltip title="Increases chance of enchanted bolt special effect occurring by 10%">
                                    <Stack direction="row" alignItems="center" gap={2}>
                                        <img src={diaryIcon} alt="Kandarin Hard Diary" style={iconSize}/>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={player.kandarinHardDiaryComplete}
                                                    onChange={(e) => {
                                                        setPlayer(prevPlayer => {
                                                            const newPlayer = new Player();
                                                            Object.assign(newPlayer, prevPlayer); // This copies properties from prevPlayer to newPlayer
                                                            newPlayer.kandarinHardDiaryComplete = e.target.checked;
                                                            return newPlayer;
                                                        });
                                                    }}
                                                    name="Kandarin Hard Diary"
                                                />
                                            }
                                            label="Kandarin Hard Diary"
                                        />
                                    </Stack>
                                </Tooltip>
                                <Tooltip title="Soulreaper axe stacks (Each Soul Stack gives the player a +6% boost to their Strength level)">
                                    <Stack direction="row" alignItems="center" gap={2}>
                                        <img src={soulreaperIcon} alt="Soulreaper Axe" style={iconSize}/>
                                        <TextField
                                            type="number"
                                            value={player.soulStacks}
                                            onChange={e => {
                                                const newValue = Math.max(0, Math.min(Number(e.target.value), 5));
                                                setPlayer(prevPlayer => {
                                                    const newPlayer = new Player();
                                                    Object.assign(newPlayer, prevPlayer);
                                                    newPlayer.soulStacks = newValue;
                                                    return newPlayer;
                                                });
                                            }}
                                            variant="outlined"
                                            style={textFieldStyle}
                                            inputProps={{style: {padding: 0}, min: 0, max: 5}}
                                        />
                                        <InputLabel sx={{ color: 'white', fontSize: '16px', padding: '5px 0' }} htmlFor="soul-stacks-input">
                                            Soul Stacks
                                        </InputLabel>

                                    </Stack>
                                </Tooltip>
                            </div>
                        </div>
                    </Grid>

                </Grid>
                <hr style={{flex: 1, borderTop: '2px solid black'}}/>
            </Collapse>

        </div>
    );
};

export default ConfigurationPanel;

const prayersData: {
    label: Prayer,
    displayName: string,
    icon: string
}[] = [
    {label: Prayer.Piety, displayName: 'Piety', icon: PietyIcon},
    {label: Prayer.Rigour, displayName: 'Rigour', icon: RigourIcon},
    {label: Prayer.Augury, displayName: 'Augury', icon: AuguryIcon}
];

const sharedStyle = {
    backgroundColor: '#d8ccb4',
    color: 'black'
};

const iconSize = {
    width: '25px',
    height: '25px'
};

const textFieldStyle = {
    backgroundColor: '#d8ccb4',
    color: 'black',
    width: '30px'
};