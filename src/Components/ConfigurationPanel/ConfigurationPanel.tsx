import React, {useEffect, useState} from 'react';
import {Collapse, Checkbox, FormControlLabel, Grid, Stack, Tooltip} from '@mui/material';

import PietyIcon from '../../Images/Prayers/Piety.png';
import RigourIcon from '../../Images/Prayers/Rigour.png';
import AuguryIcon from '../../Images/Prayers/Augury.png';
import slayerIcon from "../../Images/Skills/Slayer_icon.png";
import diaryIcon from "../../Images/Achievement_Diaries.png";
import {Player} from "../../DataObjects/Player";
import {TargetMonster} from "../../DataObjects/TargetMonster";
import SkillsPanel from "./Skills";
import Boosts from "./Boosts";
import Prayers from "./Prayers";
import usePotionLogic from "../../hooks/usePotionLogic";

interface ConfigurationPanelProps {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
    targetMonster: TargetMonster;
    defenceReduction: number;
    handleDefenceReduction: (defenceReduction: number) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
                                                                   player,
                                                                   setPlayer,
                                                                   targetMonster,
                                                                   defenceReduction,
                                                                   handleDefenceReduction
                                                               }) => {
    const [isOpen, setIsOpen] = useState(false);

    const {potionStates, handlePotionChange} = usePotionLogic(player, setPlayer, targetMonster.raid);

    const handlePrayerChange = (label: PrayerLabel, isChecked: boolean) => {
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            prayers: {
                ...prevPlayer.prayers,
                [label]: isChecked
            }
        }));
    };

    useEffect(() => {
        if (!targetMonster.slayerMonster) {
            setPlayer(prevPlayer => ({...prevPlayer, onTask: false}));
        }
    }, [targetMonster.slayerMonster]);

    const handlePlayerUpdate = (skillName: SkillName, newValue: number) => {
        setPlayer(prevPlayer => ({
            ...prevPlayer,
            skills: {
                ...prevPlayer.skills,
                [skillName]: {
                    ...prevPlayer.skills[skillName],
                    level: newValue // assuming you're updating the level; adjust if it's for boost
                }
            }
        }));
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
                                                        setPlayer(prevPlayer => ({
                                                            ...prevPlayer,
                                                            onTask: e.target.checked
                                                        }));
                                                    }}
                                                    name="On Task"
                                                    sx={checkboxStyle}
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
                                                    onChange={(e) => setPlayer({
                                                        ...player,
                                                        kandarinHardDiaryComplete: e.target.checked
                                                    })}
                                                    name="Kandarin Hard Diary"
                                                    sx={checkboxStyle}
                                                />
                                            }
                                            label="Kandarin Hard Diary"
                                        />
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

type PrayerLabel = 'piety' | 'rigour' | 'augury';

const prayersData = [
    {label: 'piety' as PrayerLabel, displayName: 'Piety', icon: PietyIcon},
    {label: 'rigour' as PrayerLabel, displayName: 'Rigour', icon: RigourIcon},
    {label: 'augury' as PrayerLabel, displayName: 'Augury', icon: AuguryIcon}
];

const sharedStyle = {
    backgroundColor: '#d8ccb4',
    color: 'black'
};

const iconSize = {
    width: '25px',
    height: '25px'
};

const checkboxStyle = {
    color: "#d8ccb4",
    '&.Mui-checked': {
        color: '#d8ccb4',
    },
    '& .MuiSvgIcon-root': {
        fontSize: 25 // Updated to match the iconSize
    }
};

